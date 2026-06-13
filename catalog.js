// Catalog Page JavaScript
// Dynamic product loading and filtering

let productsData = {};
let currentCategory = 'all';
let shopUrl = '';

// Load products from products.json
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        productsData = await response.json();
        console.log('Products loaded:', productsData);
        console.log('Number of products:', productsData.products ? productsData.products.length : 0);
        return productsData;
    } catch (error) {
        console.error('Failed to load products.json:', error);
        console.log('Using fallback products data');
        productsData = {
            products: [
                {
                    id: 1,
                    name: "SPECTRE Skateboard Deck",
                    description: "Premium maple skateboard deck dengan custom graphic",
                    price: "Rp 450.000",
                    image: "assets/images/products/decks/edited-photo.png",
                    category: "decks"
                },
                {
                    id: 2,
                    name: "SPECTRE Skateboard Deck",
                    description: "Premium maple skateboard deck dengan custom graphic",
                    price: "Rp 450.000",
                    image: "assets/images/products/decks/edited-photo(1).png",
                    category: "decks"
                },
                {
                    id: 3,
                    name: "SPECTRE Streetwear",
                    description: "Premium streetwear apparel dengan SPECTRE branding",
                    price: "Rp 350.000",
                    image: "assets/images/products/apparel/edited-photo.png",
                    category: "apparel"
                }
            ]
        };
        return productsData;
    }
}

// Load shop URL from links.json
async function loadShopUrl() {
    try {
        const response = await fetch('links.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const linksData = await response.json();
        shopUrl = linksData.explore_collection || '';
        console.log('Shop URL loaded:', shopUrl);
        return shopUrl;
    } catch (error) {
        console.error('Failed to load links.json:', error);
        shopUrl = '';
        throw error;
    }
}

// Render products to grid
function renderProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    let productsToShow = [];
    
    if (category === 'all') {
        productsToShow = productsData.products || [];
    } else {
        productsToShow = (productsData.products || []).filter(
            product => product.category === category
        );
    }
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
    }
    
    productsToShow.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product, index) {
    const card = document.createElement('a');
    card.className = 'product-card';
    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
    card.href = shopUrl;
    card.target = '_blank';
    card.rel = 'noopener';
    
    const imageHtml = product.image 
        ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
        : `<div class="product-placeholder"><span>${product.name}</span></div>`;
    
    card.innerHTML = `
        <div class="product-image">
            ${imageHtml}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-cta">VIEW ON SHOPEE →</div>
        </div>
    `;
    
    return card;
}

// Initialize category filter buttons
function initCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Get category
            const category = this.getAttribute('data-category');
            currentCategory = category;
            // Render products
            renderProducts(category);
        });
    });
}

// Initialize loading screen - Minimal Luxury Experience
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Minimal luxury loading experience timing:
    // 0.0s - Content fade in
    // 0.4s - Logo fade in (1.2s duration)
    // 0.6s - Text container fade in
    // 1.0s - "BUILT DIFFERENT." fade in
    // 1.2s - "WORN FEARLESSLY." fade in
    // 1.4s - Loading bar container fade in
    // 1.5s - Loading bar progress starts (1.0s duration)
    // 1.6s - "ENTERING THE VOID..." status fade in
    // 2.5s - Loading bar completes
    // 2.7s - Loading screen fade out
    // 3.5s - Loading screen removed
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 2700);
}

// Initialize particles
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize footer social links
async function initFooterLinks() {
    try {
        const response = await fetch('links.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const linksData = await response.json();
        
        const linkMapping = {
            'instagram': 'instagram',
            'direct-contact': 'direct_contact'
        };
        
        document.querySelectorAll('.footer-social-link').forEach(link => {
            const linkName = link.getAttribute('data-link');
            if (linkName && linkMapping[linkName]) {
                const jsonKey = linkMapping[linkName];
                const url = linksData[jsonKey];
                if (url && url.trim() !== '') {
                    link.href = url;
                    link.style.display = '';
                } else {
                    link.style.display = 'none';
                }
            }
        });
    } catch (error) {
        console.error('Failed to load links.json:', error);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    Promise.all([loadProducts(), loadShopUrl()]).then(() => {
        initLoadingScreen();
        renderProducts('all');
        initCategoryFilter();
        initParticles();
        initFooterLinks();
    }).catch(error => {
        console.error('Failed to initialize catalog:', error);
        initLoadingScreen();
        initParticles();
    });
});
