import mongoose, {Schema} from 'mongoose';
import statemachine from 'another-mongoose-statemachine';
import moment from 'moment';

const FlagSchema = new Schema({
  user: {type: String},
  reason: {type: String},
});

const JourneySpaceSchema = new Schema({
  room: {type: String, index: true},
  name: {type: String, index: true},
  image: {type: String},
  sessionId: {type: String, index: true},
  journey: {type: String, default: '/journeys/Journey to A Spiderweb+Music.mp3'},
  startAt: {type: Date, default: () => moment().add(10, 'minutes').toDate()},
  flags: {type: [FlagSchema], default: []},
}, {
  timestamps: true
});

JourneySpaceSchema.plugin(statemachine, {
  states: {
    created: {default: true},
    started: {},
    completed: {},
    expired: {},
  },
  transitions: {
    start: { from: 'created', to: 'started' },
    end: { from: '*', to: 'completed' },
    expire: { from: '*', to: 'expired' },
  }
});

const JourneySpace = mongoose.model('JourneySpace', JourneySpaceSchema);

export default JourneySpace;

