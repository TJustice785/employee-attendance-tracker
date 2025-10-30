# Seed Sample Data to Railway Database
$apiUrl = "https://observant-enthusiasm-production.up.railway.app/api/attendance"

$attendanceData = @(
    @{ employeeName = "Liteboho Mokhachane"; employeeID = "EMP001"; date = "2024-10-27"; status = "Present" },
    @{ employeeName = "Mpho Nthabiseng"; employeeID = "EMP002"; date = "2024-10-27"; status = "Absent" },
    @{ employeeName = "Teboho Lebesa"; employeeID = "EMP003"; date = "2024-10-27"; status = "Present" },
    @{ employeeName = "Masechaba Ramainoane"; employeeID = "EMP004"; date = "2024-10-27"; status = "Absent" },
    @{ employeeName = "Khotso Mofokeng"; employeeID = "EMP005"; date = "2024-10-27"; status = "Present" },
    @{ employeeName = "Liteboho Mokhachane"; employeeID = "EMP001"; date = "2024-10-28"; status = "Absent" },
    @{ employeeName = "Mpho Nthabiseng"; employeeID = "EMP002"; date = "2024-10-28"; status = "Present" },
    @{ employeeName = "Teboho Lebesa"; employeeID = "EMP003"; date = "2024-10-28"; status = "Present" },
    @{ employeeName = "Masechaba Ramainoane"; employeeID = "EMP004"; date = "2024-10-28"; status = "Present" },
    @{ employeeName = "Khotso Mofokeng"; employeeID = "EMP005"; date = "2024-10-28"; status = "Absent" }
)

Write-Host "Seeding attendance data to Railway database..." -ForegroundColor Cyan
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($record in $attendanceData) {
    $json = $record | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Body $json -ContentType "application/json"
        Write-Host "Added: $($record.employeeName) - $($record.date) - $($record.status)" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host "Failed: $($record.employeeName) - $($record.date)" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
    
    Start-Sleep -Milliseconds 200
}

Write-Host ""
Write-Host "Successfully added: $successCount records" -ForegroundColor Green
Write-Host "Failed: $failCount records" -ForegroundColor Red
Write-Host ""
Write-Host "View records at: https://observant-enthusiasm-production.up.railway.app/api/attendance"
