#!/bin/bash

echo "🚀 启动React开发服务器（调试模式）..."
echo "=================================="

# 清理端口
echo "🔧 清理端口..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
sleep 2

# 进入项目目录
cd sun-ocean/frontend

echo "📁 检查项目文件..."
echo "App.tsx 内容前50行:"
head -50 src/App.tsx

echo ""
echo "🔍 检查TypeScript配置..."
if [ -f tsconfig.json ]; then
    echo "✅ tsconfig.json 存在"
    grep -A5 -B5 "compilerOptions" tsconfig.json
else
    echo "❌ tsconfig.json 不存在"
fi

echo ""
echo "🚀 尝试启动开发服务器..."
# 直接运行并捕获输出
npx react-scripts start 2>&1 | tee /tmp/react-debug.log &
REACT_PID=$!

echo "⏳ 等待10秒..."
sleep 10

echo ""
echo "📊 检查进程状态..."
if ps -p $REACT_PID > /dev/null; then
    echo "✅ React进程正在运行 (PID: $REACT_PID)"
else
    echo "❌ React进程已退出"
    echo "最后10行输出:"
    tail -10 /tmp/react-debug.log
fi

echo ""
echo "🌐 测试访问..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 可以访问 localhost:3000"
    echo "页面标题:"
    curl -s http://localhost:3000 | grep -o "<title>[^<]*</title>"
else
    echo "❌ 无法访问 localhost:3000"
fi

echo ""
echo "📋 建议操作:"
echo "1. 查看完整日志: tail -f /tmp/react-debug.log"
echo "2. 访问测试页面: http://localhost:3002/test.html"
echo "3. 检查后端API: curl http://localhost:8080/api/categories"
echo ""
echo "🔄 如果仍有问题，可能需要:"
echo "   • 删除 node_modules 重新安装"
echo "   • 检查 package.json 依赖"
echo "   • 验证 TypeScript 配置"