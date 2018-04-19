import mongoose, {Schema} from 'mongoose';

const TokSessionSchema = new Schema({
  room: {type: String, index: true},
  sessionId: {type: String, index: true},
  journey: {type: String, default: '/journeys/Journey to A Spiderweb+Music.mp3'},
});

const TokSession = mongoose.model('TokSession', TokSessionSchema);

export default TokSession;

