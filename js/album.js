// Album detail page functionality
let albumsData = null;
let currentAlbum = null;
let currentPhotoIndex = 0;

// Load data and display album
async function loadData() {
    try {
        const response = await fetch('data/albums.json');
        albumsData = await response.json();

        // Get album ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const albumId = urlParams.get('id');

        if (!albumId) {
            showError('未找到相册ID');
            return;
        }

        // Find the album
        currentAlbum = albumsData.albums.find(album => album.id === albumId);

        if (!currentAlbum) {
            showError('相册不存在');
            return;
        }

        renderAlbumHeader();
        renderPhotos();
    } catch (error) {
        console.error('Error loading data:', error);
        showError('加载失败，请稍后重试');
    }
}

// Show error message
function showError(message) {
    document.getElementById('album-title').textContent = message;
    document.getElementById('album-description').textContent = '';
    document.getElementById('album-meta').textContent = '';
}

// Render album header information
function renderAlbumHeader() {
    if (!currentAlbum) return;

    document.getElementById('album-title').textContent = currentAlbum.title;
    document.getElementById('album-description').textContent = currentAlbum.description;

    const metaElement = document.getElementById('album-meta');
    metaElement.innerHTML = `
        ${currentAlbum.date ? `<div>📅 ${currentAlbum.date}</div>` : ''}
        ${currentAlbum.location ? `<div>📍 ${currentAlbum.location}</div>` : ''}
        <div>📷 ${currentAlbum.photos.length} 张照片</div>
        <div class="album-tags">
            ${currentAlbum.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
}

// Render photos grid
function renderPhotos() {
    if (!currentAlbum || !currentAlbum.photos) return;

    const photosGrid = document.getElementById('photos-grid');
    if (!photosGrid) return;

    if (currentAlbum.photos.length === 0) {
        photosGrid.innerHTML = '<p style="text-align: center; color: #999; grid-column: 1/-1;">暂无照片</p>';
        return;
    }

    photosGrid.innerHTML = currentAlbum.photos.map((photo, index) => `
        <div class="photo-item" onclick="openLightbox(${index})">
            <img src="${photo.src}" alt="${photo.title || ''}" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:#999;\\'>加载失败</div>'">
            ${photo.title || photo.description ? `
                <div class="photo-overlay">
                    ${photo.title ? `<h4>${photo.title}</h4>` : ''}
                    ${photo.description ? `<p>${photo.description}</p>` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Open lightbox
function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// Update lightbox content
function updateLightbox() {
    if (!currentAlbum || !currentAlbum.photos[currentPhotoIndex]) return;

    const photo = currentAlbum.photos[currentPhotoIndex];
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.title || '';

    lightboxCaption.innerHTML = `
        ${photo.title ? `<h3>${photo.title}</h3>` : ''}
        ${photo.description ? `<p>${photo.description}</p>` : ''}
        <p style="margin-top: 0.5rem; color: #ccc;">${currentPhotoIndex + 1} / ${currentAlbum.photos.length}</p>
    `;
}

// Navigate to previous photo
function previousPhoto() {
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
        updateLightbox();
    }
}

// Navigate to next photo
function nextPhoto() {
    if (currentPhotoIndex < currentAlbum.photos.length - 1) {
        currentPhotoIndex++;
        updateLightbox();
    }
}

// Setup lightbox controls
function setupLightbox() {
    // Close button
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    // Previous/Next buttons
    document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        previousPhoto();
    });

    document.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        nextPhoto();
    });

    // Close on background click
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('lightbox').classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            previousPhoto();
        } else if (e.key === 'ArrowRight') {
            nextPhoto();
        }
    });
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

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

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
    setupLightbox();
    setupMobileMenu();
});
