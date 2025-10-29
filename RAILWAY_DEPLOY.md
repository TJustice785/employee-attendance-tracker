# 🚂 Railway Deployment Guide

## ⚠️ Important: You Need TWO Separate Services

Your project has both `backend/` and `frontend/` folders. Railway needs you to deploy them as **separate services**.

---

## 🗄️ STEP 1: Create MySQL Database (3 minutes)

1. **In your Railway dashboard**
2. Click **"+ New"** → **"Database"** → **"Add MySQL"**
3. Wait for it to provision
4. Click on the MySQL service
5. Go to **"Variables"** tab
6. **Copy these values:**
   - `MYSQL_HOST`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`
   - `MYSQL_PORT` (usually 3306)

---

## 🔧 STEP 2: Deploy Backend Service (5 minutes)

### 2.1 Create New Service
1. In Railway dashboard, click **"+ New"**
2. Select **"GitHub Repo"**
3. Choose: `employee-attendance-tracker`
4. Railway will try to deploy but **it will fail** - that's expected

### 2.2 Configure Backend
1. Click on the failed service
2. Go to **"Settings"** tab
3. **Set Root Directory:**
   - Scroll to **"Root Directory"**
   - Enter: `backend`
   - Click "Update"

4. **Set Build Command (if needed):**
   - Build Command: `npm install`
   - Start Command: `npm start`

### 2.3 Add Environment Variables
1. Go to **"Variables"** tab
2. Click **"+ New Variable"** and add these:

```
DB_HOST = [paste MYSQL_HOST from Step 1]
DB_USER = [paste MYSQL_USER from Step 1]
DB_PASSWORD = [paste MYSQL_PASSWORD from Step 1]
DB_NAME = [paste MYSQL_DATABASE from Step 1]
DB_PORT = [paste MYSQL_PORT from Step 1]
NODE_ENV = production
CLIENT_URL = https://[your-frontend-url].up.railway.app
```

**Note:** You'll update `CLIENT_URL` after deploying the frontend

### 2.4 Deploy
1. Click **"Deployments"** tab
2. Click **"Redeploy"** (top right)
3. Wait 2-5 minutes
4. Once deployed, go to **"Settings"** → **"Networking"**
5. Click **"Generate Domain"**
6. **Copy your backend URL:** `https://[service-name].up.railway.app`

---

## 📊 STEP 3: Setup Database Tables (3 minutes)

### Option 1: Using Railway Query Tab
1. Go to your MySQL database service
2. Click **"Query"** tab
3. Copy the entire contents of `database_setup_corrected.sql` from your repo
4. Paste into the query window
5. Click **"Execute"**

### Option 2: Using MySQL Client
```bash
mysql -h [MYSQL_HOST] -u [MYSQL_USER] -p[MYSQL_PASSWORD] [MYSQL_DATABASE] < database_setup_corrected.sql
```

---

## 🎨 STEP 4: Deploy Frontend Service (5 minutes)

### 4.1 Create Another Service
1. In Railway dashboard, click **"+ New"** again
2. Select **"GitHub Repo"**
3. Choose the **SAME** repository: `employee-attendance-tracker`

### 4.2 Configure Frontend
1. Click on this new service
2. Go to **"Settings"** tab
3. **Set Root Directory:**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Start Command: Leave empty (static site)

### 4.3 Add Environment Variable
1. Go to **"Variables"** tab
2. Add:
```
REACT_APP_API_URL = https://[backend-url].up.railway.app/api
```
Use the backend URL from Step 2.4

### 4.4 Deploy
1. Click **"Deploy"**
2. Wait 5-10 minutes for build
3. Once deployed, go to **"Settings"** → **"Networking"**
4. Click **"Generate Domain"**
5. **Your app is LIVE!** 🎉

---

## 🔄 STEP 5: Update Backend CORS (2 minutes)

1. Go back to your **backend service**
2. Click **"Variables"** tab
3. Update `CLIENT_URL` with your actual frontend URL:
```
CLIENT_URL = https://[frontend-url].up.railway.app
```
4. Railway will automatically redeploy

---

## ✅ Testing Your Deployment

Visit your frontend URL:
- Add attendance records
- View dashboard
- Test filtering
- Try exporting data

---

## 📋 Your Railway Setup Summary

You should now have **3 services** in Railway:

1. **MySQL Database**
   - Type: Database
   - Purpose: Store attendance data

2. **Backend API**
   - Root Directory: `backend`
   - URL: `https://[backend].up.railway.app`
   - Connected to MySQL

3. **Frontend App**
   - Root Directory: `frontend`
   - URL: `https://[frontend].up.railway.app`
   - Connected to Backend

---

## 🐛 Troubleshooting

### Backend deployment fails
- Check **Logs** tab for errors
- Verify Root Directory is set to `backend`
- Ensure all environment variables are set
- Check database connection

### Frontend build fails
- Verify Root Directory is set to `frontend`
- Check `REACT_APP_API_URL` is set
- Look at build logs for specific errors

### Database connection errors
- Verify MySQL service is running
- Check database credentials match exactly
- Ensure database tables are created

### CORS errors
- Update `CLIENT_URL` in backend to match frontend URL
- Include full URL with `https://`
- No trailing slash

---

## 💰 Railway Free Tier

- **$5 free credits per month**
- Enough for small projects
- Services sleep after inactivity
- Upgrade for production use

---

## 🎯 Alternative: Use Render Instead

If Railway is confusing or you run out of credits, follow `DEPLOY_NOW.md` for Render deployment.

**Render offers:**
- Completely free tier (no credit card)
- Similar setup process
- Auto-deploys on git push

---

## ✨ Your Live URLs

Save these after deployment:

```
Frontend: https://[your-frontend].up.railway.app
Backend:  https://[your-backend].up.railway.app
Database: [Railway MySQL connection]
```

---

**🎉 You're ready to deploy on Railway!**

Start with Step 1 and work through each step carefully.
