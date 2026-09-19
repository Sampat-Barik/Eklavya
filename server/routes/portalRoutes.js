import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';
import { Donation } from '../models/Donation.js';

const router = express.Router();

/**
 * All portal routes require a valid JWT token.
 * Identity is derived strictly from req.user (authenticated session).
 */
router.use(protect);

// In-memory mock data stores for portal activities (with seamless MongoDB integration)
const mockRegistrations = [
  {
    id: 'reg-1',
    userId: 'user-member-1',
    userEmail: 'aarav.hit26@gmail.com',
    eventId: 'event-1',
    eventTitle: 'Flood Relief & Ration Distribution Camp 2026',
    date: 'August 10, 2026',
    location: 'Haldia Riverside Ghat',
    status: 'Confirmed',
    registeredAt: '2026-08-01T10:30:00Z',
    category: 'Community Welfare'
  },
  {
    id: 'reg-2',
    userId: 'user-member-1',
    userEmail: 'aarav.hit26@gmail.com',
    eventId: 'event-2',
    eventTitle: 'Free Evening School: Science Workshop',
    date: 'August 24, 2026',
    location: 'Sutahata Village Centre',
    status: 'Attended',
    registeredAt: '2026-08-15T09:00:00Z',
    category: 'Child Education'
  }
];

const mockAttendance = [
  {
    id: 'att-1',
    userId: 'user-member-1',
    userEmail: 'aarav.hit26@gmail.com',
    date: '2026-09-15',
    driveType: 'Village Education (VE)',
    location: 'Debhog Primary Center',
    hoursLogged: 3,
    mentor: 'Prof. S. Das',
    status: 'Present'
  },
  {
    id: 'att-2',
    userId: 'user-member-1',
    userEmail: 'aarav.hit26@gmail.com',
    date: '2026-09-12',
    driveType: 'Animal Rescue & Vaccination',
    location: 'HIT Campus & Township',
    hoursLogged: 2.5,
    mentor: 'Ananya Roy',
    status: 'Present'
  },
  {
    id: 'att-3',
    userId: 'user-member-1',
    userEmail: 'aarav.hit26@gmail.com',
    date: '2026-09-08',
    driveType: 'Community Ration Drive',
    location: 'Durgachak Basti',
    hoursLogged: 4,
    mentor: 'Sampat Barik',
    status: 'Present'
  }
];

const mockCertificates = [
  {
    id: 'cert-1',
    userId: 'user-member-1',
    userEmail: 'aarav.hit26@gmail.com',
    title: 'Flood Relief Volunteer Commendation 2026',
    issuedAt: 'August 2026',
    category: 'Relief Drive',
    hours: 24,
    verificationCode: 'EKL-2026-REL-098',
    status: 'Verified'
  },
  {
    id: 'cert-2',
    userId: 'user-member-1',
    userEmail: 'aarav.hit26@gmail.com',
    title: 'Certificate of Excellence: Rural Science Educator',
    issuedAt: 'July 2026',
    category: 'Child Education',
    hours: 36,
    verificationCode: 'EKL-2026-EDU-045',
    status: 'Verified'
  }
];

const mockAnnouncements = [
  {
    id: 'ann-1',
    title: 'Weekend Animal Vaccination & Rabies Prevention Camp',
    date: 'September 22, 2026',
    author: 'Animal Welfare Coordinator',
    category: 'Animal Care',
    priority: 'High',
    content: 'Volunteers are requested to gather at Central Lawn by 8:30 AM with safety gloves and hydration kits.'
  },
  {
    id: 'ann-2',
    title: 'Village Evening School: Mid-Semester Stationary Drive',
    date: 'September 20, 2026',
    author: 'Education Cell',
    category: 'Child Education',
    priority: 'Normal',
    content: 'Collection of notebooks, pencils, and geometry boxes will be coordinated at Student Activity Centre.'
  },
  {
    id: 'ann-3',
    title: 'Quarterly General Body Meeting & Core Committee Induction',
    date: 'September 25, 2026',
    author: 'President Office',
    category: 'General',
    priority: 'Important',
    content: 'All active student members across 1st, 2nd, 3rd, and 4th years are invited to attend at Main Auditorium.'
  }
];

/**
 * @route   GET /api/portal/dashboard
 * @desc    Get aggregated member overview (ownership verified)
 * @access  Private (Authenticated User)
 */
router.get('/dashboard', async (req, res) => {
  try {
    const user = req.user;
    const email = user.email.toLowerCase();

    // Fetch user's registrations
    const myRegistrations = mockRegistrations.filter(
      (r) => r.userId === user._id.toString() || r.userEmail.toLowerCase() === email
    );

    // Fetch user's attendance
    const myAttendance = mockAttendance.filter(
      (a) => a.userId === user._id.toString() || a.userEmail.toLowerCase() === email
    );

    // Fetch user's certificates
    const myCertificates = mockCertificates.filter(
      (c) => c.userId === user._id.toString() || c.userEmail.toLowerCase() === email
    );

    // Fetch user's donations
    let myDonations = [];
    try {
      myDonations = await Donation.find({ email }).sort({ createdAt: -1 });
    } catch {
      // offline fallback
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'registered_user',
        department: user.department || '',
        batch: user.batch || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
        createdAt: user.createdAt
      },
      stats: {
        totalRegistrations: myRegistrations.length,
        totalHoursVolunteered: myAttendance.reduce((acc, curr) => acc + curr.hoursLogged, 0),
        totalCertificates: myCertificates.length,
        totalDonations: myDonations.length
      },
      upcomingRegistrations: myRegistrations.slice(0, 3),
      recentAnnouncements: mockAnnouncements.slice(0, 3)
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load member dashboard', error: err.message });
  }
});

/**
 * @route   PUT /api/portal/profile
 * @desc    Update allowed profile fields for authenticated user
 * @access  Private (Authenticated User)
 */
router.put('/profile', async (req, res) => {
  try {
    const { name, department, batch, phone, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    if (name) user.name = name.trim();
    if (department !== undefined) user.department = department.trim();
    if (batch !== undefined) user.batch = batch.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email, // strictly non-editable
        role: user.role,
        department: user.department,
        batch: user.batch,
        phone: user.phone,
        avatar: user.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
});

/**
 * @route   GET /api/portal/events
 * @desc    Get upcoming public/online events for registration
 * @access  Private (Authenticated User)
 */
router.get('/events', (req, res) => {
  const events = [
    {
      id: 'event-1',
      title: 'Flood Relief & Ration Distribution Camp 2026',
      description: 'Distributing food kits and medicines to flood-affected families near Haldia riverside.',
      date: 'October 12, 2026',
      time: '09:00 AM - 02:00 PM',
      location: 'Haldia Riverside Ghat',
      type: 'Physical Drive',
      category: 'Community Welfare',
      registrationOpen: true
    },
    {
      id: 'event-2',
      title: 'Free Evening School: Science & Math Mentorship',
      description: 'Interactive STEM mentorship sessions for rural primary students.',
      date: 'October 18, 2026',
      time: '04:00 PM - 06:30 PM',
      location: 'Debhog Village Community Hall',
      type: 'Physical Drive',
      category: 'Child Education',
      registrationOpen: true
    },
    {
      id: 'event-3',
      title: 'Animal Care & First-Aid Protocol Webinar',
      description: 'Online certified training session on emergency canine care and wound dressing.',
      date: 'October 25, 2026',
      time: '06:00 PM - 07:30 PM',
      location: 'Google Meet (Live Online)',
      type: 'Online Webinar',
      category: 'Animal Welfare',
      registrationOpen: true
    }
  ];
  res.json(events);
});

/**
 * @route   POST /api/portal/events/:id/register
 * @desc    Register authenticated user for an event (ownership verified)
 * @access  Private (Authenticated User)
 */
router.post('/events/:id/register', (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const email = user.email.toLowerCase();

  const existing = mockRegistrations.find(
    (r) => r.eventId === id && (r.userId === user._id.toString() || r.userEmail.toLowerCase() === email)
  );

  if (existing) {
    return res.status(400).json({ message: 'You have already registered for this event.' });
  }

  const newReg = {
    id: `reg-${Date.now()}`,
    userId: user._id.toString(),
    userEmail: email,
    eventId: id,
    eventTitle: req.body.eventTitle || 'Eklavya Society Event',
    date: req.body.date || 'Upcoming 2026',
    location: req.body.location || 'HIT Haldia',
    status: 'Confirmed',
    registeredAt: new Date().toISOString(),
    category: req.body.category || 'General'
  };

  mockRegistrations.push(newReg);
  res.status(201).json({
    message: 'Registration confirmed successfully!',
    registration: newReg
  });
});

/**
 * @route   GET /api/portal/my-registrations
 * @desc    Get user's own event registrations
 * @access  Private (Authenticated User)
 */
router.get('/my-registrations', (req, res) => {
  const user = req.user;
  const email = user.email.toLowerCase();

  const userRegs = mockRegistrations.filter(
    (r) => r.userId === user._id.toString() || r.userEmail.toLowerCase() === email
  );

  res.json(userRegs);
});

/**
 * @route   GET /api/portal/my-attendance
 * @desc    Get user's personal attendance records
 * @access  Private (Authenticated User)
 */
router.get('/my-attendance', (req, res) => {
  const user = req.user;
  const email = user.email.toLowerCase();

  const userAttendance = mockAttendance.filter(
    (a) => a.userId === user._id.toString() || a.userEmail.toLowerCase() === email
  );

  res.json({
    records: userAttendance,
    summary: {
      totalDrives: userAttendance.length,
      totalHours: userAttendance.reduce((acc, curr) => acc + curr.hoursLogged, 0),
      verifiedRate: '100%'
    }
  });
});

/**
 * @route   GET /api/portal/my-certificates
 * @desc    Get user's personal certificates
 * @access  Private (Authenticated User)
 */
router.get('/my-certificates', (req, res) => {
  const user = req.user;
  const email = user.email.toLowerCase();

  const userCerts = mockCertificates.filter(
    (c) => c.userId === user._id.toString() || c.userEmail.toLowerCase() === email
  );

  res.json(userCerts);
});

/**
 * @route   GET /api/portal/announcements
 * @desc    Get public approved announcements
 * @access  Private (Authenticated User)
 */
router.get('/announcements', (req, res) => {
  res.json(mockAnnouncements);
});

/**
 * @route   GET /api/portal/my-donations
 * @desc    Get user's own donation history (strictly matched by email)
 * @access  Private (Authenticated User)
 */
router.get('/my-donations', async (req, res) => {
  const email = req.user.email.toLowerCase();
  try {
    const userDonations = await Donation.find({ email }).sort({ createdAt: -1 });
    res.json(userDonations);
  } catch {
    res.json([]);
  }
});

export default router;
