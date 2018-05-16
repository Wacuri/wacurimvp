import mongoose, {Schema} from 'mongoose';
import statemachine from 'another-mongoose-statemachine';

const FlagSchema = new Schema({
  user: {type: String},
  reason: {type: String},
});

const JourneySpaceSchema = new Schema({
  room: {type: String, index: true},
  sessionId: {type: String, index: true},
  journey: {type: String, default: '/journeys/Journey to A Spiderweb+Music.mp3'},
  flags: {type: [FlagSchema], default: []},
});

JourneySpaceSchema.plugin(statemachine, {
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

const JourneySpace = mongoose.model('JourneySpace', JourneySpaceSchema);

export default JourneySpace;

