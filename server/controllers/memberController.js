import Member from '../models/Member.js';

/**
 * Get all members
 * Route: GET /api/members
 * Access: Public
 */
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
