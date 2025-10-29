# ⚡ Quick Reference Guide

## 🚀 Quick Start Commands

### Start Everything:
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend  
cd frontend && npm start
```

### URLs:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Docs:** http://localhost:5000

---

## 📝 Common Tasks

### Add Attendance:
1. Click "Mark Attendance"
2. Fill in all fields
3. Click "Add Attendance"

### Search Employee:
- Type name or ID in search box
- Results filter automatically

### View Statistics:
- Check the cards at top of dashboard
- Updates in real-time

### Delete Record:
- Click 🗑️ icon on any row
- Confirm deletion

---

## 🔧 Troubleshooting Quick Fixes

### Backend won't start?
```bash
cd backend
npm install
# Check MySQL is running
npm start
```

### Frontend won't load?
```bash
cd frontend
npm install
# Clear cache: Ctrl+Shift+Delete
npm start
```

### Database issues?
- Open MySQL Workbench
- Run: `database_setup_corrected.sql`
- Check .env file has correct password

---

## 📊 Sample Employees

| Name | ID | Sample Use |
|------|-----|-----------|
| Liteboho Mokhachane | EMP001 | Search: "Liteboho" |
| Mpho Nthabiseng | EMP002 | Search: "EMP002" |
| Teboho Lebesa | EMP003 | Filter by date |
| Masechaba Ramainoane | EMP004 | View history |
| Khotso Mofokeng | EMP005 | Test delete |

---

## 🧪 Quick API Tests

```powershell
# Get all records
Invoke-RestMethod http://localhost:5000/api/attendance

# Get statistics
Invoke-RestMethod http://localhost:5000/api/attendance/stats

# Search
Invoke-RestMethod "http://localhost:5000/api/attendance/search?q=Liteboho"

# Run full test suite
.\TEST_API.ps1
```

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `backend/.env` | Database credentials |
| `backend/server.js` | Backend entry point |
| `frontend/src/App.jsx` | Main React component |
| `database_setup_corrected.sql` | Database setup |
| `USER_GUIDE.md` | Full user manual |
| `API_DOCUMENTATION.md` | API reference |

---

## 🎯 Key Features Checklist

- ✅ Add attendance
- ✅ View all records
- ✅ Update records
- ✅ Delete records
- ✅ Search employees
- ✅ Filter by date
- ✅ View statistics
- ✅ Real-time updates
- ✅ Mobile responsive
- ✅ Error notifications

---

## 💡 Pro Tips

1. **Keep both terminals running** (backend + frontend)
2. **Use search for quick access** to specific employees
3. **Check statistics cards** for overview
4. **Date filter is optional** - leave blank for all records
5. **Notifications disappear** after 3 seconds automatically

---

## 🆘 Need Help?

1. Check terminal logs for errors
2. Open browser console (F12)
3. Verify MySQL is running
4. Review `USER_GUIDE.md`
5. Check `API_DOCUMENTATION.md`

---

## 📞 System Status Check

```powershell
# Check if backend is running
curl http://localhost:5000

# Check if frontend is running
curl http://localhost:3000

# Check MySQL
netstat -ano | findstr :3306

# Run API tests
.\TEST_API.ps1
```

---

**Everything you need at a glance! 🚀**
