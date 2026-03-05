#!/bin/bash

echo "🎨 应用基于效果图的设计..."
echo "=========================="

# 1. 备份当前文件
echo "📁 备份当前文件..."
cp sun-ocean/frontend/src/App.tsx sun-ocean/frontend/src/App.inspired-backup.tsx
cp sun-ocean/frontend/src/pages/HomePageV2.tsx sun-ocean/frontend/src/pages/HomePageV2.backup.tsx
cp sun-ocean/frontend/src/components/HeaderV2.tsx sun-ocean/frontend/src/components/HeaderV2.backup.tsx

echo "✅ 备份完成"

# 2. 更新App.tsx使用基于效果图的设计
echo "🔄 更新App.tsx..."
cat > sun-ocean/frontend/src/App.tsx << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './App.css';
import HomePageInspired from './pages/HomePageInspired';
import CategoryPage from './pages/CategoryPage';
import LinkManagement from './pages/LinkManagement';
import HeaderInspired from './components/HeaderInspired';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider 
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
          colorBgContainer: '#ffffff',
          colorBorder: '#f0f0f0',
          colorText: '#262626',
          colorTextSecondary: '#8c8c8c',
        },
        components: {
          Card: {
            borderRadiusLG: 12,
            boxShadowTertiary: '0 2px 8px rgba(0, 0, 0, 0.06)',
          },
          Button: {
            borderRadius: 6,
            controlHeight: 36,
          },
          Input: {
            borderRadius: 6,
            controlHeight: 36,
          },
          Menu: {
            itemBorderRadius: 4,
            itemHoverBg: 'rgba(22, 119, 255, 0.04)',
            itemSelectedBg: 'rgba(22, 119, 255, 0.1)',
          },
        },
      }}
    >
      <Router>
        <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
          <HeaderInspired />
          <Content>
            <Routes>
              <Route path="/" element={<HomePageInspired />} />
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

# 3. 重启前端服务
echo "🔧 重启前端服务..."
pkill -f "react-scripts start" 2>/dev/null || true
sleep 2
cd sun-ocean/frontend && npm start > /dev/null 2>&1 &

echo "⏳ 等待前端重启..."
sleep 8

# 4. 验证服务
echo "🔍 验证服务..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 前端服务已启动"
else
    echo "❌ 前端服务启动失败"
    echo "尝试手动启动: cd sun-ocean/frontend && npm start"
fi

if curl -s http://localhost:8080/api/categories > /dev/null; then
    echo "✅ 后端API正常"
else
    echo "❌ 后端API异常"
fi

# 5. 截图新设计
echo "📸 截图基于效果图的设计..."
sleep 5
open http://localhost:3000
sleep 8

SCREENSHOT_PATH="sun-ocean-inspired-$(date +%Y%m%d-%H%M%S).png"
screencapture -x "$SCREENSHOT_PATH"

if [ -f "$SCREENSHOT_PATH" ]; then
    echo "✅ 截图成功: $SCREENSHOT_PATH"
    ls -lh "$SCREENSHOT_PATH"
    
    # 创建缩略图
    THUMBNAIL_PATH="sun-ocean-inspired-thumbnail.jpg"
    sips -s format jpeg -Z 800 "$SCREENSHOT_PATH" --out "$THUMBNAIL_PATH"
    echo "🖼️ 缩略图: $THUMBNAIL_PATH"
else
    echo "❌ 截图失败"
fi

echo ""
echo "🎉 基于效果图的设计已应用！"
echo ""
echo "📋 设计特点（基于效果图分析）："
echo "1. ✅ 简洁专业的布局"
echo "2. ✅ 清晰的视觉层次"
echo "3. ✅ 实用的搜索功能"
echo "4. ✅ 分类过滤和排序"
echo "5. ✅ 统计信息卡片"
echo "6. ✅ 快速操作区域"
echo "7. ✅ 现代化的卡片设计"
echo "8. ✅ 响应式布局"
echo ""
echo "🎨 色彩方案："
echo "  主色: #1677ff (蓝色)"
echo "  辅助色: #52c41a (绿色)"
echo "  强调色: #722ed1 (紫色)"
echo "  背景: #f5f5f5"
echo "  文字: #262626 / #8c8c8c"
echo ""
echo "🚀 访问 http://localhost:3000 查看新设计！"
echo ""
echo "📁 备份文件："
echo "  • App.inspired-backup.tsx"
echo "  • HomePageV2.backup.tsx"
echo "  • HeaderV2.backup.tsx"
echo ""
echo "🔄 恢复之前版本："
echo "  cp sun-ocean/frontend/src/App.inspired-backup.tsx sun-ocean/frontend/src/App.tsx"
echo "  然后重启前端服务"