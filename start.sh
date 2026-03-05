#!/bin/bash

echo "🚀 启动 Sun Ocean 个人导航应用"

# 检查是否安装了必要的工具
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ 未安装 $1，请先安装 $1"
        exit 1
    fi
}

echo "🔍 检查环境..."
check_command "node"
check_command "npm"
check_command "java"
check_command "mvn"

echo "📊 检查MySQL服务..."
if ! brew services list | grep -q "mysql.*started"; then
    echo "⚠️  MySQL服务未启动，尝试启动..."
    if brew services start mysql; then
        echo "✅ MySQL服务启动成功！"
        # 等待MySQL完全启动
        sleep 5
    else
        echo "❌ MySQL服务启动失败，请手动启动："
        echo "   brew services start mysql"
        echo "或使用："
        echo "   mysql.server start"
        exit 1
    fi
else
    echo "✅ MySQL服务正在运行"
fi

echo "🗄️  初始化数据库..."
if mysql -u root -pLiwangyang_610 < init-database.sql; then
    echo "✅ 数据库初始化成功！"
else
    echo "⚠️  数据库可能已存在，继续..."
fi

echo "📦 安装前端依赖..."
cd frontend
npm install --legacy-peer-deps

echo "⚙️  构建后端..."
cd ../backend
mvn clean install -DskipTests

echo "✅ 环境准备完成！"
echo ""
echo "📋 启动步骤："
echo ""
echo "1. 启动后端服务："
echo "   cd backend && mvn spring-boot:run"
echo ""
echo "2. 启动前端服务："
echo "   cd frontend && npm start"
echo ""
echo "🌐 访问地址："
echo "   前端：http://localhost:3000"
echo "   后端API：http://localhost:8080"
echo ""
echo "📝 数据库信息："
echo "   数据库：sun_ocean"
echo "   用户名：root"
echo "   密码：Liwangyang_610"
echo "   端口：3306"
echo ""
echo "📖 详细文档请查看 QUICK_START.md"