# 照片上传指南

## 快速上传步骤

### 第一步：准备照片

1. 压缩和优化照片（建议）：
   - 分辨率：1920x1080 或 2048x1536
   - 格式：JPEG
   - 大小：每张控制在 500KB 以内
   - 可使用工具：TinyPNG、ImageOptim、Photoshop

2. 照片命名规范（建议）：
   - 使用英文和数字：`photo1.jpg`, `photo2.jpg`
   - 封面图：`cover.jpg`
   - 避免中文和特殊字符

### 第二步：复制照片到目录

根据相册主题，将照片复制到对应目录：

#### 阿布扎比相册：
```bash
# 卢浮宫
cp /path/to/your/photos/*.jpg images/abu-dhabi/louvre/

# 大清真寺
cp /path/to/your/photos/*.jpg images/abu-dhabi/grand-mosque/

# 皇宫酒店
cp /path/to/your/photos/*.jpg images/abu-dhabi/emirates-palace/
```

#### 广州相册：
```bash
# 男生写真
cp /path/to/your/photos/*.jpg images/guangzhou/male/

# 女生写真
cp /path/to/your/photos/*.jpg images/guangzhou/female/

# 街拍
cp /path/to/your/photos/*.jpg images/guangzhou/street/

# 情侣摄影
cp /path/to/your/photos/*.jpg images/guangzhou/couple/
```

#### 或者使用 Finder/文件管理器：
直接将照片拖拽到对应的文件夹中。

### 第三步：更新配置文件

#### 方法 A：使用管理后台（推荐）

1. 启动本地服务器：
   ```bash
   python3 -m http.server 8000
   ```

2. 访问 http://localhost:8000/admin.html

3. 使用密码 `admin123` 登录

4. 切换到"JSON编辑器"标签页

5. 找到对应的相册，在 `photos` 数组中添加照片信息：
   ```json
   "photos": [
     {
       "id": "photo-001",
       "src": "images/abu-dhabi/louvre/photo1.jpg",
       "title": "光影穹顶",
       "description": "标志性的圆顶建筑"
     },
     {
       "id": "photo-002",
       "src": "images/abu-dhabi/louvre/photo2.jpg",
       "title": "艺术长廊",
       "description": "现代艺术展厅"
     }
   ]
   ```

6. 点击"下载JSON"按钮

7. 用下载的文件替换 `data/albums.json`

#### 方法 B：直接编辑 JSON 文件

用文本编辑器打开 `data/albums.json`，找到对应相册，添加照片信息。

### 第四步：提交到 Git

```bash
# 查看更改
git status

# 添加所有更改
git add images/ data/albums.json

# 提交
git commit -m "Add photos for [相册名称]"

# 推送到 GitHub
git push
```

等待 1-2 分钟，GitHub Pages 会自动部署更新。

## 完整示例

假设你要为"阿布扎比卢浮宫"添加 5 张照片：

### 1. 复制照片
```bash
# 假设你的照片在桌面
cp ~/Desktop/louvre/*.jpg images/abu-dhabi/louvre/
```

### 2. 查看复制的文件
```bash
ls images/abu-dhabi/louvre/
# 输出: cover.jpg  photo1.jpg  photo2.jpg  photo3.jpg  photo4.jpg  photo5.jpg
```

### 3. 编辑 data/albums.json

在 `louvre-abu-dhabi` 相册中更新：

```json
{
  "id": "louvre-abu-dhabi",
  "title": "阿布扎比卢浮宫",
  "coverImage": "images/abu-dhabi/louvre/cover.jpg",
  "photos": [
    {
      "id": "louvre-001",
      "src": "images/abu-dhabi/louvre/photo1.jpg",
      "title": "圆顶建筑",
      "description": "标志性的几何穹顶"
    },
    {
      "id": "louvre-002",
      "src": "images/abu-dhabi/louvre/photo2.jpg",
      "title": "光影艺术",
      "description": "阳光穿过穹顶的光影效果"
    },
    {
      "id": "louvre-003",
      "src": "images/abu-dhabi/louvre/photo3.jpg",
      "title": "海边博物馆",
      "description": "建筑与海景的完美结合"
    },
    {
      "id": "louvre-004",
      "src": "images/abu-dhabi/louvre/photo4.jpg",
      "title": "艺术展厅",
      "description": "现代化的展览空间"
    },
    {
      "id": "louvre-005",
      "src": "images/abu-dhabi/louvre/photo5.jpg",
      "title": "夜景灯光",
      "description": "夜晚的建筑灯光效果"
    }
  ]
}
```

### 4. 提交并推送
```bash
git add images/abu-dhabi/louvre/ data/albums.json
git commit -m "Add 5 photos for Louvre Abu Dhabi album"
git push
```

## 添加新相册

如果要创建全新的相册：

### 1. 创建新目录
```bash
mkdir -p images/guangzhou/portrait-session
```

### 2. 复制照片
```bash
cp /path/to/photos/*.jpg images/guangzhou/portrait-session/
```

### 3. 在 data/albums.json 中添加新相册
```json
{
  "id": "portrait-session-2024",
  "title": "2024人像专场",
  "description": "春季人像摄影作品",
  "category": "guangzhou",
  "tags": ["人像", "写真", "春季"],
  "coverImage": "images/guangzhou/portrait-session/cover.jpg",
  "date": "2024-03",
  "location": "广州",
  "photos": [
    {
      "id": "portrait-001",
      "src": "images/guangzhou/portrait-session/photo1.jpg",
      "title": "春日午后",
      "description": "温暖的春日阳光"
    }
  ]
}
```

### 4. 提交
```bash
git add images/guangzhou/portrait-session/ data/albums.json
git commit -m "Add new portrait session album"
git push
```

## 批量上传技巧

### 使用脚本批量处理（可选）

创建一个简单的脚本来快速添加照片配置：

```bash
#!/bin/bash
# 在 images/abu-dhabi/louvre/ 目录下的所有 jpg 文件生成 JSON 配置

folder="images/abu-dhabi/louvre"
counter=1

for file in $folder/*.jpg; do
  if [ "$file" != "$folder/cover.jpg" ]; then
    filename=$(basename "$file")
    echo "{
      \"id\": \"louvre-$(printf "%03d" $counter)\",
      \"src\": \"$folder/$filename\",
      \"title\": \"照片 $counter\",
      \"description\": \"请添加描述\"
    },"
    ((counter++))
  fi
done
```

## 常见问题

### Q: 照片上传后看不到？
A: 检查以下几点：
1. JSON 文件中的路径是否正确
2. 照片文件名是否匹配
3. 是否已提交并推送到 GitHub
4. 等待 1-2 分钟让 GitHub Pages 重新部署

### Q: 照片加载很慢？
A: 优化照片大小：
- 使用 TinyPNG 压缩
- 调整分辨率到 1920x1080
- 控制单张照片在 500KB 以内

### Q: 可以上传原始高清照片吗？
A: 不推荐，因为：
- GitHub 仓库有 1GB 大小限制
- 大文件会导致网站加载缓慢
- 建议先压缩优化后再上传

### Q: 如何删除照片？
A:
1. 从 images 目录删除文件
2. 从 data/albums.json 中删除对应配置
3. 提交并推送

```bash
rm images/abu-dhabi/louvre/photo1.jpg
# 编辑 albums.json 删除对应项
git add -A
git commit -m "Remove photo"
git push
```

## 图片优化工具推荐

- **在线工具**：TinyPNG (https://tinypng.com)
- **Mac**：ImageOptim
- **Windows**：RIOT
- **命令行**：imagemagick, jpegoptim

## 需要帮助？

如有问题，查看 README.md 或检查浏览器控制台的错误信息。
