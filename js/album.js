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

    photosGrid.innerHTML = currentAlbum.photos.map((photo, index) => {
        const isVideo = photo.type === 'video';

        if (isVideo) {
            return `
                <div class="photo-item video-item" data-index="${index}">
                    <video src="${photo.src}"
                           poster="${photo.poster || currentAlbum.coverImage}"
                           preload="metadata"
                           onclick="openLightbox(${index})">
                    </video>
                    <div class="video-play-icon" onclick="openLightbox(${index})">▶</div>
                    ${photo.title || photo.description ? `
                        <div class="photo-overlay">
                            ${photo.title ? `<h4>${photo.title}</h4>` : ''}
                            ${photo.description ? `<p>${photo.description}</p>` : ''}
                            <span class="media-type-badge">视频</span>
                        </div>
                    ` : '<div class="photo-overlay"><span class="media-type-badge">视频</span></div>'}
                    <button class="download-btn" onclick="event.stopPropagation(); downloadMedia('${photo.src}', '${photo.title || 'video'}', 'video')" title="下载视频">
                        ⬇️
                    </button>
                </div>
            `;
        } else {
            return `
                <div class="photo-item" data-index="${index}">
                    <img src="${photo.src}" alt="${photo.title || ''}"
                         onclick="openLightbox(${index})"
                         onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:#999;\\'>加载失败</div>'">
                    ${photo.title || photo.description ? `
                        <div class="photo-overlay">
                            ${photo.title ? `<h4>${photo.title}</h4>` : ''}
                            ${photo.description ? `<p>${photo.description}</p>` : ''}
                        </div>
                    ` : ''}
                    <button class="download-btn" onclick="event.stopPropagation(); downloadMedia('${photo.src}', '${photo.title || 'image'}', 'image')" title="下载图片">
                        ⬇️
                    </button>
                </div>
            `;
        }
    }).join('');
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
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const isVideo = photo.type === 'video';

    // Clear previous content
    const oldMedia = lightboxContent.querySelector('.lightbox-media');
    if (oldMedia) {
        oldMedia.remove();
    }

    // Create new media element
    let mediaElement;
    if (isVideo) {
        mediaElement = document.createElement('video');
        mediaElement.src = photo.src;
        mediaElement.controls = true;
        mediaElement.autoplay = true;
        mediaElement.className = 'lightbox-media lightbox-video';
        mediaElement.style.maxWidth = '100%';
        mediaElement.style.maxHeight = '80vh';
        if (photo.poster) {
            mediaElement.poster = photo.poster;
        }
    } else {
        mediaElement = document.createElement('img');
        mediaElement.src = photo.src;
        mediaElement.alt = photo.title || '';
        mediaElement.className = 'lightbox-media lightbox-img';
        mediaElement.id = 'lightbox-img';
    }

    // Insert media before caption
    lightboxContent.insertBefore(mediaElement, lightboxCaption);

    lightboxCaption.innerHTML = `
        ${photo.title ? `<h3>${photo.title}</h3>` : ''}
        ${photo.description ? `<p>${photo.description}</p>` : ''}
        <p style="margin-top: 0.5rem; color: #ccc;">
            ${currentPhotoIndex + 1} / ${currentAlbum.photos.length}
            ${isVideo ? ' (视频)' : ''}
        </p>
        <div style="margin-top: 1rem;">
            <button class="btn btn-secondary" onclick="downloadCurrentMedia()" style="margin-right: 0.5rem;">
                ⬇️ 下载${isVideo ? '视频' : '图片'}
            </button>
        </div>
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

// Download single media
function downloadMedia(src, title, type) {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${title}.${type === 'video' ? 'mp4' : 'jpg'}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Download current media in lightbox
function downloadCurrentMedia() {
    if (!currentAlbum || !currentAlbum.photos[currentPhotoIndex]) return;

    const photo = currentAlbum.photos[currentPhotoIndex];
    const isVideo = photo.type === 'video';
    downloadMedia(photo.src, photo.title || `${currentAlbum.title}-${currentPhotoIndex + 1}`, isVideo ? 'video' : 'image');
}

// Download all media in album
function downloadAll() {
    if (!currentAlbum || !currentAlbum.photos || currentAlbum.photos.length === 0) {
        alert('该相册暂无内容可下载');
        return;
    }

    if (!confirm(`确定要下载该相册的所有 ${currentAlbum.photos.length} 个文件吗？`)) {
        return;
    }

    currentAlbum.photos.forEach((photo, index) => {
        setTimeout(() => {
            const isVideo = photo.type === 'video';
            downloadMedia(photo.src, photo.title || `${currentAlbum.title}-${index + 1}`, isVideo ? 'video' : 'image');
        }, index * 500); // Stagger downloads by 500ms
    });

    alert('下载已开始，请注意浏览器下载提示');
}

// Share album
function shareAlbum() {
    if (!currentAlbum) return;

    const shareUrl = window.location.href;
    const shareTitle = `${currentAlbum.title} - 个人摄影师Leo`;
    const shareText = `${currentAlbum.description}\n\n查看更多作品：`;

    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl
        }).then(() => {
            console.log('分享成功');
        }).catch((error) => {
            console.log('分享取消', error);
        });
    } else {
        // Fallback: copy link to clipboard
        copyToClipboard(shareUrl);
    }
}

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert('链接已复制到剪贴板！\n\n' + text);
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// Fallback method for copying to clipboard
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('链接已复制到剪贴板！\n\n' + text);
    } catch (err) {
        alert('复制失败，请手动复制：\n\n' + text);
    }
    document.body.removeChild(textArea);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupLightbox();
    setupMobileMenu();
});
