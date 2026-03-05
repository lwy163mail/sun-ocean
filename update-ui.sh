#!/bin/bash

echo "🎨 更新Sun Ocean UI设计..."
echo "=========================="

# 1. 备份原始文件
echo "📁 备份原始文件..."
cp sun-ocean/frontend/src/App.tsx sun-ocean/frontend/src/App.original.tsx
cp sun-ocean/frontend/src/pages/HomePage.tsx sun-ocean/frontend/src/pages/HomePage.original.tsx
cp sun-ocean/frontend/src/components/Header.tsx sun-ocean/frontend/src/components/Header.original.tsx

echo "✅ 备份完成"

# 2. 更新App.tsx使用新UI
echo "🔄 更新App.tsx..."
cat > sun-ocean/frontend/src/App.tsx << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './App.css';
import HomePageV2 from './pages/HomePageV2';
import CategoryPage from './pages/CategoryPage';
import LinkManagement from './pages/LinkManagement';
import HeaderV2 from './components/HeaderV2';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider 
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#667eea',
          borderRadius: 12,
          colorBgContainer: '#ffffff',
        },
        components: {
          Card: {
            borderRadiusLG: 16,
            boxShadowTertiary: '0 10px 30px rgba(0, 0, 0, 0.1)',
          },
          Button: {
            borderRadius: 12,
            controlHeight: 40,
          },
          Input: {
            borderRadius: 12,
            controlHeight: 40,
          },
          Menu: {
            itemBorderRadius: 8,
            itemHoverBg: 'rgba(102, 126, 234, 0.1)',
          },
        },
      }}
    >
      <Router>
        <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
          <HeaderV2 />
          <Content>
            <Routes>
              <Route path="/" element={<HomePageV2 />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/manage" element={<LinkManagement />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
EOF

echo "✅ App.tsx更新完成"

# 3. 检查前端是否在运行
echo "🔍 检查前端服务状态..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 前端服务正在运行"
    echo "🔄 重启前端服务以应用更改..."
    # 查找并重启前端进程
    pkill -f "react-scripts start" 2>/dev/null || true
    sleep 2
    cd sun-ocean/frontend && npm start > /dev/null 2>&1 &
    echo "⏳ 等待前端重启..."
    sleep 5
else
    echo "⚠️  前端服务未运行，正在启动..."
    cd sun-ocean/frontend && npm start > /dev/null 2>&1 &
    sleep 5
fi

# 4. 验证服务
echo "🔍 验证服务..."
sleep 3
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 前端服务已启动"
else
    echo "❌ 前端服务启动失败"
fi

if curl -s http://localhost:8080/api/categories > /dev/null; then
    echo "✅ 后端API正常"
else
    echo "❌ 后端API异常"
fi

# 5. 打开浏览器查看
echo "🌐 打开浏览器查看新UI..."
open http://localhost:3000

echo ""
echo "🎉 UI更新完成！"
echo ""
echo "📋 更新内容："
echo "1. ✅ 现代化首页设计 (HomePageV2)"
echo "2. ✅ 改进的导航栏 (HeaderV2)"
echo "3. ✅ 更新的主题配置"
echo "4. ✅ 渐变色彩方案"
echo "5. ✅ 卡片悬停动画"
echo "6. ✅ 搜索功能"
echo "7. ✅ 统计信息展示"
echo ""
echo "🚀 现在访问 http://localhost:3000 查看新界面！"
echo ""
echo "📁 原始文件已备份："
echo "  • App.original.tsx"
echo "  • HomePage.original.tsx"
echo "  • Header.original.tsx"
echo ""
echo "🔄 如需恢复原始版本，运行："
echo "  cp sun-ocean/frontend/src/App.original.tsx sun-ocean/frontend/src/App.tsx"
echo "  cp sun-ocean/frontend/src/pages/HomePage.original.tsx sun-ocean/frontend/src/pages/HomePage.tsx"
echo "  cp sun-ocean/frontend/src/components/Header.original.tsx sun-ocean/frontend/src/components/Header.tsx"