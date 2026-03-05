#!/bin/bash

echo "🔍 测试 Sun Ocean API 连接..."

# 测试后端API
echo "1. 测试分类API..."
curl -s http://localhost:8080/api/categories | python3 -m json.tool

echo ""
echo "2. 测试链接API..."
curl -s http://localhost:8080/api/links | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(f'找到 {len(data)} 个链接')
for link in data[:3]:  # 只显示前3个
    print(f'  • {link[\"title\"]} ({link[\"linkType\"]})')
"

echo ""
echo "3. 测试数据库连接..."
if mysql -u root -pLiwangyang_610 -e "USE sun_ocean; SELECT COUNT(*) as category_count FROM categories; SELECT COUNT(*) as link_count FROM links;" 2>/dev/null; then
    echo "✅ 数据库连接正常"
else
    echo "❌ 数据库连接失败"
fi

echo ""
echo "📊 状态汇总："
echo "   后端API: http://localhost:8080"
echo "   前端应用: http://localhost:3000"
echo "   数据库: sun_ocean (MySQL)"
echo ""
echo "🎯 下一步："
echo "   1. 确保后端正在运行：mvn spring-boot:run (在backend目录)"
echo "   2. 确保前端正在运行：npm start (在frontend目录)"
echo "   3. 访问 http://localhost:3000 使用应用"