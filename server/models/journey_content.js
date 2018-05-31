import mongoose, {Schema} from 'mongoose';

const JourneyContentSchema = new Schema({
  filePath: {type: String},
  image: {type: String},
}, {
  timestamps: true
});

const JourneyContent = mongoose.model('JourneyContent', JourneyContentSchema);

export default JourneyContent;


