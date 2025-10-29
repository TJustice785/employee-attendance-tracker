# API Testing Script for Employee Attendance Tracker
# Run this script to test all API endpoints

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "  API ENDPOINT TESTING SUITE" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:5000/api/attendance"

# Test 1: Get All Records
Write-Host "[TEST 1] Getting all attendance records..." -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri $baseUrl -Method Get
    Write-Host "[SUCCESS] Found $($result.count) records" -ForegroundColor Green
    Write-Host "Sample: $($result.data[0].employeeName) - $($result.data[0].status)`n" -ForegroundColor White
} catch {
    Write-Host "[FAILED] $_`n" -ForegroundColor Red
}

# Test 2: Get Statistics
Write-Host "[TEST 2] Getting attendance statistics..." -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/stats" -Method Get
    Write-Host "[SUCCESS] Statistics retrieved" -ForegroundColor Green
    Write-Host "Total: $($result.data.total) | Present: $($result.data.present) | Absent: $($result.data.absent)`n" -ForegroundColor White
} catch {
    Write-Host "[FAILED] $_`n" -ForegroundColor Red
}

# Test 3: Search Records
Write-Host "[TEST 3] Searching for 'Liteboho'..." -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/search?q=Liteboho" -Method Get
    Write-Host "[SUCCESS] Found $($result.count) matching records" -ForegroundColor Green
    if ($result.count -gt 0) {
        Write-Host "Match: $($result.data[0].employeeName) - $($result.data[0].employeeID)`n" -ForegroundColor White
    }
} catch {
    Write-Host "[FAILED] $_`n" -ForegroundColor Red
}

# Test 4: Create New Record
Write-Host "[TEST 4] Creating new attendance record..." -ForegroundColor Yellow
try {
    $newRecord = @{
        employeeName = "Test Employee"
        employeeID = "TEST001"
        date = (Get-Date -Format "yyyy-MM-dd")
        status = "Present"
    }
    $body = $newRecord | ConvertTo-Json
    $result = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body -ContentType "application/json"
    $newId = $result.data.id
    Write-Host "[SUCCESS] Record created with ID: $newId" -ForegroundColor Green
    Write-Host "Employee: $($result.data.employeeName) - $($result.data.status)`n" -ForegroundColor White
    
    # Test 5: Get Record by ID
    Write-Host "[TEST 5] Getting record by ID ($newId)..." -ForegroundColor Yellow
    $result = Invoke-RestMethod -Uri "$baseUrl/$newId" -Method Get
    Write-Host "[SUCCESS] Record retrieved: $($result.data.employeeName)`n" -ForegroundColor Green
    
    # Test 6: Update Record
    Write-Host "[TEST 6] Updating record status to Absent..." -ForegroundColor Yellow
    $updateRecord = @{
        employeeName = "Test Employee"
        employeeID = "TEST001"
        date = (Get-Date -Format "yyyy-MM-dd")
        status = "Absent"
    }
    $body = $updateRecord | ConvertTo-Json
    $result = Invoke-RestMethod -Uri "$baseUrl/$newId" -Method Put -Body $body -ContentType "application/json"
    Write-Host "[SUCCESS] Record updated: Status is now $($result.data.status)`n" -ForegroundColor Green
    
    # Test 7: Delete Record
    Write-Host "[TEST 7] Deleting test record..." -ForegroundColor Yellow
    $result = Invoke-RestMethod -Uri "$baseUrl/$newId" -Method Delete
    Write-Host "[SUCCESS] $($result.message)`n" -ForegroundColor Green
    
} catch {
    Write-Host "[FAILED] $_`n" -ForegroundColor Red
}

# Test 8: Get by Date
Write-Host "[TEST 8] Getting records by date (2024-10-29)..." -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/date/2024-10-29" -Method Get
    Write-Host "[SUCCESS] Found $($result.count) records for that date`n" -ForegroundColor Green
} catch {
    Write-Host "[FAILED] $_`n" -ForegroundColor Red
}

# Test 9: Get by Employee ID
Write-Host "[TEST 9] Getting records for employee EMP001..." -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "$baseUrl/employee/EMP001" -Method Get
    Write-Host "[SUCCESS] Found $($result.count) records for EMP001" -ForegroundColor Green
    if ($result.count -gt 0) {
        Write-Host "Employee: $($result.data[0].employeeName)`n" -ForegroundColor White
    }
} catch {
    Write-Host "[FAILED] $_`n" -ForegroundColor Red
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "  TESTING COMPLETE!" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan
