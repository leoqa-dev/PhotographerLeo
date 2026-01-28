// Gallery page functionality
let albumsData = null;
let currentFilter = 'all';
let currentTags = [];

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data/albums.json');
        albumsData = await response.json();

        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            currentFilter = categoryParam;
        }

        renderTags();
        renderAlbums();
        updateFilterButtons();
    } catch (error) {
        console.error('Error loading data:', error);
        const albumsGrid = document.getElementById('albums-grid');
        if (albumsGrid) {
            albumsGrid.innerHTML = '<p style="text-align: center; color: #999;">加载失败，请稍后重试</p>';
        }
    }
}

// Render all available tags
function renderTags() {
    if (!albumsData || !albumsData.albums) return;

    const tagsFilterElement = document.getElementById('tags-filter');
    if (!tagsFilterElement) return;

    // Collect all unique tags
    const allTags = new Set();
    albumsData.albums.forEach(album => {
        album.tags.forEach(tag => allTags.add(tag));
    });

    tagsFilterElement.innerHTML = Array.from(allTags).map(tag => `
        <button class="tag-filter" data-tag="${tag}">${tag}</button>
    `).join('');

    // Add click event listeners
    tagsFilterElement.querySelectorAll('.tag-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.dataset.tag;
            if (currentTags.includes(tag)) {
                currentTags = currentTags.filter(t => t !== tag);
                btn.classList.remove('active');
            } else {
                currentTags.push(tag);
                btn.classList.add('active');
            }
            renderAlbums();
        });
    });
}

// Filter albums based on current filter and tags
function getFilteredAlbums() {
    if (!albumsData || !albumsData.albums) return [];

    let filtered = albumsData.albums;

    // Filter by category
    if (currentFilter !== 'all') {
        filtered = filtered.filter(album => album.category === currentFilter);
    }

    // Filter by tags
    if (currentTags.length > 0) {
        filtered = filtered.filter(album =>
            currentTags.some(tag => album.tags.includes(tag))
        );
    }

    return filtered;
}

// Render albums based on current filter
function renderAlbums() {
    const albumsGrid = document.getElementById('albums-grid');
    if (!albumsGrid) return;

    const filteredAlbums = getFilteredAlbums();

    if (filteredAlbums.length === 0) {
        albumsGrid.innerHTML = '<p style="text-align: center; color: #999; grid-column: 1/-1;">暂无相册</p>';
        return;
    }

    albumsGrid.innerHTML = filteredAlbums.map(album => `
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
                ${album.location ? `<p style="color: #999; font-size: 0.85rem; margin-top: 0.5rem;">📍 ${album.location}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Update filter button states
function updateFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        }
    });
}

// Setup filter button event listeners
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            currentTags = []; // Reset tags when changing category

            // Reset tag filters
            document.querySelectorAll('.tag-filter').forEach(tagBtn => {
                tagBtn.classList.remove('active');
            });

            updateFilterButtons();
            renderAlbums();
        });
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupFilters();
});
