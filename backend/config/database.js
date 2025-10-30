const mysql = require('mysql2');
const path = require('path');

// Only load .env in development (Railway injects env vars in production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

// Parse DATABASE_URL if available (Railway automatic service linking)
let dbConfig;
if (process.env.DATABASE_URL || process.env.MYSQL_URL) {
  const dbUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  console.log('Using DATABASE_URL for connection');
  dbConfig = {
    uri: dbUrl,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  };
} else {
  // Log connection config (without password)
  console.log('Database Config:', {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'attendance_db',
    port: process.env.DB_PORT || '3306'
  });
  
  dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'attendance_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  };
}

// Create connection pool for better performance
const pool = mysql.createPool(dbConfig);

// Get promise-based connection
const promisePool = pool.promise();

// Test database connection with retry logic
const testConnection = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting database connection (attempt ${i + 1}/${retries})...`);
      const connection = await promisePool.getConnection();
      console.log('✅ Database connected successfully');
      connection.release();
      return true;
    } catch (error) {
      console.error(`❌ Database connection failed (attempt ${i + 1}/${retries}):`, error.message);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error('❌ Failed to connect to database after all retries');
  return false;
};

// Initialize database tables
const initializeDatabase = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        employeeName VARCHAR(255) NOT NULL,
        employeeID VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        status ENUM('Present', 'Absent') NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_employeeID (employeeID),
        INDEX idx_date (date),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await promisePool.query(createTableQuery);
    console.log('✅ Attendance table initialized');
    return true;
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    return false;
  }
};

module.exports = { 
  promisePool, 
  testConnection, 
  initializeDatabase 
};
