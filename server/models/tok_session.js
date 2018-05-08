import mongoose, {Schema} from 'mongoose';
import statemachine from 'another-mongoose-statemachine';

const TokSessionSchema = new Schema({
  room: {type: String, index: true},
  sessionId: {type: String, index: true},
  journey: {type: String, default: '/journeys/Journey to A Spiderweb+Music.mp3'},
});

TokSessionSchema.plugin(statemachine, {
  states: {
    created: {default: true},
    started: {},
    completed: {}
  },
  transitions: {
    start: { from: 'created', to: 'started' },
    end: { from: '*', to: 'completed' },
  }
});

const TokSession = mongoose.model('TokSession', TokSessionSchema);

export default TokSession;

