export type UserRole =
  | 'registered_user'
  | 'viewer'
  | 'events_manager'
  | 'content_manager'
  | 'team_manager'
  | 'education_manager'
  | 'communications_manager'
  | 'finance_manager'
  | 'admin'
  | 'super_admin';

export type AdminModule =
  | 'dashboard'
  | 'donations'
  | 'events'
  | 'online_events'
  | 'members'
  | 'alumni'
  | 'teachers'
  | 'volunteers'
  | 'attendance'
  | 'gd_schedule'
  | 've_schedule'
  | 'cw_schedule'
  | 'photo_schedule'
  | 'send_email'
  | 'user_approvals'
  | 'certificates'
  | 'access_management';

export type AdminAction =
  | 'view'
  | 'create'
  | 'edit'
  | 'delete'
  | 'publish'
  | 'export'
  | 'send'
  | 'approve'
  | 'manage_users'
  | 'manage_roles';

export interface AdminRequestInfo {
  requested: boolean;
  requestedAt?: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  requestedRole?: UserRole;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuedAt: string;
  category: string;
  hours?: number;
  certificateUrl?: string;
  verificationCode: string;
  status?: string;
}

export interface EventRegistration {
  id: string;
  userId: string;
  userEmail: string;
  eventId: string;
  eventTitle: string;
  date: string;
  location: string;
  status: 'Confirmed' | 'Waitlisted' | 'Attended';
  registeredAt: string;
  category: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userEmail: string;
  date: string;
  driveType: string;
  location: string;
  hoursLogged: number;
  mentor?: string;
  status: 'Present' | 'Excused';
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  priority: 'Normal' | 'Important' | 'High';
  content: string;
}

export interface MemberDonation {
  _id?: string;
  fullName: string;
  email: string;
  amount: number | string;
  utrNumber: string;
  createdAt: string;
  status?: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAdmin: boolean;
  department?: string;
  batch?: string;
  phone?: string;
  avatar?: string;
  joinedDate?: string;
  isSuspended?: boolean;
  permissions: AdminModule[];
  permissionsOverride?: Partial<Record<AdminModule, AdminAction[]>>;
  adminRequest?: AdminRequestInfo;
  certificates?: CertificateItem[];
}

export interface AllowedAdminUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended';
  permissionsOverride?: Partial<Record<AdminModule, AdminAction[]>>;
  createdBy?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuditLogEntry {
  _id?: string;
  actorId: string;
  actorEmail: string;
  actorName: string;
  action: string;
  targetResource: string;
  details?: Record<string, unknown>;
  result: 'success' | 'denied' | 'error';
  ip?: string;
  timestamp: string;
}

export const DEFAULT_ROLE_PERMISSIONS_FRONTEND: Record<string, Partial<Record<AdminModule, AdminAction[]>>> = {
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
  },
  registered_user: {}
};
