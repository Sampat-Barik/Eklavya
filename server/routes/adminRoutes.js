import express from 'express';
import { AllowedUser } from '../models/AllowedUser.js';
import { AuditLog } from '../models/AuditLog.js';
import { protect } from '../middleware/auth.js';
import {
  requireActiveAdmin,
  requireSuperAdmin,
  requirePermission,
  logAuditEvent,
  DEFAULT_ROLE_PERMISSIONS
} from '../middleware/rbac.js';

const router = express.Router();

/**
 * All admin routes require a valid authenticated user and active AllowedUser record
 */
router.use(protect);
router.use(requireActiveAdmin);

/**
 * @route   GET /api/admin/me
 * @desc    Get current admin profile, role, and effective permissions
 * @access  Private (Active Allowed Admins)
 */
router.get('/me', async (req, res) => {
  try {
    const allowedUser = req.allowedUser;
    const defaultPerms = DEFAULT_ROLE_PERMISSIONS[allowedUser.role] || {};

    // Merge overrides if present
    let effectivePermissions = { ...defaultPerms };
    if (allowedUser.permissionsOverride) {
      const overrides =
        allowedUser.permissionsOverride instanceof Map
          ? Object.fromEntries(allowedUser.permissionsOverride)
          : allowedUser.permissionsOverride;

      effectivePermissions = { ...effectivePermissions, ...overrides };
    }

    res.json({
      id: allowedUser._id,
      name: allowedUser.name,
      email: allowedUser.email,
      role: allowedUser.role,
      status: allowedUser.status,
      effectivePermissions,
      lastLoginAt: allowedUser.lastLoginAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve admin profile', error: err.message });
  }
});

/**
 * @route   GET /api/admin/roles-matrix
 * @desc    Get system default permissions matrix
 * @access  Private (Active Allowed Admins)
 */
router.get('/roles-matrix', (req, res) => {
  res.json({
    roles: DEFAULT_ROLE_PERMISSIONS
  });
});

/**
 * @route   GET /api/admin/users
 * @desc    Get list of all allowed users
 * @access  Private (Super Admin or Access Management View)
 */
router.get('/users', requirePermission('access_management', 'view'), async (req, res) => {
  try {
    const users = await AllowedUser.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve allowed users', error: err.message });
  }
});

/**
 * @route   POST /api/admin/users
 * @desc    Add a new allowed admin user
 * @access  Private (Super Admin)
 */
router.post('/users', requireSuperAdmin, async (req, res) => {
  const { name, email, role, permissionsOverride } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const existing = await AllowedUser.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ message: `User with email ${normalizedEmail} already exists in allowed users.` });
    }

    const newUser = await AllowedUser.create({
      name: name.trim(),
      email: normalizedEmail,
      role: role || 'viewer',
      status: 'active',
      permissionsOverride: permissionsOverride || {},
      createdBy: req.allowedUser.email
    });

    await logAuditEvent({
      actorId: req.allowedUser._id,
      actorEmail: req.allowedUser.email,
      actorName: req.allowedUser.name,
      action: 'ADMIN_USER_CREATED',
      targetResource: `user:${newUser.email}`,
      details: { role: newUser.role, permissionsOverride: newUser.permissionsOverride },
      result: 'success',
      ip: req.ip
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create allowed user', error: err.message });
  }
});

/**
 * @route   PATCH /api/admin/users/:id
 * @desc    Update role, status (active/suspended), or permissionsOverride of an allowed user
 * @access  Private (Super Admin)
 */
router.patch('/users/:id', requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { role, status, permissionsOverride, name } = req.body;

  try {
    const userToUpdate = await AllowedUser.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found in allowed users collection' });
    }

    // Protection: Prevent demoting or suspending the primary super admin or self if they are the only active super admin
    if (userToUpdate.role === 'super_admin' && (role && role !== 'super_admin' || status === 'suspended')) {
      const activeSuperAdmins = await AllowedUser.countDocuments({
        role: 'super_admin',
        status: 'active',
        _id: { $ne: id }
      });

      if (activeSuperAdmins === 0) {
        return res.status(400).json({
          message: 'Cannot demote or suspend the last active Super Admin. Assign another Super Admin first.'
        });
      }
    }

    const previousState = {
      role: userToUpdate.role,
      status: userToUpdate.status,
      permissionsOverride: userToUpdate.permissionsOverride
    };

    if (name) userToUpdate.name = name.trim();
    if (role) userToUpdate.role = role;
    if (status) userToUpdate.status = status;
    if (permissionsOverride !== undefined) {
      userToUpdate.permissionsOverride = permissionsOverride;
    }

    await userToUpdate.save();

    await logAuditEvent({
      actorId: req.allowedUser._id,
      actorEmail: req.allowedUser.email,
      actorName: req.allowedUser.name,
      action: 'ADMIN_USER_UPDATED',
      targetResource: `user:${userToUpdate.email}`,
      details: { previous: previousState, updated: { role, status, permissionsOverride } },
      result: 'success',
      ip: req.ip
    });

    res.json(userToUpdate);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
});

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Remove an allowed user
 * @access  Private (Super Admin)
 */
router.delete('/users/:id', requireSuperAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await AllowedUser.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found in allowed users collection' });
    }

    // Protection: Cannot delete yourself or the last super admin
    if (userToDelete.email === req.allowedUser.email) {
      return res.status(400).json({ message: 'You cannot remove your own account from allowed users.' });
    }

    if (userToDelete.role === 'super_admin') {
      const activeSuperAdmins = await AllowedUser.countDocuments({
        role: 'super_admin',
        status: 'active',
        _id: { $ne: id }
      });

      if (activeSuperAdmins === 0) {
        return res.status(400).json({
          message: 'Cannot remove the last active Super Admin.'
        });
      }
    }

    await AllowedUser.findByIdAndDelete(id);

    await logAuditEvent({
      actorId: req.allowedUser._id,
      actorEmail: req.allowedUser.email,
      actorName: req.allowedUser.name,
      action: 'ADMIN_USER_REMOVED',
      targetResource: `user:${userToDelete.email}`,
      details: { deletedUser: { name: userToDelete.name, email: userToDelete.email, role: userToDelete.role } },
      result: 'success',
      ip: req.ip
    });

    res.json({ message: `Successfully removed ${userToDelete.email} from allowed users.` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove user', error: err.message });
  }
});

/**
 * @route   GET /api/admin/audit-logs
 * @desc    Get audit trail logs with optional filters
 * @access  Private (Super Admin)
 */
router.get('/audit-logs', requireSuperAdmin, async (req, res) => {
  const { limit = 50, page = 1, action, result } = req.query;

  const query = {};
  if (action) query.action = action;
  if (result) query.result = result;

  try {
    const parsedLimit = Math.min(parseInt(limit, 10) || 50, 100);
    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (parsedPage - 1) * parsedLimit;

    const [logs, total] = await Promise.all([
      AuditLog.find(query).sort({ timestamp: -1 }).skip(skip).limit(parsedLimit),
      AuditLog.countDocuments(query)
    ]);

    res.json({
      logs,
      pagination: {
        total,
        page: parsedPage,
        pages: Math.ceil(total / parsedLimit),
        limit: parsedLimit
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve audit logs', error: err.message });
  }
});

export default router;
