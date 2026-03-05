#!/bin/bash

echo "🔧 验证修复..."
echo "=============="

# 检查服务
echo "🔍 检查服务状态..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 前端服务正常"
else
    echo "❌ 前端服务异常"
    exit 1
fi

if curl -s http://localhost:8080/api/categories > /dev/null; then
    echo "✅ 后端API正常"
else
    echo "❌ 后端API异常"
    exit 1
fi

# 打开浏览器
echo "🌐 打开浏览器..."
open http://localhost:3000

echo "⏳ 等待页面加载..."
sleep 5

# 截图
SCREENSHOT_PATH="sun-ocean-fixed-$(date +%Y%m%d-%H%M%S).png"
echo "📸 截图: $SCREENSHOT_PATH"
screencapture -x "$SCREENSHOT_PATH"

if [ -f "$SCREENSHOT_PATH" ]; then
    echo "✅ 截图成功"
    ls -lh "$SCREENSHOT_PATH"
    
    # 创建缩略图
    THUMBNAIL_PATH="sun-ocean-fixed-thumb.jpg"
    sips -s format jpeg -Z 800 "$SCREENSHOT_PATH" --out "$THUMBNAIL_PATH"
    echo "🖼️ 缩略图: $THUMBNAIL_PATH"
    
    echo "🎉 修复验证完成！"
else
    echo "❌ 截图失败"
fi