// journey_participant.js -- A mongodb schema
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

import mongoose, {Schema} from 'mongoose';

const JourneyParticipantSchema = new Schema({
  "connectionId": {type: String, index: true},
  "journeySpace": {type: Schema.Types.ObjectId, ref: 'JourneySpace'},
  "ready": {type: Boolean, default: false},
  "present": {type: Boolean, default: true},
  user: {type: String}
});

const JourneyParticipant = mongoose.model('JourneyParticipant', JourneyParticipantSchema);


export default JourneyParticipant;

