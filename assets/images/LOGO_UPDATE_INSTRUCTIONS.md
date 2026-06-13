# Logo Update Instructions for Bone-White Editorial Design

## Current State
The logo currently uses a black background block inside a white circular container, which creates unnecessary visual contrast and feels disconnected from the new premium aesthetic.

## Required Changes

### Logo Image File (assets/images/logo.png)
You need to update the actual PNG image file with the following specifications:

**Color Changes:**
- Change the logo artwork color from black to dark charcoal (#111111)
- Remove the black square/rectangle background block completely
- Make the background transparent (PNG with alpha channel)

**Design Requirements:**
- Keep the gothic "SPECTRE" artwork unchanged
- Remove any circular containers or borders from the image itself
- Ensure the logo is sharp and high-contrast for readability on bone-white background
- The logo should be a clean, transparent PNG with just the dark charcoal artwork

**Technical Specifications:**
- Format: PNG with transparency
- Color: #111111 (dark charcoal) for the artwork
- Background: Transparent
- Size: Maintain current dimensions or optimize for web (recommended: 200x200px minimum)
- Resolution: 72 DPI (web standard)

### How to Update the Logo

**Option 1: Using Image Editing Software (Photoshop, GIMP, etc.)**
1. Open `assets/images/logo.png` in your image editor
2. Select and remove the black background block
3. Change the artwork color to #111111 (dark charcoal)
4. Delete any circular containers or borders
5. Export as PNG with transparency
6. Replace the original file

**Option 2: Using Online Tools**
1. Use a tool like remove.bg or similar to remove the black background
2. Use a color replacement tool to change black to #111111
3. Export as transparent PNG
4. Replace the original file

**Option 3: Recreate from Source**
If you have the original vector file (AI, SVG, etc.):
1. Open the source file
2. Change fill color to #111111
3. Remove any background elements
4. Export as PNG with transparency
5. Replace the original file

## CSS Changes Already Applied
The following CSS updates have been made to support the new logo system:

- Removed circular border-radius from profile images
- Hidden the profile-ring circular border
- Reduced container size from 160px to 140px for better proportions
- Made drop-shadow more subtle (0 2px 8px rgba(17, 17, 17, 0.06))
- Ensured consistent styling across loading screen and profile sections

## Verification
After updating the logo image:
1. Check that the logo displays correctly on the landing page
2. Verify the loading screen logo matches the main logo
3. Ensure the logo is readable on the bone-white background (#F2EFE8)
4. Test on different screen sizes for responsiveness

## Favicon Updates
The favicon files (favicon-32x32.png, favicon-16x16.png, favicon.ico, apple-touch-icon.png) are currently referenced but don't exist. After updating the main logo, create favicon versions using the same dark charcoal color on transparent background.

## Expected Result
A unified logo system that feels premium, minimal, editorial, and consistent across the entire Spectre experience with:
- Transparent background
- Dark charcoal (#111111) artwork
- No circular containers or borders
- Sharp contrast on bone-white background
- Consistent appearance across all pages
