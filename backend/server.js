const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Only load .env in development (Railway injects env vars in production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
}

const { testConnection, initializeDatabase } = require('./config/database');
const attendanceRoutes = require('./routes/attendanceRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Employee Attendance Tracker API',
    version: '1.0.0',
    endpoints: {
      attendance: '/api/attendance',
      stats: '/api/attendance/stats',
      search: '/api/attendance/search?q=term',
      byDate: '/api/attendance/date/:date',
      byEmployee: '/api/attendance/employee/:employeeId'
    }
  });
});

// API Routes
app.use('/api/attendance', attendanceRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('Failed to connect to database. Please check your .env configuration.');
      process.exit(1);
    }

    // Initialize database tables
    await initializeDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║  🚀 Server Status: RUNNING            ║
║  📡 Port: ${PORT}                        ║
║  📊 Environment: ${process.env.NODE_ENV || 'development'}         ║
║  🌐 URL: http://localhost:${PORT}       ║
║  📚 API Docs: http://localhost:${PORT}  ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});
