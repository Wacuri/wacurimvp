// journey_space.js -- The main state machine representing what is going on
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

import mongoose, {Schema} from 'mongoose';
import statemachine from 'another-mongoose-statemachine';
import moment from 'moment';

const FlagSchema = new Schema({
  user: {type: String},
  reason: {type: String},
  flagged: {type: String},
});

const JourneySpaceSchema = new Schema({
  room: {type: String, index: true},
  name: {type: String, index: true},
  image: {type: String},
  currentTime: {type: Number},
  sessionId: {type: String, index: true},
  journey: {type: String, default: '/journeys/Journey to A Spiderweb+Music.mp3'},
  startAt: {type: Date},
  owner: {type: String}, // a user session id, for now
  flags: {type: [FlagSchema], default: []},
}, {
  timestamps: true
});

JourneySpaceSchema.plugin(statemachine, {
  states: {
    created: {default: true},
    joined: {},
    started: {},
    paused: {},
    completed: {},
    ended: {},
    expired: {},
    failed: {},
  },
  transitions: {
    joined: { from: 'created', to: 'joined' },
    start: { from: ['joined', 'created', 'failed', 'paused'], to: 'started' },
    pause: { from: ['started'], to: 'paused' },
    fail: { from: ['joined', 'created'], to: 'failed' },
    complete: { from: ['started', 'created'], to: 'completed' },
    end: { from: '*', to: 'ended' },
    expire: { from: '*', to: 'expired' },
    reset: { from: '*', to: 'created' }
  }
});

JourneySpaceSchema.methods.skip = async function() {
  switch(this.state) {
    case 'joined':
      await this.start();
      break;
    case 'started':
      await this.complete();
      break;
    case 'completed':
      await this.end();
      break;
    case 'ended':
      await this.expire();
      break;
  }
  return;
}

const JourneySpace = mongoose.model('JourneySpace', JourneySpaceSchema);

export default JourneySpace;

