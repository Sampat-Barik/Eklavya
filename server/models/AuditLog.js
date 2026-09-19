import mongoose from 'mongoose';

/**
 * AuditLog schema stores security events, role changes, sensitive exports,
 * and user access modifications.
 */
const auditLogSchema = new mongoose.Schema(
  {
    actorId: {
      type: String,
      default: 'system'
    },
    actorEmail: {
      type: String,
      required: true
    },
    actorName: {
      type: String,
      default: 'Unknown'
    },
    action: {
      type: String,
      required: true
    },
    targetResource: {
      type: String,
      default: ''
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    result: {
      type: String,
      enum: ['success', 'denied', 'failed'],
      default: 'success'
    },
    ip: {
      type: String,
      default: ''
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
