// journey_content.js -- A schema for Journey Content
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

import mongoose, {Schema} from 'mongoose';

const JourneyContentSchema = new Schema({
  filePath: {type: String},
  name: {type: String},
  image: {type: String},
}, {
  timestamps: true
});

const JourneyContent = mongoose.model('JourneyContent', JourneyContentSchema);

export default JourneyContent;


