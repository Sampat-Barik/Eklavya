import { AllowedUser } from '../models/AllowedUser.js';
import { AuditLog } from '../models/AuditLog.js';

/**
 * Granular Role-to-Module Permissions Matrix
 */
export const DEFAULT_ROLE_PERMISSIONS = {
  super_admin: {
    dashboard: ['view'],
    donations: ['view', 'create', 'edit', 'delete', 'export'],
    events: ['view', 'create', 'edit', 'delete', 'publish'],
    online_events: ['view', 'create', 'edit', 'delete', 'publish'],
    members: ['view', 'create', 'edit', 'delete'],
    alumni: ['view', 'create', 'edit', 'delete'],
    teachers: ['view', 'create', 'edit', 'delete'],
    volunteers: ['view', 'create', 'edit', 'delete'],
    attendance: ['view', 'create', 'edit', 'delete'],
    gd_schedule: ['view', 'create', 'edit', 'delete'],
    ve_schedule: ['view', 'create', 'edit', 'delete'],
    cw_schedule: ['view', 'create', 'edit', 'delete'],
    photo_schedule: ['view', 'create', 'edit', 'delete'],
    send_email: ['view', 'send'],
    user_approvals: ['view', 'approve'],
    certificates: ['view', 'create', 'edit', 'publish'],
    access_management: ['view', 'create', 'edit', 'delete', 'manage_users', 'manage_roles']
  },
  admin: {
    dashboard: ['view'],
    events: ['view', 'create', 'edit', 'delete', 'publish'],
    online_events: ['view', 'create', 'edit', 'delete', 'publish'],
    members: ['view', 'create', 'edit', 'delete'],
    alumni: ['view', 'create', 'edit', 'delete'],
    teachers: ['view', 'create', 'edit', 'delete'],
    volunteers: ['view', 'create', 'edit', 'delete'],
    attendance: ['view', 'create', 'edit', 'delete'],
    gd_schedule: ['view', 'create', 'edit', 'delete'],
    ve_schedule: ['view', 'create', 'edit', 'delete'],
    cw_schedule: ['view', 'create', 'edit', 'delete'],
    photo_schedule: ['view', 'create', 'edit', 'delete'],
    send_email: ['view', 'send'],
    certificates: ['view', 'create', 'edit', 'publish']
  },
  events_manager: {
    dashboard: ['view'],
    events: ['view', 'create', 'edit', 'delete', 'publish'],
    online_events: ['view', 'create', 'edit', 'delete', 'publish']
  },
  content_manager: {
    dashboard: ['view'],
    gd_schedule: ['view', 'create', 'edit', 'delete'],
    ve_schedule: ['view', 'create', 'edit', 'delete'],
    cw_schedule: ['view', 'create', 'edit', 'delete'],
    photo_schedule: ['view', 'create', 'edit', 'delete']
  },
  team_manager: {
    dashboard: ['view'],
    members: ['view', 'create', 'edit', 'delete'],
    alumni: ['view', 'create', 'edit', 'delete']
  },
  education_manager: {
    dashboard: ['view'],
    teachers: ['view', 'create', 'edit', 'delete'],
    volunteers: ['view', 'create', 'edit', 'delete'],
    attendance: ['view', 'create', 'edit', 'delete'],
    ve_schedule: ['view', 'create', 'edit']
  },
  communications_manager: {
    dashboard: ['view'],
    send_email: ['view', 'send'],
    events: ['view', 'publish']
  },
  finance_manager: {
    dashboard: ['view'],
    donations: ['view', 'create', 'edit', 'export']
  },
  viewer: {
    dashboard: ['view']
  }
};

/**
 * Check if a role and optional overrides have a specific module & action permission
 */
export const hasPermission = (role, moduleKey, action, permissionsOverride) => {
  if (role === 'super_admin') return true;

  // Check granular overrides first if present
  if (permissionsOverride) {
    let overrideActions = [];
    if (permissionsOverride instanceof Map) {
      overrideActions = permissionsOverride.get(moduleKey) || [];
    } else if (typeof permissionsOverride === 'object') {
      overrideActions = permissionsOverride[moduleKey] || [];
    }
    if (overrideActions.includes(action)) return true;
  }

  // Fallback to default role permissions
  const rolePerms = DEFAULT_ROLE_PERMISSIONS[role];
  if (!rolePerms) return false;

  const allowedActions = rolePerms[moduleKey] || [];
  return allowedActions.includes(action);
};

/**
 * Log a security or operational event to the AuditLog collection
 */
export const logAuditEvent = async ({
  actorId,
  actorEmail,
  actorName,
  action,
  targetResource,
  details = {},
  result = 'success',
  ip = ''
}) => {
  try {
    await AuditLog.create({
      actorId: actorId || 'system',
      actorEmail: actorEmail || 'unknown@domain.com',
      actorName: actorName || 'Unknown',
      action,
      targetResource,
      details,
      result,
      ip
    });
  } catch (err) {
    console.error('Failed to write audit log:', err.message);
  }
};

/**
 * Middleware: Verifies the authenticated user exists in allowed_users with status: 'active'.
 * Must be mounted AFTER protect middleware.
 */
export const requireActiveAdmin = async (req, res, next) => {
  if (!req.user || !req.user.email) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const email = req.user.email.toLowerCase().trim();

  // Check SUPER_ADMIN_EMAILS bootstrap env
  const superAdminList = (process.env.SUPER_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  let allowedUser = null;
  try {
    allowedUser = await AllowedUser.findOne({ email });
  } catch (err) {
    console.warn('AllowedUser DB lookup error:', err.message);
  }

  // Auto-bootstrap if email is in SUPER_ADMIN_EMAILS
  if (superAdminList.includes(email)) {
    if (!allowedUser) {
      try {
        allowedUser = await AllowedUser.create({
          name: req.user.name || 'Super Admin',
          email,
          role: 'super_admin',
          status: 'active',
          createdBy: 'system_env_bootstrap'
        });
      } catch {
        allowedUser = {
          name: req.user.name || 'Super Admin',
          email,
          role: 'super_admin',
          status: 'active'
        };
      }
    } else if (allowedUser.role !== 'super_admin' || allowedUser.status !== 'active') {
      allowedUser.role = 'super_admin';
      allowedUser.status = 'active';
      await allowedUser.save().catch(() => null);
    }
  }

  // Reject if user is not in allowed collection
  if (!allowedUser) {
    await logAuditEvent({
      actorId: req.user._id || req.user.id,
      actorEmail: email,
      actorName: req.user.name,
      action: 'ADMIN_ACCESS_ATTEMPT',
      targetResource: req.originalUrl,
      result: 'denied',
      ip: req.ip,
      details: { reason: 'User not registered in allowed_users collection' }
    });

    return res.status(403).json({
      message: 'Access Denied: Your email is not authorized for administrative access. Please contact the administrator.'
    });
  }

  // Reject if account is suspended
  if (allowedUser.status === 'suspended') {
    await logAuditEvent({
      actorId: req.user._id || req.user.id,
      actorEmail: email,
      actorName: req.user.name,
      action: 'SUSPENDED_LOGIN_ATTEMPT',
      targetResource: req.originalUrl,
      result: 'denied',
      ip: req.ip,
      details: { reason: 'User account is currently suspended' }
    });

    return res.status(403).json({
      message: 'Access Denied: Your administrative access has been suspended. Please contact the Super Admin.'
    });
  }

  // Update last login timestamp asynchronously
  allowedUser.lastLoginAt = new Date();
  allowedUser.save().catch(() => null);

  // Attach allowedUser to request
  req.allowedUser = allowedUser;
  next();
};

/**
 * Middleware: Verifies user has permission for a specific module and action
 */
export const requirePermission = (moduleKey, action = 'view') => {
  return async (req, res, next) => {
    if (!req.allowedUser) {
      return res.status(403).json({ message: 'Access Denied: Admin identity required' });
    }

    const { role, permissionsOverride } = req.allowedUser;

    const allowed = hasPermission(role, moduleKey, action, permissionsOverride);

    if (allowed) {
      return next();
    }

    await logAuditEvent({
      actorId: req.allowedUser._id || req.allowedUser.id,
      actorEmail: req.allowedUser.email,
      actorName: req.allowedUser.name,
      action: 'PERMISSION_DENIED',
      targetResource: `${moduleKey}:${action}`,
      result: 'denied',
      ip: req.ip,
      details: { role, required: `${moduleKey}:${action}` }
    });

    return res.status(403).json({
      message: `Access Denied: You do not have '${action}' permission on module '${moduleKey}'.`
    });
  };
};

/**
 * Middleware: Strictly requires super_admin role
 */
export const requireSuperAdmin = (req, res, next) => {
  if (!req.allowedUser || req.allowedUser.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access Denied: Restricted to Super Admin only.' });
  }
  next();
};
