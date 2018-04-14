import mongoose, {Schema} from 'mongoose';

const TokSessionSchema = new Schema({
  "room": {type: String, index: true},
  "sessionId": {type: String, index: true},
});

const TokSession = mongoose.model('TokSession', TokSessionSchema);

export default TokSession;

