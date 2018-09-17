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
import Header from './header';
import Intro from './intro';

import * as someHelper from '../utility/utility'

require('es6-promise').polyfill();
require('isomorphic-fetch');

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
	var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
	const OT = require('@opentok/client');
	window.state = state;
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

// I need to create a new react component here. Possibly this would be releasable on its own.
// The basic idea we need here is a changing piece of text, with bars beneath it to indicate the state.
// Possibly I should develop this component separately, completely outside this project.
// 
 // To be done: We need to define an additional state to represent "the completion of the journey"
// We need to implement the state indicator bar as a series of colors. This should be
// easy with background color and CSS

// We need to implement the 
class JourneyPhases extends Component {

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
      case 'failed':
	return 0;
      case 'started':
      case 'paused':
        return 1;
      case 'completed':
	return 2;
      case 'ended':
	return 2;
      default:
        return 2;
    }
  }
    // Note: setting the backgroudnColor below to orange does not work, but at least gives us a
    // gray that can be seen against the black background
   
  render() {
      const {journey} = this.props;
      const NumPhases = 4;
      const Messages = ["Breathe and center yourself","Journey in Progess","Share your Insights","Provide Feedback"];
    return (
	    <div ref={el => {this.container = el}} className={`journey-timeline step-${this.stepIndex.toString()}`}>
	    <div>
	    <div style={{display: 'flex', flexDirection: 'row' }}>
	    <span>{Messages[this.stepIndex]}</span>

	{
	    (this.stepIndex == 0) &&
                <span className='timer' style={{marginLeft: '10px'}}>{this.props.timer.displayTime()}</span>
	}
	    </div>
	    </div>
	    <div style={{width: 'calc(25vw)',  display: 'flex', flexDirection: 'row' }}>
	    <div className={ `phase-bar bar-${this.stepIndex == 0 ? 'white' : 'green'}`}>
	      </div>
	    <div className={ `phase-bar bar-${this.stepIndex == 1 ? 'white' : 'green'}`}>
	      </div>
	    <div className={ `phase-bar bar-${this.stepIndex == 2 ? 'white' : 'green'}`}>
	      </div>
	    <div className={ `phase-bar bar-${this.stepIndex == 3 ? 'white' : 'green'}`}>
	      </div>
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

/*
function OBSOLETE_ARROW() {
        <div className='arrow' style={{height: `${this.heightForActive}px`, width: `${this.heightForActive}px`, transform: `translateY(${this.positionForCaret}px)`}}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg-triangle" viewBox="0 0 100 100" preserveAspectRatio="none" shapeRendering="geometricPrecision">
            <path d="M 70 50 100 5 100 100 Z"/>
          </svg>
        </div>

}
*/

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
      // I believe this should change the state to completed, but I am not sure
      // if that happens server side or client side
      console.log("skipToNext event fired");
  }

    render() {
	{/*	this.props.journey.state != 'completed' ? */}
	return (
/*	    (true) ?
	    <button style={this.props.style || {}} className='btn btn-primary' onClick={this.skipToNext}><i className='fa fa-step-forward fa-fw'></i></button> :
		<span/>
*/
	    <span className={`fa-stack`} onClick={this.skipToNext}>
	    <i className='fa fa-circle fa-stack-2x' 
	style={{color: 'rgb(75,176,88)'}}
	    ></i>
	    {
            <i className={`fa fa-step-forward fa-stack-1x`}
	     style={{color: 'white'}}></i>
	     }
		 </span>
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
	    <span className={`fa-stack`} onClick={this.toggle}>
	    <i className='fa fa-circle fa-stack-2x' 
	style={{color: 'rgb(75,176,88)'}}
	    ></i>
	    {
            <i className={`fa fa-video-camera fa-stack-1x`}
	     style={{color: 'white'}}></i>
	     }
		 </span>
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
/*	    <button id="microphoneButton" style={this.props.style || {}} onClick={this.toggleMicrophone} className={`btn btn-${this.state.publishing ? 'primary' : 'secondary'}`}> 

	    <i className="fa fa-microphone fa-fw" ></i>
	    </button>
*/	    
	    <span className={`fa-stack`} onClick={this.toggleMicrophone}>
	    <i className='fa fa-circle fa-stack-2x' 
	style={{color: 'rgb(75,176,88)'}}
	    ></i>
	    {
            <i className={`fa fa-microphone fa-stack-1x`}
	     style={{color: 'white'}}></i>
	     }
		 </span>

	
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
	    <span className='fa-stack play-button' onClick={this.togglePlay}>
	    <i className='fa fa-circle fa-stack-2x'
    	      style={{color: 'rgb(55,180,246)'}}
	    ></i>
	    {
            <i className={`fa fa-${state.audioTag.paused ? 'play' : 'pause'} fa-stack-1x`}
	     style={{color: 'white'}}></i>
	     }
		 </span>
    )
  }
}

// This is oddly similar and anti-symmetric to the PlayButton.
class PauseButton extends Component {
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
	    <span className='fa-stack' onClick={this.togglePlay}>
	    <i className='fa fa-circle fa-stack-2x' onClick={this.togglePlay}
	style={{color: 'rgb(75,176,88)'}}
	    ></i>
	    {
            <i className={`fa fa-${state.audioTag.paused ? 'pause' : 'play'} fa-stack-1x`}
	     style={{color: 'white'}}></i>
	     }
		 </span>
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
    e.preventDefault();	
    this.setState({
      journeySpaceName: e.target.value,
      error: this.state.error && e.target.value != ''
    });
	e.stopPropagation();	
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


class OrientationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journeySpaceName: '',
      error: false
    }
  }

    onChange = (e) => {
    e.preventDefault();	
    this.setState({
      journeySpaceName: e.target.value,
      error: this.state.error && e.target.value != ''
    });
	e.stopPropagation();	
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


class UnfilledVideoSquare extends React.Component {
  constructor(props) {
      super(props);
  }
    // TODO: onFlag must be moved here
  render() {
      const vid = this.props.vidid;
      const slength = this.props.streamlength;
      const stream = this.props.stream;
      const session = this.props.session;
      const localkey = this.props.localkey;
      const limit = this.props.limit;
      const state = this.props.state;
      const journey = this.props.journey;
      const sessionId = this.props.sessionId;
      const hasFlagged = (stream) ? !!journey.flags.find(flag => flag.user === sessionId && flag.flagged === stream.id) : false;
      const hide_control = 
      	    !(state.playerState == "waiting" ||
	      state.playerState == "failed");

      return ((slength < limit) ?
	      <div key={localkey} id={vid} className='video-placeholder'>
	      <div className='invite-indicator'>
	      <div style={{visibility: `${hide_control ? 'hidden' : 'visible'}` }}>
              <i className='fa fa-smile-o fa-2x'></i>
              <p style={{color: 'white', maxWidth: '80%', margin: '0 auto', fontSize: '1rem'}}>Waiting...</p>
              <button className='invite-friends-button'  onClick={this.props.onInvite}>Invite Friends
	        </button>
	      </div>
	      </div>
	      </div>
				     :
	      <div key={localkey} id={vid} className='PartnerStream'
	      >
                            <OTSubscriber
                              key={stream.id}
                              session={session}
                              stream={stream}
                              properties={{
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          <div className='journeyspace-stream-controls'>
              <FlagControl currentUserHasFlaggedStream={hasFlagged}
	          onFlag={this.onFlag} stream={stream.id}>
              <i style={{color: hasFlagged ? 'red' : 'white'}}
	          className='fa fa-flag'></i>
                              </FlagControl>
                            </div>
                        </div>
		    ); }	  
}

class NoVideoSquare extends React.Component {
  constructor(props) {
      super(props);
  }    
  render() {
      const localkey = this.props.localkey;
      const vid = this.props.vidid;      
      return (
	      <div key={localkey} id={vid} className='video-placeholder'>
	        <div className='invite-indicator'>
	          <div>
	      <i className='fa fa-smile-o' style={{ visibility: 'hidden'}}></i>
	      
              <p style={{visibility: 'hidden', color: 'white', maxWidth: '80%', margin: '0 auto', fontSize: '0.5rem'}}>Waiting...</p>

              <div style={{color: 'white'}}>
	      {/* I have no idea how to incease the roundness of these corners */}
	  {/*
                      <button className='btn btn-primary' onClick={this.props.onOrientation}
	  style={{margin: '0 auto',  marginTop: '0.5em' }}
 	              >Orientation</button>
	   */}
	            </div>	      	  
  	         </div>
	        </div>
	      </div>
      );
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
	showOrientationModal: false,
      showIntro: true,
    }
    this.publisher = {};
    this.audioTag = {};
  }

	componentDidMount() {
	    state.audioTag.addEventListener('ended', (event) => {
		consoleLog("CHANGING STATE TO ENDED!");
      if (this.publisher && this.publisher.state && this.publisher.state.publisher) {
        this.publisher.state.publisher.publishAudio(true);
      }
      this.setState({
        playerState: 'ended'
      });

		console.log("DOING /completed fetch");
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
      setTimeout(someHelper.setSizes,1000);
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
	    {/*          <div className='journeyspace-content flexiblerow'> */}
		{this.state.session && /* AAA */
          <div className='journeyspace-content'>		 

		{/* tob bar */}
		<div id="topbar_and_header">
		 <Header history={this.props.history} showLeave={true} />

		 
		 <div id="titlebar" className='flexiblerow space-between-added'
		 style={{backgroundColor: 'black', color: 'white'}}>
		 
		   <span style={{color: 'white'}} >{state.journey.name}</span>

                   <JourneyPhases journey={state.journey} timer={this.journeyStateTimer} seekTo={this.seekTo}/>

                    {!state.journey.startAt && (state.journey.state === 'created' || state.journey.state === 'joined' || state.journey.state === 'completed') &&
                    <div style={{padding: '10px'}}>
                      <select style={{width: '100%'}} onChange={this.onChangeJourney} value={state.journeys&& state.journey.journey}>
                        {state.journeys.map(journey => (
                          <option value={journey.filePath}>{journey.name}</option>
                        ))}
                      </select>
                    </div>
                    }
		 {/* we may need to make the Invite Friends button modal by this condition */}
		 {/*
		 {state.journey.startAt && ['joined', 'created'].indexOf(state.journey.state) > -1 && 
                    <div className='journeyspace-meta pr-3 pl-3 pt-3'>
                      <SharePrompt onInvite={this.onInvite}/>
                  </div>
		 }
		  */}

		 </div>

	    </div>

		 {/*
                 {state.journey.state === 'failed' &&
                      <p className='p-3'>Nobody else has joined this Journey Space. 
                        You can either <a href='#' onClick={this.onStartSession}>hit play</a> and take the Journey by
                        yourself of return to the <Link to='/join'>JourneyBoard</Link> to find another Journey Space
                      </p>
                  }
		  */}



		 <div className="flex-squares"> 
			 
		 {/* here we create the two big squares;  */}
		 <div id="bigsquares">

                    <span   key="name">
                      <img id='video-square0' className="journey-image" src={state.journey.image} onClick={this.togglePlayState}/>
                    </span>

		 {/* This is the second square;  */}		 
		 <div id='secondsquare' className='flexiblecol'>

		 <div style={{display: 'flex', flexDirection: 'row'}}>
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
		 
		 <UnfilledVideoSquare vidid='video-square2'
		 limit={1}
		 onInvite={this.onInvite}		 
		 streamlength={this.state.streams.length}
		 stream={this.state.streams[0]}
		 session={this.sessionHelper.session}
		 localkey={local_key_counter_to_avoid_warning++}
		 state={this.state}
		 journey={state.journey}
		 sessionId={state.sessionId}
		 ></UnfilledVideoSquare>
		 </div>

		 {/*

		 {!(this.state.showShareModal || this.state.showOrientationModal ) &&
		  */}
		 <div id='central_control_panel_id'
		 style={{visibility: `${(!(this.state.showShareModal || this.state.showOrientationModal)) ? "visible" : "hidden"}`}}
		 >


			 <VideoButton
			 publisher={this.publisher}/>
			 <AudioButton
			  publisher={this.publisher}/>
		 <PlayButton style={{color: 'rgb(55,180,246)',backgroundColor: 'rgb(75,176,88)', borderRadius: '50%', }}
		 journey={state.journey} player={state.audioTag}/>			 

		 <PauseButton style={{color: 'rgb(55,180,246)',backgroundColor: 'rgb(75,176,88)', borderRadius: '50%', }}
		 journey={state.journey} player={state.audioTag}/>			 
		 
			 <SkipButton style={{color: 'white',backgroundColor: 'rgb(75,176,88)', borderRadius: '50%',  }} journey={state.journey}/>
	         </div>
		 {/*
		    }*/}		 

		 <div style={{display: 'flex', flexDirection: 'row'}}>
		 <UnfilledVideoSquare vidid='video-square3'
		 limit={2}
		 onInvite={this.onInvite}		 
		 streamlength={this.state.streams.length}
		 stream={this.state.streams[1]}
		 session={this.sessionHelper.session}
		  localkey={local_key_counter_to_avoid_warning++}
		 state={this.state}		  
		 ></UnfilledVideoSquare>
		 
		 <NoVideoSquare vidid='video-square4'
		 localkey={local_key_counter_to_avoid_warning++}
		 onOrientation={this.onOrientation}		 		 
		 ></NoVideoSquare>
		 </div>
		 
		 </div>
		 
		 </div>
		 
		 

		 
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
	  {this.state.showOrientationModal &&
	    <OrientationModal force={true} onComplete={this.onCompleteOrientation} onClose={this.onCloseOrientationModal}/>
          }
			</div>		 
		}
	    
			 {/* AAA */}


		    </div>						
	)
	}
}

export default view(JourneySpace);

