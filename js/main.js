// Main page functionality
let albumsData = null;
let currentSlide = 0;
let slideInterval = null;

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data/albums.json');
        albumsData = await response.json();
        initHeroSlider();
        renderPhotographerInfo();
        renderCategories();
        renderFeaturedAlbums();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Initialize Hero Slider
function initHeroSlider() {
    if (!albumsData || !albumsData.albums) return;

    const sliderContainer = document.querySelector('.slider-container');
    const sliderDots = document.getElementById('slider-dots');

    if (!sliderContainer || !sliderDots) return;

    // Create slides from album covers
    albumsData.albums.forEach((album, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `slider-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url('${album.coverImage}')`;
        slide.dataset.title = album.title;
        slide.dataset.category = album.category === 'abu-dhabi' ? '阿布扎比' : '广州';
        sliderContainer.appendChild(slide);

        // Create dot
        const dot = document.createElement('span');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    // Setup navigation
    document.getElementById('slider-prev')?.addEventListener('click', () => {
        changeSlide(-1);
    });

    document.getElementById('slider-next')?.addEventListener('click', () => {
        changeSlide(1);
    });

    // Start auto-play
    startSlideshow();

    // Pause on hover
    const heroSlider = document.getElementById('hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlideshow);
        heroSlider.addEventListener('mouseleave', startSlideshow);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slides.length === 0) return;

    // Remove active class
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // Calculate new slide index
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Add active class
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    // Update title
    updateSlideInfo();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    updateSlideInfo();

    // Reset auto-play
    stopSlideshow();
    startSlideshow();
}

function updateSlideInfo() {
    const slides = document.querySelectorAll('.slider-slide');
    if (slides.length === 0) return;

    const currentSlideElement = slides[currentSlide];
    const title = currentSlideElement.dataset.title;
    const category = currentSlideElement.dataset.category;

    const titleElement = document.getElementById('slider-title');
    const subtitleElement = document.getElementById('slider-subtitle');

    if (titleElement) {
        titleElement.textContent = title;
    }

    if (subtitleElement) {
        subtitleElement.textContent = `${category} | 专注人像摄影`;
    }
}

function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Render photographer information
function renderPhotographerInfo() {
    if (!albumsData || !albumsData.photographer) return;

    const photographer = albumsData.photographer;
    const bioElement = document.getElementById('photographer-bio');
    const contactElement = document.getElementById('contact-info');

    if (bioElement) {
        bioElement.textContent = photographer.bio;
    }

    if (contactElement && photographer.contact) {
        contactElement.innerHTML = `
            ${photographer.contact.email ? `<div class="contact-item">📧 ${photographer.contact.email}</div>` : ''}
            ${photographer.contact.wechat ? `<div class="contact-item">💬 微信: ${photographer.contact.wechat}</div>` : ''}
            ${photographer.contact.xiaohongshu ? `<div class="contact-item">📕 小红书: ${photographer.contact.xiaohongshu}</div>` : ''}
        `;
    }
}

// Render categories
function renderCategories() {
    if (!albumsData || !albumsData.categories) return;

    const categoryGrid = document.getElementById('category-grid');
    if (!categoryGrid) return;

    categoryGrid.innerHTML = albumsData.categories.map(category => {
        const albumCount = albumsData.albums.filter(album => album.category === category.id).length;
        return `
            <div class="category-card" onclick="window.location.href='gallery.html?category=${category.id}'">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
                <p style="color: #999; font-size: 0.9rem; margin-top: 1rem;">${albumCount} 个相册</p>
            </div>
        `;
    }).join('');
}

// Render featured albums (latest 6)
function renderFeaturedAlbums() {
    if (!albumsData || !albumsData.albums) return;

    const featuredAlbumsElement = document.getElementById('featured-albums');
    if (!featuredAlbumsElement) return;

    // Get the latest 6 albums
    const featuredAlbums = albumsData.albums.slice(0, 6);

    featuredAlbumsElement.innerHTML = featuredAlbums.map(album => `
        <div class="album-card" onclick="window.location.href='album.html?id=${album.id}'">
            <div class="album-cover">
                <img src="${album.coverImage}" alt="${album.title}" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:#999;\\'>暂无图片</div>'">
            </div>
            <div class="album-info">
                <h3 class="album-title">${album.title}</h3>
                <p class="album-description">${album.description}</p>
                <div class="album-tags">
                    ${album.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Mobile menu toggle
function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupMobileMenu();
});
