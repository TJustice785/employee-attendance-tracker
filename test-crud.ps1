# CRUD Operations Test Script
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TESTING ALL CRUD OPERATIONS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:5000/api/attendance"
$testId = $null

# 1. CREATE (POST)
Write-Host "[1/5] Testing CREATE (POST)..." -ForegroundColor Yellow
try {
    $createData = @{
        employeeName = "CRUD Test User"
        employeeID = "TEST999"
        date = "2024-10-29"
        status = "Present"
    } | ConvertTo-Json
    
    $result = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $createData -ContentType "application/json"
    $testId = $result.data.id
    Write-Host "  ✓ SUCCESS: Created record with ID: $testId" -ForegroundColor Green
    Write-Host "  Employee: $($result.data.employeeName) ($($result.data.employeeID))" -ForegroundColor White
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 2. READ ALL (GET)
Write-Host "`n[2/5] Testing READ ALL (GET)..." -ForegroundColor Yellow
try {
    $all = Invoke-RestMethod -Uri $baseUrl -Method Get
    Write-Host "  ✓ SUCCESS: Retrieved $($all.count) total records" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. READ BY ID (GET)
Write-Host "`n[3/5] Testing READ BY ID (GET)..." -ForegroundColor Yellow
try {
    $single = Invoke-RestMethod -Uri "$baseUrl/$testId" -Method Get
    Write-Host "  ✓ SUCCESS: Retrieved record ID $testId" -ForegroundColor Green
    Write-Host "  Employee: $($single.data.employeeName)" -ForegroundColor White
    Write-Host "  Status: $($single.data.status)" -ForegroundColor White
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. UPDATE (PUT)
Write-Host "`n[4/5] Testing UPDATE (PUT)..." -ForegroundColor Yellow
try {
    $updateData = @{
        employeeName = "CRUD Test User UPDATED"
        employeeID = "TEST999"
        date = "2024-10-29"
        status = "Absent"
    } | ConvertTo-Json
    
    $updated = Invoke-RestMethod -Uri "$baseUrl/$testId" -Method Put -Body $updateData -ContentType "application/json"
    Write-Host "  ✓ SUCCESS: Updated record ID $testId" -ForegroundColor Green
    Write-Host "  New Name: $($updated.data.employeeName)" -ForegroundColor White
    Write-Host "  New Status: $($updated.data.status)" -ForegroundColor White
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. DELETE
Write-Host "`n[5/5] Testing DELETE..." -ForegroundColor Yellow
try {
    $deleted = Invoke-RestMethod -Uri "$baseUrl/$testId" -Method Delete
    Write-Host "  ✓ SUCCESS: $($deleted.message)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# BONUS: Test Search
Write-Host "`n[BONUS] Testing SEARCH..." -ForegroundColor Yellow
try {
    $search = Invoke-RestMethod -Uri "$baseUrl/search?q=Liteboho" -Method Get
    Write-Host "  ✓ SUCCESS: Found $($search.count) matching records" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# BONUS: Test Stats
Write-Host "`n[BONUS] Testing STATISTICS..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "$baseUrl/stats" -Method Get
    Write-Host "  ✓ SUCCESS: Statistics retrieved" -ForegroundColor Green
    Write-Host "  Total: $($stats.data.total) | Present: $($stats.data.present) | Absent: $($stats.data.absent)" -ForegroundColor White
} catch {
    Write-Host "  ✗ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  ALL CRUD OPERATIONS TESTED!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
