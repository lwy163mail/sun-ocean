import React from 'react';
import { Layout, Menu, Typography, Space } from 'antd';
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/manage',
      icon: <SettingOutlined />,
      label: '管理',
    },
  ];

  return (
    <AntHeader style={{ 
      background: '#fff', 
      padding: '0 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Space>
        <AppstoreOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
          Sun Ocean
        </Title>
        <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
          个人导航中心
        </Typography.Text>
      </Space>
      
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ border: 'none', flex: 1, justifyContent: 'center' }}
      />
    </AntHeader>
  );
};

export default Header;