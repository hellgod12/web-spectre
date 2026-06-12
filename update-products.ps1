# Script untuk otomatis update products.json dengan images dari folder
# Run script ini setelah upload images baru ke assets/images/products/

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$productsFolder = Join-Path $scriptDir "assets/images/products"
$jsonFile = Join-Path $scriptDir "products.json"

# Check jika folder ada
if (-not (Test-Path $productsFolder)) {
    Write-Host "Error: Folder $productsFolder tidak ditemukan!" -ForegroundColor Red
    exit 1
}

# Get semua category folders
$categories = @("decks", "apparel", "stickers", "accessories")

# Build products array
$allProducts = @()
$featuredProducts = @()
$productId = 1

foreach ($category in $categories) {
    $categoryFolder = Join-Path $productsFolder $category
    
    if (Test-Path $categoryFolder) {
        # Get semua image files dari category folder
        $imageExtensions = @("*.jpg", "*.jpeg", "*.png", "*.gif", "*.webp")
        $images = @()
        foreach ($ext in $imageExtensions) {
            $found = Get-ChildItem -Path $categoryFolder -Filter $ext -File -ErrorAction SilentlyContinue
            if ($found) {
                $images += $found
            }
        }
        $images = $images | Sort-Object Name
        
        # Add ke products array
        foreach ($image in $images) {
            $imagePath = "assets/images/products/$category/$($image.Name)"
            
            # Generate product name berdasarkan category
            $productName = switch ($category) {
                "decks" { "SPECTRE Skateboard Deck" }
                "apparel" { "SPECTRE Streetwear" }
                "stickers" { "SPECTRE Sticker" }
                "accessories" { "SPECTRE Accessory" }
                default { "SPECTRE Product" }
            }
            
            # Generate description berdasarkan category
            $description = switch ($category) {
                "decks" { "Premium maple skateboard deck dengan custom graphic" }
                "apparel" { "Premium streetwear apparel dengan SPECTRE branding" }
                "stickers" { "Premium vinyl sticker dengan SPECTRE design" }
                "accessories" { "Premium skate accessory dengan SPECTRE branding" }
                default { "Premium product dari SPECTRE" }
            }
            
            # Generate price berdasarkan category
            $price = switch ($category) {
                "decks" { "Rp 450.000" }
                "apparel" { "Rp 350.000" }
                "stickers" { "Rp 50.000" }
                "accessories" { "Rp 150.000" }
                default { "Rp 0" }
            }
            
            $product = @{
                id = $productId
                name = $productName
                category = $category
                price = $price
                image = $imagePath
                description = $description
            }
            
            $allProducts += $product
            
            # Add 3 products pertama ke featured
            if ($allProducts.Count -le 3) {
                $featuredProducts += $product
            }
            
            $productId++
        }
    }
}

# Build JSON object
$jsonContent = @{
    featured = $featuredProducts
    products = $allProducts
    categories = @(
        @{
            id = "decks"
            name = "Decks"
            description = "Premium skateboards"
        },
        @{
            id = "apparel"
            name = "Apparel"
            description = "Streetwear clothing"
        },
        @{
            id = "stickers"
            name = "Stickers"
            description = "Vinyl stickers"
        },
        @{
            id = "accessories"
            name = "Accessories"
            description = "Skate accessories"
        }
    )
} | ConvertTo-Json -Depth 10

# Write ke products.json
$jsonContent | Out-File -FilePath $jsonFile -Encoding utf8

Write-Host "Success: products.json telah diupdate dengan $($allProducts.Count) products" -ForegroundColor Green
Write-Host "Featured products: $($featuredProducts.Count)" -ForegroundColor Cyan
Write-Host "Products per category:" -ForegroundColor Cyan
foreach ($category in $categories) {
    $count = ($allProducts | Where-Object { $_.category -eq $category }).Count
    Write-Host "  - $category : $count products" -ForegroundColor White
}
