import EventEmitter from 'events';
import React, {Component} from 'react';
import { view } from 'react-easy-state'
import { Link } from 'react-router-dom';
import SignaturePad from './signature_pad';
import state from '../state';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {initLayoutContainer} from 'opentok-layout-js';
import './share';

require('es6-promise').polyfill();
require('isomorphic-fetch');

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
	var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
	const OT = require('@opentok/client');
	window.state = state;
  window.signpad = SignaturePad;
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
      console.log('STILL TICKING', this.interval);
      this.passed = new Date().getTime() - this.start;
      if (this.passed >= this.total) {
        clearInterval(this.interval);
      }
      this.emit('tick', this.passed);
    }, 100);
  }

  clear() {
    console.log("DO IT YO", this.interval);
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

const FlagControl = ({currentUserHasFlaggedJourney, onFlag, children}) => {
  return (
    <button 
      className='btn btn-flag-session'
      disabled={currentUserHasFlaggedJourney}
      onClick={onFlag}>
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
        return 'Waiting';
      case 'started':
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
        return 0;
      case 'started':
        return 1;
      default:
        return 2;
    }
  }

  get positionForCaret() {
    if (!this.container) { return 0; }
    const idx = this.stepIndex;
    const items = this.container.querySelectorAll('li');
    console.log('POSITION FOR CARET', idx);
    return Array(idx + 1).fill(0).reduce((memo, i, j) => {
      console.log('FOR J', j);
      if (j == 0) {
        return 0;
      } else {
        console.log('CALC IT UP', items[j - 0].offsetHeight);
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

  render() {
    const {journey} = this.props;
    return (
      <div ref={el => {this.container = el}} className={`journey-timeline step-${this.stepIndex.toString()}`}>
        <ul>
          <li className={journey.state === 'joined' ? 'active' : ''}>
            <h4>Prepare</h4>
            <div style={{display: 'flex'}}>
              <p>Breathe and center yourself</p>
              {journey.state === 'joined' &&
                <p className='timer' style={{marginLeft: '10px'}}>{this.props.timer.displayTime()}</p>
              }
            </div>
          </li>
          <li className={journey.state === 'started' ? 'active' : ''}>
            <h4>Journey</h4>
            <div style={{display: 'flex'}}>
              <p>Listen and imagine</p>
              {journey.state === 'started' &&
                <p className='timer' style={{marginLeft: '10px'}}>{this.props.timer.displayTime()}</p>
              }
            </div>
          </li>
          <li>
            <h4>Sharing</h4>
            <p>Feelings and thoughts</p>
          </li>
        </ul>
        <div className='arrow' style={{height: `${this.heightForActive}px`, transform: `translateY(${this.positionForCaret}px)`}}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-triangle" width='100' height='100%' viewBox="0 0 95 90" preserveAspectRatio="none" shapeRendering="geometricPrecision">
            <path d="M 70,50 99,5 99,95 Z"/>
          </svg>
        </div>
      </div>
    )
  }
}

class SkipButton extends Component {

  skipToNext = (e) => {
    e.preventDefault();
    fetch(`/api/journeys/${this.props.journey.room}/skip`, {
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
    return (
      this.props.journey.state != 'completed' ? <button className='btn btn-secondary' onClick={this.skipToNext}><i className='fa fa-forward'></i></button> : <span/>
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
  }

  toggle = (e) => {
    e.preventDefault();
    const {publisher} = this.props;
    if (publisher && publisher.state && publisher.state.publisher) {
      publisher.state.publisher.publishAudio(!this.state.publishing);
      this.setState({
        publishing: !this.state.publishing
      });
    }
  }
  

  render() {
    return (
      <button style={this.props.style || {}} onClick={this.toggle} className={`btn btn-${this.state.publishing ? 'primary' : 'secondary'}`}><i className="fa fa-microphone"></i></button>
    )
  }
}

class JourneyStartsIn extends Component {

  componentWillReceiveProps(newProps) {
    console.log('GOT NEW');
    newProps.timer.on('tick', (current) => {
      console.log('TICK TICK');
      this.setState({
        timerValue: current
      });
    });
  }

  componentWillUnmount() {
    console.log('CLEAR IT OUT');
    this.props.timer.clear();
  }

  render() {
    const {journey} = this.props;
    return (
      <p style={{padding: '10px 10px 10px', display: 'flex', borderBottom: '1px solid rgb(88, 88, 88)'}}>
        <span>Journey starts in:</span>
        <span style={{marginLeft: 'auto'}}>{this.props.timer.displayTime()}</span>
      </p>
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
    }
    this.publisher = {};
    this.audioTag = {};
  }

	componentDidMount() {
    this.audioTag.addEventListener('ended', (event) => {
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
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      });

      this.sharingPromptAudioPlayer.play();
    });

    this.sharingPromptAudioPlayer.addEventListener('ended', (event) => {
      if (this.publisher && this.publisher.state && this.publisher.state.publisher) {
        this.publisher.state.publisher.publishAudio(true);
      }
    });

    console.log('GET SESSION');
		fetch(`/api/sessions/${this.props.match.params.room}`, {credentials: 'include'})
			.then(res => res.json())
			.then(json => {
				state.session = json;
        this.sessionHelper = createSession({
          apiKey: state.openTokKey,
          sessionId: state.session.sessionId,
          token: state.session.token,
          onConnect: () => {
            console.log('assigned connection to publisher', this.sessionHelper.session.connection);
            setTimeout(this.refreshSession, 1000);
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
          console.log('CREATED', event);
          const data = {
            sessionId: this.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionCreated',
          }
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
          this.audioTag.play();
          this.setState({
            playerState: 'playing'
          });
        });

        this.sessionHelper.session.on("signal:journeyUpdated", (event) => {
          const journey = JSON.parse(event.data);
          state.session = journey;

          if (state.session.state === 'started') {

            if (this.publisher && this.publisher.state && this.publisher.state.publisher) {
              this.publisher.state.publisher.publishAudio(false);
            }
            this.audioTag.play();
            this.setState({
              playerState: 'playing'
            });
          } else {
            console.log('PAUSE IT YO');
            this.audioTag.pause();
            this.setState({
              playerState: 'paused'
            });
          }

          if (state.session.state === 'completed') {
            this.sharingPromptAudioPlayer.play();
          }
        });
        

        this.sessionHelper.session.on("signal:fail", (event) => {
          state.session.state = 'failed';
        });


        this.setState({
          session: this.sessionHelper.session
        });

        const onAudioCanPlay = (event) => { 
          if (state.session.state === 'started') {
            this.audioTag.play();
            if (!isNaN(state.session.currentTime)) {
              this.audioTag.currentTime = state.session.currentTime;
            }
          }
          this.audioTag.removeEventListener('canplaythrough', onAudioCanPlay);
        }

        this.audioTag.addEventListener('canplaythrough', onAudioCanPlay, false);
        this.audioTag.load();
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
		fetch(`/api/sessions/${this.props.match.params.room}`, {credentials: 'include'})
			.then(res => res.json())
			.then(json => {
				state.session = json;
      });
  }

  get timeRemaining() {
    const seconds = this.state.journeyDuration - this.state.playerProgressMS;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(0);
    return minutes + ":" + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  }

  get isHostUser() {
    const currentParticipant = this.state.session && this.state.session.connection && state.session && state.session.participants.find(participant => participant.connectionId === this.state.session.connection.id);
    return currentParticipant && state.session.participants.indexOf(currentParticipant) === 0
  }

  get journeyStateTimer() {
    switch(state.session.state) {
      case 'started':
        return new AudioPlayTickEmitter(this.audioTag);
      default:
        if (!this.secondsEmitter) {
          this.secondsEmitter = new SecondsTimerEmitter(new Date(state.session.createdAt), new Date(state.session.startAt));
        }
        return this.secondsEmitter;
    }
  }

  onInitPublisher = () => {
    console.log('initialized publisher');
  }

  onConfirmReady = (e) => {
    fetch(`/api/sessions/${this.props.match.params.room}/connections/${this.sessionHelper.session.connection.id}/ready`);
  }

  onChangeJourney = (e) => {
    fetch(`/api/sessions/${this.props.match.params.room}/journey`, {
      body: JSON.stringify({journey: e.target.value}), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    });
  }

  onStartSession = (e) => {
    fetch(`/api/sessions/${this.props.match.params.room}/start`, {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
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
    this.audioTag.removeEventListener('timeupdate', this.onTimeUpdate);
    this.audioTag.addEventListener('timeupdate', this.onTimeUpdate);
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
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'PUT',
        mode: 'cors',
      });
    }
  }

  onFlag = (e) => {
    e.preventDefault();
    fetch(`/api/sessions/${this.props.match.params.room}/flag`, {
      cache: 'no-cache',
      body: JSON.stringify({connectionId: this.state.session.connection.id}),
      credentials: 'same-origin',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
    })
      .then(res => res.json())
      .then(json => state.session = json);
  }

  onShare = (e) => {
    navigator.share({
      title: 'Take a Journey With Me!',
      text: `Join me on ${state.session.name}`,
      url: `${window.location.protocol}//${window.location.host}/${state.session.room}`,
    });
  }

	render() {
    const currentParticipant = this.state.session && this.state.session.connection && state.session && state.session.participants.find(participant => participant.connectionId === this.state.session.connection.id);
    let currentUserHasFlaggedJourney = state.session && state.session.flags.map(flag => flag.user).indexOf(state.sessionId) > -1;
		return (
			<div className='journeyspace'>
        <div className='journeyspace-content'>
          <audio style={{display: 'none'}} onLoadedMetadata={this.onLoadedMetadata} key={state.session && state.session.journey} controls="true" ref={audioTag => { this.audioTag = audioTag }}>
           <source src={state.session && state.session.journey} type="audio/mpeg"/>
          </audio>
          <audio style={{display: 'none'}} ref={el => {this.sharingPromptAudioPlayer = el}}>
            <source src='/sharing.mp3' type='audio/mpeg'/>
          </audio>
          {this.state.session &&
            <div className='row no-gutters'>
              <div className='col-5 col-lg-3'>
                <ul className='journeyspace-streams' style={{margin: 0}}>
                  <li>
                    <img style={{width: '100%'}} src={state.session.image}/>
                    <h2 style={{flex: 5}} className='journeyspace-title'>{state.session.name}</h2>

                  </li>
                  <li className='journeyspace-stream journeyspace-me'>
                      <OTPublisher 
                        properties={{width: '100%', height: '100%'}}
                        session={this.sessionHelper.session}
                        onInit={this.onInitPublisher}
                        ref={publisher => {this.publisher = publisher}}
                      />
                  </li>

                  {this.state.streams.map(stream => {
                    const participant = state.session.participants.find(participant => participant.connectionId === stream.connection.id);
                    return (
                      <li className={`journeyspace-stream ${this.state.currentlyActivePublisher ? 'journeyspace-active-stream' : ''}`}>
                          <OTSubscriber
                            key={stream.id}
                            session={this.sessionHelper.session}
                            stream={stream}
                            properties={{
                              width: '100%',
                              height: '100%',
                            }}
                          />
                      </li>
                    );
                  })}
                  
                  {Array(2 - this.state.streams.length).fill({}).map(empty => (
                    <li className='video-placeholder'>
                      <div>
                        <i className='fa fa-user'></i>
                        <p>waiting...</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='col-7 col-lg-9' style={{backgroundColor: 'white'}}>
                
                {state.session.state === 'joined' && <JourneyStartsIn journey={state.session} timer={this.journeyStateTimer}/> }
                <div style={{display: 'flex', padding: '10px 10px 0'}}>
                  <SkipButton journey={state.session}/>
                </div>
                <div style={{display: 'flex', padding: '10px 10px 0'}}>
                  <VideoButton publisher={this.publisher}/>
                  <AudioButton style={{marginLeft: '10px'}} publisher={this.publisher}/>
                </div>
                <JourneyTimeline journey={state.session} timer={this.journeyStateTimer}/>

                <div className='journeyspace-meta pr-3 pl-3 pt-3'>
                  { this.isHostUser &&
                    <div>
                      {false && state.session.state === 'created' || state.session.state === 'joined' &&
                        <select onChange={this.onChangeJourney} value={state.session && state.session.journey}>
                          {state.journeys.map(journey => (
                            <option value={journey.filePath}>{journey.name}</option>
                          ))}
                        </select>
                      }
                      { state.session.state === 'created' &&
                        <div >
                          <button onClick={this.onStartSession} className='btn btn-primary'>Start session <i className="fa fa-play"></i></button>
                        </div>
                      }
                    </div>
                  }
                  <div className='journeyspace-share text-right'>
                    <a href='#' onClick={this.onShare}>Share <i className="fa fa-share-square-o"></i></a>
                  </div>

                  <div style={{display: 'none'}}>
                    <div>
                      <progress max="100" value={this.state.playerProgress} style={{width: '100%'}}></progress>
                      <p style={{display: 'flex'}}><strong style={{flex: 1}}>Time remaining:</strong><span>{this.timeRemaining}</span></p>
                    </div>
                  </div>
                </div>
                
                {state.session.state === 'failed' &&
                  <p className='p-3'>:( No one else joined this journey with you.  
                    &nbsp;<Link to='/join'>Go Back to the list</Link> and pick a different one, or
                    &nbsp; <button className='btn' onClick={this.onStartSession}>Start the journey</button>
                  </p>
                }

              </div>
            </div>
          }
        
        </div>
        <div className='journeyspace-footer' style={{display: 'flex'}}>
          <div style={{flex: 1}}>
            <FlagControl currentUserHasFlaggedJourney={currentUserHasFlaggedJourney} onFlag={this.onFlag}>
              {currentUserHasFlaggedJourney ? "Reported" : "Report"}
            </FlagControl>
          </div>
          <div style={{marginLeft: 'auto', marginRight: '10px', alignSelf: 'center'}}>
            <a className='mr-2'><i className="fa fa-camera" ariaHidden="true"></i></a>
            <a className=''><i className="fa fa-microphone" ariaHidden="true"></i></a>
          </div>
        </div>
			</div>
		)
	}
}

export default view(JourneySpace);
