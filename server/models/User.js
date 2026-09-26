import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * The User Schema defines the structure of a user document in our MongoDB database.
 * This includes validation rules and default values.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures no two users can register with the same email
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: [
      'super_admin',      // Level 1
      'admin',            // Level 2
      'domain_lead',      // Level 3
      'club_member',      // Level 4
      'public_user',      // Level 5
      'registered_user',  // Legacy alias
      'events_manager',
      'content_manager',
      'team_manager',
      'education_manager',
      'communications_manager',
      'finance_manager'
    ],
    default: 'club_member',
  },
  roleLevel: {
    type: Number,
    min: 1,
    max: 5,
    default: 4,
  },
  domain: {
    type: String,
    enum: [
      '',
      'video_editing',
      'graphics_design',
      'teaching',
      'volunteering',
      'content_writing',
      'web_development',
      'pr',
      'management'
    ],
    default: '',
  },
  permissions: {
    type: [String],
    default: [], // Specific modules allowed e.g. ['events', 'donations']
  },
  department: {
    type: String,
    default: '',
  },
  batch: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  isActiveMember: {
    type: Boolean,
    default: false, // Level 5 normal users are strictly non-members
  },
  adminRequest: {
    requested: { type: Boolean, default: false },
    requestedAt: { type: Date },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    reason: { type: String, default: '' },
    reviewedBy: { type: String },
    reviewedAt: { type: Date }
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook for RBAC role level & active member status, plus password hashing
userSchema.pre('save', async function (next) {
  // Level 5 are normal users: strictly non-members with no domain assignment
  if (this.roleLevel === 5 || this.role === 'public_user') {
    this.isActiveMember = false;
    this.domain = '';
  } else if (this.roleLevel >= 1 && this.roleLevel <= 4) {
    this.isActiveMember = true;
  }

  // If the password hasn't been modified (e.g., when updating just the name), skip hashing
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a "salt" which adds randomness to the hash
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// A custom method attached to the user document to compare a plain text password with the hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Compile the schema into a model
const User = mongoose.model('User', userSchema);
export default User;
