import express from 'express';
import { Alumni } from '../models/Alumni.js';
import { protect } from '../middleware/auth.js';
import { requireActiveAdmin, requirePermission } from '../middleware/rbac.js';

const router = express.Router();

// GET all alumni
router.get('/', async (req, res) => {
  try {
    const list = await Alumni.find().sort({ createdAt: -1 });
    if (list.length === 0) {
      // Return default dataset if database is empty
      return res.json([
        {
          _id: '1',
          name: 'Rahul Sharma',
          batch: '2020-2024',
          department: 'Computer Science & Engg.',
          currentRole: 'Software Engineer',
          company: 'Microsoft',
          quote: 'Eklavya taught me empathy and teamwork. Managing free school sessions made me a better leader.',
          linkedin: 'https://linkedin.com'
        },
        {
          _id: '2',
          name: 'Ananya Roy',
          batch: '2021-2025',
          department: 'Information Technology',
          currentRole: 'Frontend Developer',
          company: 'Amazon',
          quote: 'Working on Eklavya tech initiatives gave me practical full-stack experience.',
          linkedin: 'https://linkedin.com'
        },
        {
          _id: '3',
          name: 'Subham Mukherjee',
          batch: '2020-2024',
          department: 'Electronics & Comm. Engg.',
          currentRole: 'Systems Engineer',
          company: 'TCS Innovation Labs',
          quote: 'The animal rescue drives taught me kindness that I carry everywhere.',
          linkedin: 'https://linkedin.com'
        },
        {
          _id: '4',
          name: 'Priyanka Das',
          batch: '2022-2026',
          department: 'Chemical Engineering',
          currentRole: 'Operations Analyst',
          company: 'Reliance Industries',
          quote: 'Being part of Eklavya was the highlight of my college life at HIT.',
          linkedin: 'https://linkedin.com'
        }
      ]);
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create alumni (Admin only)
router.post('/', protect, requireActiveAdmin, requirePermission('alumni', 'create'), async (req, res) => {
  try {
    const newAlumni = new Alumni(req.body);
    const saved = await newAlumni.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
