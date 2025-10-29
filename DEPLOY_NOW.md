# 🚀 Deploy to Render - Quick Checklist

## ✅ Prerequisites Done
- [x] Code pushed to GitHub: https://github.com/TJustice785/employee-attendance-tracker
- [x] All files committed and synced

## 📋 Deployment Steps

### STEP 1: Set Up Free Database (5 minutes)

**Option A: Railway (Recommended)**
1. Go to: https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Provision MySQL"
4. Click on MySQL → "Connect" tab
5. **Copy these values:**
   - `MYSQL_HOST`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`
   - `MYSQL_PORT`

**Option B: PlanetScale**
1. Go to: https://planetscale.com
2. Create free database
3. Get connection credentials

---

### STEP 2: Deploy Backend to Render (10 minutes)

1. Go to: https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"** → Select: `employee-attendance-tracker`
4. Configure:
   ```
   Name: attendance-backend
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   DB_HOST = [paste from Railway]
   DB_USER = [paste from Railway]
   DB_PASSWORD = [paste from Railway]
   DB_NAME = [paste from Railway or use: attendance_db]
   DB_PORT = [paste from Railway or use: 3306]
   NODE_ENV = production
   CLIENT_URL = https://attendance-frontend.onrender.com
   ```

6. Click **"Create Web Service"**
7. ⏳ Wait 5-10 minutes for deployment
8. **Copy your backend URL:** `https://attendance-backend.onrender.com`

---

### STEP 3: Set Up Database Tables (3 minutes)

**Option 1: Using Railway Dashboard**
1. Go back to Railway → Your MySQL instance
2. Click "Query" tab
3. Copy and paste contents from `database_setup_corrected.sql`
4. Click "Execute"

**Option 2: Using MySQL Workbench/CLI**
```bash
mysql -h [DB_HOST] -u [DB_USER] -p[DB_PASSWORD] [DB_NAME] < database_setup_corrected.sql
```

---

### STEP 4: Update Frontend Config & Push (2 minutes)

Update `frontend/.env.production` with your actual backend URL:

```env
REACT_APP_API_URL=https://attendance-backend.onrender.com/api
```

Then commit and push:
```powershell
git add frontend/.env.production
git commit -m "Update production API URL"
git push
```

---

### STEP 5: Deploy Frontend to Render (10 minutes)

1. Go to Render Dashboard → **"New +"** → **"Static Site"**
2. Select: `employee-attendance-tracker`
3. Configure:
   ```
   Name: attendance-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

4. **Add Environment Variable:**
   ```
   REACT_APP_API_URL = https://attendance-backend.onrender.com/api
   ```

5. Click **"Create Static Site"**
6. ⏳ Wait 5-10 minutes for build
7. **Your app is LIVE!** 🎉

---

### STEP 6: Update Backend CORS (2 minutes)

1. Go to your backend service on Render
2. Click "Environment" tab
3. Update `CLIENT_URL` to match your frontend URL:
   ```
   CLIENT_URL = https://attendance-frontend.onrender.com
   ```
4. Click "Save Changes"
5. Render will automatically redeploy

---

## 🎯 Your Live URLs

After deployment:
- **Frontend:** https://attendance-frontend.onrender.com
- **Backend API:** https://attendance-backend.onrender.com
- **Database:** [Your Railway/PlanetScale URL]

---

## ✅ Test Your Deployment

1. Visit your frontend URL
2. Add a test attendance record
3. View the dashboard
4. Try filtering and exporting

---

## ⚠️ Important Notes

- **Free tier sleeps after 15 min** - First request takes 30-60 seconds
- **Both services must use same database** - Use the credentials from Step 1
- **Check logs if errors** - Render Dashboard → Service → Logs
- **Auto-deploys on push** - Future git pushes will trigger redeployment

---

## 🐛 Quick Troubleshooting

**Backend won't start?**
- Check logs in Render dashboard
- Verify database credentials
- Ensure database tables are created

**Frontend shows errors?**
- Verify `REACT_APP_API_URL` is set correctly
- Check backend is running
- Update `CLIENT_URL` in backend

**CORS errors?**
- `CLIENT_URL` must match frontend URL exactly
- Include `https://`
- No trailing slash

---

## 📞 Need Help?

- Render Status: https://status.render.com
- Railway Docs: https://docs.railway.app
- Check your logs first!

---

**Ready to deploy? Follow the steps above! 🚀**

Estimated total time: **30-40 minutes**
