#!/bin/bash

echo "📸 重新截图并保存到工作目录..."

# 检查应用是否在运行
echo "🔍 检查应用状态..."
curl -s http://localhost:3000 > /dev/null && echo "✅ 前端应用运行正常" || echo "❌ 前端应用未运行"
curl -s http://localhost:8080/api/categories > /dev/null && echo "✅ 后端API运行正常" || echo "❌ 后端API未运行"

# 打开浏览器
echo "🌐 打开浏览器..."
open http://localhost:3000

echo "⏳ 等待5秒让页面加载..."
sleep 5

# 截图到工作目录
SCREENSHOT_PATH="sun-ocean-screenshot-$(date +%Y%m%d-%H%M%S).png"
echo "📸 截图保存到: $SCREENSHOT_PATH"
screencapture -x "$SCREENSHOT_PATH"

if [ -f "$SCREENSHOT_PATH" ]; then
    echo "✅ 截图成功!"
    echo "📊 文件信息:"
    ls -lh "$SCREENSHOT_PATH"
    
    # 创建缩略图
    THUMBNAIL_PATH="sun-ocean-thumbnail.jpg"
    sips -s format jpeg -Z 800 "$SCREENSHOT_PATH" --out "$THUMBNAIL_PATH"
    echo "🖼️ 缩略图: $THUMBNAIL_PATH"
    ls -lh "$THUMBNAIL_PATH"
    
    echo "🎉 截图已保存到工作目录!"
    echo "文件:"
    echo "1. $SCREENSHOT_PATH (原始截图)"
    echo "2. $THUMBNAIL_PATH (缩略图)"
else
    echo "❌ 截图失败"
fi