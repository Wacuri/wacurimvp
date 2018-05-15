import mongoose, {Schema} from 'mongoose';

const JourneyParticipantSchema = new Schema({
  "connectionId": {type: String, index: true},
  "session": {type: Schema.Types.ObjectId, ref: 'JourneySpace'},
  "ready": {type: Boolean, default: false},
  "present": {type: Boolean, default: true},
  user: new Schema({name: String})
});

const JourneyParticipant = mongoose.model('JourneyParticipant', JourneyParticipantSchema);

export default JourneyParticipant;

