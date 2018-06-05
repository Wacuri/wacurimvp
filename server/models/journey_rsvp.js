import mongoose, {Schema} from 'mongoose';

const JourneyRSVPSchema = new Schema({
  journey: {type: Schema.Types.ObjectId, ref: 'JourneySpace'},
  user: {type: String},
});

const JourneyRSVP = mongoose.model('JourneyRSVP', JourneyRSVPSchema);

export default JourneyRSVP;


