import React, {Component} from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import PropTypes from 'prop-types';
import moment from 'moment';
import Header from './components/header';
import Home from './components/home';
import Room from './components/Room';
import state from './state';

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
  var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
  const OT = require('@opentok/client');
}


const RequireLoginRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={renderProps => {
        return (
          state.loggedIn ?
            <Component {...renderProps} />
          : <Redirect to={ {
                pathname: '/login'
            }} />
        )
    }}/>
  )
};

class Login extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  
  onChange(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    }
  }

  login = (e) => {
    e.preventDefault();
    fetch(`/api/login`, {
      body: JSON.stringify({name: this.state.name}), // must match 'Content-Type' header
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      state.loggedIn = json.loggedIn;
      state.user = json.user;
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div style={{padding: '20px', width: '50%'}}>
        <form onSubmit={this.login}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" onChange={this.onChange('name')} value={this.state.name} className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

class JoinableJourneyCard extends Component {

  onJoin = (e) => {
    e.preventDefault();
    fetch(`/api/journeys/${this.props.journey._id}/rsvp`, {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    });
  }

  render() {
    const {journey} = this.props;
    const currentUserHasRSVP = (journey.rsvps || []).find(rsvp => rsvp.user === state.sessionId) != null;
    return (
      <div className='joinable-journey-card'>
        <div className='image'>
          <img src={journey.image}/>
        </div>
        <div className='content'>
          <h4>{journey.name}</h4>
          <p>Starts at: {moment(journey.startAt).format('LT')}</p>
          <p>{journey.rsvps.length} / 3</p>
          { journey.rsvps.length < 3 && !currentUserHasRSVP &&
            <a href={`/${journey.room}`} onClick={this.onJoin} className='btn btn-primary'>Join</a>
          }
          { currentUserHasRSVP &&
            <a href={`/${journey.room}`} className='btn btn-primary'>Go there now</a>
          }
        </div>
      </div>
    )
  }
}

class AutoCreatedJourneysQueue extends Component {
  
  componentDidMount() {
    const roomUrl = 'temp-home-location'

    // subscribe to global events
    fetch(`/api/sessions/${roomUrl}`)
      .then(res => res.json())
      .then(json => {
        state.session = json;
        this.sessionHelper = createSession({
          apiKey: state.openTokKey,
          sessionId: state.session.sessionId,
          token: state.session.token,
          onConnect: () => {
          }
        });

        this.sessionHelper.session.on("signal:createdNewJourney", (event) => {
          state.joinableJourneys.push(JSON.parse(event.data));
        });

        this.sessionHelper.session.on("signal:expiredJourney", (event) => {
          const journey = JSON.parse(event.data);
          const idx = state.joinableJourneys.findIndex(j => j._id === journey._id);
          state.joinableJourneys = [...state.joinableJourneys.slice(0, idx), ...state.joinableJourneys.slice(idx + 1)];
        });

        this.sessionHelper.session.on('signal:newRSVP', (event) => {
          const rsvp = JSON.parse(event.data);
          const journey = state.joinableJourneys.find(j => j._id == rsvp.journey._id);
          const idx = state.joinableJourneys.findIndex(j => j._id === journey._id);
          journey.rsvps.push(rsvp);
          state.joinableJourneys = [...state.joinableJourneys.slice(0, idx), journey, ...state.joinableJourneys.slice(idx + 1)];
        });
        
      });


    // fetch currently active journeys
    fetch('/api/active_journeys')
      .then(res => res.json())
      .then(json => {
        state.joinableJourneys = json;
      });
  }

  render() {
    return (
      <div className='joinable-journeys'>
        {state.joinableJourneys.map(journey => <JoinableJourneyCard key={journey._id} journey={journey}/>)}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/login" component={withRouter(Login)} />
          <Route exact path="/join" component={view(AutoCreatedJourneysQueue)} />
          <Route exact path="/" component={Home} />
          <Route exact path="/:room" component={Room} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(view(App));
