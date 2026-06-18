import Event from '../models/Event.js';

/**
 * Get all events
 * Route: GET /api/events
 * Access: Public
 */
export const getEvents = async (req, res) => {
  try {
    // Find all events and sort them by date (newest first)
    const events = await Event.find({}).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create a new event
 * Route: POST /api/events
 * Access: Private/Admin
 */
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user._id // Attached by the 'protect' middleware
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
