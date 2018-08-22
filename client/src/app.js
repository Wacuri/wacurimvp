import React, {Component} from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cookie from 'js-cookie';
import Header from './components/header';
import Home from './components/home';
import JourneySpace from './components/journey_space';
import Intro from './components/intro';
import CountdownMessage from './components/countdown_message';
import state from './state';

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
  var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
  const OT = require('@opentok/client');
  const globalClickCatcher = (e) => {
    if (state.audioTag && state.audioTag.paused) {
      state.audioTag.play().then(() => {
        state.audioTag.pause();
        document.body.removeEventListener('click', globalClickCatcher);
      });
    }
  }
  document.body.addEventListener('click', globalClickCatcher);
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

  constructor(props) {
    super(props);
    this.state = {
      loading: false 
    }
  }

  render() {
    const {journey} = this.props;
    const currentUserHasRSVP = (journey.participants || []).find(participant => participant.user === state.sessionId) != null;

    return (
      <div className='joinable-journey-card'>
        <div className='image'>
          <img src={journey.image}/>
        </div>
        <div className='content'>
          <CountdownMessage endTime={journey.startAt} />
          <h4>{journey.name}</h4>
          <p>Starts at: {moment(journey.startAt).format('LT')}</p>
          <ul className='journey-vacant-spots' style={{display: 'flex', listStyle: 'none', margin: 0, padding: 0}}>
            <li>{3 - journey.participants.length} spot{3 - journey.participants.length > 1 ? 's' : ''} available:</li>
            {Array(3).fill(0).map((k, i) => (
		// Rob is changing this to "user" just as a test of my ability to change things...
              <li><i className={`fa fa-user ${journey.participants.length > i ? 'fill' : ''}`}></i></li>
            ))}
            
          </ul>
          <Link to={`/${journey.room}`} className='btn btn-primary'>{currentUserHasRSVP ? 'Go there now' : 'Join'}</Link>
        </div>
      </div>
    )
  }
}

class JourneyBoard extends Component {

  componentDidMount() {
    const roomUrl = 'temp-home-location'

    // subscribe to global events
    fetch(`/api/journeys/${roomUrl}`, {credentials: 'include'})
      .then(res => res.json())
      .then(json => {
        this.sessionHelper = createSession({
          apiKey: state.openTokKey,
          sessionId: json.sessionId,
          token: json.token,
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

        this.sessionHelper.session.on("signal:failJourney", (event) => {
          const journey = JSON.parse(event.data);
          const idx = state.joinableJourneys.findIndex(j => j._id === journey._id);
          state.joinableJourneys = [...state.joinableJourneys.slice(0, idx), ...state.joinableJourneys.slice(idx + 1)];
        });

        this.sessionHelper.session.on('signal:journeyerJoined', (event) => {
          const participant = JSON.parse(event.data);
          const journey = state.joinableJourneys.find(j => j._id === participant.journeySpace);
          if (journey) {
            const idx = state.joinableJourneys.indexOf(journey);
            if (journey.participants.findIndex(_participant => _participant._id === participant._id) === -1) {
              journey.participants.push(participant);
            }
            state.joinableJourneys = [...state.joinableJourneys.slice(0, idx), journey, ...state.joinableJourneys.slice(idx + 1)];
          }
        });

        this.sessionHelper.session.on('signal:journeyerLeftSpace', (event) => {
          const participant = JSON.parse(event.data);
          console.log('Event: left space', event.data);
          const journey = state.joinableJourneys.find(j => j._id === participant.journeySpace);
          const idx = state.joinableJourneys.indexOf(journey);
          journey.participants = journey.participants.filter(p => p._id !== participant._id);
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
        {state.joinableJourneys.map(journey => <JoinableJourneyCard key={journey._id} journey={journey} audioTag={this.audioTag}/>)}
      </div>
    )
  }
}

class IntroWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: !Cookie.get('saw intro')
    }
  }

  componentDidMount() {
  }

  onClose = () => {
    this.setState({
      showIntro: false
    });
  }

  render() {
    if (this.state.showIntro) {
      return (
        <Intro onClose={this.onClose} {...this.props}>
          <this.props.component {...this.props}/>
        </Intro>
      )
    } else {
      return <this.props.component {...this.props}/>
    }
  }
}

const RouteWithIntro = ({component: Component, ...rest}) => {
  const showIntro = __CLIENT__ && !Cookie.get('saw intro');
  return (
    <div>
      {showIntro && 
        <Route {...rest} render={renderProps => {
          return (
            <IntroWrapper component={Component} {...renderProps}/>
          )
        }}/>
      }

      {!showIntro &&
        <Route {...rest} render={renderProps => {
          return (
            <Component {...renderProps} />
          )
        }}/>
      }
    </div>
  )
}


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <RouteWithIntro exact path="/login" component={withRouter(Login)} />
          <RouteWithIntro exact path="/" component={view(JourneyBoard)} />
          <RouteWithIntro exact path="/old" component={Home} />
          <RouteWithIntro exact path="/:room" component={JourneySpace} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(view(App));
