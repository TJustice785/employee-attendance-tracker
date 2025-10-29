# 🎯 Employee Attendance Tracker

A full-stack web application for tracking and managing employee attendance records. Built with React, Node.js, Express, and MySQL.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- ✅ Add, edit, and delete attendance records
- 📊 Real-time statistics dashboard
- 🔍 Search employees by name
- 📅 Filter records by date range
- 📱 Responsive design
- 🎨 Modern UI with Lucide icons
- 🚀 RESTful API

## 🛠️ Tech Stack

### Frontend
- React 18
- Axios for API calls
- Lucide React icons
- Tailwind-inspired CSS

### Backend
- Node.js
- Express.js
- MySQL2
- dotenv for environment variables
- CORS enabled

### Database
- MySQL 8.0

## 📋 Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v5.7 or higher)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
cd C:\Users\JUSTICE\Downloads\Attendance
```

### 2. Setup Database

Open MySQL and run:

```bash
mysql -u root -p < database_setup.sql
```

Or manually create the database:
1. Open MySQL Workbench or command line
2. Copy and paste the contents of `database_setup.sql`
3. Execute the queries

### 3. Setup Backend

```bash
cd backend
npm install
```

Configure the `.env` file with your database credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=attendance_db
```

Start the backend server:

```bash
npm run dev
```

The API will run on `http://localhost:5000`

### 4. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Configure the `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start
```

The application will open at `http://localhost:3000`

## 🐳 Docker Setup (Alternative)

If you prefer using Docker:

```bash
docker-compose up -d
```

This will start:
- MySQL database on port 3306
- Backend API on port 5000
- Frontend app on port 3000

## 📁 Project Structure

```
employee-attendance-tracker/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   └── attendanceController.js  # Business logic
│   ├── models/
│   │   └── attendanceModel.js   # Database queries
│   ├── routes/
│   │   └── attendanceRoutes.js  # API routes
│   ├── middleware/
│   │   └── errorHandler.js      # Error handling
│   ├── .env                     # Environment variables
│   ├── server.js                # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AttendanceForm.jsx
│   │   │   ├── AttendanceDashboard.jsx
│   │   │   └── StatsCard.jsx
│   │   ├── services/
│   │   │   └── api.js           # API service
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── database_setup.sql           # Database schema
├── docker-compose.yml          # Docker configuration
└── README.md
```

## 🔌 API Endpoints

### Attendance Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance` | Get all attendance records |
| GET | `/api/attendance/:id` | Get attendance by ID |
| POST | `/api/attendance` | Create new attendance record |
| PUT | `/api/attendance/:id` | Update attendance record |
| DELETE | `/api/attendance/:id` | Delete attendance record |
| GET | `/api/attendance/stats` | Get attendance statistics |
| GET | `/api/attendance/search?name=` | Search by employee name |
| GET | `/api/attendance/filter?startDate=&endDate=` | Filter by date range |

### Example Request

```bash
# Create attendance record
curl -X POST http://localhost:5000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "employee_name": "John Doe",
    "date": "2024-10-29",
    "check_in_time": "09:00:00",
    "check_out_time": "17:00:00",
    "status": "Present"
  }'
```

## 🎨 Features Breakdown

### Dashboard
- View all attendance records in a table
- Real-time statistics cards showing:
  - Total records
  - Present count
  - Absent count
  - Late arrivals

### Add/Edit Records
- Form to add new attendance records
- Edit existing records inline
- Validation for required fields
- Time picker for check-in/check-out

### Search & Filter
- Search employees by name
- Filter records by date range
- Real-time search results

### Delete Records
- Delete with confirmation dialog
- Immediate UI update

## 🔧 Configuration

### Backend Configuration (`.env`)

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=attendance_db
```

### Frontend Configuration (`.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Application

1. **Start both servers** (backend and frontend)
2. **Open** `http://localhost:3000`
3. **Add a new attendance record**:
   - Click "+ Add Attendance"
   - Fill in the form
   - Click "Add Attendance"
4. **Edit a record**: Click the edit icon
5. **Delete a record**: Click the trash icon
6. **Search**: Type an employee name in the search box

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Ensure MySQL is running and credentials in `.env` are correct

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution**: Change the port in backend `.env` or stop the process using that port

### Frontend Can't Connect to Backend
**Solution**: 
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Ensure CORS is enabled in backend

### Module Not Found
```
Error: Cannot find module
```
**Solution**: Run `npm install` in the respective directory

## 📈 Future Enhancements

- [ ] User authentication & authorization
- [ ] Export data to Excel/PDF
- [ ] Email notifications for absences
- [ ] Mobile app version
- [ ] Biometric integration
- [ ] Advanced reporting & analytics
- [ ] Multi-language support
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ for employee management

## 📞 Support

For issues or questions:
- Create an issue in the repository
- Contact: support@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MySQL team
- Lucide icons contributors

---

**Happy Coding! 🚀**
