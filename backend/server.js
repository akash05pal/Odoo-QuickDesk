import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes
import authRoutes from './routes/auth.js';
import ticketRoutes from './routes/tickets.js';
import replyRoutes from './routes/replies.js';
import categoryRoutes from './routes/categories.js';
import userRoutes from './routes/users.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

// Load env vars
dotenv.config({ path: './config.env' });

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/replies', replyRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'QuickDesk API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Initialize demo data
const initializeDemoData = async () => {
  try {
    const User = (await import('./models/User.js')).default;
    const Category = (await import('./models/Category.js')).default;
    
    // Check if demo users exist
    const existingUsers = await User.find({});
    if (existingUsers.length === 0) {
      // Create demo users
      const demoUsers = [
        {
          name: 'Akash',
          email: 'akash@gmail.com',
          password: 'password123',
          role: 'end_user'
        },
        {
          name: 'Harshita',
          email: 'harshita@quickdesk.com',
          password: 'password123',
          role: 'support_agent'
        },
        {
          name: 'Admin User',
          email: 'admin@quickdesk.com',
          password: 'password123',
          role: 'admin'
        }
      ];
      
      await User.insertMany(demoUsers);
      console.log('Demo users created');
    }
    
    // Check if demo categories exist
    const existingCategories = await Category.find({});
    if (existingCategories.length === 0) {
      // Create demo categories
      const demoCategories = [
        {
          name: 'Technical Support',
          description: 'Hardware and software issues'
        },
        {
          name: 'Account Issues',
          description: 'Login and account related problems'
        },
        {
          name: 'General Inquiry',
          description: 'General questions and information requests'
        }
      ];
      
      await Category.insertMany(demoCategories);
      console.log('Demo categories created');
    }
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await initializeDemoData();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`API URL: http://localhost:${PORT}/api`);
  });
};

startServer(); 