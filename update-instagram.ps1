# Script untuk otomatis update instagram.json dengan images dari folder
# Run script ini setelah upload images baru ke assets/images/instagram/

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$instagramFolder = Join-Path $scriptDir "assets/images/instagram"
$jsonFile = Join-Path $scriptDir "instagram.json"

# Check jika folder ada
if (-not (Test-Path $instagramFolder)) {
    Write-Host "Error: Folder $instagramFolder tidak ditemukan!" -ForegroundColor Red
    exit 1
}

# Get semua image files dari folder
$imageExtensions = @("*.jpg", "*.jpeg", "*.png", "*.gif", "*.webp")
$images = @()
foreach ($ext in $imageExtensions) {
    $found = Get-ChildItem -Path $instagramFolder -Filter $ext -File -ErrorAction SilentlyContinue
    if ($found) {
        $images += $found
    }
}
$images = $images | Sort-Object Name

if ($images.Count -eq 0) {
    Write-Host "Warning: Tidak ada images ditemukan di $instagramFolder" -ForegroundColor Yellow
    # Buat empty instagram.json
    $jsonContent = @{
        photos = @()
    } | ConvertTo-Json -Depth 10
    $jsonContent | Out-File -FilePath $jsonFile -Encoding utf8
    Write-Host "instagram.json telah dibuat dengan array kosong" -ForegroundColor Green
    exit 0
}

# Build photos array
$photos = @()
foreach ($image in $images) {
    $imagePath = "assets/images/instagram/$($image.Name)"
    $photos += @{
        image = $imagePath
    }
}

# Build JSON object
$jsonContent = @{
    photos = $photos
} | ConvertTo-Json -Depth 10

# Write ke instagram.json
$jsonContent | Out-File -FilePath $jsonFile -Encoding utf8

Write-Host "Success: instagram.json telah diupdate dengan $($images.Count) images" -ForegroundColor Green
Write-Host "Images yang ditemukan:" -ForegroundColor Cyan
foreach ($image in $images) {
    Write-Host "  - $($image.Name)" -ForegroundColor White
}
