import mongoose from 'mongoose';

/**
 * Domain Schema defines the 8 official departments:
 * Video Editing, Graphics Design, Teaching, Volunteering,
 * Content Writing, Web Development, Public Relations (PR), and Management.
 */
const domainSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: [
        'video_editing',
        'graphics_design',
        'teaching',
        'volunteering',
        'content_writing',
        'web_development',
        'pr',
        'management'
      ]
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    leadUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null // Level 3 Domain Lead reference
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Domain = mongoose.model('Domain', domainSchema);
export default Domain;
