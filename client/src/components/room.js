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
    }
    this.publisher = {};
  }

	componentDidMount() {
    
    
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
          },
          onStreamsUpdated: streams => {
            console.log('Current subscriber streams:', streams);
            this.setState({ streams });
          }
        });
        window.sh = this.sessionHelper;
        this.sessionHelper.session.on("connectionDestroyed", (event) => {
          console.log('DESTROYED', event);
        });
        this.sessionHelper.session.on("connectionCreated", (event) => {
          console.log('CREATED', event);
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

  onInitPublisher = () => {
    console.log('initialized publisher');
  }

  onConfirmReady = (e) => {
    console.log('im ready');
    fetch(`/api/sessions/${this.props.match.params.room}/connections/${this.sessionHelper.session.connection.id}/ready`);
  }

	render() {
		return (
			<div>
				<p style={{display: 'none'}}>{JSON.stringify(state.session, null, 2)}</p>
        <p>{state.journeys.length}</p>
				{this.sessionHelper &&
          <div className='tok-container' ref={container => this.container = container }>
            <div className='row' style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', marginRight: '350px'}}>
              {this.state.streams.map(stream => {
                return (
                  <div className={`subscriber`}>
                    <p style={{fontSize: '10px'}}>{stream.id}</p>
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
              <a className='btn btn-primary' href='#' onClick={this.onConfirmReady}>Ready?</a>
            </div>
          </div>
				}
			</div>
		)
	}
}

export default view(Room);

