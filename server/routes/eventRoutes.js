import express from 'express';
import { getEvents, createEvent } from '../controllers/eventController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// GET all events is a public route
router.get('/', getEvents);

// POST a new event is a protected admin-only route
router.post('/', protect, admin, createEvent);

export default router;
