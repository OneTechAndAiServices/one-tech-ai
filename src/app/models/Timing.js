// models/Timing.js
import mongoose from 'mongoose';

const TimingSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  hours: { type: String, required: true },
});

export default mongoose.models.Timing || mongoose.model('Timing', TimingSchema);
