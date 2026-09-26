import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Task from '../models/Task.js';

/**
 * 5-Level RBAC Hierarchy Constants
 */
export const ROLE_HIERARCHY = {
  super_admin: 1,   // Level 1: Complete system control & sole role assigner
  admin: 2,         // Level 2: General club management, events, onboarding
  domain_lead: 3,   // Level 3: Department-specific management & task delegation
  club_member: 4,   // Level 4: Active Club Member (Personalized profile, domain-internal tasks & schedule)
  public_user: 5    // Level 5: Normal User (Public read-only visitor. Cannot be an active member)
};

export const OFFICIAL_DOMAINS = [
  'video_editing',
  'graphics_design',
  'teaching',
  'volunteering',
  'content_writing',
  'web_development',
  'pr',
  'management'
];

/**
 * 1. Base Authentication Middleware
 * Validates JWT Bearer token and attaches populated user to req.user
 */
export const authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // Allows public routes to proceed as Level 5
    req.userRoleLevel = 5;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const user = await User.findById(decoded.id).select('-password');

    if (!user || user.isSuspended) {
      return res.status(403).json({ message: 'User account suspended or not found' });
    }

    req.user = user;
    req.userRoleLevel = user.roleLevel || ROLE_HIERARCHY[user.role] || 4;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication token invalid or expired' });
  }
};

/**
 * 2. Require Minimum Level Middleware
 * Example: requireLevel(2) allows Level 1 (Super Admin) and Level 2 (Admin).
 */
export const requireLevel = (maximumAllowedLevelNumber) => {
  return (req, res, next) => {
    if (!req.user || !req.userRoleLevel) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.userRoleLevel > maximumAllowedLevelNumber) {
      return res.status(403).json({
        message: `Forbidden: Requires Level ${maximumAllowedLevelNumber} authority or higher. Your level: Level ${req.userRoleLevel}.`
      });
    }

    next();
  };
};

/**
 * 3. Level 1: Super Admin Strict Check
 * Used for: Assigning/changing roles, website settings, overriding actions.
 */
export const requireSuperAdmin = (req, res, next) => {
  if (!req.user || req.userRoleLevel !== 1) {
    return res.status(403).json({
      message: 'Access Denied: Restricted strictly to Level 1 Super Administrator.'
    });
  }
  next();
};

/**
 * 4. Level 2: General Admin or Above Check
 * Used for: Creating/editing/deleting club events, adding new members.
 */
export const requireAdminOrAbove = (req, res, next) => {
  if (!req.user || req.userRoleLevel > 2) {
    return res.status(403).json({
      message: 'Access Denied: Requires Level 2 Admin or Level 1 Super Admin privileges.'
    });
  }
  next();
};

/**
 * 5. Role Assignment Security Middleware
 * SPECIFIC RULE:
 * - Level 1 (Super Admin): ONLY role that can assign, change, or revoke ANY role.
 * - Level 2 (Admin): Can add members to the system, but CANNOT assign Admin (Level 2) or Super Admin (Level 1).
 * - Level 3-5: Cannot assign any role.
 */
export const validateRoleAssignmentPermission = (req, res, next) => {
  const actorLevel = req.userRoleLevel;
  const targetRole = req.body.role;

  // Level 1 Super Admin can assign any role
  if (actorLevel === 1) {
    return next();
  }

  // Level 2 Admin can add new members, but cannot assign Admin or Super Admin
  if (actorLevel === 2) {
    if (targetRole === 'super_admin' || targetRole === 'admin') {
      return res.status(403).json({
        message: 'Security Violation: Level 2 Admins are strictly prohibited from assigning Admin or Super Admin roles.'
      });
    }

    // Level 2 also cannot promote to Level 3 Domain Lead without Super Admin approval
    if (targetRole === 'domain_lead') {
      return res.status(403).json({
        message: 'Security Violation: Assigning Domain Leads requires Level 1 Super Admin authorization.'
      });
    }

    return next();
  }

  // Lower levels cannot assign roles
  return res.status(403).json({
    message: 'Access Denied: You do not have permission to assign or modify user roles.'
  });
};

/**
 * 6. Level 3: Domain Task Management Middleware
 * SPECIFIC RULE:
 * - Domain Leads can only manage tasks strictly within their assigned domain.
 * - Domain Leads can only assign tasks to Level 4 members belonging to that same domain.
 * - Level 1 & 2 Admins have system oversight.
 */
export const requireDomainTaskAuthority = async (req, res, next) => {
  const actorLevel = req.userRoleLevel;
  const requestedDomain = req.body.domain || req.params.domain;

  // Level 1 and Level 2 have global administrative oversight
  if (actorLevel <= 2) {
    return next();
  }

  // Level 3 Domain Lead Check
  if (actorLevel === 3) {
    if (!req.user.domain || req.user.domain !== requestedDomain) {
      return res.status(403).json({
        message: `Forbidden: You are Domain Lead for '${req.user.domain}'. You cannot create, edit, or delete tasks for '${requestedDomain}'.`
      });
    }

    // Verify assigned user belongs to this domain
    if (req.body.assignedTo) {
      const targetMember = await User.findById(req.body.assignedTo);
      if (!targetMember) {
        return res.status(404).json({ message: 'Target member not found' });
      }
      if (targetMember.roleLevel === 5 || targetMember.role === 'public_user') {
        return res.status(400).json({
          message: 'Validation Error: Level 5 users are normal public users and cannot be active members or assigned club tasks.'
        });
      }
      if (targetMember.domain !== requestedDomain) {
        return res.status(400).json({
          message: `Validation Error: Target member belongs to '${targetMember.domain}', not your domain '${requestedDomain}'.`
        });
      }
    }

    return next();
  }

  // Level 4 (Club Members) and Level 5 (Visitors) cannot create or assign tasks
  return res.status(403).json({
    message: 'Access Denied: Level 4 members cannot create or assign tasks. Only Domain Leads (Level 3) or Admins can.'
  });
};

/**
 * 7. Level 4: Personalized Member Task Access
 * SPECIFIC RULE:
 * - Level 4 members can view internal schedules and tasks assigned to them.
 * - They can update submission proof/status, but cannot edit task specs or reassign.
 */
export const requireMemberTaskAccess = async (req, res, next) => {
  const actorLevel = req.userRoleLevel;
  const taskId = req.params.id;

  // Super Admin, Admin, and Domain Leads of that domain can access
  if (actorLevel <= 2) return next();

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Domain lead of this task's domain
    if (actorLevel === 3 && req.user.domain === task.domain) {
      req.task = task;
      return next();
    }

    // Level 4 Member check: Must be the assigned member
    if (actorLevel === 4 && task.assignedTo.toString() === req.user._id.toString()) {
      req.task = task;
      return next();
    }

    return res.status(403).json({
      message: 'Access Denied: You are not authorized to view or modify this task.'
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error verifying task authorization' });
  }
};
