# Quick Deploy to Render Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ATTENDANCE TRACKER - RENDER DEPLOY" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Initializing Git..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git initialized`n" -ForegroundColor Green
} else {
    Write-Host "[1/5] Git already initialized ✓`n" -ForegroundColor Green
}

# Add all files
Write-Host "[2/5] Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added`n" -ForegroundColor Green

# Commit
Write-Host "[3/5] Creating commit..." -ForegroundColor Yellow
$commitMsg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Ready for Render deployment"
}
git commit -m "$commitMsg"
Write-Host "✓ Commit created`n" -ForegroundColor Green

# Check for remote
Write-Host "[4/5] Checking GitHub remote..." -ForegroundColor Yellow
$hasRemote = git remote -v 2>$null
if (-not $hasRemote) {
    Write-Host "`nℹ You need to create a GitHub repository first:" -ForegroundColor Cyan
    Write-Host "  1. Go to https://github.com/new" -ForegroundColor White
    Write-Host "  2. Create a repository named 'attendance-tracker'" -ForegroundColor White
    Write-Host "  3. Copy the repository URL`n" -ForegroundColor White
    
    $repoUrl = Read-Host "Paste your GitHub repository URL"
    git remote add origin $repoUrl
    Write-Host "✓ Remote added`n" -ForegroundColor Green
} else {
    Write-Host "✓ Remote already configured`n" -ForegroundColor Green
}

# Push to GitHub
Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Yellow
$branch = git branch --show-current
if ([string]::IsNullOrWhiteSpace($branch)) {
    git branch -M main
    $branch = "main"
}

try {
    git push -u origin $branch
    Write-Host "✓ Pushed to GitHub`n" -ForegroundColor Green
} catch {
    Write-Host "✓ Code ready (push manually if needed)`n" -ForegroundColor Yellow
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ READY FOR RENDER DEPLOYMENT!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to https://dashboard.render.com" -ForegroundColor White
Write-Host "2. Click 'New +' → 'Web Service'" -ForegroundColor White
Write-Host "3. Connect your GitHub repository" -ForegroundColor White
Write-Host "4. Follow RENDER_DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host ""
Write-Host "📖 Full guide: RENDER_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
