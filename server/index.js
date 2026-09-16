import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

// Import our route files
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import alumniRoutes from './routes/alumniRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize the Express application
const app = express();

// Middleware
// cors() allows our frontend (running on a different port) to make requests to this backend
app.use(cors());
// express.json() allows us to parse incoming JSON data in the request body (req.body)
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.send('Eklavya Dummy API is running...');
});

// Mount routes
// Any request to /api/auth/... will be handled by authRoutes
app.use('/api/auth', authRoutes);
// Any request to /api/events/... will be handled by eventRoutes
app.use('/api/events', eventRoutes);
// Any request to /api/members/... will be handled by memberRoutes
app.use('/api/members', memberRoutes);
// Any request to /api/alumni/... will be handled by alumniRoutes
app.use('/api/alumni', alumniRoutes);
// Any request to /api/donations/... will be handled by donationRoutes
app.use('/api/donations', donationRoutes);

// Error Handling Middleware (fallback for undefined routes)
app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

// Custom error handler for throwing JSON errors instead of HTML pages
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // Provide stack trace only in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
