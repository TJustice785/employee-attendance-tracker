# 🚀 Render Deployment Guide

## Complete Guide to Deploy Your Attendance Tracker

---

## 📋 Prerequisites

1. **GitHub Account** - To host your code
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MySQL Database** - Either:
   - Use Render's MySQL (paid)
   - Or external MySQL service (Railway, PlanetScale, etc.)

---

## 🗂️ Step 1: Prepare Your Repository

### 1.1 Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Attendance Tracker"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/attendance-tracker.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Set Up Database

### Option A: External MySQL (Recommended for Free Tier)

**Using Railway (Free):**
1. Go to [railway.app](https://railway.app)
2. Create new project → Add MySQL
3. Copy connection details:
   - Host
   - Username
   - Password
   - Database name
   - Port

**Using PlanetScale (Free):**
1. Go to [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string

### Option B: Render MySQL (Paid)
1. In Render dashboard
2. New → PostgreSQL/MySQL
3. Note connection details

---

## 🔧 Step 3: Deploy Backend

### 3.1 Create Backend Service

1. **Go to Render Dashboard**
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:

```
Name: attendance-tracker-api
Region: Oregon (or closest)
Branch: main
Root Directory: backend
Environment: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### 3.2 Add Environment Variables

Click **"Environment"** tab and add:

```
DB_HOST=your-mysql-host.com
DB_USER=your-mysql-username
DB_PASSWORD=your-mysql-password
DB_NAME=attendance_db
DB_PORT=3306
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.onrender.com
```

### 3.3 Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://attendance-tracker-api.onrender.com`

### 3.4 Set Up Database Tables

**Option 1: Using MySQL Client**
```bash
mysql -h your-host -u your-user -p your-database < database_setup_corrected.sql
```

**Option 2: Via phpMyAdmin/Database GUI**
- Copy contents of `database_setup_corrected.sql`
- Paste and execute in your database tool

---

## 🎨 Step 4: Deploy Frontend

### 4.1 Update Frontend API URL

1. Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://attendance-tracker-api.onrender.com/api
```

2. Commit and push:
```bash
git add .
git commit -m "Update production API URL"
git push
```

### 4.2 Create Frontend Service

1. **Render Dashboard** → **"New +"** → **"Static Site"**
2. Connect same repository
3. Configure:

```
Name: attendance-tracker-frontend
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: build
Plan: Free
```

### 4.3 Add Environment Variable

Click **"Environment"** tab:
```
REACT_APP_API_URL=https://attendance-tracker-api.onrender.com/api
```

### 4.4 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for build (5-10 minutes)
3. Your app will be live at: `https://attendance-tracker-frontend.onrender.com`

---

## 🔄 Step 5: Update Backend CORS

### 5.1 Update CLIENT_URL in Backend

In Render backend environment variables:
```
CLIENT_URL=https://attendance-tracker-frontend.onrender.com
```

### 5.2 Trigger Redeploy

- Go to backend service
- Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ Step 6: Test Your Deployment

### 6.1 Test Backend
```bash
curl https://attendance-tracker-api.onrender.com
# Should return: {"message": "Attendance Tracker API Running!"}
```

### 6.2 Test Frontend
1. Visit: `https://attendance-tracker-frontend.onrender.com`
2. Try all features:
   - ✅ View records
   - ✅ Add attendance
   - ✅ Search/filter
   - ✅ Analytics dashboard
   - ✅ Export data

---

## 🐛 Troubleshooting

### Backend Won't Start

**Check Logs:**
- Render dashboard → Your service → Logs

**Common Issues:**
1. **Database connection failed**
   - Verify DB credentials
   - Check DB host is accessible
   - Ensure DB exists and tables created

2. **Port already in use**
   - Render handles ports automatically
   - Ensure `PORT` env var is set

3. **Module not found**
   - Check `package.json` dependencies
   - Trigger manual redeploy

### Frontend Build Fails

**Common Issues:**
1. **API URL not set**
   - Add `REACT_APP_API_URL` environment variable
   - Must start with `REACT_APP_`

2. **Build timeout**
   - Reduce dependencies if possible
   - Check for build errors in logs

3. **Missing files**
   - Ensure all components are committed
   - Check `.gitignore` isn't excluding needed files

### CORS Errors

**Solution:**
1. Update `CLIENT_URL` in backend env vars
2. Must match frontend URL exactly
3. Include `https://` protocol
4. No trailing slash

---

## 🔒 Security Checklist

- ✅ Environment variables set (not hardcoded)
- ✅ Database credentials secure
- ✅ CORS configured properly
- ✅ No sensitive data in git
- ✅ `.env` files in `.gitignore`

---

## 💰 Cost Breakdown

### Free Tier:
- **Backend:** Free (sleeps after 15 min inactivity)
- **Frontend:** Free
- **Database:** 
  - Railway: Free 500MB
  - PlanetScale: Free 5GB
  - Render MySQL: Paid ($7/month)

### Notes:
- Free services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Upgrade to paid for always-on service

---

## 🚀 Quick Deploy Summary

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 2. Backend on Render
- New Web Service
- Connect repo (backend folder)
- Add DB env vars
- Deploy

# 3. Run database setup
mysql -h HOST -u USER -p DB < database_setup_corrected.sql

# 4. Frontend on Render
- New Static Site
- Connect repo (frontend folder)
- Add API_URL env var
- Deploy

# 5. Update backend CORS
- Set CLIENT_URL to frontend URL
- Redeploy backend

# Done! 🎉
```

---

## 📚 Useful Commands

### Redeploy Backend:
```bash
git add .
git commit -m "Update backend"
git push
# Render auto-deploys
```

### Redeploy Frontend:
```bash
git add .
git commit -m "Update frontend"
git push
# Render auto-builds
```

### View Logs:
- Render Dashboard → Service → Logs tab

### Environment Variables:
- Render Dashboard → Service → Environment tab

---

## 🎯 Next Steps

After successful deployment:

1. **Custom Domain (Optional)**
   - Render Dashboard → Settings → Custom Domain
   - Add your domain (e.g., attendance.yourdomain.com)

2. **HTTPS**
   - Automatic with Render
   - Free SSL certificate

3. **Monitoring**
   - Check logs regularly
   - Set up uptime monitoring (UptimeRobot)

4. **Backups**
   - Backup database regularly
   - Export data via CSV feature

---

## 📞 Support Resources

- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Render Community:** [community.render.com](https://community.render.com)
- **Status Page:** [status.render.com](https://status.render.com)

---

## ✨ Your URLs

After deployment, save these:

```
Backend API: https://attendance-tracker-api.onrender.com
Frontend App: https://attendance-tracker-frontend.onrender.com
Database: your-database-host:3306
```

---

**🎉 Congratulations! Your app is now live on Render!** 🚀

Share your live URL with others and start tracking attendance online!
