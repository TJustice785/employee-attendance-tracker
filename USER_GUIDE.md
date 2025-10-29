# 📚 Employee Attendance Tracker - User Guide

## 🚀 Quick Start

### Starting the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Backend will run on: http://localhost:5000

2. **Start Frontend Application**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will open at: http://localhost:3000

---

## 🎯 Using the Application

### 1. **Dashboard View** (Default Screen)

When you open the application, you'll see:
- **Statistics Cards** at the top showing:
  - Total Records
  - Present Count
  - Absent Count
- **Search Bar** to find employees by name or ID
- **Date Filter** to view attendance for specific dates
- **Attendance Table** showing all records

#### Features Available in Dashboard:
- 📊 **View All Records** - See complete attendance history
- 🔍 **Search** - Type employee name or ID (e.g., "Liteboho" or "EMP001")
- 📅 **Filter by Date** - Select a date to see that day's attendance
- 🗑️ **Delete Records** - Click trash icon to remove a record
- 🔄 **Auto-refresh** - Data updates automatically after changes

---

### 2. **Mark Attendance**

Click the **"Mark Attendance"** button at the top to switch to the attendance form.

#### Form Fields:
1. **Employee Name** - Enter full name (e.g., "Liteboho Mokhachane")
2. **Employee ID** - Enter employee ID (e.g., "EMP001")
3. **Date** - Select the attendance date
4. **Status** - Choose Present or Absent

#### After Submission:
- ✅ Success notification appears
- 📊 Automatically switches back to Dashboard
- 🔄 Records list refreshes with new entry

---

## 🔍 Search & Filter Features

### **Search by Employee**
- Type in the search box at the top
- Searches both Employee Name and Employee ID
- Results update in real-time
- Case-insensitive search

**Examples:**
- Search "Liteboho" → Shows all records for Liteboho Mokhachane
- Search "EMP001" → Shows all records for employee with ID EMP001
- Search "Mpho" → Shows all Mpho Nthabiseng records

### **Filter by Date**
- Click the date picker in the dashboard
- Select any date to see that day's attendance
- Clear the date to see all records again

---

## 📊 Understanding Statistics

The dashboard shows three key metrics:

1. **Total Records** 📝
   - Total number of attendance entries in the system
   - Includes all employees across all dates

2. **Present Count** ✅
   - Number of "Present" status records
   - Shows current filtered results

3. **Absent Count** ❌
   - Number of "Absent" status records
   - Updates based on search/filter

---

## 🗑️ Deleting Records

1. Find the record you want to delete
2. Click the **trash icon** (🗑️) on the right side
3. Confirm the deletion
4. Record is removed immediately
5. Statistics update automatically

---

## 📱 Mobile-Friendly Design

The application is fully responsive:
- Works on phones, tablets, and desktops
- Touch-friendly buttons and inputs
- Adaptive layout for all screen sizes

---

## ⚡ Keyboard Shortcuts

- **Tab** - Navigate between form fields
- **Enter** - Submit form when focused
- **Esc** - Clear search (when in search box)

---

## 🎨 Visual Indicators

### Status Colors:
- 🟢 **Green badges** - Present status
- 🔴 **Red badges** - Absent status

### Notifications:
- ✅ **Green toast** - Success messages (top-right)
- ❌ **Red toast** - Error messages (top-right)

### Loading States:
- ⏳ **Spinner overlay** - When processing data
- "Processing..." message shown during operations

---

## 📝 Sample Data

The system comes pre-loaded with sample data:

**Employees:**
- Liteboho Mokhachane (EMP001)
- Mpho Nthabiseng (EMP002)
- Teboho Lebesa (EMP003)
- Masechaba Ramainoane (EMP004)
- Khotso Mofokeng (EMP005)

**Date Range:** October 27-29, 2024
**Total Records:** 15 entries

---

## 🔧 Troubleshooting

### Frontend Not Loading?
- Check if backend is running (http://localhost:5000)
- Verify no other app is using port 3000
- Clear browser cache and refresh

### Data Not Showing?
- Ensure MySQL database is running
- Check backend console for errors
- Verify database has data (run: `SELECT * FROM attendance;`)

### Can't Add Records?
- All fields are required
- Status must be "Present" or "Absent"
- Date must be in valid format
- Check browser console for errors

### Statistics Not Updating?
- Refresh the page
- Check if filters are applied
- Verify records exist in database

---

## 💡 Tips & Best Practices

1. **Daily Workflow:**
   - Start your day by marking all attendance
   - Use search to quickly find specific employees
   - Review statistics to track overall attendance

2. **Data Management:**
   - Regularly review and clean old records
   - Use date filter to view historical data
   - Keep employee IDs consistent

3. **Performance:**
   - System handles hundreds of records efficiently
   - Search is instant and responsive
   - Database is indexed for fast queries

---

## 🆘 Need Help?

- Check backend logs in terminal for server errors
- Check browser console (F12) for frontend errors
- Verify database connection in MySQL Workbench
- Ensure all environment variables are set correctly

---

## 📚 Additional Resources

- **Backend API:** http://localhost:5000
- **API Documentation:** http://localhost:5000 (health check endpoint)
- **Database:** attendance_db on MySQL port 3306

---

**Enjoy using the Employee Attendance Tracker! 🎉**
