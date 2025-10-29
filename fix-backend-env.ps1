# Fix Backend Environment - Try different host configurations
$envContent = @"
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database Configuration - Using 127.0.0.1 instead of localhost
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=admin@123
DB_NAME=attendance_db
DB_PORT=3306
"@

$envPath = "backend\.env"
$envContent | Out-File -FilePath $envPath -Encoding utf8 -NoNewline

Write-Host "[SUCCESS] Backend .env updated with 127.0.0.1" -ForegroundColor Green
Write-Host "Trying 127.0.0.1 instead of localhost to avoid IPv6 issues" -ForegroundColor Cyan
