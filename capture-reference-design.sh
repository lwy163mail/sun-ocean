#!/bin/bash

echo "📸 截图参考图设计版本..."
echo "========================"

# 等待页面完全加载
echo "⏳ 等待页面加载..."
sleep 10

# 截图
SCREENSHOT_PATH="sun-ocean-reference-design-$(date +%Y%m%d-%H%M%S).png"
echo "📸 截图: $SCREENSHOT_PATH"
screencapture -x "$SCREENSHOT_PATH"

if [ -f "$SCREENSHOT_PATH" ]; then
    echo "✅ 截图成功"
    ls -lh "$SCREENSHOT_PATH"
    
    # 创建缩略图
    THUMBNAIL_PATH="sun-ocean-reference-thumb.jpg"
    sips -s format jpeg -Z 800 "$SCREENSHOT_PATH" --out "$THUMBNAIL_PATH"
    echo "🖼️ 缩略图: $THUMBNAIL_PATH"
    
    echo "🎉 截图完成！"
else
    echo "❌ 截图失败"
fi

echo ""
echo "🌐 应用状态:"
curl -s http://localhost:3000 > /dev/null && echo "✅ 前端: http://localhost:3000 (运行中)" || echo "❌ 前端异常"
curl -s http://localhost:8080/api/categories > /dev/null && echo "✅ 后端API: http://localhost:8080/api/categories" || echo "❌ 后端API异常"