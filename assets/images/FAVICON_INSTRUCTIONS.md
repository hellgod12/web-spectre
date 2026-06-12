# Favicon Instructions

## Required Favicon Files

Create the following favicon files from your SPECTRE logo:

1. **favicon.ico** - 32x32px or 16x16px (ICO format)
2. **favicon-32x32.png** - 32x32px (PNG format)
3. **favicon-16x16.png** - 16x16px (PNG format)
4. **apple-touch-icon.png** - 180x180px (PNG format)

## How to Create Favicons

### Option 1: Online Favicon Generator (Recommended)
1. Visit: https://favicon.io/ or https://realfavicongenerator.net/
2. Upload your SPECTRE logo (logo.png)
3. Select the sizes you need
4. Download the generated files
5. Place them in `assets/images/` folder

### Option 2: Using Image Editing Software
1. Open your SPECTRE logo in Photoshop, GIMP, or similar
2. Resize to the required dimensions:
   - 16x16px for favicon-16x16.png
   - 32x32px for favicon-32x32.png
   - 180x180px for apple-touch-icon.png
3. Export as PNG with transparency
4. Use an online tool to convert PNG to ICO format for favicon.ico

### Option 3: Command Line (ImageMagick)
If you have ImageMagick installed:
```bash
# Convert logo to different sizes
convert assets/images/logo.png -resize 16x16 assets/images/favicon-16x16.png
convert assets/images/logo.png -resize 32x32 assets/images/favicon-32x32.png
convert assets/images/logo.png -resize 180x180 assets/images/apple-touch-icon.png
convert assets/images/logo.png -resize 32x32 assets/images/favicon.ico
```

## File Placement

Place all favicon files in the `assets/images/` folder:
```
assets/images/
├── logo.png
├── favicon.ico
├── favicon-32x32.png
├── favicon-16x16.png
└── apple-touch-icon.png
```

## Design Tips

- Keep the design simple at small sizes
- Ensure good contrast on dark backgrounds
- Test on different browsers
- The SPECTRE logo should remain recognizable at 16x16px

## Browser Support

The favicon meta tags in index.html support:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS Safari, Chrome Mobile)
- Desktop taskbar and tab icons
