import mongoose, {Schema} from 'mongoose';

const TokSessionParticipantSchema = new Schema({
  "connectionId": {type: String, index: true},
  "session": {type: Schema.Types.ObjectId, ref: 'TokSession'},
  "ready": {type: Boolean, default: false},
  "present": {type: Boolean, default: true},
});

const TokSessionParticipant = mongoose.model('TokSessionParticipant', TokSessionParticipantSchema);

export default TokSessionParticipant;

