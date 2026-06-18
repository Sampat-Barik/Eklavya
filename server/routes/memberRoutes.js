import express from 'express';
import { getMembers } from '../controllers/memberController.js';

const router = express.Router();

// GET all members is a public route
router.get('/', getMembers);

export default router;
