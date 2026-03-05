import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './App.css';

// 最简单的首页组件
const SimpleHomePage: React.FC = () => {
  return (
    <div style={{ 
      padding: '40px',
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🌊 Sun Ocean</h1>
      <p style={{ fontSize: '20px', marginBottom: '40px' }}>个人导航中心 - 稳定版本</p>
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#333',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <h2>✅ 应用状态正常</h2>
        <p>前端服务运行在: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
        <p>后端API运行在: <a href="http://localhost:8080/api/categories" target="_blank">http://localhost:8080/api/categories</a></p>
        
        <div style={{ marginTop: '30px', textAlign: 'left' }}>
          <h3>🔧 快速测试:</h3>
          <button 
            onClick={() => window.open('http://localhost:8080/api/categories', '_blank')}
            style={{
              padding: '10px 20px',
              background: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              margin: '10px',
              cursor: 'pointer'
            }}
          >
            测试后端API
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#52c41a',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              margin: '10px',
              cursor: 'pointer'
            }}
          >
            刷新页面
          </button>
        </div>
        
        <div style={{ marginTop: '30px', padding: '20px', background: '#f6ffed', borderRadius: '10px' }}>
          <h3>📋 下一步:</h3>
          <p>如果这个页面能正常显示，说明基础服务正常。</p>
          <p>我们可以逐步添加功能，确保每一步都稳定。</p>
        </div>
      </div>
    </div>
  );
};

const AppStable: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SimpleHomePage />} />
            <Route path="*" element={<SimpleHomePage />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default AppStable;