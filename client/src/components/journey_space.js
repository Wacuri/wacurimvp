import EventEmitter from 'events';
import React, {Component} from 'react';
import { view } from 'react-easy-state';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import SwipeableViews from 'react-swipeable-views';
import SignaturePad from './signature_pad';
import state from '../state';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {initLayoutContainer} from 'opentok-layout-js';
import './share';
import JourneyStartsIn from './journey_starts_in';

require('es6-promise').polyfill();
require('isomorphic-fetch');

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
	var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
	const OT = require('@opentok/client');
	window.state = state;
}



const setSizes = () => {
    var fs = document.getElementById("flex-squares-main");	
    var w = window.innerWidth;
    var h = window.innerHeight;

    
    var v = Math.max(Math.max(w/4,h/4),Math.min(w/2,h/2));
    v = v * 1.0;
    var s0 = document.getElementById("video-square0");
    var s1 = document.getElementById("video-square1");
    var s2 = document.getElementById("video-square2");
    var s3 = document.getElementById("video-square3");

    s0.style.height = v+"px";
    s1.style.height = v+"px";
    s2.style.height = v+"px";
    s3.style.height = v+"px";

    s0.style.width = v+"px";
    s1.style.width = v+"px";
    s2.style.width = v+"px";
    s3.style.width = v+"px";
}


class AbstractTimerEmitter extends EventEmitter {
  _displayTime(millisec: number) {
    if (millisec < 0) { return '0:00'; }
    const normalizeTime = (time: string): string => (time.length === 1) ? time.padStart(2, '0') : time;

    let seconds: string = (millisec / 1000).toFixed(0);
    let minutes: string = Math.floor(parseInt(seconds) / 60).toString();
    let hours: string = '';

    if (parseInt(minutes) > 59) {
     hours = normalizeTime(Math.floor(parseInt(minutes) / 60).toString());
     minutes = normalizeTime((parseInt(minutes) - (parseInt(hours) * 60)).toString());
    }
    seconds = normalizeTime(Math.floor(parseInt(seconds) % 60).toString());

    if (hours !== '') {
      return `${hours}:${minutes}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
}  

class SecondsTimerEmitter extends AbstractTimerEmitter {
  constructor(createdAt, startAt) {
    super();
    this.start = createdAt.getTime();
    this.total = startAt.getTime() - this.start;
    this.passed = new Date().getTime() - this.start;
    this.interval = setInterval(() => {
      this.passed = new Date().getTime() - this.start;
      if (this.passed >= this.total) {
        clearInterval(this.interval);
      }
      this.emit('tick', this.passed);
    }, 100);
  }

  clear() {
    clearInterval(this.interval);
  }

  displayTime() {
    return this._displayTime(this.total - this.passed);
  }
  
}

class AudioPlayTickEmitter extends AbstractTimerEmitter {
  constructor(audioElement) {
    super();
    this.currentTime = (audioElement.currentTime || 0) * 1000;
    this.total = audioElement.duration * 1000;
    if (audioElement.readyState === 4) {
      audioElement.addEventListener('timeupdate', this.onTimeUpdate);
      this.emit('tick', audioElement.currentTime * 1000);
    }

    audioElement.addEventListener('loadedmetadata', (e) => {
      audioElement.addEventListener('timeupdate', this.onTimeUpdate);
      this.total = e.target.duration * 1000;
      this.emit('tick', audioElement.currentTime * 1000);
    });
  }


  onTimeUpdate = (e) => {
    this.currentTime = e.target.currentTime * 1000;
    this.emit('tick', this.currentTime);
  }

  clear() {
    
  }

  displayTime() {
    return this._displayTime(this.total - this.currentTime);
  }
}

const FlagControl = ({currentUserHasFlaggedStream, stream, onFlag, children}) => {
  return (
    <button 
      className='btn-flag-session'
      disabled={currentUserHasFlaggedStream}
      onClick={(e) => { e.preventDefault(); onFlag(stream); }}>
      {children}  
    </button>
  )
}
class Waiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  componentDidUpdate() {
    if (this.canvas) {
      var signaturePad = new SignaturePad(this.canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: '#666',
        minWidth: 1,
        maxWidth: 10,
      });

      var _this = this;
      function fadeOut() {
        var ctx = _this.canvas.getContext('2d');
        ctx.fillStyle = "rgba(0,0,0,0.01)";
        ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
        setTimeout(fadeOut,100);
      }

      var ctx = _this.canvas.getContext('2d');
      ctx.fillStyle = "rgba(42,42,42,1)";
      ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
      
      fadeOut();
    }
  }

  onToggle = (e) => {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div style={{overflow: 'hidden', position: 'relative'}}>
        {!this.state.open &&
          <div>
            <p>Chill out, draw something:</p>
            <div className='wrapper'>
              <canvas className='signature-pad' ref={el => this.canvas = el} width={400} height={400}/>
            </div>
          </div>
        }
        <div className='waiting' style={{transform: `translateY(${this.state.open ? '0' : '94%'})`, position: `${this.state.open ? 'relative' : 'absolute'}`}}>
          <a className='text-right mr-3' style={{display: 'block', color: 'white'}} href='#' onClick={this.onToggle}>{this.state.open ? 'Close X' : 'Open ^'}</a>
          <div style={{WebkitOverflowScrolling: 'touch', overflowY: 'scroll'}}>
            <iframe height='100%' width='100%' style={{width: '100%', height: '400px', border: 'none'}} src='https://docs.google.com/viewer?url=http://wacuri.herokuapp.com/CuriousLive4-Stage%20Orientation.pdf&embedded=true'/>
          </div>
        </div>
      </div>
    )
  }
}

class JourneyStateProgressBar extends Component {

  constructor(props) {
    super(props);
    props.timer.on('tick', (current) => {
      this.setState({
        timerValue: current
      });
    });
    this.state = {
      timerValue: 0,
      total: props.timer.total,
    }
  }

  componentWillReceiveProps(newProps) {
    newProps.timer.on('tick', (current) => {
      this.setState({
        timerValue: current
      });
    });
  }

  componentWillUnmount() {
    this.props.timer.clear();
  }

  formatState(state: number) {
    switch(this.props.journey.state) {
      case 'joined':
      case 'created':
        return 'Waiting';
      case 'started':
      case 'paused':
        return 'The Journey';
      case 'ended':
        return 'The Sharing';
      case 'failed':
        return 'No one joined';
      default:
        return 'Waiting';
    }
  }

  render() {
    return (
      <div className='journeyspace-progress pl-3 pr-3'>
        <small>Current Section</small>
        <progress max={this.props.timer.total} value={this.state.timerValue} style={{width: '100%'}}></progress>
        <div style={{display: 'flex'}}>
          <p>{this.formatState(this.props.journey.state)}</p>
          <p style={{marginLeft: 'auto'}}>-{this.props.timer.displayTime()}</p>
        </div>
      </div>
    )
  }
}

class JourneyTimeline extends Component {

  constructor(props) {
    super(props);
    props.timer.on('tick', (current) => {
      this.setState({
        timerValue: current
      });
    });
  }

  componentWillReceiveProps(newProps) {
    newProps.timer.on('tick', (current) => {
      this.setState({
        timerValue: current
      });
    });
  }

  get stepIndex() {
    switch(this.props.journey.state) {
      case 'joined':
      case 'created':
        return 0;
      case 'started':
      case 'paused':
        return 1;
      default:
        return 2;
    }
  }

  get positionForCaret() {
    if (!this.container) { return 0; }
    const idx = this.stepIndex;
    const items = this.container.querySelectorAll('li');
    return Array(idx + 1).fill(0).reduce((memo, i, j) => {
      if (j == 0) {
        return 0;
      } else {
        return memo + items[j - 0].offsetHeight;
      }
    }, 0);
  }
  
  get heightForActive() {
    if (!this.container) { return 0; }
    const idx = this.stepIndex;
    const items = this.container.querySelectorAll('li');
    return items[idx].offsetHeight;
  }

  onSeek = (e) => {
    const percent = e.nativeEvent.offsetX / this.progressBar.offsetWidth;
    this.props.seekTo(percent);
  }

    // Note: setting the backgroudnColor below to orange does not work, but at least gives us a
    // gray that can be seen against the black background
  render() {
    const {journey} = this.props;
    return (
	    <div ref={el => {this.container = el}} className={`journey-timeline step-${this.stepIndex.toString()}`}>
	    <div style={{display: 'flex'}}>
        <ul>
          <li key="Prepare" className={journey.state === 'joined' ? 'active' : ''}>
            <h4>Prepare</h4>
            <div style={{display: 'flex'}}>
              <p>Breathe and center yourself</p>
              {journey.state === 'joined' && journey.startAt &&
                <p className='timer' style={{marginLeft: '10px'}}>{this.props.timer.displayTime()}</p>
              }
        </div>
            </li>
	    </ul>
	    <ul>
          <li key="Journey" className={journey.state === 'started' ? 'active' : ''} style={{position: 'relative'}}>
            <h4>Journey</h4>
            <div style={{display: 'flex'}}>
              <p>Listen and imagine</p>
              {(journey.state === 'started' || journey.state === 'paused') &&
                <p className='timer' style={{marginLeft: '10px'}}>{this.props.timer.displayTime()}</p>
              }
              {(journey.state === 'started' || journey.state === 'paused') &&
                <div style={{position: 'absolute', bottom: '-12px', left: '10px', right: '10px'}}>
               <progress ref={(progressBar) => this.progressBar = progressBar} onClick={this.onSeek} max={this.props.timer.total} value={this.props.timer.currentTime} style={{width: '90%',backgroundColor: 'orange'}}></progress>
                </div>
              }
            </div>
            </li>
	    </ul>
	    <ul>
          <li key="Sharing">
            <h4>Sharing</h4>
            <p>Feelings and thoughts</p>
          </li>
			</ul>
			</div>
	</div>			
    )
  }
}

function OBSOLETE_ARROW() {
        <div className='arrow' style={{height: `${this.heightForActive}px`, width: `${this.heightForActive}px`, transform: `translateY(${this.positionForCaret}px)`}}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg-triangle" viewBox="0 0 100 100" preserveAspectRatio="none" shapeRendering="geometricPrecision">
            <path d="M 70 50 100 5 100 100 Z"/>
          </svg>
        </div>

}

class SkipButton extends Component {

  skipToNext = (e) => {
    e.preventDefault();
    fetch(`/api/journeys/${this.props.journey.room}/skip`, {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    });
  }

  render() {
    return (
      this.props.journey.state != 'completed' ? <button style={this.props.style || {}} className='btn btn-primary' onClick={this.skipToNext}><i className='fa fa-forward'></i></button> : <span/>
    )
  }
}

class VideoButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      publishing: true
    }
  }

  toggle = (e) => {
    e.preventDefault();
    const {publisher} = this.props;
    if (publisher && publisher.state && publisher.state.publisher) {
      publisher.state.publisher.publishVideo(!this.state.publishing);
      this.setState({
        publishing: !this.state.publishing
      });
    }
  }

  render() {
    return (
      <button style={this.props.style || {}} onClick={this.toggle} className={`btn btn-${this.state.publishing ? 'primary' : 'secondary'}`}><i className="fa fa-video-camera"></i></button>
    )
  }
}

class AudioButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      publishing: true
    }

    // This binding is necessary to make `this` work in the callback -- ROB IS TRYING THIS  
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

    // NOTE: This seems like a good idea, and it causes no problem on Chrome,
    // but it makes a complete failure on Safari, so I am giving up this feature.
    
  //   componentWillReceiveProps(nextProps) {
  // 	console.log("WillReceiveProps called");
  // 	const {publisher} = nextProps;

  // 	console.log("WillReceiveProps called",publisher);	
  // 	if (publisher && publisher.state && publisher.state.publisher) {

  // 	    // WARNING: Commneting this out is partially working --- it is controlling things in a one-way direction.
  // 	    // the active drop down on the video image is not correctly tied to this on Safari.
  // 	    // Rob believes this is cauising a bug on Safari...
  // 	    // Note that there is a warning on the log in Chrome about an "unmounted componnets".
  //     publisher.state.publisher.on('audioLevelUpdated', (event) => {
  //       if (event.audioLevel === 0) {
  //         this.setState({
  //           publishing: false
  //         });
  //       } else {
  //         this.setState({
  //           publishing: true
  //         });
  //       }
  //     });
  //   }
  // }
    componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
  }
}

    changeToggleValue = () => {
	this.setState((prevState) => {
	    return { publishing: !prevState.publishing};
	})
    };
    
    toggleMicrophone = (e) => {
	const DEBUG_MUTE = 1;	
	e.preventDefault();
      const {publisher} = this.props;
      if (DEBUG_MUTE) {
	  console.log("Initial Publishing State:",this.state.publishing);
	  console.log(publisher,publisher.state,publisher.state.publisher);
      }
	// ON SAFARI, this state is never changing!
	
    if (publisher && publisher.state && publisher.state.publisher) {
	publisher.state.publisher.publishAudio(!this.state.publishing);
	this.changeToggleValue();
    }
      if (DEBUG_MUTE) {
	  console.log("FINAL this.publishing:",this.state.publishing);
	  console.log("FINAL state:",this.state);	  
      }

	// This is absolutely necessary, but insuffient to make it work properly.
	e.stopPropagation();
  }
  

  render() {
    return (
      <button id="microphoneButton" style={this.props.style || {}} onClick={this.toggleMicrophone} className={`btn btn-${this.state.publishing ? 'primary' : 'secondary'}`}><i className="fa fa-microphone"></i></button>
    )
  }
}

class PlayButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paused: (props.player && props.player.paused) || true
    }
      props.player.addEventListener('play', () => {
      this.setState({
        paused: false
      });
    // This binding is necessary to make `this` work in the callback -- ROB IS TRYING THIS  
    this.togglePlay = this.togglePlay.bind(this);
    });

    props.player.addEventListener('pause', () => {
      this.setState({
        paused: true
      });
    });
  }

    togglePlay = (e) => {
    e.preventDefault();
    setTimeout(() => {
      if (state.audioTag.paused) {
        fetch(`/api/journeys/${this.props.journey.room}/start`, {
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
        });
      } else {
        fetch(`/api/journeys/${this.props.journey.room}/pause`, {
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
        });
      }
    }, 20);
  }

  render() {
    return (
      <button id="playbutton_id" style={this.props.style || {}} onClick={this.togglePlay} className={`btn btn-primary`}>
        <i className={`fa fa-${state.audioTag.paused ? 'play' : 'pause'}`}></i>
      </button>
    )
  }
}

class LeaveRoomButton extends Component {

  onLeave = (e) => {
    e.preventDefault();
    if (!state.audioTag.paused) {
      state.audioTag.pause();
    }
    this.props.history.push('/');
  }

  render() {
    return (
      <button onClick={this.onLeave} className='btn btn-primary'>Leave</button>
    )
  }
}


class SharePrompt extends Component {

  render() {
    return (
      <div className='journeyspace-sharePrompt' style={{textAlign: 'center'}}>
        <p style={{fontFamily: 'Playfair Display, serif', fontSize: '25px', lineHeight: 0.8}}>If you would like to invite a friend you can make this a permanent JourneySpace:</p>
        <button className='btn btn-primary' onClick={this.props.onInvite}>Invite Friends</button>
      </div>
    )
  }
}

class InviteModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      journeySpaceName: '',
      error: false
    }
  }

  onChange = (e) => {
    this.setState({
      journeySpaceName: e.target.value,
      error: this.state.error && e.target.value != ''
    });
  }

  onCopy = (e) => {
    e.preventDefault();
    if (this.state.journeySpaceName === '') {
      this.setState({
        error: 'please enter a name'
      });
    } else {
      this.setState({
        error: false
      });
      const name = this.state.journeySpaceName;
      const urlFriendlyName = name.replace(/[^\w]/g, '-').toLowerCase();
      const url = `${window.location.protocol}//${window.location.host}/${urlFriendlyName}`;
      const success = this._copy(url);
      if (success) {
        this.props.onComplete(url, name);
      } else {
        this.setState({
          error: 'failed to copy url'
        });
      }
    }
  }

  _copy(url) {
    // A <span> contains the text to copy
    const span = document.createElement('span');
    span.textContent = url;
    span.style.whiteSpace = 'pre'; // Preserve consecutive spaces and newlines

    // Paint the span outside the viewport
    span.style.position = 'absolute';
    span.style.left = '-9999px';
    span.style.top = '-9999px';

    const win = window;
    const selection = win.getSelection();
    win.document.body.appendChild(span);

    const range = win.document.createRange();
    selection.removeAllRanges();
    range.selectNode(span);
    selection.addRange(range);

    let success = false;
    try {
        success = win.document.execCommand('copy');
    } catch (err) {}

    selection.removeAllRanges();
    span.remove();

    return success;
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(89, 153, 222, 0.9)'}} className='journeyspace-invite'>
        <a href='#' onClick={this.props.onClose} style={{position: 'absolute', right: '20px', top: '20px'}}>
          <i className='fa fa-times' style={{fontSize: '22px', color: 'white'}}/>
        </a>
        <div style={{textAlign: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '0 20px', minWidth: '90%'}}>
          <p style={{fontSize: '26px', lineHeight: 0.8, fontFamily: 'Playfair Display, serif', color: 'white'}}>Share your new permanent CuriousLive Space with Friends</p>
          <input type='text' value={this.state.journeySpaceName} onChange={this.onChange} placeholder='Name Your Space'/>
          {this.state.error && <p className='text-danger'>{this.state.error}</p>}
          <p style={{margin: '10px 0 10px 0'}}>Share Using</p>
          <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
            <li onClick={this.onCopy} style={{width: '90px', height: '90px', margin: '0 auto', cursor: 'pointer'}}>
              <i className='fa fa-link' style={{display: 'flex', background: 'white', height: '70px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontSize: '38px'}}/>
              <p>Copy Link</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}


class JourneySpace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      publisherId: '',
      session: null,
      playerState: 'waiting',
      playerProgress: 0,
      playerProgressMS: 0,
      journeyDuration: 0,
      currentlyActivePublisher: null,
      showShareModal: false,
      showIntro: true,
    }
    this.publisher = {};
    this.audioTag = {};
  }

	componentDidMount() {
    state.audioTag.addEventListener('ended', (event) => {
      if (this.publisher && this.publisher.state && this.publisher.state.publisher) {
        this.publisher.state.publisher.publishAudio(true);
      }
      this.setState({
        playerState: 'ended'
      });

      fetch(`/api/journeys/${this.props.match.params.room}/completed`, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      });

      if (decodeURIComponent(state.audioTag.src) === `${window.location.origin}${state.journey.journey}`) {
        state.audioTag.enqueue(['/chime.mp3', '/sharing.mp3']).then(() => {
          // sharing audio ended
          if (this.publisher && this.publisher.state && this.publisher.state.publisher) {
            this.publisher.state.publisher.publishAudio(true);
          }
        });
        state.audioTag.play();
      }
    });

		fetch(`/api/journeys/${this.props.match.params.room}${window.location.search}`, {credentials: 'include'})
			.then(res => res.json())
			.then(json => {
				state.journey = json;

        state.audioTag.src = state.journey.journey;
        state.audioTag.currentTime = 0;

        this.sessionHelper = createSession({
          apiKey: state.openTokKey,
          sessionId: state.journey.sessionId,
          token: state.journey.token,
          onConnect: () => {
            console.log('assigned connection to publisher', this.sessionHelper.session.connection);
            fetch(`/api/journeys/${this.props.match.params.room}/joined`, {
              body: JSON.stringify({id: this.sessionHelper.session.connection.id}),
              credentials: 'same-origin', // include, same-origin, *omit
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, cors, *same-origin
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer', // *client, no-referrer
            });
          },
          onStreamsUpdated: streams => {
            console.log('Current subscriber streams:', streams);
            this.setState({ streams });
            if (!this.state.currentlyActivePublisher) {
              this.setState({
                currentlyActivePublisher: streams[0]
              });
            }
          }
        });
        this.sessionHelper.session.on("connectionDestroyed", (event) => {
          const data = {
            sessionId: this.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionDestroyed',
          }
          this.refreshSession();
        });
        this.sessionHelper.session.on("connectionCreated", (event) => {
          this.refreshSession();
        });
        this.sessionHelper.session.on('signal', (event) => {
          console.log("Signal sent from connection ", event);
          this.refreshSession();
        });

        this.sessionHelper.session.on("signal:startJourney", (event) => {
          if (this.publisher && this.publisher.state && this.publisher.state.publisher) {
            this.publisher.state.publisher.publishAudio(false);
          }
          const playPromise = state.audioTag.play();
          if (playPromise !== undefined) {
            playPromise
            .then(() => {
              console.log('audio promise resolve');
            })
            // Safety first!
            .catch(e => {
              console.error(e);
            });
          }
          this.setState({
            playerState: 'playing'
          });
        });

        this.sessionHelper.session.on("signal:pauseJourney", (event) => {
          if (this.publisher && this.publisher.state && this.publisher.state.publisher) {
            this.publisher.state.publisher.publishAudio(true);
          }
          state.audioTag.pause();
          this.setState({
            playerState: 'paused'
          });
        });

        this.sessionHelper.session.on("signal:journeyUpdated", (event) => {
          const journey = JSON.parse(event.data);
          state.journey = journey;

          if (state.journey.state != 'completed') {
            // if we are in completed state, then audio may be playing the sharing prompt
            state.audioTag.src = state.journey.journey;
            state.audioTag.currentTime = 0;
          }

          if (state.journey.state === 'started') {

            if (this.publisher && this.publisher.state && this.publisher.state.publisher) {
              this.publisher.state.publisher.publishAudio(false);
            }
            state.audioTag.play();
            this.setState({
              playerState: 'playing'
            });
          }
        });
        

        this.sessionHelper.session.on("signal:fail", (event) => {
          state.journey.state = 'failed';
        });


        this.setState({
          session: this.sessionHelper.session
        });

        const onAudioCanPlay = (event) => { 
          if (state.journey.state === 'started') {
            state.audioTag.play();
            if (!isNaN(state.journey.currentTime)) {
              state.audioTag.currentTime = state.journey.currentTime;
            }
          }
          state.audioTag.removeEventListener('canplaythrough', onAudioCanPlay);
        }

        state.audioTag.addEventListener('canplaythrough', onAudioCanPlay, false);
        state.audioTag.load();
			});
    fetch('/api/journeys')
      .then(res => res.json())
      .then(json => {
        state.journeys = json;
      });
	}

  componentWillUnmount() {
    if (this.sessionHelper) {
      this.sessionHelper.disconnect();
    }
  }

  refreshSession = () => {
		fetch(`/api/journeys/${this.props.match.params.room}`, {credentials: 'include'})
			.then(res => res.json())
			.then(json => {
				state.journey = json;
			});
      setTimeout(setSizes,1000);
  }

  get timeRemaining() {
    const seconds = this.state.journeyDuration - this.state.playerProgressMS;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(0);
    return minutes + ":" + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  }

  get isHostUser() {
    const currentParticipant = this.state.session && this.state.session.connection && state.journey && state.journey.participants.find(participant => participant.connectionId === this.state.session.connection.id);
    return currentParticipant && state.journey.participants.indexOf(currentParticipant) === 0
  }

  get journeyStateTimer() {
    switch(state.journey.state) {
      case 'started':
      case 'paused':
        if (!this.playerTimeEmitter) {
          this.playerTimeEmitter = new AudioPlayTickEmitter(state.audioTag);
        }
        return this.playerTimeEmitter;
      default:
        if (!this.secondsEmitter) {
          this.secondsEmitter = new SecondsTimerEmitter(new Date(state.journey.createdAt), new Date(state.journey.startAt));
        }
        return this.secondsEmitter;
    }
  }

  onInitPublisher = () => {
    console.log('initialized publisher');
  }

  onConfirmReady = (e) => {
    fetch(`/api/journeys/${this.props.match.params.room}/connections/${this.sessionHelper.session.connection.id}/ready`);
  }

  onChangeJourney = (e) => {
    fetch(`/api/journeys/${this.props.match.params.room}/journey`, {
      body: JSON.stringify({journey: e.target.value}), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    });
  }

  onStartSession = (e) => {
    fetch(`/api/journeys/${this.props.match.params.room}/start`, {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
    });
  }

  onLoadedMetadata = (e) => {
    this.setState({
      journeyDuration: e.target.duration
    });
    state.audioTag.removeEventListener('timeupdate', this.onTimeUpdate);
    state.audioTag.addEventListener('timeupdate', this.onTimeUpdate);
  }

  onTimeUpdate = (e) => {
    this.setState({
      playerProgress: (e.target.currentTime / e.target.duration) * 100,
      playerProgressMS: e.target.currentTime,
    });
    if (this.isHostUser) {
      fetch(`/api/journeys/${this.props.match.params.room}/progress`, {
        body: JSON.stringify({currentTime: e.target.currentTime}),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'PUT',
        mode: 'cors',
      });
    }
  }

  onFlag = (stream) => {
    fetch(`/api/journeys/${this.props.match.params.room}/flag`, {
      cache: 'no-cache',
      body: JSON.stringify({connectionId: this.state.session.connection.id, stream}),
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
    })
      .then(res => res.json())
      .then(json => state.journey = json);
  }

  onShare = (e) => {
    navigator.share({
      title: 'Take a Journey With Me!',
      text: `Join me on ${state.journey.name}`,
      url: `${window.location.protocol}//${window.location.host}/${state.journey.room}`,
    });
  }

  onInvite = (e) => {
    e.preventDefault();
    this.setState({
      showShareModal: true
    });
  }

  onCloseShareModal = (e) => {
    e.preventDefault();
    this.setState({
      showShareModal: false
    });
  }

  onCompleteShare = (url, name) => {
    this.setState({
      showShareModal: false
    });
    window.location = url + `?journey=${state.journey.name}&name=${name}`;
  }

  seekTo = (percent) => {
    state.audioTag.currentTime = state.audioTag.duration * percent;
    state.audioTag.play();
  }

    togglePlayState = (e) => {
    e.preventDefault();
    setTimeout(() => {
      if (state.audioTag.paused) {
        fetch(`/api/journeys/${state.journey.room}/start`, {
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
        });
      } else {
        fetch(`/api/journeys/${state.journey.room}/pause`, {
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
        });
      }
    }, 20);
  }

	render() {
	    const currentParticipant = this.state.session && this.state.session.connection && state.journey && state.journey.participants.find(participant => participant.connectionId === this.state.session.connection.id);
	    var local_key_counter_to_avoid_warning = 0;	    
	    let currentUserHasFlaggedJourney = state.journey && state.journey.flags.map(flag => flag.user).indexOf(state.sessionId) > -1;
	    var stream0 = this.state.streams[0];
		return (
			<div className='journeyspace' style={{position: 'relative'}}>

          <div className='journeyspace-content flexiblerow'>
			{this.state.session &&
			 <div>
			 <div className='flexiblerow' style={{backgroundColor: 'black', color: 'white'}}>
                  
                  {state.journey.state === 'joined' && state.journey.startAt && <JourneyStartsIn journey={state.journey} timer={this.journeyStateTimer}/> }

                  {!state.journey.startAt && (state.journey.state === 'created' || state.journey.state === 'joined' || state.journey.state === 'completed') &&
                    <div style={{padding: '10px'}}>
                      <select style={{width: '100%'}} onChange={this.onChangeJourney} value={state.journeys&& state.journey.journey}>
                        {state.journeys.map(journey => (
                          <option value={journey.filePath}>{journey.name}</option>
                        ))}
                      </select>
                    </div>
                  }

			 <div style={{display: 'flex'}} className='flexiblerow'>
			 
                  <div style={{display: 'flex', padding: '10px 10px 0'}}>
                    <PlayButton journey={state.journey} player={state.audioTag}/>
                    { false &&
                      <SkipButton style={{marginLeft: 'auto'}} journey={state.journey}/>
                    }
                  </div>
                  <div style={{display: 'flex', padding: '10px 10px 0 10px'}}>
                    <VideoButton publisher={this.publisher}/>
                    <AudioButton style={{marginLeft: '10px'}} publisher={this.publisher}/>
                  </div>
                  <div style={{padding: '10px'}}>
                    <LeaveRoomButton history={this.props.history}/>
			 </div>
			 </div>
			 
                  <JourneyTimeline journey={state.journey} timer={this.journeyStateTimer} seekTo={this.seekTo}/>

                  <div className='journeyspace-meta pr-3 pl-3 pt-3'>
                    {state.journey.startAt && ['joined', 'created'].indexOf(state.journey.state) > -1 && <SharePrompt onInvite={this.onInvite}/>}
                  </div>
                  
                  {state.journey.state === 'failed' &&
                      <p className='p-3'>Nobody else has joined this Journey Space. 
                        You can either <a href='#' onClick={this.onStartSession}>hit play</a> and take the Journey by
                        yourself of return to the <Link to='/join'>JourneyBoard</Link> to find another Journey Space
                      </p>
                  }

			 </div>


			 <div className="flex-squares"> 
                    <span   key="name" >
                      <img id='video-square0' className="journey-image" src={state.journey.image} onClick={this.togglePlayState}/>
                      <h2 style={{flex: 5}} className='journeyspace-title'>{state.journey.name}</h2>

                    </span>
			 

			 <span key="stream" id='video-square1' className='journeyspace-stream journeyspace-me'>
                        <OTPublisher 
                          session={this.sessionHelper.session}
                          onInit={this.onInitPublisher}
                         ref={publisher => {this.publisher = publisher}}
                              properties={{
                                width: '100%',
                                height: '100%',
                              }}
                        />
			 </span>

			 

			 { (() => { 
			     return ((this.state.streams.length < 1) ?
				 <li key={local_key_counter_to_avoid_warning++} id='video-square2' className='video-placeholder'>
                        <div>
                          <i className='fa fa-user'></i>
                          <p style={{maxWidth: '80%', margin: '0 auto'}}>placeholder for journeyer not present</p>
                        </div>
				     </li>
				     :
				 <li key={0} id='video-square2' className={`journeyspace-stream ${this.state.currentlyActivePublisher ? 'journeyspace-active-stream' : ''}`}>
				 <p>hello</p>
                            <OTSubscriber
                              key={this.state.streams[0].id}
                              session={this.sessionHelper.session}
                              stream={this.state.streams[0]}
                              properties={{
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          <div className='journeyspace-stream-controls'>
                              <FlagControl currentUserHasFlaggedStream={hasFlagged} onFlag={this.onFlag} stream={stream.id}>
                                <i style={{color: hasFlagged ? 'red' : 'white'}} className='fa fa-flag'></i>
                              </FlagControl>
                            </div>
                        </li>
				    ); })()
			 }
			 { (() => { 
			     return ((this.state.streams.length < 2) ?
				 <li key={local_key_counter_to_avoid_warning++} id='video-square3' className='video-placeholder'>
                        <div>
                          <i className='fa fa-user'></i>
                          <p style={{maxWidth: '80%', margin: '0 auto'}}>placeholder for journeyer not present</p>
                        </div>
				     </li>
				     :
				 <li key={1} id='video-square3' className={`journeyspace-stream ${this.state.currentlyActivePublisher ? 'journeyspace-active-stream' : ''}`}>
				 <p>hello</p>
                            <OTSubscriber
                              key={this.state.streams[1].id}
                              session={this.sessionHelper.session}
                              stream={this.state.streams[1]}
                              properties={{
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          <div className='journeyspace-stream-controls'>
                              <FlagControl currentUserHasFlaggedStream={hasFlagged} onFlag={this.onFlag} stream={stream.id}>
                                <i style={{color: hasFlagged ? 'red' : 'white'}} className='fa fa-flag'></i>
                              </FlagControl>
                            </div>
                        </li>
				    ); })()
			 }
			 </div>
          <div className='journeyspace-footer' style={{display: 'flex'}}>
            <div style={{flex: 1}}>
            </div>
            <div style={{marginLeft: 'auto', marginRight: '10px', alignSelf: 'center'}}>
            </div>
          </div>
          {this.state.showShareModal &&
            <InviteModal journey={this.state.session} onComplete={this.onCompleteShare} onClose={this.onCloseShareModal}/>
          }
		    </div>
		}			
			</div>
		    </div>						
	)
	}
}

export default view(JourneySpace);


		      // 	 <div className='col-5 col-lg-5'>
		      // 	 // The first participant
		      // 	 {() => {
                      // const participant = state.journey.participants.find(participant => participant.connectionId === stream0.connection.id);
		      // 	const hasFlagged = !!state.journey.flags.find(flag => flag.user === state.sessionId && flag.flagged === stream0.id);
                      // return (
                      //         <li key={0} className={`journeyspace-stream ${this.state.currentlyActivePublisher ? 'journeyspace-active-stream' : ''}`}>
                      //       <OTSubscriber
                      //         key={stream0.id}
                      //         session={this.sessionHelper.session}
                      //         stream={stream0}
                      //         properties={{
                      //           width: '100%',
                      //           height: '100%',
                      //         }}
                      //       />
                      //       <div className='journeyspace-stream-controls'>
                      //         <FlagControl currentUserHasFlaggedStream={hasFlagged} onFlag={this.onFlag} stream={stream.id}>
                      //           <i style={{color: hasFlagged ? 'red' : 'white'}} className='fa fa-flag'></i>
                      //         </FlagControl>
                      //       </div>
                      //   </li>
                      // );
		      // 	 }}
		      // 	 </div>
	// <div className='row no-gutters'>			 
        //         <div className='col-12 col-lg-12'>
        //           <ul className='journeyspace-streams' style={{margin: 0}}>

        //             {this.state.streams.map(stream => {
        //               const participant = state.journey.participants.find(participant => participant.connectionId === stream.connection.id);
	// 		const hasFlagged = !!state.journey.flags.find(flag => flag.user === state.sessionId && flag.flagged === stream.id);
	// 		var streamcnt = 0;
        //               return (
        //                       <li key={streamcnt++} className={`journeyspace-stream ${this.state.currentlyActivePublisher ? 'journeyspace-active-stream' : ''}`}>
        //                     <OTSubscriber
        //                       key={stream.id}
        //                       session={this.sessionHelper.session}
        //                       stream={stream}
        //                       properties={{
        //                         width: '100%',
        //                         height: '100%',
        //                       }}
        //                     />
        //                     <div className='journeyspace-stream-controls'>
        //                       <FlagControl currentUserHasFlaggedStream={hasFlagged} onFlag={this.onFlag} stream={stream.id}>
        //                         <i style={{color: hasFlagged ? 'red' : 'white'}} className='fa fa-flag'></i>
        //                       </FlagControl>
        //                     </div>
        //                 </li>
        //               );
        //             })}
                    
        //      {	 Array(2 - this.state.streams.length).fill({}).map(empty => (
        //              <li key={local_key_counter_to_avoid_warning++} className='video-placeholder'>
        //                 <div>
        //                   <i className='fa fa-user'></i>
        //                   <p style={{maxWidth: '80%', margin: '0 auto'}}>placeholder for journeyer not present</p>
        //                 </div>
        //               </li>
        //             ))}
        //           </ul>

        //     }
        //      </div>
	//      </div>          




		    // 	 <div className='row no-gutters'>
		    // 	 <div className='col-6 col-lg-6'>
                    // <div key="name" id='video-square0'>
                    //   <img style={{width: '100%'}} src={state.journey.image} onClick={this.togglePlayState}/>
                    //   <h2 style={{flex: 5}} className='journeyspace-title'>{state.journey.name}</h2>

                    // </div>
		    // 	 </div>
			 
 		    // 	 <div className='col-6 col-lg-6'>
		    // 	 <ul className='journeyspace-streams' style={{margin: 0}}>
		    // 	 <li key="stream" id='video-square1' className='journeyspace-stream journeyspace-me'>
                    //     <OTPublisher 
                    //       properties={{width: '100%', height: '100%'}}
                    //       session={this.sessionHelper.session}
                    //       onInit={this.onInitPublisher}
                    //       ref={publisher => {this.publisher = publisher}}
                    //     />
		    // 	 </li>
		    // 	 </ul>
		    // 	 </div>
		    // 	 </div>
		    // 	 <div className='row no-gutters'>
		    // 	 <div className='col-6 col-lg-6'>
		    // 	 { (() => { 
		    // 	     return ((this.state.streams.length < 1) ?
		    // 		 <li key={local_key_counter_to_avoid_warning++} id='video-square2' className='video-placeholder'>
                    //     <div>
                    //       <i className='fa fa-user'></i>
                    //       <p style={{maxWidth: '80%', margin: '0 auto'}}>placeholder for journeyer not present</p>
                    //     </div>
		    // 		     </li>
		    // 		     :
		    // 		 <li key={0} id='video-square2' className={`journeyspace-stream ${this.state.currentlyActivePublisher ? 'journeyspace-active-stream' : ''}`}>
		    // 		 <p>hello</p>
                    //         <OTSubscriber
                    //           key={this.state.streams[0].id}
                    //           session={this.sessionHelper.session}
                    //           stream={this.state.streams[0]}
                    //           properties={{
                    //             width: '100%',
                    //             height: '100%',
                    //           }}
                    //         />
                    //       <div className='journeyspace-stream-controls'>
                    //           <FlagControl currentUserHasFlaggedStream={hasFlagged} onFlag={this.onFlag} stream={stream.id}>
                    //             <i style={{color: hasFlagged ? 'red' : 'white'}} className='fa fa-flag'></i>
                    //           </FlagControl>
                    //         </div>
                    //     </li>
		    // 		    ); })()
		    // 	 }
		    // 	 </div>
		    // 	 <div className='col-6 col-lg-6'>
		    // 	 { (() => { 
		    // 	     return ((this.state.streams.length < 2) ?
		    // 		 <li key={local_key_counter_to_avoid_warning++} id='video-square3' className='video-placeholder'>
                    //     <div>
                    //       <i className='fa fa-user'></i>
                    //       <p style={{maxWidth: '80%', margin: '0 auto'}}>placeholder for journeyer not present</p>
                    //     </div>
		    // 		     </li>
		    // 		     :
		    // 		 <li key={1} id='video-square3' className={`journeyspace-stream ${this.state.currentlyActivePublisher ? 'journeyspace-active-stream' : ''}`}>
		    // 		 <p>hello</p>
                    //         <OTSubscriber
                    //           key={this.state.streams[1].id}
                    //           session={this.sessionHelper.session}
                    //           stream={this.state.streams[1]}
                    //           properties={{
                    //             width: '100%',
                    //             height: '100%',
                    //           }}
                    //         />
                    //       <div className='journeyspace-stream-controls'>
                    //           <FlagControl currentUserHasFlaggedStream={hasFlagged} onFlag={this.onFlag} stream={stream.id}>
                    //             <i style={{color: hasFlagged ? 'red' : 'white'}} className='fa fa-flag'></i>
                    //           </FlagControl>
                    //         </div>
                    //     </li>
		    // 		    ); })()
		    // 	 }
		    // 	 </div>
		    // 	 </div>
