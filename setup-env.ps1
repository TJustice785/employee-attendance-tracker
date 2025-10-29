# Setup Backend Environment Variables
$envContent = @"
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin@123
DB_NAME=attendance_db
DB_PORT=3306
"@

$envPath = "backend\.env"
$envContent | Out-File -FilePath $envPath -Encoding utf8 -NoNewline

Write-Host "✅ Backend .env file created successfully!" -ForegroundColor Green
Write-Host "Database credentials configured:" -ForegroundColor Cyan
Write-Host "  Host: localhost" -ForegroundColor White
Write-Host "  User: root" -ForegroundColor White
Write-Host "  Database: attendance_db" -ForegroundColor White
