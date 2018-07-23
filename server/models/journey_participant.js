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

