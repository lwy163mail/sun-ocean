import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './App.css';
import AppStable from './AppStable';

const App: React.FC = () => {
  return <AppStable />;
};

export default App;