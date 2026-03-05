#!/bin/bash

echo "📸 截图新的UI界面..."
echo "===================="

# 等待页面加载
echo "⏳ 等待新UI加载..."
sleep 5

# 打开浏览器
echo "🌐 打开浏览器..."
open http://localhost:3000

echo "⏳ 等待10秒让页面完全渲染..."
sleep 10

# 截图
SCREENSHOT_PATH="sun-ocean-new-ui-$(date +%Y%m%d-%H%M%S).png"
echo "📸 截图保存到: $SCREENSHOT_PATH"
screencapture -x "$SCREENSHOT_PATH"

if [ -f "$SCREENSHOT_PATH" ]; then
    echo "✅ 截图成功!"
    echo "📊 文件信息:"
    ls -lh "$SCREENSHOT_PATH"
    
    # 创建缩略图
    THUMBNAIL_PATH="sun-ocean-new-ui-thumbnail.jpg"
    sips -s format jpeg -Z 800 "$SCREENSHOT_PATH" --out "$THUMBNAIL_PATH"
    echo "🖼️ 缩略图: $THUMBNAIL_PATH"
    ls -lh "$THUMBNAIL_PATH"
    
    echo "🎉 新UI截图完成!"
else
    echo "❌ 截图失败"
fi