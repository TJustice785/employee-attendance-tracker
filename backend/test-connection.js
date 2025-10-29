const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });

console.log('Testing MySQL connection...');
console.log('Config:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectTimeout: 10000
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.code, err.message);
    console.error('Full error:', err);
    process.exit(1);
  }
  
  console.log('✅ Connected successfully!');
  
  connection.query('SELECT * FROM attendance LIMIT 5', (err, results) => {
    if (err) {
      console.error('❌ Query failed:', err.message);
    } else {
      console.log('✅ Query successful! Found', results.length, 'records');
      console.log('Sample record:', results[0]);
    }
    connection.end();
  });
});
