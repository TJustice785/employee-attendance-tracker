# Local Setup Guide for Wings Cafe Inventory System

## Current Status
✅ Node.js v22.14.0 installed  
✅ Code pushed to GitHub  
⚠️ MySQL database needed  
⚠️ Environment configuration needed  

## Database Setup Options

### Option 1: Install MySQL Locally (Recommended for Development)
1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Install and set a root password
3. Create the database:
   ```sql
   CREATE DATABASE attendance_db;
   ```

### Option 2: Install Docker Desktop (Easiest)
1. Download Docker Desktop: https://www.docker.com/products/docker-desktop
2. Install and restart your computer
3. Run from project root:
   ```powershell
   docker-compose up -d
   ```
   This will automatically set up MySQL with the correct configuration.

### Option 3: Use Free Cloud MySQL (No Installation)
- **PlanetScale**: https://planetscale.com (Free tier available)
- **Railway**: https://railway.app (Free tier available)
- **Aiven**: https://aiven.io (Free tier available)

## Quick Start (After Database Setup)

### Step 1: Install Dependencies (Already Running)
```powershell
cd backend
npm install

cd ../frontend
npm install
```

### Step 2: Configure Backend Environment
Create `backend/.env` file:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=attendance_db
DB_PORT=3306
```

### Step 3: Set Up Database Tables
Run the database setup script:
```powershell
# If using local MySQL
mysql -u root -p attendance_db < database_setup.sql

# Or use the PowerShell script
./setup-database.ps1
```

### Step 4: Start Backend Server
```powershell
cd backend
npm start
# Backend will run on http://localhost:5000
```

### Step 5: Start Frontend (In a new terminal)
```powershell
cd frontend
npm start
# Frontend will run on http://localhost:3000
```

## Verify Installation

Once both servers are running:
1. Frontend: http://localhost:3000
2. Backend API: http://localhost:5000/api/attendance
3. Test the connection and start tracking attendance!

## Troubleshooting

### "Cannot connect to database"
- Verify MySQL is running
- Check credentials in `backend/.env`
- Ensure database `attendance_db` exists

### "Port already in use"
- Change PORT in `backend/.env` to another number (e.g., 5001)
- Update `frontend/src/services/api.js` to match

### Dependencies issues
```powershell
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Next Steps After Setup
- Access the application at http://localhost:3000
- Create your first attendance record
- View analytics and reports
- Export data to Excel/CSV

## Deploy to Production
See `RENDER_DEPLOYMENT_GUIDE.md` for deploying to Render.com (free tier available)
