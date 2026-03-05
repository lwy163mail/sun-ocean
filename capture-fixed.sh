#!/bin/bash

echo "📸 重新截图验证修复后的应用..."

# 等待应用完全加载
echo "⏳ 等待应用加载..."
sleep 3

# 打开浏览器
echo "🌐 打开浏览器访问应用..."
open http://localhost:3000

echo "⏳ 等待8秒让页面完全加载..."
sleep 8

# 截图
SCREENSHOT_PATH="sun-ocean-fixed-$(date +%Y%m%d-%H%M%S).png"
echo "📸 截图保存到: $SCREENSHOT_PATH"
screencapture -x "$SCREENSHOT_PATH"

if [ -f "$SCREENSHOT_PATH" ]; then
    echo "✅ 截图成功!"
    echo "📊 文件信息:"
    ls -lh "$SCREENSHOT_PATH"
    
    # 创建缩略图
    THUMBNAIL_PATH="sun-ocean-fixed-thumbnail.jpg"
    sips -s format jpeg -Z 800 "$SCREENSHOT_PATH" --out "$THUMBNAIL_PATH"
    echo "🖼️ 缩略图: $THUMBNAIL_PATH"
    ls -lh "$THUMBNAIL_PATH"
    
    echo "🎉 修复验证完成!"
else
    echo "❌ 截图失败"
fi