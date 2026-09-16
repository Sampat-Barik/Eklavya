import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    amount: { type: Number, required: true },
    utrNumber: { type: String, required: true },
    note: { type: String },
    status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  },
  { timestamps: true }
);

export const Donation = mongoose.model('Donation', donationSchema);
