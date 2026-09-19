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
      'registered_user',
      'events_manager',
      'content_manager',
      'team_manager',
      'education_manager',
      'communications_manager',
      'finance_manager',
      'admin',
      'super_admin'
    ],
    default: 'registered_user',
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

// A "pre-save" hook runs before a user is saved to the database.
// We use this to hash the password so it isn't stored in plain text.
userSchema.pre('save', async function (next) {
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
