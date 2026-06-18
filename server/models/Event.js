import mongoose from 'mongoose';

/**
 * The Event Schema represents an event organized by the NGO.
 */
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
  },
  // We can track who created the event by linking to the User model
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
