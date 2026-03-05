#!/bin/bash

echo "📸 截图验证..."
echo "============="

# 打开浏览器
echo "🌐 打开浏览器..."
open http://localhost:3000

echo "⏳ 等待页面加载..."
sleep 8

# 截图
SCREENSHOT_PATH="sun-ocean-enhanced-$(date +%Y%m%d-%H%M%S).png"
echo "📸 截图: $SCREENSHOT_PATH"
screencapture -x "$SCREENSHOT_PATH"

if [ -f "$SCREENSHOT_PATH" ]; then
    echo "✅ 截图成功"
    ls -lh "$SCREENSHOT_PATH"
    
    # 创建缩略图
    THUMBNAIL_PATH="sun-ocean-enhanced-thumb.jpg"
    sips -s format jpeg -Z 800 "$SCREENSHOT_PATH" --out "$THUMBNAIL_PATH"
    echo "🖼️ 缩略图: $THUMBNAIL_PATH"
    
    echo "🎉 截图完成！"
else
    echo "❌ 截图失败"
fi