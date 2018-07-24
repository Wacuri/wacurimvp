import React, {Component} from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import SwipeableViews from 'react-swipeable-views';
import Cookie from 'js-cookie';
import state from '../state';
import JourneyStartsIn from './journey_starts_in';

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
	var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
	const OT = require('@opentok/client');
	window.state = state;
}

class Intro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      views: [
        <div className='intro-screen'>
          <h3>1. Welcome to CuriousLive&hellip; A five-minute guided journey &ndash; plus sharing &ndash; with others.</h3>
          <p>
            You are now in the JourneySpace and the
            journey will begin shortly when the timer
            above elapses and you hear the chime.
          </p>
          <p>
            If more spots are available for this journey,
            we invite you to invite a friend to two… use
            the INVITE FRIENDS button.
          </p>
          <p>
            Then we’ll mute your microphones and for
            five minutes and you’ll hear your Journey
            Guide taking you on the journey.
          </p>
          <p>
            The goal is relaxation and joy, so settle in
            by breathing slowly and deeply and adjust
            your posture to be comfortable.
          </p>
        </div>,

        <div className='intro-screen'>
          <h3>2. Next comes the Journey&hellip;</h3>
          <p>
            The CuriousLive&trade; experience is
            intentionally short so busy people can find
            the time to do it regularly. That's when you
            get the real benefits.
          </p>
          <p>
            CuriousLive Journeys are captured Live
            and Unplugged, never scripted. Your
            Journey Guide will help you relax into the
            JourneySpace and go deep into the Journey.
          </p>
          <p>
            Your microphone will be automatically
            muted.
            <br/>
            Some people like to leave their cameras on
            during the journey to increase the feeling
            of a shared experience. It is up to you.
          </p>
        </div>,

        <div className='intro-screen'>
          <h3>3. After the Journey comes the Sharing and Connecting.</h3>
          <p>
            Now you’ll have the opportunity to briefly
            share with others your insights and
            experience. Each person takes 1 or 2
            minutes.
          </p>
          <p>
            When you’re ready, click on the “Share”
            button to start your Share. Go deep. Drop
            in to your insights and intuitions and o!er
            the others something special about your
            experience.
          </p>
          <p>
            And when others are sharing, please listen
            deeply, and in turn they will listen more
            deeply to you.
          </p>
        </div>,

        <div className='intro-screen'>
          <h3>4. How was your experience? We Love Feedback from Our Community.</h3>
          <p>
            We welcome your feedback about the
            process and the Wacuri Method even
            after the group experience. Please take
            a moment to rate your experience and
            give us your valuable feedback.
          </p>
        </div>
      
      ],
      index: 0
    }
  }

  goTo = (index) => {
    this.setState({
      index: index
    });
  }

  onChangeIndex = (index, last, {reason}) => {
    this.setState({
      index: index
    });
  }

  onSkip = (e) => {
    e.preventDefault();
    this.props.onClose();
  }

  componentDidMount() {
    Cookie.set('saw intro', true, {expires: 365});

		fetch(`/api/journeys/${this.props.match.params.room}${window.location.search}`, {credentials: 'include'})
			.then(res => res.json())
			.then(json => {
				state.session = json;
        this.sessionHelper = createSession({
          apiKey: state.openTokKey,
          sessionId: state.session.sessionId,
          token: state.session.token,
          onConnect: () => {
          },
          onStreamsUpdated: streams => {
            this.setState({ streams });
          }
        });
      });
  }

  get journeySpaceOwnerVideoStream() {
    if (state.session) {
      const owner = state.session.owner;
      const participant = state.session.participants.find(p => p.user === owner);
      if (state.sessionId === owner) {
        return null;
      } else {
        const stream = this.state.streams.find(s => s.connection.id === participant.connectionId);
        return stream;
      }
    }
    return null;
  }

  render() {
    return (
      <div className='intro-wrapper'>
        <div className='intro' style={{minHeight: 'calc(100vh - 46px)', position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(81, 148, 220)', padding: '20px'}}>
          {state.session &&
            <div>
              <div style={{display: 'flex', alignItems: 'baseline'}}>
                <h2 style={{margin: 0}}>{state.session.name}</h2>
                <div style={{marginLeft: 'auto', display: 'flex'}}>
                  <JourneyStartsIn journey={this.props.journey} timer={this.props.timer}/>
                </div>
              </div>
              
              <div style={{justifyContent: 'center', display: 'flex'}}>
                <img style={{height: '150px'}} src={state.session.image}/>
                {this.sessionHelper && this.journeySpaceOwnerVideoStream && 
                  <OTSubscriber
                    session={this.sessionHelper.session}
                    stream={this.journeySpaceOwnerVideoStream}
                    properties={{
                      width: '150px',
                      height: '150px',
                    }}
                  />
                }
              </div>
            </div>
          }
          
          <SwipeableViews onChangeIndex={this.onChangeIndex} index={this.state.index} enableMouseEvents ref={swipeable => this.swipeable = swipeable}>
            {this.state.views}
          </SwipeableViews>
          <ul className='dots' style={{alignSelf: 'center', listStyle: 'none', padding: 0, margin: 'auto 0 0 0', display: 'flex'}}>
            {this.state.views.map((view, i) => (
              <li style={{marginRight: '10px', cursor: 'pointer'}} onClick={() => this.goTo(i)} className={this.state.index === i ? 'active' : ''}><span className='dot'></span></li>
            ))}
          </ul>
          <a href='#' className='intro-skip' onClick={this.onSkip}>{this.state.index === this.state.views.length - 1 ? 'Begin Journey!' : 'skip'}</a>
        </div>
        <div className='intro-next'>
          {this.props.children}
        </div>
      </div>
    )
      
  }

}

export default view(Intro);
