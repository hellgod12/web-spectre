# Logo Optimization Guide for SPECTRE

## Overview
The SPECTRE website uses a single logo system to maintain consistent brand identity across all pages and contexts. The same logo appears everywhere: homepage, collection page, loading screen, and mobile devices.

## Single Logo Strategy

### Logo File (`logo.svg`)
**Purpose:** Used throughout the entire website
**Sizes displayed:**
- Hero section: 240px width (desktop)
- Loading screen: 200px width
- Mobile: Responsive (scales with container)

**Characteristics:**
- Single brand identity maintained everywhere
- Black-metal aesthetic preserved
- Optimized for web rendering
- Transparent background
- Dark charcoal (#111111) artwork
- High contrast for readability on #F4F1EB background

**Usage:**
- Homepage hero section (index.html)
- Collection page hero (collection.html)
- Loading screens (index.html, catalog.html)
- Mobile devices (responsive sizing)

## Technical Specifications

### File Format
- **Format:** SVG (Scalable Vector Graphics)
- **Why SVG:** Crisp at any size, smaller file size, perfect for web
- **Fallback:** If SVG not possible, use PNG at 2x resolution

### Color
- **Artwork:** #111111 (dark charcoal)
- **Background:** Transparent (no background color)
- **Stroke Width:** Minimum 1px for readability at all sizes

### Size Guidelines
The logo must remain readable at these widths:
- 120px (small mobile)
- 160px (loading screen)
- 240px (hero section)
- 320px (large displays)

## Creation Process

### Step 1: Open Current Logo
Open `assets/images/logo.png` in your vector editor (Illustrator, Figma, Inkscape, etc.)

### Step 2: Optimize for Web
1. Remove any white background completely
2. Set artwork color to #111111
3. Ensure stroke width is at least 1px
4. Optimize SVG code (remove unnecessary elements, reduce file size)
5. Ensure proper viewBox for scaling
6. Export as `logo.svg`

### Step 3: Quality Testing
Test the logo at all target sizes:
- 120px width
- 160px width
- 240px width
- 320px width

Ensure:
- Text remains readable at all sizes
- Strokes are visible
- No details disappear at small sizes
- Brand identity is preserved
- Black-metal aesthetic maintained
- Transparent background works correctly

## File Placement
Place the file in: `assets/images/`
- `logo.svg`

## Code Implementation (Already Complete)

The website code uses the same logo everywhere:

**Hero Sections:**
```html
<img src="assets/images/logo.svg" alt="SPECTRE" class="profile-image">
```

**Loading Screens:**
```html
<img src="assets/images/logo.svg" alt="SPECTRE" class="loading-logo">
```

**Responsive Sizing:**
The logo automatically scales based on CSS:
- Desktop hero: 240px container
- Loading screen: 200px container
- Mobile: Responsive sizing

## Verification Checklist

After creating the logo:
- [ ] Logo readable at 320px width
- [ ] Logo readable at 240px width
- [ ] Logo readable at 160px width
- [ ] Logo readable at 120px width
- [ ] Logo has transparent background
- [ ] Logo uses #111111 color
- [ ] Logo exported as SVG
- [ ] File placed in `assets/images/`
- [ ] Loading screen displays logo correctly
- [ ] Hero section displays logo correctly
- [ ] Mobile displays logo correctly
- [ ] No white background visible on #F4F1EB

## Common Issues & Solutions

**Issue:** Logo appears blurry at small sizes
**Solution:** Ensure stroke width is at least 1px, increase if needed

**Issue:** Fine details disappear at small sizes
**Solution:** Simplify details that are smaller than 2px, or increase stroke width

**Issue:** Logo has white background
**Solution:** Ensure background is set to transparent before export

**Issue:** SVG not displaying
**Solution:** Verify file path is correct and SVG is valid

**Issue:** Logo looks different on different pages
**Solution:** Ensure same SVG file is used everywhere (logo.svg)

## Responsive Sizing Strategy

If readability becomes poor at very small sizes (below 120px), use responsive sizing instead of a different logo:

```css
@media (max-width: 480px) {
    .profile-image-container {
        width: 180px;
        height: 180px;
    }
}
```

This maintains brand consistency while ensuring readability.

## Goal
A visitor should always see the same SPECTRE logo everywhere on the website. The final result should feel cohesive, premium, and fully integrated with the website aesthetic while maintaining the underground black-metal identity and ensuring readability at all sizes.
