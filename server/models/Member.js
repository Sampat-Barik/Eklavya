import mongoose from 'mongoose';

/**
 * The Member Schema represents a person in the NGO.
 */
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required'],
  },
  role: {
    type: String,
    required: [true, 'Role is required (e.g., Volunteer, President)'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  }
}, {
  timestamps: true
});

const Member = mongoose.model('Member', memberSchema);
export default Member;
