#!/bin/bash

echo "🎨 部署优化版UI..."
echo "=================="

# 1. 备份当前App.tsx
echo "📁 备份当前配置..."
cd sun-ocean
cp frontend/src/App.tsx frontend/src/App.backup-$(date +%Y%m%d-%H%M%S).tsx

# 2. 更新App.tsx使用优化版
echo "🔄 更新App.tsx..."
cat > frontend/src/App.tsx << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePageOptimized from './pages/HomePageOptimized';
import CategoryPage from './pages/CategoryPage';
import LinkManagement from './pages/LinkManagement';
import HeaderOptimized from './components/HeaderOptimized';
import { ThemeProvider } from './theme/ThemeContext';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App" style={{ minHeight: '100vh' }}>
          <HeaderOptimized 
            onSearch={handleSearch}
            searchPlaceholder="搜索分类、链接或标签..."
          />
          <Routes>
            <Route path="/" element={<HomePageOptimized />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/manage" element={<LinkManagement />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
EOF

echo "✅ App.tsx 已更新"

# 3. 重启前端服务
echo "🔄 重启前端服务..."
pkill -f "react-scripts" 2>/dev/null || true
sleep 2

echo "🚀 启动优化版前端..."
cd frontend
npm start > /tmp/react-optimized.log 2>&1 &
REACT_PID=$!

echo "⏳ 等待15秒启动..."
sleep 15

# 4. 检查启动状态
if ps -p $REACT_PID > /dev/null; then
    echo "✅ React进程正在运行 (PID: $REACT_PID)"
    
    # 检查编译状态
    if grep -q "Compiled successfully" /tmp/react-optimized.log; then
        echo "✅ 编译成功"
    else
        echo "⚠️  检查编译日志..."
        tail -20 /tmp/react-optimized.log
    fi
    
    # 测试访问
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ 可以访问 localhost:3000"
    else
        echo "❌ 无法访问 localhost:3000"
    fi
else
    echo "❌ React进程启动失败"
    echo "最后20行日志:"
    tail -20 /tmp/react-optimized.log
fi

echo ""
echo "📋 部署完成!"
echo "访问: http://localhost:3000"
echo "日志: tail -f /tmp/react-optimized.log"
echo ""
echo "🎨 新功能:"
echo "1. 主题切换 (明亮/深色/蓝色/绿色/紫色)"
echo "2. 页面内搜索和筛选"
echo "3. 紧凑卡片布局 (背景色 + 左侧图标 + 上下标题)"