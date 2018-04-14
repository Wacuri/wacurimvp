import React, {Component} from 'react';
import { view } from 'react-easy-state'
import state from '../state';
require('es6-promise').polyfill();
require('isomorphic-fetch');

var { OTSession, OTPublisher, OTStreams, OTSubscriber } = {};

if (__CLIENT__) {
	var { OTSession, OTPublisher, OTStreams, OTSubscriber } = require('opentok-react');
	const OT = require('@opentok/client');
	window.state = state;
}

class Room extends Component {

	componentDidMount() {
		fetch(`/api/sessions/${this.props.match.params.room}`)
			.then(res => res.json())
			.then(json => {
				state.session = json;
			});
	}

	render() {
		return (
			<div>
				<p>{JSON.stringify(state.session, null, 2)}</p>
				{state.session && state.session.sessionId && 
					<OTSession apiKey="46100042" sessionId={state.session.sessionId} token={state.session.token}>
						<OTPublisher/>
						<OTStreams>
							<OTSubscriber/>
						</OTStreams>
					</OTSession>
				}
			</div>
		)
	}
}

export default view(Room);

