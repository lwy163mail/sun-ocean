#!/bin/bash

echo "🎨 部署参考图设计..."
echo "=================="

# 1. 备份当前App.tsx
echo "📁 备份当前配置..."
cd sun-ocean
cp frontend/src/App.tsx frontend/src/App.backup-reference-$(date +%Y%m%d-%H%M%S).tsx

echo "✅ 备份完成"

# 2. 重启前端服务
echo "🔄 重启前端服务..."
pkill -f "react-scripts" 2>/dev/null || true
sleep 2

echo "🚀 启动参考图设计版本..."
cd frontend
npm start > /tmp/react-reference.log 2>&1 &
REACT_PID=$!

echo "⏳ 等待15秒启动..."
sleep 15

# 3. 检查启动状态
if ps -p $REACT_PID > /dev/null; then
    echo "✅ React进程正在运行 (PID: $REACT_PID)"
    
    # 检查编译状态
    if tail -20 /tmp/react-reference.log | grep -q "Compiled successfully"; then
        echo "✅ 编译成功"
    else
        echo "⚠️  检查编译日志..."
        tail -20 /tmp/react-reference.log | grep -E "error|Error|ERROR"
    fi
    
    # 测试访问
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ 可以访问 localhost:3000"
        
        # 打开浏览器
        echo "🌐 打开浏览器..."
        open http://localhost:3000
    else
        echo "❌ 无法访问 localhost:3000"
    fi
else
    echo "❌ React进程启动失败"
    echo "最后20行日志:"
    tail -20 /tmp/react-reference.log
fi

echo ""
echo "📋 部署完成!"
echo "访问: http://localhost:3000"
echo "日志: tail -f /tmp/react-reference.log"
echo ""
echo "🎨 基于参考图的新设计:"
echo "1. 深色顶部导航栏 (参考图片样式)"
echo "2. 居中大搜索框"
echo "3. 横向标签导航"
echo "4. 现代化卡片布局 (悬停效果、操作按钮)"
echo "5. 数据统计区域"
echo ""
echo "🔄 如果编译有错误，可能需要检查TypeScript配置"