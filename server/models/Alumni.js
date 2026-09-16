import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    batch: { type: String, required: true },
    department: { type: String, required: true },
    currentRole: { type: String, required: true },
    company: { type: String, required: true },
    quote: { type: String },
    linkedin: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const Alumni = mongoose.model('Alumni', alumniSchema);
