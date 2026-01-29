# 视频上传与管理指南

## 📹 关于视频占位符

当前网站中的"视频"项使用图片作为演示占位符。这样可以展示完整的视频播放界面和功能，包括：
- ✅ 视频播放图标
- ✅ 视频类型徽章
- ✅ 视频海报显示
- ✅ 灯箱视频播放器
- ✅ 下载功能
- ✅ 分享功能

## 🎬 如何添加真实视频

### 方法一：替换现有占位符

1. **准备视频文件**
   - 格式：MP4（推荐）
   - 编码：H.264
   - 分辨率：1920x1080 或 1280x720
   - 大小：建议每个文件 < 50MB（GitHub限制单文件100MB）

2. **上传视频到目录**
   ```bash
   # 将视频文件复制到相册目录
   cp your-video.mp4 images/guangzhou/promotional/video1.mp4
   ```

3. **更新 JSON 配置**
   编辑 `data/albums.json`，将占位符的 src 改为真实视频路径：
   ```json
   {
     "id": "promo-video-001",
     "src": "images/guangzhou/promotional/video1.mp4",  // 改为真实视频路径
     "type": "video",
     "poster": "images/guangzhou/promotional/video1-poster.jpg",
     "title": "企业形象宣传片",
     "description": "展示企业文化与实力"
   }
   ```

4. **提交到 Git**
   ```bash
   git add images/guangzhou/promotional/video1.mp4 data/albums.json
   git commit -m "Add promotional video"
   git push
   ```

### 方法二：添加新视频

1. **上传视频文件和海报**
   ```bash
   cp your-new-video.mp4 images/guangzhou/promotional/video3.mp4
   cp video3-poster.jpg images/guangzhou/promotional/video3-poster.jpg
   ```

2. **在 JSON 中添加新项**
   ```json
   {
     "id": "promo-video-003",
     "src": "images/guangzhou/promotional/video3.mp4",
     "type": "video",
     "poster": "images/guangzhou/promotional/video3-poster.jpg",
     "title": "新视频标题",
     "description": "视频描述"
   }
   ```

## 📊 视频文件大小建议

### GitHub 仓库限制
- 单个文件：最大 100MB
- 总仓库：建议 < 1GB

### 优化建议
如果视频文件过大，可以：

1. **压缩视频**
   ```bash
   # 使用 ffmpeg 压缩
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M output.mp4
   ```

2. **使用视频托管服务**
   - YouTube（嵌入）
   - Vimeo（嵌入）
   - 云存储（阿里云OSS、腾讯云COS等）

### 使用外部视频链接

如果使用视频托管服务，修改 JSON：

```json
{
  "id": "promo-video-001",
  "src": "https://example.com/your-video.mp4",  // 外部链接
  "type": "video",
  "poster": "images/guangzhou/promotional/video1-poster.jpg",
  "title": "企业形象宣传片",
  "description": "展示企业文化与实力"
}
```

## 🎨 生成视频海报

### 方法一：使用 ffmpeg
```bash
# 从视频第5秒提取一帧作为海报
ffmpeg -i video.mp4 -ss 00:00:05 -vframes 1 video-poster.jpg
```

### 方法二：使用视频编辑软件
- Adobe Premiere
- Final Cut Pro
- DaVinci Resolve

### 方法三：使用在线工具
- Kapwing
- Clideo
- Online Video Cutter

## 📂 视频相册目录结构

```
images/
├── abu-dhabi/
│   └── exhibition/
│       ├── cover.jpg           # 相册封面
│       ├── video1.mp4          # 真实视频文件
│       ├── video1-poster.jpg   # 视频海报
│       └── photo1.jpg          # 照片
│
└── guangzhou/
    ├── promotional/
    │   ├── cover.jpg
    │   ├── video1.mp4
    │   ├── video1-poster.jpg
    │   └── video2.mp4
    ├── employee/
    │   └── ...
    ├── event/
    │   └── ...
    ├── product-video/
    │   └── ...
    └── store-video/
        └── ...
```

## 🔧 当前包含视频演示的相册

### 阿布扎比/迪拜
- ✅ **展会活动录像**：1个视频占位符 + 2张照片

### 广州
- ✅ **宣传录像**：2个视频占位符 + 1张照片
- ✅ **优秀员工年终录像**：1个视频占位符
- ✅ **活动录像**：2个视频占位符
- ✅ **产品介绍录像**：1个视频占位符
- ✅ **门店介绍录像**：1个视频占位符

**总计：8个视频占位符项**

## 🎯 视频播放功能

当前网站支持的视频功能：
- ✅ 网格视图显示视频缩略图
- ✅ 视频播放图标覆盖
- ✅ 点击进入灯箱播放
- ✅ HTML5 视频播放器（支持播放/暂停/进度/音量/全屏）
- ✅ 下载视频功能
- ✅ 分享视频链接
- ✅ 移动端适配

## 💡 最佳实践

1. **视频命名规范**
   - 使用英文和数字：`video1.mp4`, `promo-2024.mp4`
   - 避免中文和特殊字符

2. **海报图片规范**
   - 与视频同名：`video1.mp4` → `video1-poster.jpg`
   - 尺寸：800x600 或 1920x1080
   - 格式：JPEG

3. **提交到 Git**
   - 视频文件较大，提交前确认网络稳定
   - 使用 Git LFS（Large File Storage）管理大文件：
   ```bash
   git lfs install
   git lfs track "*.mp4"
   git add .gitattributes
   ```

## 🆘 故障排除

### 视频无法播放
- 检查文件格式（必须是 MP4/H.264）
- 检查文件路径是否正确
- 检查文件是否已上传到服务器

### 视频加载慢
- 压缩视频文件
- 使用 CDN 或视频托管服务
- 确保海报图片已设置

### GitHub 推送失败
- 检查文件大小（< 100MB）
- 使用 Git LFS
- 考虑使用外部托管

---

**提示**：如果不需要上传真实视频，当前的占位符已经可以完整展示视频功能的所有界面和交互效果！
