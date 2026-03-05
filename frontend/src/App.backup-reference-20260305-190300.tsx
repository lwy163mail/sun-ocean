import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './App.css';
import HomePageReference from './pages/HomePageReference';
import CategoryPage from './pages/CategoryPage';
import LinkManagement from './pages/LinkManagement';
import HeaderReference from './components/HeaderReference';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <div className="App">
          <HeaderReference />
          <Routes>
            <Route path="/" element={<HomePageReference />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/manage" element={<LinkManagement />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;