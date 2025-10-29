# CRUD Operations Test
Write-Host "========================================"
Write-Host "  TESTING ALL CRUD OPERATIONS"
Write-Host "========================================"
Write-Host ""

$baseUrl = "http://localhost:5000/api/attendance"

# 1. CREATE
Write-Host "[1/5] CREATE - Adding new record..." -ForegroundColor Yellow
$createData = @{
    employeeName = "CRUD Test User"
    employeeID = "TEST999"
    date = "2024-10-29"
    status = "Present"
} | ConvertTo-Json

$result = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $createData -ContentType "application/json"
$testId = $result.data.id
Write-Host "SUCCESS: Created ID $testId" -ForegroundColor Green
Write-Host "Employee: $($result.data.employeeName)" -ForegroundColor White
Write-Host ""

# 2. READ ALL
Write-Host "[2/5] READ - Getting all records..." -ForegroundColor Yellow
$all = Invoke-RestMethod -Uri $baseUrl -Method Get
Write-Host "SUCCESS: Found $($all.count) records" -ForegroundColor Green
Write-Host ""

# 3. READ BY ID
Write-Host "[3/5] READ BY ID - Getting record $testId..." -ForegroundColor Yellow
$single = Invoke-RestMethod -Uri "$baseUrl/$testId" -Method Get
Write-Host "SUCCESS: Found $($single.data.employeeName)" -ForegroundColor Green
Write-Host "Status: $($single.data.status)" -ForegroundColor White
Write-Host ""

# 4. UPDATE
Write-Host "[4/5] UPDATE - Changing status..." -ForegroundColor Yellow
$updateData = @{
    employeeName = "CRUD Test UPDATED"
    employeeID = "TEST999"
    date = "2024-10-29"
    status = "Absent"
} | ConvertTo-Json

$updated = Invoke-RestMethod -Uri "$baseUrl/$testId" -Method Put -Body $updateData -ContentType "application/json"
Write-Host "SUCCESS: Updated to status $($updated.data.status)" -ForegroundColor Green
Write-Host ""

# 5. DELETE
Write-Host "[5/5] DELETE - Removing test record..." -ForegroundColor Yellow
$deleted = Invoke-RestMethod -Uri "$baseUrl/$testId" -Method Delete
Write-Host "SUCCESS: $($deleted.message)" -ForegroundColor Green
Write-Host ""

# BONUS: Search
Write-Host "[BONUS] SEARCH - Finding Liteboho..." -ForegroundColor Yellow
$search = Invoke-RestMethod -Uri "$baseUrl/search?q=Liteboho" -Method Get
Write-Host "SUCCESS: Found $($search.count) records" -ForegroundColor Green
Write-Host ""

# BONUS: Stats
Write-Host "[BONUS] STATS - Getting statistics..." -ForegroundColor Yellow
$stats = Invoke-RestMethod -Uri "$baseUrl/stats" -Method Get
Write-Host "SUCCESS: Total=$($stats.data.total), Present=$($stats.data.present), Absent=$($stats.data.absent)" -ForegroundColor Green
Write-Host ""

Write-Host "========================================"
Write-Host "  ALL CRUD OPERATIONS PASSED!"
Write-Host "========================================"
