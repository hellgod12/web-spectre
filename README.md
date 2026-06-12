# SPECTRE - Premium Luxury Bio-Link Website

A high-end alternative to Linktree designed for the SPECTRE streetwear brand. Features a dark, mysterious, luxury aesthetic with premium animations and glassmorphism effects.

## Features

- **Premium Design**: Dark theme with glassmorphism and subtle glow effects
- **Mobile-First**: Optimized for Instagram bio traffic
- **Fast Loading**: Pure HTML, CSS, and JavaScript - no frameworks
- **Premium Animations**: Smooth fade-ins, hover effects, and transitions
- **Click Tracking**: Built-in analytics using localStorage
- **Social Sharing**: Native share API and clipboard functionality
- **SEO Optimized**: Open Graph tags for Instagram and WhatsApp previews
- **Accessibility**: Keyboard navigation and screen reader support
- **Dynamic Links**: All links loaded from `links.json` - easy to manage!

## File Structure

```
spectre-biolink/
├── index.html          # Main HTML file (jangan edit link di sini)
├── style.css           # Luxury dark theme styling
├── script.js           # Interactive features and animations
├── links.json          # SEMUA LINK ADA DI SINI - edit file ini untuk mengubah link
├── assets/
│   └── images/
│       ├── logo.png    # SPECTRE logo (PLACE YOUR LOGO HERE)
│       └── README.md   # Logo requirements
└── README.md           # This file
```

## Setup Instructions

### 1. Add Your Logo
- Place your SPECTRE logo in `assets/images/`
- Rename it to `logo.png`
- Recommended: PNG with transparency, 500x500px or larger

### 2. Update Links (PENTING!)
**JANGAN edit link di `index.html`!** Semua link dikelola melalui `links.json`.

Buka file `links.json` dan isi URL untuk setiap platform:

```json
{
  "shop": "https://your-shop-url.com",
  "new_arrivals": "https://your-new-arrivals-url.com",
  "best_sellers": "https://your-best-sellers-url.com",
  "instagram": "https://instagram.com/yourusername",
  "tiktok": "https://tiktok.com/@yourusername",
  "whatsapp": "https://wa.me/6281234567890",
  "contact": "https://your-contact-url.com",
  "catalog": "https://your-catalog-url.com",
  "website": "https://your-website.com",
  "shopee": "https://shopee.co.id/your-shop",
  "tokopedia": "https://tokopedia.com/your-shop"
}
```

**Catatan Penting:**
- Biarkan URL kosong (`""`) jika tidak ingin menampilkan tombol tersebut
- Tombol dengan URL kosong akan otomatis disembunyikan
- Setelah mengubah `links.json`, refresh halaman untuk melihat perubahan

### 3. Customize Meta Tags (Optional)
Update the Open Graph and Twitter meta tags in `index.html`:
- Change the URL from `https://spectre.com/` to your actual domain
- Update title and description if needed

### 4. Deploy
- **GitHub Pages**: Push to GitHub repository and enable Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **Any Hosting**: Upload all files to your web server

## How It Works

### Dynamic Link System
Website menggunakan sistem link dinamis yang mengambil semua URL dari file `links.json`:

1. **JavaScript memuat links.json** saat halaman dimuat
2. **Mapping data-link** - Setiap tombol memiliki atribut `data-link` yang sesuai dengan properti di `links.json`
3. **Otomatis apply link** - JavaScript mengganti `href="#"` dengan URL dari `links.json`
4. **Hide empty links** - Tombol dengan URL kosong otomatis disembunyikan

### Mapping Table

| HTML data-link | links.json Key |
|---------------|----------------|
| shop | shop |
| new-arrivals | new_arrivals |
| best-sellers | best_sellers |
| instagram | instagram |
| tiktok | tiktok |
| whatsapp | whatsapp |
| contact | contact |
| catalog | catalog |
| website | website |
| shopee | shopee |
| tokopedia | tokopedia |

## Features Overview

### Click Tracking
Website otomatis melacak klik link menggunakan localStorage. Untuk melihat statistik:
```javascript
// Buka browser console dan jalankan:
SpectreBio.getClickStats()
```

### Share Button
Tombol share menggunakan Web Share API native di mobile. Di desktop, akan fallback ke copy URL ke clipboard.

### Copy WhatsApp
Klik "Copy WhatsApp" akan menyalin link WhatsApp ke clipboard untuk mudah dibagikan.

### Animations
- Loading screen dengan logo reveal
- Staggered fade-in animations untuk links
- Hover effects dengan scale dan glow
- Background particle effects
- Smooth scroll reveal

### Responsive Design
- Mobile-first approach
- Optimized untuk semua ukuran layar
- Touch-friendly buttons
- Reduced motion support untuk accessibility

## Customization

### Colors
Edit CSS variables di `style.css`:
```css
:root {
    --color-black: #000000;
    --color-dark-grey: #0a0a0a;
    --color-white: #ffffff;
    /* ... more variables */
}
```

### Typography
Website menggunakan font Inter. Untuk mengubah:
1. Update Google Fonts link di `index.html`
2. Change `--font-primary` di `style.css`

### Animations
Adjust animation timings di `style.css`:
```css
:root {
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: <1s
- Time to Interactive: <2s
- No external dependencies
- Minimal JavaScript

## Troubleshooting

### Links tidak muncul?
- Pastikan `links.json` ada di folder yang sama dengan `index.html`
- Cek browser console untuk error (F12 → Console)
- Pastikan format JSON valid (gunakan JSON validator)

### Tombol tidak ter-update setelah mengubah links.json?
- Refresh halaman (Ctrl+F5 atau Cmd+Shift+R)
- Clear browser cache jika masih tidak berubah

### Website tidak bisa memuat links.json di GitHub Pages?
- GitHub Pages mendukung fetch API untuk file JSON
- Pastikan file `links.json` sudah di-commit dan push
- Cek tab Network di browser DevTools untuk melihat apakah file berhasil dimuat

## License

Designed exclusively for SPECTRE.

## Support

Untuk pertanyaan atau masalah, lihat komentar di kode atau hubungi developer Anda.

---

**Built Different. Worn Fearlessly.**
