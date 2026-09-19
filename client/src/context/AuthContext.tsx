/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  AppUser,
  UserRole,
  AdminModule,
  AdminAction,
  AllowedAdminUser,
  AuditLogEntry
} from '../types/auth';
import { DEFAULT_ROLE_PERMISSIONS_FRONTEND } from '../types/auth';

interface AuthContextType {
  user: AppUser | null;
  login: (emailOrUser: string | AppUser, passwordOrToken?: string) => Promise<void> | void;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<AppUser>) => Promise<void>;
  requestAdminAccess: (reason: string, requestedRole?: UserRole) => Promise<{ success: boolean; message: string }>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  hasRole: (roles: UserRole[]) => boolean;
  hasModulePermission: (module: AdminModule) => boolean;
  can: (module: AdminModule, action: AdminAction) => boolean;
  // Admin User Management
  allUsers: AppUser[];
  updateUserRoleAndPermissions: (userId: string, role: UserRole, permissions: AdminModule[], isSuspended?: boolean) => void;
  handleAdminRequest: (userId: string, action: 'approve' | 'reject', assignedRole?: UserRole) => void;
  // Allowed Users & RBAC
  allowedUsers: AllowedAdminUser[];
  auditLogs: AuditLogEntry[];
  fetchAllowedUsers: () => Promise<void>;
  fetchAuditLogs: () => Promise<void>;
  addAllowedUser: (user: { name: string; email: string; role: UserRole; permissionsOverride?: Partial<Record<AdminModule, AdminAction[]>> }) => Promise<{ success: boolean; message: string }>;
  updateAllowedUser: (id: string, updates: Partial<AllowedAdminUser>) => Promise<{ success: boolean; message: string }>;
  deleteAllowedUser: (id: string) => Promise<{ success: boolean; message: string }>;
}

const defaultAdminModules: AdminModule[] = [
  'dashboard',
  'donations',
  'events',
  'online_events',
  'members',
  'alumni',
  'teachers',
  'volunteers',
  'attendance',
  'gd_schedule',
  've_schedule',
  'cw_schedule',
  'photo_schedule',
  'send_email',
  'user_approvals',
  'certificates',
  'access_management'
];

const initialDemoUsers: AppUser[] = [
  {
    id: 'user-admin-1',
    name: 'Sampat Barik',
    email: 'sampatbarik01@gmail.com',
    role: 'super_admin',
    isAdmin: true,
    department: 'Computer Science & Engineering',
    batch: '2026',
    phone: '+91 98765 43210',
    joinedDate: '9/17/2026',
    permissions: defaultAdminModules,
    certificates: []
  },
  {
    id: 'user-member-1',
    name: 'Aarav Mukherjee',
    email: 'aarav.hit26@gmail.com',
    role: 'registered_user',
    isAdmin: false,
    department: 'Mechanical Engineering',
    batch: '2027',
    phone: '+91 98321 55678',
    joinedDate: '9/18/2026',
    permissions: [],
    certificates: [
      {
        id: 'cert-1',
        title: 'Flood Relief Volunteer Commendation 2026',
        issuedAt: 'August 2026',
        category: 'Relief Drive',
        verificationCode: 'EKL-2026-REL-098'
      }
    ],
    adminRequest: {
      requested: true,
      requestedAt: '2026-09-18T10:00:00Z',
      status: 'pending',
      reason: 'I am coordinating the upcoming education drive and need access to add and manage event details.',
      requestedRole: 'events_manager'
    }
  },
  {
    id: 'user-events-1',
    name: 'Priya Sen',
    email: 'priya.events@gmail.com',
    role: 'events_manager',
    isAdmin: true,
    department: 'Information Technology',
    batch: '2026',
    phone: '+91 91234 56789',
    joinedDate: '9/15/2026',
    permissions: ['dashboard', 'events', 'online_events'],
    certificates: []
  },
  {
    id: 'user-finance-1',
    name: 'Rohan Verma',
    email: 'rohan.finance@gmail.com',
    role: 'finance_manager',
    isAdmin: true,
    department: 'Electronics & Communication',
    batch: '2025',
    phone: '+91 98765 12345',
    joinedDate: '9/10/2026',
    permissions: ['dashboard', 'donations'],
    certificates: []
  }
];

const initialAllowedUsers: AllowedAdminUser[] = [
  {
    _id: 'allow-1',
    name: 'Sampat Barik',
    email: 'sampatbarik01@gmail.com',
    role: 'super_admin',
    status: 'active',
    createdBy: 'env_bootstrap',
    lastLoginAt: '2026-09-19T20:30:00Z'
  },
  {
    _id: 'allow-2',
    name: 'Priya Sen',
    email: 'priya.events@gmail.com',
    role: 'events_manager',
    status: 'active',
    createdBy: 'sampatbarik01@gmail.com',
    lastLoginAt: '2026-09-19T18:15:00Z'
  },
  {
    _id: 'allow-3',
    name: 'Rohan Verma',
    email: 'rohan.finance@gmail.com',
    role: 'finance_manager',
    status: 'active',
    createdBy: 'sampatbarik01@gmail.com',
    lastLoginAt: '2026-09-18T14:22:00Z'
  },
  {
    _id: 'allow-4',
    name: 'Kavita Iyer',
    email: 'kavita.content@gmail.com',
    role: 'content_manager',
    status: 'suspended',
    createdBy: 'sampatbarik01@gmail.com',
    lastLoginAt: '2026-09-10T11:00:00Z'
  }
];

const initialAuditLogs: AuditLogEntry[] = [
  {
    _id: 'log-1',
    actorId: 'user-admin-1',
    actorEmail: 'sampatbarik01@gmail.com',
    actorName: 'Sampat Barik',
    action: 'ROLE_ASSIGNED',
    targetResource: 'user:priya.events@gmail.com',
    details: { assignedRole: 'events_manager' },
    result: 'success',
    timestamp: '2026-09-19T20:00:00Z'
  },
  {
    _id: 'log-2',
    actorId: 'user-admin-1',
    actorEmail: 'sampatbarik01@gmail.com',
    actorName: 'Sampat Barik',
    action: 'ADMIN_INVITE_SENT',
    targetResource: 'user:rohan.finance@gmail.com',
    details: { role: 'finance_manager' },
    result: 'success',
    timestamp: '2026-09-19T18:45:00Z'
  },
  {
    _id: 'log-3',
    actorId: 'system',
    actorEmail: 'unknown@visitor.com',
    actorName: 'Visitor',
    action: 'UNAUTHORIZED_ADMIN_ATTEMPT',
    targetResource: '/admin/donations',
    details: { reason: 'Email not present in allowed_users' },
    result: 'denied',
    timestamp: '2026-09-19T17:10:00Z'
  }
];

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return initialDemoUsers[0];
  });

  const [allUsers, setAllUsers] = useState<AppUser[]>(() => {
    if (typeof window === 'undefined') return initialDemoUsers;
    const saved = localStorage.getItem('all_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialDemoUsers;
      }
    }
    return initialDemoUsers;
  });

  const [allowedUsers, setAllowedUsers] = useState<AllowedAdminUser[]>(() => {
    if (typeof window === 'undefined') return initialAllowedUsers;
    const saved = localStorage.getItem('allowed_users_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialAllowedUsers;
      }
    }
    return initialAllowedUsers;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    if (typeof window === 'undefined') return initialAuditLogs;
    const saved = localStorage.getItem('audit_logs_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialAuditLogs;
      }
    }
    return initialAuditLogs;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('all_users', JSON.stringify(allUsers));
    }
  }, [allUsers]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('allowed_users_list', JSON.stringify(allowedUsers));
    }
  }, [allowedUsers]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('audit_logs_list', JSON.stringify(auditLogs));
    }
  }, [auditLogs]);

  const addAuditLog = useCallback((action: string, targetResource: string, details?: Record<string, unknown>, result: 'success' | 'denied' | 'error' = 'success') => {
    const newEntry: AuditLogEntry = {
      _id: `log-${Date.now()}`,
      actorId: user?.id || 'system',
      actorEmail: user?.email || 'system@eklavya.org',
      actorName: user?.name || 'System',
      action,
      targetResource,
      details,
      result,
      timestamp: new Date().toISOString()
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  }, [user]);

  const fetchAllowedUsers = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAllowedUsers(data);
      }
    } catch {
      // Offline fallback already in state
    }
  }, []);

  const fetchAuditLogs = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/admin/audit-logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data.logs || data);
      }
    } catch {
      // Offline fallback
    }
  }, []);

  const addAllowedUser = async (newAllowed: {
    name: string;
    email: string;
    role: UserRole;
    permissionsOverride?: Partial<Record<AdminModule, AdminAction[]>>;
  }) => {
    const token = localStorage.getItem('token');
    const normalizedEmail = newAllowed.email.toLowerCase().trim();

    // Check duplicate
    if (allowedUsers.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: `Email ${normalizedEmail} is already registered in allowed users.` };
    }

    try {
      if (token) {
        const res = await fetch('http://localhost:5000/api/admin/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newAllowed)
        });
        if (res.ok) {
          const data = await res.json();
          setAllowedUsers((prev) => [data, ...prev]);
          addAuditLog('ADMIN_USER_CREATED', `user:${normalizedEmail}`, { role: newAllowed.role });
          return { success: true, message: `Successfully invited ${normalizedEmail} with role ${newAllowed.role}` };
        }
      }
    } catch {
      // Fallback local
    }

    const createdRecord: AllowedAdminUser = {
      _id: `allow-${Date.now()}`,
      name: newAllowed.name,
      email: normalizedEmail,
      role: newAllowed.role,
      status: 'active',
      permissionsOverride: newAllowed.permissionsOverride,
      createdBy: user?.email || 'super_admin',
      lastLoginAt: undefined,
      createdAt: new Date().toISOString()
    };

    setAllowedUsers((prev) => [createdRecord, ...prev]);
    addAuditLog('ADMIN_USER_CREATED', `user:${normalizedEmail}`, { role: newAllowed.role });
    return { success: true, message: `Successfully invited ${normalizedEmail} with role ${newAllowed.role}` };
  };

  const updateAllowedUser = async (id: string, updates: Partial<AllowedAdminUser>) => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updates)
        });
        if (res.ok) {
          const updated = await res.json();
          setAllowedUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
          addAuditLog('ADMIN_USER_UPDATED', `user:${updated.email}`, updates);
          return { success: true, message: 'User updated successfully.' };
        }
      }
    } catch {
      // Local fallback
    }

    setAllowedUsers((prev) =>
      prev.map((u) => {
        if (u._id === id) {
          const updated = { ...u, ...updates };
          addAuditLog('ADMIN_USER_UPDATED', `user:${updated.email}`, updates);
          return updated;
        }
        return u;
      })
    );
    return { success: true, message: 'User updated successfully.' };
  };

  const deleteAllowedUser = async (id: string) => {
    const target = allowedUsers.find((u) => u._id === id);
    if (!target) return { success: false, message: 'User not found' };

    if (target.email.toLowerCase() === user?.email.toLowerCase()) {
      return { success: false, message: 'You cannot remove your own active admin account.' };
    }

    const token = localStorage.getItem('token');
    try {
      if (token) {
        const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setAllowedUsers((prev) => prev.filter((u) => u._id !== id));
          addAuditLog('ADMIN_USER_REMOVED', `user:${target.email}`);
          return { success: true, message: `User ${target.email} removed from allowed users.` };
        }
      }
    } catch {
      // Local fallback
    }

    setAllowedUsers((prev) => prev.filter((u) => u._id !== id));
    addAuditLog('ADMIN_USER_REMOVED', `user:${target.email}`);
    return { success: true, message: `User ${target.email} removed from allowed users.` };
  };

  const login = async (emailOrUser: string | AppUser, passwordOrToken?: string) => {
    if (typeof emailOrUser === 'object') {
      setUser(emailOrUser);
      if (passwordOrToken) localStorage.setItem('token', passwordOrToken);
      localStorage.setItem('user', JSON.stringify(emailOrUser));
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrUser, password: passwordOrToken }),
      });
      if (res.ok) {
        const data = await res.json();
        const loggedUser: AppUser = {
          id: data.user.id || data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role || (data.user.isAdmin ? 'admin' : 'registered_user'),
          isAdmin: !!data.user.isAdmin || data.user.role === 'admin' || data.user.role === 'super_admin',
          department: data.user.department || 'Computer Science & Engineering',
          batch: data.user.batch || '2026',
          phone: data.user.phone || '',
          avatar: data.user.avatar || '',
          joinedDate: '9/17/2026',
          permissions: data.user.permissions || (data.user.isAdmin ? defaultAdminModules : []),
          adminRequest: data.user.adminRequest,
          certificates: data.user.certificates || []
        };
        setUser(loggedUser);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        return;
      }
    } catch {
      // Backend offline fallback
    }

    // Match against allowed users first
    const allowed = allowedUsers.find((u) => u.email.toLowerCase() === emailOrUser.toLowerCase());
    const isSuper = emailOrUser.includes('sampatbarik') || (allowed && allowed.role === 'super_admin');
    const assignedRole = allowed ? allowed.role : isSuper ? 'super_admin' : 'registered_user';
    const isAdminAccount = assignedRole !== 'registered_user';

    const newUser: AppUser = {
      id: `user-${Date.now()}`,
      name: allowed ? allowed.name : emailOrUser.split('@')[0],
      email: emailOrUser,
      role: assignedRole,
      isAdmin: isAdminAccount,
      department: 'Computer Science & Engineering',
      batch: '2026',
      phone: '',
      joinedDate: new Date().toLocaleDateString(),
      permissions: isAdminAccount ? defaultAdminModules : [],
      certificates: []
    };

    setUser(newUser);
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const register = async (name: string, email: string) => {
    const newUser: AppUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'registered_user',
      isAdmin: false,
      department: '',
      batch: '',
      phone: '',
      joinedDate: new Date().toLocaleDateString(),
      permissions: [],
      certificates: []
    };
    setUser(newUser);
    setAllUsers((prev) => [...prev, newUser]);
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = async (updates: Partial<AppUser>) => {
    if (!user) return;
    const updatedUser: AppUser = {
      ...user,
      ...updates,
      email: user.email // email is non-editable
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setAllUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
  };

  const requestAdminAccess = async (reason: string, requestedRole: UserRole = 'events_manager') => {
    if (!user) return { success: false, message: 'Please log in first' };

    const updatedUser: AppUser = {
      ...user,
      adminRequest: {
        requested: true,
        requestedAt: new Date().toISOString(),
        status: 'pending',
        reason,
        requestedRole
      }
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setAllUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    addAuditLog('ADMIN_ACCESS_REQUESTED', `user:${user.email}`, { requestedRole, reason });

    return {
      success: true,
      message: 'Admin access request submitted. The super admin will review your request.'
    };
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return roles.includes(user.role);
  };

  const hasModulePermission = (moduleKey: AdminModule): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    const rolePermissions = DEFAULT_ROLE_PERMISSIONS_FRONTEND[user.role] || {};
    if (rolePermissions[moduleKey] && rolePermissions[moduleKey]!.length > 0) return true;
    return user.permissions?.includes(moduleKey) || false;
  };

  const can = (moduleKey: AdminModule, action: AdminAction): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;

    // Check user overrides
    if (user.permissionsOverride && user.permissionsOverride[moduleKey]?.includes(action)) {
      return true;
    }

    // Check role default matrix
    const rolePerms = DEFAULT_ROLE_PERMISSIONS_FRONTEND[user.role];
    if (!rolePerms) return false;

    const allowedActions = rolePerms[moduleKey] || [];
    return allowedActions.includes(action);
  };

  const updateUserRoleAndPermissions = (
    userId: string,
    role: UserRole,
    permissions: AdminModule[],
    isSuspended: boolean = false
  ) => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = {
            ...u,
            role,
            permissions,
            isSuspended,
            isAdmin: role !== 'registered_user'
          };
          if (user?.id === userId) {
            setUser(updated);
            localStorage.setItem('user', JSON.stringify(updated));
          }
          return updated;
        }
        return u;
      })
    );
  };

  const handleAdminRequest = (userId: string, action: 'approve' | 'reject', assignedRole: UserRole = 'events_manager') => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId && u.adminRequest) {
          const isApproved = action === 'approve';
          const updated: AppUser = {
            ...u,
            role: isApproved ? assignedRole : u.role,
            isAdmin: isApproved ? true : u.isAdmin,
            permissions: isApproved
              ? assignedRole === 'admin' || assignedRole === 'super_admin'
                ? defaultAdminModules
                : [
                    'dashboard',
                    assignedRole === 'events_manager' ? 'events' : 'dashboard',
                    assignedRole === 'finance_manager' ? 'donations' : 'dashboard'
                  ]
              : u.permissions,
            adminRequest: {
              ...u.adminRequest,
              status: isApproved ? 'approved' : 'rejected'
            }
          };

          if (isApproved) {
            // Also add to allowedUsers
            addAllowedUser({
              name: u.name,
              email: u.email,
              role: assignedRole
            });
          }

          if (user?.id === userId) {
            setUser(updated);
            localStorage.setItem('user', JSON.stringify(updated));
          }
          return updated;
        }
        return u;
      })
    );
  };

  const isSuperAdmin = user?.role === 'super_admin';
  const isAdminUser = !!user && (user.isAdmin || (user.role !== 'registered_user' && user.role !== 'viewer'));

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        requestAdminAccess,
        isAuthenticated: !!user,
        isAdmin: isAdminUser,
        isSuperAdmin,
        hasRole,
        hasModulePermission,
        can,
        allUsers,
        updateUserRoleAndPermissions,
        handleAdminRequest,
        allowedUsers,
        auditLogs,
        fetchAllowedUsers,
        fetchAuditLogs,
        addAllowedUser,
        updateAllowedUser,
        deleteAllowedUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
