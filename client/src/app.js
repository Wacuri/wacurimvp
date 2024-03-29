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
import * as queryStringX from 'query-string';




import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
const VirtualizeSwipeableViews = virtualize(SwipeableViews);



import journeyboardbannerimage from 'file-loader!isomorphic-loader!../res/images/JourneyBoardWoman-Phone.jpg';

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};


// Note: it may be worth using serve favicon to make this work on our deployed site: https://expressjs.com/en/resources/middleware/serve-favicon.html


const MAX_PARTICIPANTS = 3;

const spot_index = (l) => {
    return Math.max(0,Math.min(MAX_PARTICIPANTS,MAX_PARTICIPANTS-l));
}

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
      const queryparam = (this.props.skipOn ? "?" + "skipon=true" : "");
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
              <span className='spotnumber' key="msg">{spot_index(journey.participants.length)} </span>
              <span> spot{spot_index(journey.participants.length) > 1 ? 's' : ''} available: </span>
	      <img src={image_name} />
            </div>

	    {/* here "j" is inserted as a convenient means of marking this entry as a Journeyboard space rather than a permanent one */}
            <Link to={`/j/${journey.room}${queryparam}`} className='btn btn-primary'>{currentUserHasRSVP ? 'Go there now' : 'Join'}</Link>
              </div> 
              </div>

    )
  }
}

// https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}



class JourneyBoard extends Component {
  constructor(props) {
      super(props);
      this.state = {
	  showOrientationModal: false,
          joinableJourneys: []
      }
  }

    onOrientation = (e) => {
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

              // TODO: I know we should remove it, but I am confused.
              if (journey.participants >= MAX_PARTICIPANTS) {
                  state.joinableJourneys = [...state.joinableJourneys.slice(0, idx), journey, ...state.joinableJourneys.slice(idx + 1)];
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
          // This only makes sense if we are on the journeyBoard page;
          // I am not sure how to tell that. If this is mounted, perhaps?
          this.interval = setInterval(() => {
              this.setState({
                  joinableJourneys: 
                  state.joinableJourneys.filter(
                      journey =>
                          ((journey.participants.length < MAX_PARTICIPANTS) &&
                           (Date.parse(journey.startAt) > Date.parse(new Date())))
                  )
              });
          }, 1000);
      });


    // fetch currently active journeys
    fetch('/api/active_journeys')
      .then(res => res.json())
          .then(json => {
              // This may need to be sourted by expiration time...
              state.joinableJourneys = json;
//              console.log("joinableJourneys setstate over active");
      });
  }
    
      // When we are not rendering this component, there is no need to check for expirations.
      componentWillUnmount() {
          clearInterval(this.interval);
      };

    render() {
	// Note, if this key is ever read and treated as a id, then we will have a terrible problem.
	// I want to remove the warnings I am getting, but this is a dangerous way to do it.
	// Possibly I should deal with this in a different way.
	var discriminator = 0;

        // As an experiment, we will sort by number of participants.
        // this.state.joinableJourneys = this.state.joinableJourneys.sort( (a,b) => (Date.parse(a.startAt) < Date.parse(b.startAt)));
        this.state.joinableJourneys.sort(
            (a,b) =>
                {
                    if (a.participants.length > b.participants.length)
                        return -1;
                    if ((a.participants.length == b.participants.length) && (Date.parse(a.startAt) < Date.parse(b.startAt)))
                        return -1;
                    // This should not happen!!
                    if ((a.participants.length == b.participants.length) && (Date.parse(a.startAt) == Date.parse(b.startAt)))
                        return 0;
                    return 1;
                });

        var JAP = this.state.joinableJourneys.filter(j => (j.participants.length > 0));
        JAP = uniqBy(JAP,(j => j.name));
        
        var JA = this.state.joinableJourneys.filter(j => (j.participants.length == 0));
        var firstlen = JA.length;
        JA = uniqBy(JA,(j => j.name));
        var secondlen = JA.length;
        if (firstlen != secondlen) {
        }

       const CardArrayParticipants =  JAP.map(journey => {
            if (journey.participants.length > 0) {
                    if (Date.parse(journey.startAt) > Date.parse(new Date())) {
                        return ( <JoinableJourneyCard key={journey._id+"_"+discriminator++}
                                 journey={journey} audioTag={this.audioTag} skipOn={this.props.skipOn}/>);
                    } else {
                        return (null)
                    }
            } else {
                return (null)
            }
        });
        
        const CardArray =  JA.map(journey => {
            if (journey.participants.length == 0) {            
                if (Date.parse(journey.startAt) > Date.parse(new Date())) {
                        return ( <JoinableJourneyCard key={journey._id+"_"+discriminator++}
                                 journey={journey} audioTag={this.audioTag} skipOn={this.props.skipOn}/>);
                    } else {
                        return (null)
                    }
            } else {
                return (null)
            }
        });
        
	return (
		<div>
		 {this.state.showOrientationModal &&
                  //		  <JourneyBoardOrientationModal force={true} onComplete={this.onCompleteOrientation} onClose={this.onCloseOrientationModal} />
		  <INTRO.IntroBig force={true} onComplete={this.onCompleteOrientation} onClose={this.onCloseOrientationModal} />                  
		 }
		<LTB.JourneyBoardBar history={this.props.history} showLeave={false} showOrientation={true}
	    onOrientation={this.onOrientation}
            skipOn={this.props.skipOn}
		/>

                <div className="main-banner" style={{backgroundImage: `url(${journeyboardbannerimage})`}}>
                     <div  className="container">
		          <h1>The CuriousLive JourneyBoard</h1>
					<p>Welcome to the CuriousLive JourneyBoard "Wake Up Curious" … It's the five-minute mental day spa everybody's talking about.</p>
					<p>Select a journey to begin whenever you are ready.<br/>Wait for others to join, or invite friends!</p>
                     </div>
                </div>
                {/* Here we will draw those with participants first, separated from those without. This creates an unneeded space.*/}
            {
               (CardArrayParticipants.length > 0) &&
              <div className='joinable-journeys'>
              { CardArrayParticipants}
              <p> </p>              
	      </div>
            }
            {
            <div className='joinable-journeys'>
                    { CardArray}
	        </div>
            }

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
        <INTRO.IntroBig onClose={this.onClose} {...this.props}>
          <this.props.component {...this.props}/>
        </INTRO.IntroBig>
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
           console.log(renderProps);
          return (
            <IntroWrapper component={Component} {...renderProps}/>
          )
        }}/>
      }

      {!showIntro &&
       <Route {...rest} render={renderProps => {

	   const myprops = {isPermanentSpace: rest.isPermanentSpace,skipOn: rest.skipOn,...renderProps};
           console.log("My Props",myprops);           
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
        const parsed = queryStringX.parse(this.props.location.search);
        var skipon = (parsed.skipon == "true");
    return (
      <div>
        <Switch>
          <RouteWithIntro exact path="/login" component={withRouter(Login)} />
          <RouteWithIntro exact path="/" component={view(JourneyBoard)} skipOn={skipon}/>
            <RouteWithIntro exact path="/old" component={Home} />
	    <RouteWithIntro exact path="/j/:room" component={JSP.JourneySpace} isPermanentSpace={false} skipOn={skipon}/>
            <RouteWithIntro exact path="/:room" component={JSP.JourneySpace} isPermanentSpace={true}  skipOn={skipon}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(view(App));
