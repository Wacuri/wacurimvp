import React, {Component} from 'react';
import { view } from 'react-easy-state'
import state from '../state';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {initLayoutContainer} from 'opentok-layout-js';
require('es6-promise').polyfill();
require('isomorphic-fetch');

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
	var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
	const OT = require('@opentok/client');
	window.state = state;
}

class Room extends Component {

  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      publisherId: '',
      session: null,
      playerState: 'waiting',
    }
    this.publisher = {};
    this.audioTag = {};
  }

	componentDidMount() {
    this.audioTag.addEventListener('ended', (event) => {
      this.publisher.state.publisher.publishAudio(true);
      this.setState({
        playerState: 'ended'
      });
    });
		fetch(`/api/sessions/${this.props.match.params.room}`)
			.then(res => res.json())
			.then(json => {
				state.session = json;
        this.sessionHelper = createSession({
          apiKey: '46100042',
          sessionId: state.session.sessionId,
          token: state.session.token,
          onConnect: () => {
            console.log('assigned connection to publisher', this.sessionHelper.session.connection);
            setTimeout(this.refreshSession, 1000);
          },
          onStreamsUpdated: streams => {
            console.log('Current subscriber streams:', streams);
            this.setState({ streams });
          }
        });
        window.sh = this.sessionHelper;
        this.sessionHelper.session.on("connectionDestroyed", (event) => {
          console.log('DESTROYED', event);
          const data = {
            sessionId: this.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionDestroyed',
          }
          console.log('data is', data);
          // fetch(`/api/event`, {
          //   body: JSON.stringify(data), // must match 'Content-Type' header
          //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //   credentials: 'same-origin', // include, same-origin, *omit
          //   headers: {
          //     'user-agent': 'Mozilla/4.0 MDN Example',
          //     'content-type': 'application/json'
          //   },
          //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //   mode: 'cors', // no-cors, cors, *same-origin
          //   redirect: 'follow', // manual, *follow, error
          //   referrer: 'no-referrer', // *client, no-referrer
          // });
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
          console.log('data is', data);
          // fetch(`/api/event`, {
          //   body: JSON.stringify(data), // must match 'Content-Type' header
          //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //   credentials: 'same-origin', // include, same-origin, *omit
          //   headers: {
          //     'user-agent': 'Mozilla/4.0 MDN Example',
          //     'content-type': 'application/json'
          //   },
          //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //   mode: 'cors', // no-cors, cors, *same-origin
          //   redirect: 'follow', // manual, *follow, error
          //   referrer: 'no-referrer', // *client, no-referrer
          // });
          this.refreshSession();
        });
        this.sessionHelper.session.on("signal", (event) => {
          console.log("Signal sent from connection ", event);
          this.refreshSession();
          if (event.type === 'signal:startJourney') {
            this.publisher.state.publisher.publishAudio(false);
            this.audioTag.play();
            this.setState({
              playerState: 'playing'
            });
          }
        });
        this.setState({
          session: this.sessionHelper.session
        });
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
		fetch(`/api/sessions/${this.props.match.params.room}`)
			.then(res => res.json())
			.then(json => {
				state.session = json;
      });
  }

  onInitPublisher = () => {
    console.log('initialized publisher');
  }

  onConfirmReady = (e) => {
    console.log('im ready');
    fetch(`/api/sessions/${this.props.match.params.room}/connections/${this.sessionHelper.session.connection.id}/ready`);
  }

  onChangeJourney = (e) => {
    console.log('CHANGE', e.target.value);
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

	render() {
    const currentParticipant = this.state.session && state.session.participants.find(participant => participant.connectionId === this.state.session.connection.id);
		return (
			<div style={{padding: 20}}>
				<p style={{display: 'none'}}>{JSON.stringify(state.session, null, 2)}</p>
        { currentParticipant && state.session.participants.indexOf(currentParticipant) === 0 &&
          <select onChange={this.onChangeJourney} value={state.session && state.session.journey}>
            {state.journeys.map(journey => (
              <option value={journey}>{journey.split('/')[journey.split('/').length -1]}</option>
            ))}
          </select>
        }
        <audio style={{display: 'none'}} key={state.session && state.session.journey} controls="true" ref={audioTag => { this.audioTag = audioTag }}>
         <source src={state.session && state.session.journey} type="audio/mpeg"/>
        </audio>
				{this.state.session &&
          <div>
            <h2>{state.session.journey.split('/')[state.session.journey.split('/').length - 1]}</h2>
            <p>Journey state: {this.state.playerState}</p>
            <div className='tok-container' ref={container => this.container = container }>
              {this.state.streams.length == 0 &&
                <p>Waiting for others to join this journey...</p>
              }
              <div className='row' style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', marginRight: '350px'}}>
                {this.state.streams.map(stream => {
                  const participant = state.session.participants.find(participant => participant.connectionId === stream.connection.id);
                  return (
                    <div className={`subscriber`}>
                      <p style={{fontSize: '14px'}} className={participant && participant.ready ? 'text-success' : 'text-warning'}>{participant && participant.ready ? 'Ready to start!' : 'Not ready yet'}</p>
                      <OTSubscriber
                        key={stream.id}
                        session={this.sessionHelper.session}
                        stream={stream}
                      />
                    </div>
                  );
                })}
              </div>
              <div style={{position: 'fixed', bottom: 0, right: 0}}>
                <OTPublisher session={this.sessionHelper.session} onInit={this.onInitPublisher} ref={publisher => {this.publisher = publisher}}/>
                {currentParticipant && currentParticipant.ready &&
                  <p>You are ready!</p>
                }
                {!currentParticipant || !currentParticipant.ready &&
                  <a className='btn btn-primary' href='#' onClick={this.onConfirmReady}>Ready?</a>
                }
              </div>
            </div>
          </div>
				}
			</div>
		)
	}
}

export default view(Room);

