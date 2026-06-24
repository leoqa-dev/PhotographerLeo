let albumsData = null;

async function loadData() {
    try {
        const response = await fetch('data/albums.json');
        albumsData = await response.json();
        renderHeroImage();
        renderPhotographerInfo();
        renderFeaturedAlbums();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderHeroImage() {
    if (!albumsData || !albumsData.albums) return;

    const heroMedia = document.getElementById('hero-media');
    if (!heroMedia) return;

    const heroAlbum = albumsData.albums.find(album => album.id === 'promotional-video')
        || albumsData.albums.find(album => album.tags.includes('商业'))
        || albumsData.albums[0];

    heroMedia.style.backgroundImage = `url('${heroAlbum.coverImage}')`;
}

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
            ${photographer.contact.email ? `<a class="contact-item" href="mailto:${photographer.contact.email}">邮箱 ${photographer.contact.email}</a>` : ''}
            ${photographer.contact.wechat ? `<span class="contact-item">微信 ${photographer.contact.wechat}</span>` : ''}
            ${photographer.contact.xiaohongshu ? `<span class="contact-item">小红书 ${photographer.contact.xiaohongshu}</span>` : ''}
        `;
    }
}

function renderFeaturedAlbums() {
    if (!albumsData || !albumsData.albums) return;

    const featuredAlbumsElement = document.getElementById('featured-albums');
    if (!featuredAlbumsElement) return;

    const featuredIds = [
        'promotional-video',
        'store-intro-video',
        'product-intro-video',
        'exhibition-video',
        'abu-dhabi-grand-mosque',
        'guangzhou-wedding-wetland'
    ];

    const featuredAlbums = featuredIds
        .map(id => albumsData.albums.find(album => album.id === id))
        .filter(Boolean);

    featuredAlbumsElement.innerHTML = featuredAlbums.map(album => `
        <article class="portfolio-card" onclick="window.location.href='album.html?id=${album.id}'">
            <div class="portfolio-image">
                <img src="${album.coverImage}" alt="${album.title}" onerror="this.parentElement.innerHTML='<div class=\\'image-fallback\\'>暂无图片</div>'">
            </div>
            <div class="portfolio-info">
                <p>${album.location || '广州 / 阿布扎比'}</p>
                <h3>${album.title}</h3>
                <div>
                    ${album.tags.slice(0, 3).map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');
}

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

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupMobileMenu();
});
