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
    const contactElement = document.getElementById('contact-info');

    if (contactElement && photographer.contact) {
        contactElement.innerHTML = `
            <a class="contact-item glass-card draggable-card" href="https://wa.me/8613005442629" target="_blank" rel="noopener">WhatsApp +86 130 0544 2629</a>
            ${photographer.contact.email ? `<a class="contact-item glass-card draggable-card" href="mailto:${photographer.contact.email}">Email ${photographer.contact.email}</a>` : ''}
            ${photographer.contact.wechat ? `<span class="contact-item glass-card draggable-card">WeChat ${photographer.contact.wechat}</span>` : ''}
            ${photographer.contact.xiaohongshu ? `<span class="contact-item glass-card draggable-card">Xiaohongshu ${photographer.contact.xiaohongshu}</span>` : ''}
        `;
        if (window.LeoGlassCards) window.LeoGlassCards.setup();
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

    const lang = window.LeoI18n ? window.LeoI18n.getLanguage() : 'en';
    const tagMap = {
        '视频': { en: 'Video', zh: '视频' },
        '活动': { en: 'Event', zh: '活动' },
        '商业': { en: 'Commercial', zh: '商业' },
        '产品': { en: 'Product', zh: '产品' },
        '广州': { en: 'Guangzhou', zh: '广州' },
        '建筑': { en: 'Architecture', zh: '建筑' },
        '风光': { en: 'Landscape', zh: '风光' }
    };
    const titleMap = {
        'promotional-video': { en: 'Brand Promotional Video', zh: '品牌宣传片' },
        'store-intro-video': { en: 'Store Introduction Video', zh: '门店介绍视频' },
        'product-intro-video': { en: 'Product Introduction Video', zh: '产品介绍视频' },
        'exhibition-video': { en: 'Exhibition Event Coverage', zh: '展会活动录像' },
        'abu-dhabi-grand-mosque': { en: 'Abu Dhabi Destination Portrait', zh: '阿布扎比目的地影像' },
        'guangzhou-wedding-wetland': { en: 'Guangzhou Portrait Campaign', zh: '广州人像拍摄' }
    };
    const locationMap = {
        '谢赫扎耶德大清真寺': { en: 'Abu Dhabi', zh: '阿布扎比' },
        '广州': { en: 'Guangzhou', zh: '广州' },
        '阿布扎比': { en: 'Abu Dhabi', zh: '阿布扎比' }
    };

    featuredAlbumsElement.innerHTML = featuredAlbums.map(album => {
        const displayTitle = titleMap[album.id] ? titleMap[album.id][lang] : album.title;
        const displayLocation = locationMap[album.location] ? locationMap[album.location][lang] : (album.location || (lang === 'zh' ? '广州 / 阿布扎比' : 'Guangzhou / Abu Dhabi'));
        return `
        <article class="portfolio-card glass-card draggable-card" onclick="window.location.href='album.html?id=${album.id}'">
            <div class="portfolio-image">
                <img src="${album.coverImage}" alt="${displayTitle}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'image-fallback\\'>${lang === 'zh' ? '暂无图片' : 'No image'}</div>'">
            </div>
            <div class="portfolio-info">
                <p>${displayLocation}</p>
                <h3>${displayTitle}</h3>
                <div>
                    ${album.tags.slice(0, 3).map(tag => `<span>${tagMap[tag] ? tagMap[tag][lang] : tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `;
    }).join('');
    if (window.LeoGlassCards) window.LeoGlassCards.setup();
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
    window.addEventListener('leo:languagechange', () => {
        renderFeaturedAlbums();
    });
});
