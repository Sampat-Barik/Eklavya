import mongoose from 'mongoose';

/**
 * AllowedUser schema represents authorized administrator accounts.
 * Only accounts in this collection with status: 'active' can access the admin panel
 * or perform administrative operations on the backend API.
 */
const allowedUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    role: {
      type: String,
      enum: [
        'super_admin',
        'admin',
        'events_manager',
        'content_manager',
        'team_manager',
        'education_manager',
        'communications_manager',
        'finance_manager',
        'viewer'
      ],
      default: 'viewer'
    },
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active'
    },
    // Granular permissions override per module: e.g. { donations: ['view', 'export'], events: ['view', 'create'] }
    permissionsOverride: {
      type: Map,
      of: [String],
      default: {}
    },
    createdBy: {
      type: String,
      default: 'system_bootstrap'
    },
    lastLoginAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const AllowedUser = mongoose.model('AllowedUser', allowedUserSchema);
export default AllowedUser;
