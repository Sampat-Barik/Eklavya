export type RoleLevel = 1 | 2 | 3 | 4 | 5;

export type ClubDomain =
  | 'video_editing'
  | 'graphics_design'
  | 'teaching'
  | 'volunteering'
  | 'content_writing'
  | 'web_development'
  | 'pr'
  | 'management';

export type UserRole =
  | 'super_admin'         // Level 1: Complete system control & sole role assigner
  | 'admin'               // Level 2: General club management, events, onboarding (no Admin/Super Admin assignment)
  | 'domain_lead'         // Level 3: Department management & task delegation across 8 domains
  | 'club_member'         // Level 4: Active Club Member (Inducted member with internal domain access, personal profile, tasks & schedule)
  | 'public_user'         // Level 5: Normal User (Public visitor/supporter with zero club membership privileges. Cannot be an active member)
  | 'registered_user'     // Legacy alias for basic authenticated member
  | 'viewer'
  | 'events_manager'
  | 'content_manager'
  | 'team_manager'
  | 'education_manager'
  | 'communications_manager'
  | 'finance_manager';

export interface DomainMeta {
  key: ClubDomain;
  name: string;
  shortDesc: string;
  leadRoleTitle: string;
  tagColor: string;
}

export const OFFICIAL_DOMAINS: DomainMeta[] = [
  {
    key: 'video_editing',
    name: 'Video Editing',
    shortDesc: 'Reels, event recaps, docu-shorts, promotional edits & animations',
    leadRoleTitle: 'Video Editing Lead',
    tagColor: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    key: 'graphics_design',
    name: 'Graphics Design',
    shortDesc: 'Posters, social media creatives, brochures, banners & event kits',
    leadRoleTitle: 'Design Lead',
    tagColor: 'bg-pink-100 text-pink-800 border-pink-200'
  },
  {
    key: 'teaching',
    name: 'Teaching',
    shortDesc: 'Village evening classes, remedial tutoring, STEM & literacy sessions',
    leadRoleTitle: 'Teaching & Curriculum Lead',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    key: 'volunteering',
    name: 'Volunteering',
    shortDesc: 'Ground relief operations, animal feeding drives & community camps',
    leadRoleTitle: 'Field Volunteer Coordinator',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    key: 'content_writing',
    name: 'Content Writing',
    shortDesc: 'Annual reports, newsletters, blog articles, scripts & press releases',
    leadRoleTitle: 'Editorial & Content Lead',
    tagColor: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    key: 'web_development',
    name: 'Web Development',
    shortDesc: 'Club portals, live operations mapping, certificates ledger & web apps',
    leadRoleTitle: 'Tech & Web Lead',
    tagColor: 'bg-cyan-100 text-cyan-800 border-cyan-200'
  },
  {
    key: 'pr',
    name: 'Public Relations (PR)',
    shortDesc: 'Sponsor outreach, college liaison, media coverage & stakeholder partnerships',
    leadRoleTitle: 'PR & Outreach Lead',
    tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  },
  {
    key: 'management',
    name: 'Management',
    shortDesc: 'Logistics coordination, meeting schedules, resource planning & finance tracking',
    leadRoleTitle: 'Operations & Management Lead',
    tagColor: 'bg-teal-100 text-teal-800 border-teal-200'
  }
];

export interface ClubTask {
  id: string;
  title: string;
  description: string;
  domain: ClubDomain;
  assignedToId: string;
  assignedToName: string;
  createdById: string;
  createdByName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'submitted' | 'completed';
  dueDate: string;
  createdAt: string;
  submissionNote?: string;
  submissionLink?: string;
}

export interface InternalDomainUpdate {
  id: string;
  domain: ClubDomain;
  title: string;
  content: string;
  date: string;
  authorName: string;
  type: 'schedule' | 'announcement' | 'resource';
}

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
  eventName?: string;
  category?: string;
  location: string;
  hoursLogged?: number;
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
  roleLevel?: RoleLevel;
  domain?: ClubDomain;
  isAdmin: boolean;
  /** True for Level 1–4 active club members. Strictly false for Level 5 normal users / public visitors. */
  isActiveMember?: boolean;
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
