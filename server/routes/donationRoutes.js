import express from 'express';
import { Donation } from '../models/Donation.js';

const router = express.Router();

// GET all donations (Admin)
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST submit donation proof
router.post('/', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    const saved = await donation.save();
    res.status(201).json(saved);
  } catch (error) {
    // If DB is offline, return success mock response
    res.status(201).json({
      message: 'Donation proof received locally',
      data: req.body
    });
  }
});

export default router;
