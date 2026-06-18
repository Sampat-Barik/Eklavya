import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the URI stored in environment variables.
 * Mongoose acts as our ODM (Object Data Modeling) library, making it easy
 * to interact with MongoDB collections using JavaScript objects.
 */
export const connectDB = async () => {
  try {
    // Attempt to connect to the database
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure code if database connection fails
    process.exit(1);
  }
};
