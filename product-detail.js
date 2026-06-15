// Product Detail Page JavaScript
// Handles product ID parsing, description loading, and rendering

console.log('Product detail script loaded');

let productsData = {};
let shopUrl = '';
let currentProductId = null;

// Get product ID from URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load products from products.json
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        productsData = await response.json();
        console.log('Products loaded:', productsData);
        return productsData;
    } catch (error) {
        console.error('Failed to load products.json:', error);
        return null;
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
        return '';
    }
}

// Load product description from text file
async function loadProductDescription(productId, category, descriptionFile) {
    try {
        const response = await fetch(`descriptions/${category}/${descriptionFile}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const description = await response.text();
        console.log('Description loaded for product', productId, 'from file', descriptionFile);
        return description;
    } catch (error) {
        console.error('Failed to load description file:', error);
        // Fallback to basic description from products.json
        const product = (productsData.products || []).find(p => p.id === parseInt(productId));
        return product ? product.description : 'Product description not available.';
    }
}

// Find product by ID
function findProductById(productId) {
    if (!productsData.products) return null;
    return productsData.products.find(product => product.id === parseInt(productId));
}

// Render product detail
async function renderProductDetail() {
    currentProductId = getProductIdFromUrl();
    console.log('Current product ID:', currentProductId);
    
    if (!currentProductId) {
        console.error('No product ID found in URL');
        showErrorMessage('Product not found');
        return;
    }
    
    const product = findProductById(currentProductId);
    if (!product) {
        console.error('Product not found:', currentProductId);
        showErrorMessage('Product not found');
        return;
    }
    
    console.log('Product found:', product);
    
    // Load detailed description
    const detailedDescription = await loadProductDescription(currentProductId, product.category, product.descriptionFile);
    
    const container = document.getElementById('productDetailContainer');
    if (!container) {
        console.error('Product detail container not found');
        return;
    }
    
    const imageHtml = product.image 
        ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
        : `<div class="product-placeholder"><span>${product.name}</span></div>`;
    
    container.innerHTML = `
        <div class="product-detail-content">
            <div class="product-image-section">
                <div class="product-detail-image">
                    ${imageHtml}
                </div>
            </div>
            
            <div class="product-info-section">
                <div class="product-category-badge">${product.category.toUpperCase()}</div>
                <h2 class="product-detail-name">${product.name}</h2>
                <div class="product-detail-price">${product.price}</div>
                
                <div class="product-detail-description">
                    <h3>Description</h3>
                    <p>${detailedDescription}</p>
                </div>
                
                <div class="product-detail-actions">
                    <a href="${shopUrl}" class="order-button" target="_blank" rel="noopener">
                        <span>ORDER TO SHOPEE</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    console.log('Product detail rendered');
}

// Show error message
function showErrorMessage(message) {
    const container = document.getElementById('productDetailContainer');
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <a href="catalog.html" class="back-to-catalog">Back to Catalog</a>
            </div>
        `;
    }
}

// Initialize loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 1500);
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
        renderProductDetail();
        initParticles();
        initFooterLinks();
    }).catch(error => {
        console.error('Failed to initialize product detail:', error);
        initLoadingScreen();
        initParticles();
        showErrorMessage('Failed to load product details');
    });
});
