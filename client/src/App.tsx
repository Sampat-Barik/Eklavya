import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { UserPortalLayout } from './layouts/UserPortalLayout';

// Guards
import { RoleGuard } from './components/auth/RoleGuard';
import { PortalGuard } from './components/auth/PortalGuard';

// Public & Member Pages
import { Home } from './pages/Home';
import { Vision } from './pages/Vision';
import { Faculty } from './pages/Faculty';
import { Members } from './pages/Members';
import { Alumni } from './pages/Alumni';
import { Events } from './pages/Events';
import { Donate } from './pages/Donate';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AccessDenied } from './pages/AccessDenied';

// User Portal Pages
import { PortalDashboard } from './pages/portal/PortalDashboard';
import { PortalProfile } from './pages/portal/PortalProfile';
import { PortalEvents } from './pages/portal/PortalEvents';
import { PortalAttendance } from './pages/portal/PortalAttendance';
import { PortalCertificates } from './pages/portal/PortalCertificates';
import { PortalAnnouncements } from './pages/portal/PortalAnnouncements';
import { PortalDonations } from './pages/portal/PortalDonations';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DonationsAdmin } from './pages/admin/DonationsAdmin';
import { EventsAdmin } from './pages/admin/EventsAdmin';
import { UserApprovals } from './pages/admin/UserApprovals';
import { AccessManagement } from './pages/admin/AccessManagement';
import { AdminModulePlaceholder } from './pages/admin/AdminModulePlaceholder';

function App() {
  return (
    <Routes>
      {/* ========================================================================= */}
      {/* 1. PUBLIC & MEMBER LAYERS (Uses Public Navbar + Footer)                  */}
      {/* ========================================================================= */}
      <Route element={<PublicLayout />}>
        {/* Public Visitor Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/about" element={<Vision />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/members" element={<Members />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/events" element={<Events />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/help-us" element={<Donate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Club Member Layer (Redirect to dedicated /portal/profile) */}
        <Route path="/profile" element={<Navigate to="/portal/profile" replace />} />

        {/* Access Denied Route */}
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center py-32 space-y-4">
              <h1 className="text-5xl font-black text-slate-900">404</h1>
              <p className="text-slate-500 text-sm">Page Not Found</p>
            </div>
          }
        />
      </Route>

      {/* ========================================================================= */}
      {/* 2. USER PORTAL LAYER (Dedicated Authenticated Member Portal)              */}
      {/* ========================================================================= */}
      <Route
        path="/portal"
        element={
          <PortalGuard>
            <UserPortalLayout />
          </PortalGuard>
        }
      >
        <Route index element={<PortalDashboard />} />
        <Route path="dashboard" element={<PortalDashboard />} />
        <Route path="profile" element={<PortalProfile />} />
        <Route path="events" element={<PortalEvents />} />
        <Route path="attendance" element={<PortalAttendance />} />
        <Route path="certificates" element={<PortalCertificates />} />
        <Route path="announcements" element={<PortalAnnouncements />} />
        <Route path="donations" element={<PortalDonations />} />
      </Route>

      {/* ========================================================================= */}
      {/* 3. ADMIN LAYER (Dedicated Admin Panel with Sidebar Shell)                */}
      {/* ========================================================================= */}
      <Route
        path="/admin"
        element={
          <RoleGuard>
            <AdminLayout />
          </RoleGuard>
        }
      >
        {/* Main Dashboard */}
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* Donations & Ledger Module */}
        <Route
          path="donations"
          element={
            <RoleGuard requiredModule="donations">
              <DonationsAdmin />
            </RoleGuard>
          }
        />

        {/* Events Module */}
        <Route
          path="events"
          element={
            <RoleGuard requiredModule="events">
              <EventsAdmin />
            </RoleGuard>
          }
        />

        {/* Online Events Module */}
        <Route
          path="online-events"
          element={
            <RoleGuard requiredModule="online_events">
              <AdminModulePlaceholder
                title="Online Events & Webinars"
                subtitle="Manage Google Meet / Zoom society links and live broadcasts."
                actionLabel="Schedule Online Session"
              />
            </RoleGuard>
          }
        />

        {/* Members Management Module */}
        <Route
          path="members"
          element={
            <RoleGuard requiredModule="members">
              <AdminModulePlaceholder
                title="Club Members Management"
                subtitle="Manage registered student members, batch coordinators, and teams."
                actionLabel="Add Member"
              />
            </RoleGuard>
          }
        />

        {/* Alumni Management Module */}
        <Route
          path="alumni"
          element={
            <RoleGuard requiredModule="alumni">
              <AdminModulePlaceholder
                title="Alumni Network & Directory"
                subtitle="Maintain records of past society presidents, coordinators, and corporate mentors."
                actionLabel="Add Alumni"
              />
            </RoleGuard>
          }
        />

        {/* Teachers Module */}
        <Route
          path="teachers"
          element={
            <RoleGuard requiredModule="teachers">
              <AdminModulePlaceholder
                title="Faculty & Teachers Network"
                subtitle="Oversee departmental faculty advisors and coordinators."
                actionLabel="Assign Teacher Advisor"
              />
            </RoleGuard>
          }
        />

        {/* Volunteers Module */}
        <Route
          path="volunteers"
          element={
            <RoleGuard requiredModule="volunteers">
              <AdminModulePlaceholder
                title="Volunteers Roster"
                subtitle="Track student volunteers enrolled across rural teaching and animal feeding squads."
                actionLabel="Enroll Volunteer"
              />
            </RoleGuard>
          }
        />

        {/* Attendance Module */}
        <Route
          path="attendance"
          element={
            <RoleGuard requiredModule="attendance">
              <AdminModulePlaceholder
                title="Attendance System"
                subtitle="Record student presence for daily village evening classes and camps."
                actionLabel="Log Day Attendance"
              />
            </RoleGuard>
          }
        />

        {/* Schedules Modules */}
        <Route
          path="schedules/gd"
          element={
            <RoleGuard requiredModule="gd_schedule">
              <AdminModulePlaceholder
                title="GD Schedule"
                subtitle="Group Discussion and student orientation timetable."
                actionLabel="Add GD Session"
              />
            </RoleGuard>
          }
        />
        <Route
          path="schedules/ve"
          element={
            <RoleGuard requiredModule="ve_schedule">
              <AdminModulePlaceholder
                title="VE Schedule"
                subtitle="Village Education evening class roster and teacher duty rotation."
                actionLabel="Create VE Shift"
              />
            </RoleGuard>
          }
        />
        <Route
          path="schedules/cw"
          element={
            <RoleGuard requiredModule="cw_schedule">
              <AdminModulePlaceholder
                title="CW Schedule"
                subtitle="Community Welfare drives, food runs, and relief dispatch dates."
                actionLabel="Create CW Event"
              />
            </RoleGuard>
          }
        />
        <Route
          path="schedules/photo"
          element={
            <RoleGuard requiredModule="photo_schedule">
              <AdminModulePlaceholder
                title="Photo Schedule"
                subtitle="Media squad coverage and photography shift assignments."
                actionLabel="Add Photo Shift"
              />
            </RoleGuard>
          }
        />

        {/* Send Email Module */}
        <Route
          path="send-email"
          element={
            <RoleGuard requiredModule="send_email">
              <AdminModulePlaceholder
                title="Send Society Email"
                subtitle="Send newsletter updates and batch announcements to registered student members."
                actionLabel="Compose Email"
              />
            </RoleGuard>
          }
        />

        {/* User Approvals Module (Super Admin Only) */}
        <Route
          path="approvals"
          element={
            <RoleGuard allowedRoles={['super_admin']} requiredModule="user_approvals">
              <UserApprovals />
            </RoleGuard>
          }
        />

        {/* Certificate Module */}
        <Route
          path="certificates"
          element={
            <RoleGuard requiredModule="certificates">
              <AdminModulePlaceholder
                title="Certificates Issuance"
                subtitle="Generate and dispatch verified volunteer commendation certificates."
                actionLabel="Issue New Certificate"
              />
            </RoleGuard>
          }
        />

        {/* Access Management Module (Super Admin Only) */}
        <Route
          path="access-management"
          element={
            <RoleGuard allowedRoles={['super_admin']}>
              <AccessManagement />
            </RoleGuard>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
