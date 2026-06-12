// Catalog Page JavaScript
// Dynamic product loading and filtering

let productsData = {};
let currentCategory = 'all';

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
        productsData = {};
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
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
    
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
            <div class="product-price">${product.price}</div>
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

// Initialize loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    
    setTimeout(() => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 40;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 1500);
            }
            loadingProgress.style.width = progress + '%';
        }, 150);
    }, 300);
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
    loadProducts().then(() => {
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
