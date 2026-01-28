// Admin panel functionality
const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
const AUTH_KEY = 'leo_photo_admin_auth';

let albumsData = null;

// Check authentication on page load
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY) === 'true';

    if (isAuthenticated) {
        showDashboard();
        loadData();
    } else {
        showLogin();
    }
}

// Show login form
function showLogin() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
}

// Show dashboard
function showDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const password = document.getElementById('admin-password').value;

    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        showDashboard();
        loadData();
    } else {
        alert('密码错误！');
    }
}

// Logout
function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    showLogin();
}

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data/albums.json');
        albumsData = await response.json();
        renderAlbumsList();
        updateJSONEditor();
    } catch (error) {
        console.error('Error loading data:', error);
        alert('加载数据失败！');
    }
}

// Setup tab switching
function setupTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Hide all tab contents
            document.querySelectorAll('.admin-content').forEach(content => {
                content.classList.add('hidden');
            });

            // Show selected tab content
            const tabId = 'tab-' + tab.dataset.tab;
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
}

// Render albums list
function renderAlbumsList() {
    if (!albumsData || !albumsData.albums) return;

    const albumsList = document.getElementById('albums-list');
    if (!albumsList) return;

    albumsList.innerHTML = albumsData.albums.map((album, index) => `
        <div class="album-item">
            <img src="${album.coverImage}" alt="${album.title}" class="album-item-thumb" onerror="this.style.display='none'">
            <div class="album-item-info">
                <h3>${album.title}</h3>
                <p style="color: #666; font-size: 0.9rem;">${album.description}</p>
                <p style="color: #999; font-size: 0.85rem; margin-top: 0.5rem;">
                    ${album.category} | ${album.photos.length} 张照片
                </p>
            </div>
            <div class="album-item-actions">
                <button class="btn btn-secondary" onclick="editAlbum(${index})">编辑</button>
                <button class="btn btn-danger" onclick="deleteAlbum(${index})">删除</button>
            </div>
        </div>
    `).join('');
}

// Show add album form
function showAddAlbumForm() {
    document.getElementById('modal-title').textContent = '添加相册';
    document.getElementById('album-form').reset();
    document.getElementById('album-index').value = '';
    document.getElementById('album-modal').style.display = 'block';
}

// Edit album
function editAlbum(index) {
    const album = albumsData.albums[index];

    document.getElementById('modal-title').textContent = '编辑相册';
    document.getElementById('album-index').value = index;
    document.getElementById('album-id').value = album.id;
    document.getElementById('album-title-input').value = album.title;
    document.getElementById('album-description-input').value = album.description;
    document.getElementById('album-category').value = album.category;
    document.getElementById('album-tags').value = album.tags.join(', ');
    document.getElementById('album-cover').value = album.coverImage;
    document.getElementById('album-date').value = album.date || '';
    document.getElementById('album-location').value = album.location || '';

    document.getElementById('album-modal').style.display = 'block';
}

// Delete album
function deleteAlbum(index) {
    if (!confirm('确定要删除这个相册吗？')) return;

    albumsData.albums.splice(index, 1);
    renderAlbumsList();
    updateJSONEditor();
    alert('相册已删除！请记得下载JSON文件并提交到GitHub。');
}

// Handle album form submit
function handleAlbumSubmit(event) {
    event.preventDefault();

    const index = document.getElementById('album-index').value;
    const album = {
        id: document.getElementById('album-id').value,
        title: document.getElementById('album-title-input').value,
        description: document.getElementById('album-description-input').value,
        category: document.getElementById('album-category').value,
        tags: document.getElementById('album-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
        coverImage: document.getElementById('album-cover').value,
        date: document.getElementById('album-date').value,
        location: document.getElementById('album-location').value,
        photos: []
    };

    if (index === '') {
        // Add new album
        albumsData.albums.push(album);
    } else {
        // Update existing album (keep existing photos)
        album.photos = albumsData.albums[index].photos;
        albumsData.albums[index] = album;
    }

    renderAlbumsList();
    updateJSONEditor();
    closeModal();
    alert('相册已保存！请记得下载JSON文件并提交到GitHub。');
}

// Close modal
function closeModal() {
    document.getElementById('album-modal').style.display = 'none';
}

// Update JSON editor
function updateJSONEditor() {
    if (!albumsData) return;

    const jsonEditor = document.getElementById('json-editor');
    if (jsonEditor) {
        jsonEditor.value = JSON.stringify(albumsData, null, 2);
    }
}

// Format JSON
function formatJSON() {
    try {
        const jsonEditor = document.getElementById('json-editor');
        const data = JSON.parse(jsonEditor.value);
        jsonEditor.value = JSON.stringify(data, null, 2);
        alert('JSON格式化成功！');
    } catch (error) {
        alert('JSON格式错误：' + error.message);
    }
}

// Download JSON file
function downloadJSON() {
    try {
        const jsonEditor = document.getElementById('json-editor');
        const data = JSON.parse(jsonEditor.value);

        // Update albumsData with edited content
        albumsData = data;

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'albums.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('JSON文件已下载！请将其替换到 data/albums.json，然后提交到GitHub。');
    } catch (error) {
        alert('下载失败：' + error.message);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupTabs();

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('album-modal');
        if (event.target === modal) {
            closeModal();
        }
    };
});
