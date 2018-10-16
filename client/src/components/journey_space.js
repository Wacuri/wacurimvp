// journey_space.js -- The main page where the Curious Live Journeys are experienced.
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

import EventEmitter from 'events';
import React, {Component} from 'react';
import { view } from 'react-easy-state';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
const VirtualizeSwipeableViews = virtualize(SwipeableViews);

// import SignaturePad from './signature_pad';
import state from '../state';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {initLayoutContainer} from 'opentok-layout-js';
import './share';
import JourneyStartsIn from './journey_starts_in';
import * as LTB from './header';
import Intro from './intro';

// This may not be the right way to do this
// var Rating = require('react-rating');
import Rating from 'react-rating';

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





function stepIndexAux(s) {
    switch(s) {
      case 'joined':
      case 'created':
        return 0;
      case 'failed':
	return 3;
      case 'started':
      case 'paused':
        return 1;
      case 'completed':
	return 2;
      case 'ended':
	return 2;
    case 'playing':
	return 1;
    case 'paused':
	return 1;
      default:
        return 2;
    }
}

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
       return stepIndexAux(this.props.journey.state);
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
	    <div style={{display: 'flex', flexDirection: 'row-reverse',  alignItems: 'flex-end' }}>
	    <span >

	{ (((state.journey.startAt &&
	     (this.stepIndex == 0))) || (this.stepIndex == 1) ) &&
                <span className='timer' style={{marginLeft: '10px'}}>{this.props.timer.displayTime()}</span>
	}
	    <span>{Messages[this.stepIndex]}</span>
	</span>
	    </div>
	    </div>
	</div>			
    )
  }
}

class PhaseIndicator extends Component {
  constructor(props) {
    super(props);
  }
    get stepIndex() {
       return stepIndexAux(this.props.journey.state);	
    }
    // Note: setting the backgroudnColor below to orange does not work, but at least gives us a
    // gray that can be seen against the black background
   
  render() {
      const {journey} = this.props;
      const NumPhases = 4;
      const Messages = ["Breathe and center yourself","Journey in Progess","Share your Insights","Provide Feedback"];
      console.log("PHASE INDICATOR RENDERED");
    return (
	    <div id={'phase-bar0'}>
	    <div className={ `phase-bar bar-${this.stepIndex == 0 ? 'white' : 'green'}`}>
	      </div>
	    <div className={ `phase-bar bar-${this.stepIndex == 1 ? 'white' : 'green'}`}>
	      </div>
	    <div className={ `phase-bar bar-${this.stepIndex == 2 ? 'white' : 'green'}`}>
	      </div>
	    <div className={ `phase-bar bar-${this.stepIndex == 3 ? 'white' : 'green'}`}>
	      </div>
	    </div>
    )
  }
}



// class SkipButton extends Component {
//     constructor(props) {
//        super(props);
//     }
//     skipToNext = (e) => {
// 	console.log("SKIP TO NEXT CALLED");
// 	e.preventDefault();
//    // This seeking to near the end works better than just calling skip, because it allows our natural processes to continue.
//     // fetch(`/api/journeys/${this.props.journey.room}/skip`, {
//     //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     //   credentials: 'same-origin', // include, same-origin, *omit
//     //   headers: {
//     //     'content-type': 'application/json'
//     //   },
//     //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     //   mode: 'cors', // no-cors, cors, *same-origin
//     //   redirect: 'follow', // manual, *follow, error
//     //   referrer: 'no-referrer', // *client, no-referrer
//     // });
//       // I believe this should change the state to completed, but I am not sure
//       // if that happens server side or client side
// 	console.log("skipToNext event fired");
// 	const vid = this.props.vidid;
// 	const playerState = this.props.playerState;
// 	const seekTo = this.props.seekTo;
// 	// This is my attempt to seek to the end....
// 	// It is not clear how the audio really works; I am not sure that "seek" functions.
// 	seekTo(99/100);
// 	// figure out how to pause, and how to seek correctly....
//   }

//     render() {
// 	return (
// 	    <span className={`fa-stack`} onClick={this.skipToNext}>
// 	    <i className='fa fa-circle fa-stack-2x' 
// 	style={{color: 'rgb(75,176,88)'}}
// 	    ></i>
// 	    {
//             <i className={`fa fa-step-forward fa-stack-1x`}
// 	     style={{color: 'white'}}></i>
// 	     }
// 		 </span>
//     )
//   }
// }


class SkipButtonClear extends Component {
    constructor(props) {
       super(props);
    }
    skipToNext = (e) => {
	console.log("SKIP TO NEXT CALLED");
	e.preventDefault();
   // This seeking to near the end works better than just calling skip, because it allows our natural processes to continue.
    // fetch(`/api/journeys/${this.props.journey.room}/skip`, {
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, same-origin, *omit
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, cors, *same-origin
    //   redirect: 'follow', // manual, *follow, error
    //   referrer: 'no-referrer', // *client, no-referrer
    // });
      // I believe this should change the state to completed, but I am not sure
      // if that happens server side or client side
	console.log("skipToNext event fired");
	const vid = this.props.vidid;
	const playerState = this.props.playerState;
	const seekTo = this.props.seekTo;
	// This is my attempt to seek to the end....
	// It is not clear how the audio really works; I am not sure that "seek" functions.
	seekTo(99/100);
	// figure out how to pause, and how to seek correctly....
  }

    render() {
	return (<div id={'imageskipbutton'}>
		<span className={'invisible-finger-target'}>
		<span className={`fa-stack`} onClick={this.skipToNext}
	    style={{zIndex: 2}}>
	    {
            <i className={`fa fa-step-forward fa-stack-1x`}
	     style={{color: 'white'}}></i>
	     }
		</span>
		</span>
		</div>
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
      console.log("TOGGLE: PUBLIHSER ", publisher);
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
	style={{color: `${this.state.publishing ? 'rgb(75,176,88)' : 'red'}`}}	
	    ></i>
	    { this.state.publishing &&
	    <i className={`fas fa-video fa-stack-1x`}		
		style={{color: 'white'}}>
		</i>
	    }
	{ !this.state.publishing &&
	    <i className={`fas fa-video-slash fa-stack-1x`}		
		style={{color: 'white'}}>
		</i>
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
	    var curMuted = this.props.state.microphoneMuted;
	    this.props.setMicrophoneMutedState(!curMuted);
	    return { publishing: !prevState.publishing};
	});
	
    };
    
    toggleMicrophone = (e) => {
	const DEBUG_MUTE = 0;	
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
	    <span className={`fa-stack`} onClick={this.toggleMicrophone}>
	    <i className={`fa fa-circle fa-stack-2x`} 
	   style={{color: `${!this.props.state.microphoneMuted ? 'rgb(75,176,88)' : 'red'}`}}
	    ></i>
	    {
            <i className={`fa ${!this.props.state.microphoneMuted ? 'fa-microphone' : 'fa-microphone-slash'}  fa-stack-1x`}
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
    	      style={{color: 'rgb(74,170,221)'}}
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
	index: 0
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

    left = () => {
	this.handleChangeIndex((this.state.index-1) % 3);
    }
    right = () => {
	this.handleChangeIndex((this.state.index+1) % 3);	
    }

    handleChangeIndex = index => {
	this.setState(
	    {index: index}
	);
    };

  render() {
      function slideRenderer(params) {
	  console.log("params", params);
  const { index, key } = params;

  switch (mod(index, 3)) {
    case 0:
      return (
	    <div>
<p className='message-heading'>1.  Welcome to CuriousLive ...<br/>
	      A five-minute guided journey - plus sharing - with others.</p>
	      <p/>	      
<p>
The journey will begin when the timer above elapses and you hear the cime.
</p>
<p>
Breathe slowly and deeply and ajust your posture to be comfortable.
	    </p>
	      </div>
      );

    case 1:
      return (
    <div>	    
	      <p className='message-heading'>2.  Next comes the Journey...</p>
	      <p/>	      
<p>
Your microphone will be muted.
</p>
<p>
Some people like to leave their cameras on during the journey to increase the feeling of a shared experience. It is up to you.
	    </p>
	    </div>
	      
      );

    case 2:
      return (
	    <div>
	      <p className='message-heading'>3.  After the Journey comes the Sharing and Connecting.</p>
	      <p/>
<p>
	    After the journey you will have the opportunity to share your insights.
	    Each person takes 1 or 2 minutes.
</p>
	    <p>
	    When others are sharing, please listen deeply, and in turn they will listen more deeply to you.
	    </p>
	    </div>
      );

    default:
      return null;
  }
}

    const index = this.state.index;
      return (
	    <div style={{position: 'absolute',
			 minHeight: `${someHelper.ONE_SQUARE_WIDTH}px`,
			 maxWidth: `${someHelper.ONE_SQUARE_WIDTH}px`,
			 maxHeight: `${someHelper.ONE_SQUARE_WIDTH}px`,
			 minWidth: `${someHelper.ONE_SQUARE_WIDTH}px`,			 
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
	    <div style={{
	    		 display: 'flex',
			 flexFlow: 'column nowrap',
			 justifyContent: 'center'
	    }}>
	    <VirtualizeSwipeableViews
          index={this.state.index}
          onChangeIndex={this.handleChangeIndex}
        slideRenderer={slideRenderer}
	className='swipable-message'
        />	    
	    </div>
	    <button  onClick={this.left} style={{visibility: `${(index == 0) ? 'hidden' : 'visible'}`, position: 'absolute', left: '20px', top: '50%', zIndex: 100,  backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px'}}>
	    	    <i className="fa fa-caret-left fa-3x"></i>
	</button>
	    <button onClick={this.right} style={{visibility: `${(index == 2) ? 'hidden' : 'visible'}`, position: 'absolute', right: '20px', top: '50%', zIndex: 100,  backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px'}}>
	    	    <i className="fa fa-caret-right fa-3x" ></i>
	    </button>
	</div>	    
    )
  }
}




class FeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
	journeySpaceName: '',
	rating: 0,
	feeling: 0,
	text: '',
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
    onSubmit = (e) => {
	console.log("onSubmit clicked!");
	// NEXT
	// Here is where we will hit an api to access the database.
	console.log(this.props.room);

      fetch(`/api/journeys/${this.props.room}/feedback`, {
          body: JSON.stringify({
	      rating: this.state.rating,
	      feeling: this.state.feeling,
	      text: document.getElementById("feedback_text").value,
	      journey: this.props.journeySpaceName,
	      room: this.props.room
	  }),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
      });
	// Return to the journeyboard....
      this.props.history.push('/');      	
    }
    onInvite = (e) => {
	console.log("onInvite clicked!");	
    }
    
    render() {
    return (
	    <div style={{position: 'absolute',
			 minHeight: `${someHelper.ONE_SQUARE_WIDTH}px`,
			 maxWidth: `${someHelper.ONE_SQUARE_WIDTH}px`,
			 maxHeight: `${someHelper.ONE_SQUARE_WIDTH}px`,
			 minWidth: `${someHelper.ONE_SQUARE_WIDTH}px`,			 
			 width: `${someHelper.ONE_SQUARE_WIDTH}pxog`,			 
			 backgroundColor: 'rgba(89, 153, 222, 0.9)',
			 display: 'flex',
			 flexDirection: 'column',
			 justifyContent: 'center',
			 alignItems: 'center',
			 zIndex: '1003',
			 }
		       }>

            <a href='#' onClick={this.props.onClose} style={{position: 'absolute', right: '20px', top: '20px', zIndex: 100}}>
          <i className='fa fa-times' style={{fontSize: '22px', color: 'white'}}/>
            </a>

            <div style={{
		display: 'flex',
		flexDirection: 'column',		
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.5em'
	    }}>
	    <p> Please rate your experience for: </p>
	    <p> "{this.props.journeySpaceName}"</p>
	    <div>
	    <Rating start={0} stop={10} className='feedback-rating'
	emptySymbol="fa fa-circle rating-circle feedback-empty"
	fullSymbol="fa fa-circle rating-circle feedback-full"
	onChange={ (v) => { this.state.rating = v;}
	}/>
	    <div  style={{
		display: 'flex',
		flexDirection: 'row',		
		justifyContent: 'space-between',
	    }}>
	    <div>1</div> <div>10</div> </div>
	    </div>
	    <p> How do you Feel?</p>
	    <div>
	    <Rating start={0} stop={10} className='feedback-rating'
	emptySymbol="fa fa-circle rating-circle feedback-empty"
	fullSymbol="fa fa-circle rating-circle feedback-full"
	onChange={ (v) => { this.state.feeling = v;}
	}/>
	    <div  style={{
		display: 'flex',
		flexDirection: 'row',		
		justifyContent: 'space-between',
	    }}>
	    <p>Worse</p>
	    <p>The Same</p>
	    <p>Better</p>
	    </div>
	    </div>
	    <p />
	    <div className="form-group"
	    style={{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',					 
		justifyContent: 'space-between',
		width: '100%'
	    }}>
	    <textarea id="feedback_text" className="form-control rounded-0" rows="4"
	style={{borderRadius: '15px',
		marginLeft: '1em',
		marginRight: '1em',
		marginBottom: '0px',
		onChange: (e) => {
		    // no need to call setState since we are only keeping for submit...
		    console.log("ONCHANGE OF TEXT",e);
		    this.state.text = e.target.value;
		}
		  }}
	    >
	    </textarea>
	    </div>
            <button className='invite-button feedback-button' onClick={this.onSubmit}
	style={{borderRadius: '15px',
		marginLeft: '1em',
		marginRight: '1em',
		marginTop: '-2em',
		zIndex: '1001',
	       }}
 	    >Submit Feedback</button>
</div>
	    <p />
	    <p />	    	    
                  <button className='invite-button feedback-button' onClick={this.props.onCloseAndInvite}
 	              >Invite Friends to a New Journey</button>

	    </div>	    
    );
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
      const visible = this.props.visible;      
      const hide_control = (!visible) ||
      	    !(state.playerState == "waiting" ||
	      state.playerState == "failed");
      const additionalClass = this.props.additionalClass;

      return ((slength < limit) ?
	      <div key={localkey} id={vid} className={`${additionalClass} flex-box video-placeholder`}>
	      <div className='box-content'
	      style={{visibility: `${hide_control ? 'hidden' : 'visible'}` }}>
              <i className='far fa-smile fa-2x'></i>
              <p style={{color: 'white', maxWidth: '80%', margin: '0 auto', fontSize: '1em'}}>Waiting...</p>
              <button className='invite-button invite-friends-button'  onClick={this.props.onInvite}>Invite Friends
	        </button>
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
      const feedbackNotOrientation =
	    this.props.playerState == 'ended' || this.props.playerState == 'completed';
      const msg = (feedbackNotOrientation) ? "Leave and Give Feedback" : "Orientation"; 
      const topmsg = (feedbackNotOrientation) ? "When all sharing is done..." : "Waiting...";
      const topmsgvis = (feedbackNotOrientation) ? "visible" : "hidden";       
      const fnc = (feedbackNotOrientation) ? this.props.onFeedback : this.props.onOrientation;
      const additionalClass = this.props.additionalClass;      
	  return (
		  <div key={localkey} id={vid} className={`${additionalClass} flex-box video-placeholder`}>
	        <div className='box-content'>
	      <i className='far fa-smile fa-2x'  style={{ visibility: 'hidden'}}></i>
	      
		  <p style={{visibility: `${topmsgvis}`, color: 'white', maxWidth: '80%', margin: '0 auto', fontSize: '1em'}}>{topmsg}</p>
	      {/* We need to create a colore class to unify with invite-friends-button */}
                  <button className='invite-button invite-orientation-button' onClick={fnc}
 	              >{msg}</button>
  	         </div>
		  </div>);
  }	  
}
// return null if not a permanent-room, return the name if it is a permanent room.
function isPermanentRoom(url) {
    console.log("URL",url);
}


class Controls extends Component {
    constructor(props) {
	super(props);
    }    
    render() {
	return (
		<div id='central_control_panel_id' className='centered' style={this.props.visibility}>
		
		      <AudioButton publisher={this.props.publisher}
  		         state={this.props.state}
		         setMicrophoneMutedState={this.props.setMicrophoneMutedState}
		      />
		<PlayButton style={{color: 'rgb(74,170,221)',
				    backgroundColor: 'rgb(75,176,88)', borderRadius: '50%', }}
	    journey={this.props.journey} player={this.props.player}/>
		<VideoButton publisher={this.props.publisher}/>
		{/*
		      <PauseButton style={{color: 'rgb(74,170,221)',backgroundColor: 'rgb(75,176,88)', borderRadius: '50%', }}
		          journey={this.props.journey} player={this.props.player}/>			 
		      <SkipButton style={{color: 'white',backgroundColor: 'rgb(75,176,88)', borderRadius: '50%',  }}
	                  journey={this.props.journey} playerState={this.props.playerState}
		          seekTo={this.props.seekTo}
		      />
		 */}
	         </div>
	);
    }
    
}

export class JourneySpace extends Component {
  constructor(props) {
      super(props);
      this.state = {
	  microphoneMuted: false,
      streams: [],
      publisherId: '',
      session: null,
      playerState: 'waiting',
      playerProgress: 0,
      playerProgressMS: 0,
      journeyDuration: 0,
      currentlyActivePublisher: null,
	showInviteModal: false,
	showOrientationModal: false,
	showFeedbackModal: false,
	  showIntro: true,
	  permanentRoom: false, // what is publisher?
	  journey: null,
      }
      this.publisher = {};
      this.audioTag = {};
      console.log('PROPS',props);
  }

    componentDidMount() {
	state.audioTag.addEventListener('ended', (event) => {
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
		});
		state.audioTag.play();
	    }
	});

	fetch(`/api/journeys/${this.props.match.params.room}${window.location.search}`, {credentials: 'include'})
	    .then(res => res.json())
	    .then(json => {
		state.journey = json;
		

		state.audioTag.src = state.journey.journey;

		console.log("JOURNEY INFO",state.journey);
		console.log("ROOM",this.props.match.params.room);		
		if (state.journey.name) {
		    console.log("JOURNEY BOARD ROOM");
		} else {
		    console.log("PERMANENT ROOM");		    
		}
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
//		    this.refreshSession();
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
			playerState: 'playing',
			// we also want to mute the microphone here!
			microphoneMuted: true,
		    });
		    // In theory, this could be the place to mute microphones
		    console.log("MUTE HERE!!!!!!");
		});

		this.sessionHelper.session.on("signal:pauseJourney", (event) => {
		    if (this.publisher && this.publisher.state && this.publisher.state.publisher && !this.state.microphoneMuted) {
			//            this.publisher.state.publisher.publishAudio(true);
		    }
		    state.audioTag.pause();
		    this.setState({
			playerState: 'paused'
		    });
		});

		this.sessionHelper.session.on("signal:journeyUpdated", (event) => {
		    const journey = JSON.parse(event.data);
		    // Rob doesn't understand this apparently I have to call setState and use the statement above?
		    state.journey = journey;		    
		    this.setState({
			journey: journey
		    });
		    console.log(" Got signal:journeyUpdated ", event, journey);

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
	      
//	      this.setState({
		  state.journey = json
//	      })
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
      // Possibly this means publisher should be moved into the state!
      this.setState(state: state);
  }

  onConfirmReady = (e) => {
    fetch(`/api/journeys/${this.props.match.params.room}/connections/${this.sessionHelper.session.connection.id}/ready`);
  }


    // how can it be that the argument is not used here?
    onChangeJourney = (e) => {
	console.log("onChangeJourney",e);
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
    }).then( this.setState(state: state) );
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
	console.log("onTimeUpdate",e);
	console.log("onTimeUpdate",e.target.currentTime);	
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
      showInviteModal: true
    });
  }

  onCloseShareModal = (e) => {
    e.preventDefault();
    this.setState({
      showInviteModal: false
    });
  }

  onCompleteShare = (url, name) => {
    this.setState({
      showInviteModal: false
    });
    window.location = url + `?journey=${state.journey.name}&name=${name}`;
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
    window.location = url + `?journey=${state.journey.name}&name=${name}`;
  }


    onFeedback = (e) => {
	console.log("onFeedback called!");
    e.preventDefault();
    this.setState({
      showFeedbackModal: true
    });
    e.stopPropagation();	
  }

  onCloseFeedbackModal = (e) => {
    e.preventDefault();
    this.setState({
      showFeedbackModal: false
    });
  }

  onCompleteFeedback = (url, name) => {
    this.setState({
      showFeedbackModal: false
    });
    window.location = url + `?journey=${state.journey.name}&name=${name}`;
  }
    


    seekTo = (fraction) => {
      console.log("duration",state.audioTag.duration);
      console.log("audioTag",state.audioTag.currentTime);      
	state.audioTag.play();

	
	
    state.audioTag.currentTime = state.audioTag.duration * fraction;

      console.log("SEEK called with:",fraction);
	console.log("audioTag",state.audioTag.currentTime);
	// This only needs a target...must determine what time that is..
	// I think iit is the audioTag
	var e = {target: {currentTime: state.audioTag.currentTime}};
	this.onTimeUpdate(e);
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

    prepJourneyName = (name) => {
	const maxlen = 65;
	var value = name;
	if (value.length > maxlen) {
	    value = value.substring(0,62)+"...";
	}
	
	return value;
    }
    render() {
        // Here I am attempting to set the background image---really thise needs to be done with the journy changes, not in render.
        
	    const currentParticipant = this.state.session && this.state.session.connection && state.journey && state.journey.participants.find(participant => participant.connectionId === this.state.session.connection.id);
	    var local_key_counter_to_avoid_warning = 0;	    
	    let currentUserHasFlaggedJourney = state.journey && state.journey.flags.map(flag => flag.user).indexOf(state.sessionId) > -1;
	var stream0 = this.state.streams[0];
	// NEXT
	// If the journey is not defined, then we are in a "permanentRoom". We can
	// enter a permament room form a straight URL or from within these pages.
	const spaceName = this.props.match.params.room;

	var optionkey = 0;
        // Here deal with the proper construction of the url.... may be dependent on the JourneySpace
        var urlprefix = (this.props.isPermanentSpace ? '.' : '..') + '/';
        var urlsuffix = '.bkg.jpg';

        // Note: I remove single quotes from the journey name here, I am not sure why this
        // is required, but it is.
        var url = (state.journey && state.journey.name) ? 'url(' + urlprefix + "journeyBackgrounds/" +  encodeURIComponent(state.journey.name.replace('\'','')) +urlsuffix + ')' : "none";
        if (state.journey && state.journey.name) {
            console.log("YYYY" + url);
        }
	return (
		<div className='journeyspace'
            id='journeyspace_id'
            style={{position: 'relative'}}
                >

	    {/*          <div className='journeyspace-content flexiblerow'> */}
		{this.state.session && /* AAA */
                 <div className='journeyspace-content' >		 

		{/* tob bar */}
		<div id="topbar_and_header">
		 <LTB.LogoAndTitleBar history={this.props.history} showLeave={true}
		 isPermanentSpace={this.props.isPermanentSpace}
		 spaceName={spaceName}
		 />

		 <div style={{ overflow: 'auto'}} >
		 <div id="titlebar" >
		 {/* Here I am testing the length of the journey title  */}
		 {state.journey.startAt && <span id={"journeyname"} style={{color: 'white'}} >
		  {this.prepJourneyName(state.journey.name)}</span>
		 }
                 { (this.props.isPermanentSpace ||
		    (!state.journey.startAt && (state.journey.state === 'created' || state.journey.state === 'joined' || state.journey.state === 'completed'))) &&
		   <select onChange={this.onChangeJourney} value={state.journeys&& state.journey.journey}>
                    <option value={''}>{'Pulldown to select a new Journey'}</option>		   
                     {
		           state.journeys.map(journey => (
				   <option key={optionkey++} value={journey.filePath}>{journey.name}
			       <i className='far fa-smile'/>
			       </option>
                        ))}
                      </select>
		 }

                 <JourneyPhases journey={state.journey} timer={this.journeyStateTimer} seekTo={this.seekTo}/>
		 </div>
		 <PhaseIndicator journey={state.journey} />	     
		 </div>
	    </div>

		 <div className="flex-squares" id="flex-squares-id"
                             style={{position: 'relative',
                                     backgroundImage: url,
                    backgroundSize: 'cover'}}>
			 
		 {/* here we create the two big squares;  */}
		 
		 <div id="bigsquares">
		 
                 <div  id="firstsquare" className="flexiblecol" key="name">
		 <div className="flexiblecol-content">
                 <img id='video-square0' className="journey-image" src={state.journey.image} onClick={this.togglePlayState}/>
		 <SkipButtonClear
		 visibility={{visibility: `${(!(this.state.showInviteModal || this.state.showOrientationModal || this.state.showFeedbackModal)) ? "visible" : "hidden"}`}}
		 publisher={this.publisher}
		 state={this.state}
		 setMicrophoneMutedState={(b) => {
		     this.publisher.state.publisher.publishAudio(!b);		     
		     this.setState({microphoneMuted: b});
		 }}
		 player={state.audioTag}
		 journey= {state.journey}
		 playerState={state.playerState}
		 seekTo={this.seekTo}>
		  </SkipButtonClear>
		 </div>
                 </div>



		 {/* This is the second square;  */}		 
		 <div id='secondsquare' className='flexiblecol'>
		 


		 {/* This is a modal which is usually invisible. */}
		 {this.state.showOrientationModal &&
		  <OrientationModal force={true} onComplete={this.onCompleteOrientation} onClose={this.onCloseOrientationModal}/>
		 }

		 {this.state.showFeedbackModal &&
		  <FeedbackModal
		  journeySpaceName={state.journey.name}
		  journey={this.state.session}
		  onComplete={this.onCompleteFeedback}
		  onClose={this.onCloseFeedbackModal}
		  onCloseAndInvite={(e) => { this.onCloseFeedbackModal(e);
					    this.onInvite(e);
		  }}
		  room={this.props.match.params.room}
		  history={this.props.history}
		  />
		 }
		 
		 
		 {/*
		  <div style={{display: 'flex', flexDirection: 'row', visibility: `${(this.state.showOrientationModal || this.state.showFeedbackModal ) ? "hidden" : "visible"}`}}>
		  */}
		  

		 
		 <div key="stream" id='video-square1' className='first-box flex-box journeyspace-stream journeyspace-me'>
		 <div className='box-content'>
                        <OTPublisher 
                          session={this.sessionHelper.session}
                          onInit={this.onInitPublisher}
                 ref={publisher => {this.publisher = publisher}}
                 properties={{

                                width: '100%',
                     height: '100%',
  		     style: {buttonDisplayMode: 'off',
			    }
                              }}
                 />
		 </div>
		 <Controls
		 visibility={{visibility: `${(!(this.state.showInviteModal || this.state.showOrientationModal || this.state.showFeedbackModal)) ? "visible" : "hidden"}`}}
		 publisher={this.publisher}
		 state={this.state}
		 setMicrophoneMutedState={(b) => {
		     this.publisher.state.publisher.publishAudio(!b);		     
		     this.setState({microphoneMuted: b});
		 }}
		 player={state.audioTag}
		 journey= {state.journey}
		 playerState={state.playerState}
		 seekTo={this.seekTo}
		 />

		 </div>
		 
		 <UnfilledVideoSquare vidid='video-square2'
		 additionalClass={'second-box'}
		 limit={1}
		 onInvite={this.onInvite}		 
		 streamlength={this.state.streams.length}
		 stream={this.state.streams[0]}
		 session={this.sessionHelper.session}
		 localkey={local_key_counter_to_avoid_warning++}
		 state={this.state}
		 journey={state.journey}
		 sessionId={state.sessionId}
		 visible={(!this.state.showOrientationModal)}
		 >

		 </UnfilledVideoSquare>

		 
		 {/*
		 <div style={{display: 'flex', flexDirection: 'row', visibility: `${(this.state.showOrientationModal) ? "hidden" : "visible"}`}}>
		  */}
		 <UnfilledVideoSquare vidid='video-square3'
		 additionalClass={'third-box'}		 
		 limit={2}
		 onInvite={this.onInvite}		 
		 streamlength={this.state.streams.length}
		 stream={this.state.streams[1]}
		 session={this.sessionHelper.session}
		 localkey={local_key_counter_to_avoid_warning++}
		 state={this.state}
		 journey={state.journey}
		 sessionId={state.sessionId}
		 visible={(!this.state.showOrientationModal)}
		 
		 ></UnfilledVideoSquare>
		 
		 <NoVideoSquare vidid='video-square4'
		 additionalClass={'fourth-box'}		 
		 localkey={local_key_counter_to_avoid_warning++}
		 onOrientation={this.onOrientation}
		 onFeedback={this.onFeedback}		 
		 playerState={this.state.playerState}
		 ></NoVideoSquare>
		 </div>

		 {/*
		 </div>
		  */}
		 {/*
		 </div>
		  */}
		 </div>
		 

		 
		 </div>
		 {/*
          <div className='journeyspace-footer' style={{display: 'flex'}}>
            <div style={{flex: 1}}>
            </div>
            <div style={{marginLeft: 'auto', marginRight: '10px', alignSelf: 'center'}}>
            </div>
          </div>
		  */}
          {this.state.showInviteModal &&
            <InviteModal journey={this.state.session} onComplete={this.onCompleteShare} onClose={this.onCloseShareModal}/>
          }
			</div>		 
		}
	    
			 {/* AAA */}


		    </div>						
	)
	}
}


