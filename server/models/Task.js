import mongoose from 'mongoose';

/**
 * Task Schema defines deliverables created and assigned by Level 3 Domain Leads
 * strictly to Level 4 members belonging to that domain.
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Task description is required']
    },
    domain: {
      type: String,
      required: [true, 'Domain is required'],
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
    // Level 4 Club Member assigned to this task
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Assigned member is required']
    },
    assignedToName: {
      type: String,
      default: ''
    },
    // Level 3 Domain Lead or Level 1/2 Admin who created the task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task creator is required']
    },
    createdByName: {
      type: String,
      default: ''
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'submitted', 'completed'],
      default: 'pending'
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required']
    },
    submissionNote: {
      type: String,
      default: ''
    },
    submissionLink: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Indexes for high performance querying by domain and member
taskSchema.index({ domain: 1, status: 1 });
taskSchema.index({ assignedTo: 1, status: 1 });

export const Task = mongoose.model('Task', taskSchema);
export default Task;
