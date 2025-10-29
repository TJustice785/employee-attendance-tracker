# 🔌 API Documentation

Base URL: `http://localhost:5000/api`

---

## 📋 Endpoints

### 1. Get All Attendance Records

```http
GET /attendance
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "id": 1,
      "employeeName": "Liteboho Mokhachane",
      "employeeID": "EMP001",
      "date": "2024-10-27",
      "status": "Present",
      "timestamp": "2024-10-29T20:02:41.000Z"
    }
  ]
}
```

---

### 2. Get Attendance by ID

```http
GET /attendance/:id
```

**Parameters:**
- `id` (path) - Attendance record ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "employeeName": "Liteboho Mokhachane",
    "employeeID": "EMP001",
    "date": "2024-10-27",
    "status": "Present"
  }
}
```

---

### 3. Create Attendance Record

```http
POST /attendance
```

**Request Body:**
```json
{
  "employeeName": "Liteboho Mokhachane",
  "employeeID": "EMP001",
  "date": "2024-10-29",
  "status": "Present"
}
```

**Validation:**
- All fields are required
- `status` must be "Present" or "Absent"

**Response:**
```json
{
  "success": true,
  "message": "Attendance recorded successfully",
  "data": {
    "id": 16,
    "employeeName": "Liteboho Mokhachane",
    "employeeID": "EMP001",
    "date": "2024-10-29",
    "status": "Present"
  }
}
```

---

### 4. Update Attendance Record

```http
PUT /attendance/:id
```

**Parameters:**
- `id` (path) - Attendance record ID

**Request Body:**
```json
{
  "employeeName": "Liteboho Mokhachane",
  "employeeID": "EMP001",
  "date": "2024-10-29",
  "status": "Absent"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Attendance updated successfully",
  "data": {
    "id": 1,
    "employeeName": "Liteboho Mokhachane",
    "employeeID": "EMP001",
    "date": "2024-10-29",
    "status": "Absent"
  }
}
```

---

### 5. Delete Attendance Record

```http
DELETE /attendance/:id
```

**Parameters:**
- `id` (path) - Attendance record ID

**Response:**
```json
{
  "success": true,
  "message": "Attendance record deleted successfully"
}
```

---

### 6. Get Statistics

```http
GET /attendance/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 15,
    "present": 9,
    "absent": 6
  }
}
```

---

### 7. Search Attendance

```http
GET /attendance/search?q={searchTerm}
```

**Query Parameters:**
- `q` (required) - Search term (searches employeeName and employeeID)

**Example:**
```
GET /attendance/search?q=Liteboho
GET /attendance/search?q=EMP001
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "employeeName": "Liteboho Mokhachane",
      "employeeID": "EMP001",
      "date": "2024-10-27",
      "status": "Present"
    }
  ]
}
```

---

### 8. Get Attendance by Employee ID

```http
GET /attendance/employee/:employeeId
```

**Parameters:**
- `employeeId` (path) - Employee ID (e.g., "EMP001")

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "employeeName": "Liteboho Mokhachane",
      "employeeID": "EMP001",
      "date": "2024-10-27",
      "status": "Present"
    }
  ]
}
```

---

### 9. Get Attendance by Date

```http
GET /attendance/date/:date
```

**Parameters:**
- `date` (path) - Date in format YYYY-MM-DD

**Example:**
```
GET /attendance/date/2024-10-29
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 11,
      "employeeName": "Liteboho Mokhachane",
      "employeeID": "EMP001",
      "date": "2024-10-29",
      "status": "Present"
    }
  ]
}
```

---

## ❌ Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Codes:

- `400` - Bad Request (validation failed)
- `404` - Not Found (record doesn't exist)
- `500` - Internal Server Error

### Example Error:
```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

## 🧪 Testing with cURL

### Get all records:
```bash
curl http://localhost:5000/api/attendance
```

### Create record:
```bash
curl -X POST http://localhost:5000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "employeeName": "Thabo Masilo",
    "employeeID": "EMP006",
    "date": "2024-10-29",
    "status": "Present"
  }'
```

### Get statistics:
```bash
curl http://localhost:5000/api/attendance/stats
```

### Search:
```bash
curl http://localhost:5000/api/attendance/search?q=Liteboho
```

### Delete record:
```bash
curl -X DELETE http://localhost:5000/api/attendance/1
```

---

## 🔒 CORS Configuration

The API accepts requests from:
- `http://localhost:3000` (frontend)
- Credentials are enabled

---

## 📊 Data Format

### Date Format:
- Request: `YYYY-MM-DD` (e.g., "2024-10-29")
- Response: ISO 8601 format

### Status Values:
- `"Present"` - Employee was present
- `"Absent"` - Employee was absent

### Timestamp:
- Automatically generated on record creation
- ISO 8601 format with timezone

---

**Happy Coding! 🚀**
