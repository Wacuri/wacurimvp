// app.js -- The "one-page" client side holder for this react app
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

import React, {Component} from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cookie from 'js-cookie';
import * as LTB from './components/header';
import Home from './components/home';
import * as JSP from './components/journey_space';
// import JourneySpace from './components/journey_space';
import * as INTRO from './components/intro';
import CountdownMessage from './components/countdown_message';
import state from './state';
import * as someHelper from './utility/utility';




import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
const VirtualizeSwipeableViews = virtualize(SwipeableViews);



import journeyboardbannerimage from 'file-loader!isomorphic-loader!../res/images/JourneyBoardWoman-Phone.jpg';

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};


// Note: it may be worth using serve favicon to make this work on our deployed site: https://expressjs.com/en/resources/middleware/serve-favicon.html


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
  };
    
    const resizeEventHandler = (e) => {
	someHelper.setSizes();
    };
    document.body.addEventListener('click', globalClickCatcher);
    window.addEventListener('resize', resizeEventHandler);
    window.addEventListener('load', resizeEventHandler);
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

      const image_name = "images/SPOTS-0"+journey.participants.length+".png";
    return (
      <div className='joinable-journey-card'>
        <div className='image'>
          <img src={journey.image}/>
        </div>
            <div className='content'>
            <div className='card-name'>
            <h4>{journey.name}</h4>
            </div>
          <CountdownMessage endTime={journey.startAt} />
            <div className='journey-vacant-spots'>
              <span className='spotnumber' key="msg">{3 - journey.participants.length} </span>
              <span> spot{3 - journey.participants.length > 1 ? 's' : ''} available: </span>
	      <img src={image_name} />
            </div>

	    {/* here "j" is inserted as a convenient means of marking this entry as a Journeyboard space rather than a permanent one */}
            <Link to={`/j/${journey.room}`} className='btn btn-primary'>{currentUserHasRSVP ? 'Go there now' : 'Join'}</Link>
        </div>
      </div>
    )
  }
}

	    {/*
            {Array(3).fill(0).map((k, i) => (
		// Rob is changing this to "user" just as a test of my ability to change things...
		// Note: Adding a "key" here seems unneeded but made a confusing waring disappear...
		    <li key={"item"+i}><i className={`fas fa-user ${journey.participants.length > i ? 'fill' : ''}`}></i></li>
		    ))} */}


class JourneyBoard extends Component {
  constructor(props) {
      super(props);
      this.state = {
	  showOrientationModal: false,
      }
  }

    onOrientation = (e) => {
	console.log("onOrientation called");
    e.preventDefault();
    this.setState({
      showOrientationModal: true
    });
    e.stopPropagation();	
  }

  onCloseOrientationModal = (e) => {
    e.preventDefault();
    this.setState({
      showOrientationModal: false
    });
  }

  onCompleteOrienetation = (url, name) => {
    this.setState({
      showOrientationModal: false
    });
  }
    
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
	      // console.log("joinable Jounerys:");
	      // console.log(state.joinableJourneys);
	      // console.log([JSON.parse(event.data)]);	      
//	      state.joinableJourneys = _.unionBy(state.joinableJourneys, [JSON.parse(event.data)], (j) => j._id)	      
              state.joinableJourneys.push(JSON.parse(event.data));
	      
	      console.log(state.joinableJourneys);	      
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
//	      console.log(state.joinableJourneys);
              state.joinableJourneys = [...state.joinableJourneys.slice(0, idx), journey, ...state.joinableJourneys.slice(idx + 1)];
//	      console.log("journeyer joined done!");
//	      console.log(state.joinableJourneys);	      
          }
        });

        this.sessionHelper.session.on('signal:journeyerLeftSpace', (event) => {
          const participant = JSON.parse(event.data);
          const journey = state.joinableJourneys.find(j => j._id === participant.journeySpace);
          const idx = state.joinableJourneys.indexOf(journey);
            journey.participants = journey.participants.filter(p => p._id !== participant._id);
//	      console.log(state.joinableJourneys);	    
            state.joinableJourneys = [...state.joinableJourneys.slice(0, idx), journey, ...state.joinableJourneys.slice(idx + 1)];
//	      console.log("journeyer left space done!");
//	      console.log(state.joinableJourneys);	      	    
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
	// Note, if this key is ever read and treated as a id, then we will have a terrible problem.
	// I want to remove the warnings I am getting, but this is a dangerous way to do it.
	// Possibly I should deal with this in a different way.
	var discriminator = 0;
	return (
		<div>
		 {this.state.showOrientationModal &&
		  <JourneyBoardOrientationModal force={true} onComplete={this.onCompleteOrientation} onClose={this.onCloseOrientationModal}>
		  </JourneyBoardOrientationModal>
		 }
		<LTB.JourneyBoardBar history={this.props.history} showLeave={false} showOrientation={true}
	          onOrientation={this.onOrientation}
		/>

                <div className="main-banner" style={{backgroundImage: `url(${journeyboardbannerimage})`}}>
                     <div  className="container">
		          <h1>The CuriousLive JourneyBoard</h1>
					<p>Welcome to the CuriousLive JourneyBoard "Wake Up Curious" … It's the five-minute mental day spa everybody's talking about.</p>
					<p>Select a journey to begin whenever you are ready. Wait for others to join, or invite friends!</p>
                     </div>
                </div>
      <div className='joinable-journeys'>
        {state.joinableJourneys.map(journey => <JoinableJourneyCard key={journey._id+"_"+discriminator++} journey={journey} audioTag={this.audioTag}/>)}
	    </div>
		</div>
    )
  }
}

class JourneyBoardOrientationModal extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     index: 0
    // }
      this.state = {
      streams: [],
          views: INTRO.INTRO_VIEWS,
          index: 0
    }
  };

    onChange = (e) => {
    e.preventDefault();	
    this.setState({
      journeySpaceName: e.target.value,
      error: this.state.error && e.target.value != ''
    });
	e.stopPropagation();	
    }

    left = () => {
	this.handleChangeIndex((this.state.index-1) % this.state.views.length);
    }
    right = () => {
	this.handleChangeIndex((this.state.index+1) % this.state.views.length);	
    }

    handleChangeIndex = index => {
	this.setState(
	    {index: index}
	);
    };

  render() {
      const index = this.state.index;
      return (
	    <div key='xxx' className='intro' style={{position: 'absolute',
			 minHeight: '100%',
			 maxWidth: '100%',
     		         maxHeight: '100%',
	    			   minWidth:  '100%',
				   width: '100%',
			 backgroundColor: 'rgba(74, 170, 221, 1.0)',
			 display: 'flex',
			 flexFlow: 'column nowrap',
			 justifyContent: 'center',
			 zIndex: '1003'
			 }
		       }>
            <a href='#' onClick={this.props.onClose} style={{position: 'absolute', right: '20px', top: '20px', zIndex: 100}}>
          <i className='fa fa-times fa-2x' style={{color: 'white'}}/>
        </a>
	    <div key='encapsulating' style={{
	    		 display: 'flex',
			 flexFlow: 'column nowrap',
			 justifyContent: 'center'
	     }}>
           <SwipeableViews onChangeIndex={this.onChangeIndex} index={this.state.index} enableMouseEvents ref={swipeable => this.swipeable = swipeable}>
             {this.state.views}
           </SwipeableViews>
	      </div>
	    <button  onClick={this.left} style={{visibility: `${(index == 0) ? 'hidden' : 'visible'}`, position: 'absolute', left: '20px', top: '50%', zIndex: 100,  backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px'}}>
	    	    <i className="fa fa-caret-left fa-3x"></i>
	</button>
	    <button onClick={this.right} style={{visibility: `${(index == this.state.views.length-1) ? 'hidden' : 'visible'}`, position: 'absolute', right: '20px', top: '50%', zIndex: 100,  backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px'}}>
	    	    <i className="fa fa-caret-right fa-3x" ></i>
	    </button>
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
	   const myprops = {isPermanentSpace: rest.isPermanentSpace,...renderProps};    
          return (
		  <Component {...myprops} />
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
        <Switch>
          <RouteWithIntro exact path="/login" component={withRouter(Login)} />
          <RouteWithIntro exact path="/" component={view(JourneyBoard)} />
            <RouteWithIntro exact path="/old" component={Home} />
	    <RouteWithIntro exact path="/j/:room" component={JSP.JourneySpace} isPermanentSpace={false} />
            <RouteWithIntro exact path="/:room" component={JSP.JourneySpace} isPermanentSpace={true}  />
        </Switch>
      </div>
    )
  }
}

export default withRouter(view(App));
