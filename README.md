# Leo Photography - 摄影师作品展示网站

一个可以在 GitHub Pages 上部署的摄影师个人网站，用于展示和管理摄影作品。支持按主题分类管理照片，包含前端展示页面和管理后台。

## 功能特点

- **作品展示**：美观的相册展示页面，支持分类浏览和标签筛选
- **相册管理**：按主题（地点、风格、类型）组织照片
- **管理后台**：简单的后台界面，支持添加、编辑、删除相册
- **响应式设计**：适配桌面和移动设备
- **纯静态页面**：无需服务器，完全托管在 GitHub Pages
- **JSON配置**：使用 JSON 文件管理所有数据，易于维护

## 在线演示

部署后访问：`https://你的用户名.github.io/PhotographerLeo`

## 快速开始

### 1. 克隆或下载项目

```bash
git clone https://github.com/你的用户名/PhotographerLeo.git
cd PhotographerLeo
```

### 2. 本地预览

使用任何本地服务器工具预览网站，例如：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js http-server
npx http-server

# 使用 VS Code Live Server 插件
# 右键 index.html -> Open with Live Server
```

然后在浏览器中访问 `http://localhost:8000`

### 3. 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库：
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. 在 GitHub 仓库设置中启用 GitHub Pages：
   - 进入仓库的 Settings → Pages
   - Source 选择 `main` 分支
   - 目录选择 `/ (root)`
   - 点击 Save

3. 等待 1-2 分钟，访问 `https://你的用户名.github.io/PhotographerLeo`

## 项目结构

```
PhotographerLeo/
├── index.html              # 主页
├── gallery.html            # 相册列表页
├── album.html              # 相册详情页
├── admin.html              # 管理后台
├── css/
│   └── style.css           # 样式文件
├── js/
│   ├── main.js             # 主页脚本
│   ├── gallery.js          # 相册列表脚本
│   ├── album.js            # 相册详情脚本
│   └── admin.js            # 管理后台脚本
├── data/
│   └── albums.json         # 相册数据配置
├── images/                 # 图片存储目录
│   ├── abu-dhabi/          # 阿布扎比相册
│   │   ├── louvre/
│   │   ├── grand-mosque/
│   │   └── emirates-palace/
│   └── guangzhou/          # 广州相册
│       ├── male/
│       ├── female/
│       ├── street/
│       └── couple/
└── README.md
```

## 使用指南

### 管理员登录

1. 访问 `/admin.html` 进入管理后台
2. 默认密码：`Leo`
3. 可在 `js/admin.js` 中修改 `ADMIN_PASSWORD` 常量来更改密码

### 添加新相册

#### 方法一：使用管理后台（推荐）

1. 登录管理后台
2. 在"相册管理"标签页点击"添加相册"
3. 填写相册信息
4. 点击"下载JSON"按钮
5. 用下载的文件替换 `data/albums.json`
6. 提交并推送到 GitHub

#### 方法二：手动编辑 JSON

1. 在 `images/` 目录下创建相应的文件夹
2. 将照片上传到该文件夹
3. 编辑 `data/albums.json`，添加相册配置：

```json
{
  "id": "album-id",
  "title": "相册标题",
  "description": "相册描述",
  "category": "guangzhou",
  "tags": ["标签1", "标签2"],
  "coverImage": "images/guangzhou/male/cover.jpg",
  "date": "2024-01",
  "location": "广州",
  "photos": [
    {
      "id": "photo-001",
      "src": "images/guangzhou/male/photo1.jpg",
      "title": "照片标题",
      "description": "照片描述"
    }
  ]
}
```

4. 提交更改到 GitHub：
```bash
git add .
git commit -m "Add new album"
git push
```

### 添加照片到现有相册

1. 将照片上传到对应的文件夹
2. 在 `data/albums.json` 的相册 `photos` 数组中添加照片信息
3. 提交并推送到 GitHub

### 修改分类

在 `data/albums.json` 的 `categories` 数组中添加或修改分类：

```json
{
  "id": "category-id",
  "name": "分类名称",
  "description": "分类描述",
  "type": "location"
}
```

### 个性化设置

#### 修改网站标题和介绍

编辑 `data/albums.json` 中的 `photographer` 字段：

```json
{
  "photographer": {
    "name": "你的名字",
    "title": "摄影师",
    "bio": "个人简介",
    "contact": {
      "email": "your@email.com",
      "wechat": "your_wechat_id"
    }
  }
}
```

#### 修改网站颜色主题

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --primary-color: #2c3e50;      /* 主色调 */
    --secondary-color: #3498db;    /* 次要色调 */
    --accent-color: #e74c3c;       /* 强调色 */
}
```

## 注意事项

### 图片优化建议

- 使用 JPEG 格式压缩照片
- 建议分辨率：1920x1080 或 2048x1536
- 单张图片大小控制在 500KB 以内
- 使用工具（如 TinyPNG、ImageOptim）压缩图片

### GitHub 仓库大小限制

- GitHub 建议仓库大小不超过 1GB
- 单个文件不超过 100MB
- 如果照片较多，考虑使用图床服务（如 Cloudinary、ImgBB）

### 更新网站内容

每次修改照片或配置后，需要提交并推送到 GitHub：

```bash
git add .
git commit -m "Update photos/albums"
git push
```

GitHub Pages 会自动重新部署（通常需要 1-2 分钟）。

## 技术栈

- HTML5 / CSS3 / JavaScript (ES6+)
- 无依赖，纯原生实现
- GitHub Pages 托管

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动浏览器

## 许可证

MIT License - 可自由使用和修改

## 问题反馈

如有问题或建议，欢迎提交 Issue。

---

**祝你的摄影作品展示顺利！**
