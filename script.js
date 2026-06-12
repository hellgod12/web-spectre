// ============================================
// SPECTRE - Premium Luxury Bio-Link Website
// Interactive Features & Animations
// ============================================

// Variabel global untuk menyimpan link dari links.json
let linksData = {};

// Fungsi utama yang dijalankan saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Load links dari links.json terlebih dahulu
    loadLinksFromJSON().then(() => {
        // Setelah links dimuat, inisialisasi semua fitur
        initLoadingScreen();
        applyLinksToButtons();
        initClickTracking();
        initScrollReveal();
        initShareButton();
        initCopyWhatsApp();
        initParticles();
        initSmoothScroll();
    }).catch(error => {
        console.error('Gagal memuat links.json:', error);
        // Tetap lanjutkan inisialisasi meskipun gagal memuat links.json
        initLoadingScreen();
        initClickTracking();
        initScrollReveal();
        initShareButton();
        initCopyWhatsApp();
        initParticles();
        initSmoothScroll();
    });
});

// ============================================
// FUNGSI UNTUK MEMUAT LINK DARI links.json
// ============================================

// Fungsi untuk memuat file links.json
async function loadLinksFromJSON() {
    try {
        const response = await fetch('links.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        linksData = await response.json();
        console.log('Links berhasil dimuat:', linksData);
        return linksData;
    } catch (error) {
        console.error('Gagal memuat links.json:', error);
        // Return object kosong jika gagal
        linksData = {};
        throw error;
    }
}

// Fungsi untuk menerapkan link ke tombol-tombol
function applyLinksToButtons() {
    // Mapping antara data-link dan nama properti di links.json
    const linkMapping = {
        'shop': 'shop',
        'new-arrivals': 'new_arrivals',
        'best-sellers': 'best_sellers',
        'instagram': 'instagram',
        'tiktok': 'tiktok',
        'whatsapp': 'whatsapp',
        'contact': 'contact',
        'catalog': 'catalog',
        'website': 'website',
        'shopee': 'shopee',
        'tokopedia': 'tokopedia'
    };
    
    // Loop melalui semua tombol link
    document.querySelectorAll('.link-button, .social-link').forEach(button => {
        const linkName = button.getAttribute('data-link');
        
        if (linkName && linkMapping[linkName]) {
            const jsonKey = linkMapping[linkName];
            const url = linksData[jsonKey];
            
            // Jika URL ada dan tidak kosong, terapkan ke tombol
            if (url && url.trim() !== '') {
                button.href = url;
                button.style.display = ''; // Pastikan tombol terlihat
            } else {
                // Sembunyikan tombol jika URL kosong
                button.style.display = 'none';
                console.log(`Tombol ${linkName} disembunyikan karena URL kosong`);
            }
        }
    });
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen after progress completes
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                
                // Remove from DOM after animation
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
}

// Click Tracking using localStorage
function initClickTracking() {
    const linkButtons = document.querySelectorAll('.link-button, .social-link');
    
    linkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const linkName = this.getAttribute('data-link');
            if (linkName) {
                trackClick(linkName);
            }
        });
    });
    
    // Initialize click data if not exists
    if (!localStorage.getItem('spectre_clicks')) {
        localStorage.setItem('spectre_clicks', JSON.stringify({}));
    }
}

function trackClick(linkName) {
    try {
        const clicks = JSON.parse(localStorage.getItem('spectre_clicks')) || {};
        clicks[linkName] = (clicks[linkName] || 0) + 1;
        localStorage.setItem('spectre_clicks', JSON.stringify(clicks));
        
        // Optional: Log to console for debugging
        console.log(`Link clicked: ${linkName} (Total: ${clicks[linkName]})`);
    } catch (error) {
        console.error('Error tracking click:', error);
    }
}

// Get click statistics (useful for analytics)
function getClickStats() {
    try {
        return JSON.parse(localStorage.getItem('spectre_clicks')) || {};
    } catch (error) {
        console.error('Error getting click stats:', error);
        return {};
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.link-button, .header, .footer, .actions-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

// Share Button Functionality
function initShareButton() {
    const shareBtn = document.getElementById('shareBtn');
    
    if (shareBtn && navigator.share) {
        shareBtn.addEventListener('click', async function() {
            try {
                await navigator.share({
                    title: 'SPECTRE | Built Different. Worn Fearlessly.',
                    text: 'Check out SPECTRE - Premium Streetwear Brand',
                    url: window.location.href
                });
                showToast('Thanks for sharing!');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                    fallbackShare();
                }
            }
        });
    } else if (shareBtn) {
        // Fallback for browsers that don't support Web Share API
        shareBtn.addEventListener('click', fallbackShare);
    }
}

function fallbackShare() {
    const shareUrl = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast('Link copied to clipboard!');
        }).catch(() => {
            // Fallback to older method
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('Link copied to clipboard!');
        });
    }
}

// Copy WhatsApp Button
function initCopyWhatsApp() {
    const copyWhatsappBtn = document.getElementById('copyWhatsappBtn');
    
    if (copyWhatsappBtn) {
        copyWhatsappBtn.addEventListener('click', function() {
            // Get WhatsApp link from the WhatsApp button
            const whatsappBtn = document.getElementById('whatsappBtn');
            const whatsappUrl = whatsappBtn ? whatsappBtn.href : '';
            
            if (whatsappUrl) {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(whatsappUrl).then(() => {
                        showToast('WhatsApp link copied!');
                    }).catch(() => {
                        // Fallback
                        const textArea = document.createElement('textarea');
                        textArea.value = whatsappUrl;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        showToast('WhatsApp link copied!');
                    });
                } else {
                    showToast('Unable to copy link');
                }
            } else {
                showToast('WhatsApp link not found');
            }
        });
    }
}

// Toast Notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3000);
}

// Background Particles
function initParticles() {
    const particleContainer = document.querySelector('.background-particles');
    if (!particleContainer) return;
    
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
        particles.push(particle);
    }
    
    // Add keyframes for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                opacity: 0.5;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
                opacity: 0.3;
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
                opacity: 0.4;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth Scroll for internal links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add hover sound effect (optional - uncomment if desired)
/*
function initHoverSound() {
    const linkButtons = document.querySelectorAll('.link-button');
    
    linkButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Play subtle hover sound
            // Requires audio file
        });
    });
}
*/

// Parallax effect on mouse move (subtle)
function initParallax() {
    const glowEffect = document.querySelector('.glow-effect');
    
    if (glowEffect) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            
            glowEffect.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }
}

// Initialize parallax on larger screens only
if (window.innerWidth > 768) {
    initParallax();
}

// Handle visibility change (pause animations when tab is not visible)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});

// Add CSS for paused animations
const pauseStyle = document.createElement('style');
pauseStyle.textContent = `
    .page-hidden * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(pauseStyle);

// Performance: Lazy load images (if any additional images are added)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Export functions for potential external use
window.SpectreBio = {
    getClickStats,
    trackClick,
    showToast
};

// Console branding
console.log('%c SPECTRE ', 'background: #000; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Built Different. Worn Fearlessly. ', 'color: #666; font-size: 12px;');
