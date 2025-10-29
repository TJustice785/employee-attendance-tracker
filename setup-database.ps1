# Setup MySQL Database
Write-Host "[*] Setting up Attendance Tracker Database..." -ForegroundColor Cyan
Write-Host ""

$mysqlPath = "mysql"
$username = "root"
$password = "admin@123"
$sqlFile = "database_setup_corrected.sql"

# Check if MySQL is accessible
Write-Host "[*] Testing MySQL connection..." -ForegroundColor Yellow
$testResult = & $mysqlPath -u $username -p"$password" -e "SELECT 1;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] MySQL connection successful" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Cannot connect to MySQL" -ForegroundColor Red
    Write-Host "Please ensure MySQL is installed and running" -ForegroundColor Yellow
    exit 1
}

# Run the SQL setup file
Write-Host ""
Write-Host "[*] Creating database and tables..." -ForegroundColor Cyan

Get-Content $sqlFile | & $mysqlPath -u $username -p"$password" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] Database setup completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Database Details:" -ForegroundColor Cyan
    Write-Host "  Database: attendance_db" -ForegroundColor White
    Write-Host "  Table: attendance" -ForegroundColor White
    Write-Host "  Sample records: 15 inserted" -ForegroundColor White
} else {
    Write-Host "[WARNING] Database setup completed with warnings" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[NEXT] Start the backend server with 'npm start'" -ForegroundColor Green
