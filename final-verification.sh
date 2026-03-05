#!/bin/bash

echo "🎉 最终验证..."
echo "============="

# 检查所有服务
echo "🔍 服务状态检查:"

echo "1. 前端React应用:"
if curl -s http://localhost:3000 > /dev/null; then
    echo "   ✅ http://localhost:3000 (正常运行)"
    curl -s http://localhost:3000 | grep -o "<title>[^<]*</title>"
else
    echo "   ❌ 前端服务异常"
fi

echo ""
echo "2. 后端Spring Boot API:"
if curl -s http://localhost:8080/api/categories > /dev/null; then
    echo "   ✅ http://localhost:8080/api/categories"
    curl -s http://localhost:8080/api/categories | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    print(f'   返回 {len(data)} 个分类:')
    for cat in data:
        print(f'   • {cat[\"name\"]} - {cat[\"description\"]}')
except:
    print('   API响应异常')
"
else
    echo "   ❌ 后端API异常"
fi

echo ""
echo "3. 数据库连接:"
if mysql -u root -e "SELECT 1" > /dev/null 2>&1; then
    echo "   ✅ MySQL数据库连接正常"
    mysql -u root -D sun_ocean -e "SELECT COUNT(*) as '分类数量' FROM categories; SELECT COUNT(*) as '链接数量' FROM links;" 2>/dev/null || echo "   ⚠️  数据库查询失败"
else
    echo "   ❌ MySQL连接失败"
fi

echo ""
echo "📸 生成最终截图..."
open http://localhost:3000
sleep 8

SCREENSHOT_PATH="sun-ocean-working-$(date +%Y%m%d-%H%M%S).png"
screencapture -x "$SCREENSHOT_PATH"

if [ -f "$SCREENSHOT_PATH" ]; then
    echo "✅ 截图成功: $SCREENSHOT_PATH"
    ls -lh "$SCREENSHOT_PATH"
    
    THUMBNAIL_PATH="sun-ocean-working-thumb.jpg"
    sips -s format jpeg -Z 800 "$SCREENSHOT_PATH" --out "$THUMBNAIL_PATH"
    echo "🖼️ 缩略图: $THUMBNAIL_PATH"
else
    echo "❌ 截图失败"
fi

echo ""
echo "🎊 验证完成!"
echo "访问: http://localhost:3000"
echo "API: http://localhost:8080/api/categories"
echo "GitHub: https://github.com/lwy163mail/sun-ocean"