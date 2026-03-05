import React, { useState } from 'react';
import { Layout, Input, Button, Avatar, Space, Typography, Menu, Dropdown } from 'antd';
import { 
  SearchOutlined, UserOutlined, AppstoreOutlined,
  BellOutlined, SettingOutlined, MenuOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const HeaderReference: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    console.log('搜索:', value);
    // 实现搜索逻辑
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: '个人资料',
    },
    {
      key: 'settings',
      label: '设置',
    },
    {
      key: 'divider',
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: '退出登录',
    },
  ];

  const navItems = [
    { key: 'all', label: '全部' },
    { key: 'design', label: '设计资源' },
    { key: 'dev', label: '开发工具' },
    { key: 'productivity', label: '效率工具' },
    { key: 'learning', label: '学习资源' },
    { key: 'entertainment', label: '娱乐休闲' },
  ];

  return (
    <>
      {/* 顶部深色导航栏 - 参考图片样式 */}
      <AntHeader style={{ 
        background: '#001529',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
      }}>
        {/* 左侧：Logo和品牌 */}
        <Space style={{ alignItems: 'center' }}>
          <Button 
            type="text" 
            icon={<MenuOutlined />}
            style={{ color: 'white', marginRight: '16px' }}
            onClick={() => {/* 侧边栏切换 */}}
          />
          <div 
            onClick={() => navigate('/')} 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Avatar
              size={36}
              icon={<AppstoreOutlined />}
              style={{ 
                backgroundColor: '#1890ff',
                color: 'white',
                marginRight: '12px'
              }}
            />
            <div>
              <Title level={4} style={{ margin: 0, color: 'white' }}>
                Sun Ocean
              </Title>
              <Text style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)' }}>
                个人导航中心
              </Text>
            </div>
          </div>
        </Space>
        
        {/* 中间：搜索框 - 参考图片的居中大搜索框 */}
        <div style={{ flex: 1, maxWidth: '600px', margin: '0 40px' }}>
          <Search
            placeholder="搜索链接、分类或标签..."
            enterButton={<SearchOutlined />}
            size="large"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            style={{ 
              borderRadius: '20px',
              overflow: 'hidden'
            }}
          />
        </div>
        
        {/* 右侧：用户操作 */}
        <Space size="middle" align="center">
          <Button 
            type="text" 
            icon={<BellOutlined />}
            style={{ color: 'white' }}
          />
          <Button 
            type="text" 
            icon={<SettingOutlined />}
            style={{ color: 'white' }}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            style={{ borderRadius: '6px' }}
            onClick={() => navigate('/manage?action=add')}
          >
            添加
          </Button>
          
          <Dropdown
            menu={{
              items: userMenuItems,
            }}
            placement="bottomRight"
          >
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{ 
                cursor: 'pointer',
                backgroundColor: '#1890ff',
                color: 'white'
              }}
            />
          </Dropdown>
        </Space>
      </AntHeader>

      {/* 二级导航：横向标签 - 参考图片样式 */}
      <div style={{ 
        background: 'white',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 24px',
        position: 'sticky',
        top: '64px',
        zIndex: 999
      }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['all']}
          items={navItems}
          style={{ 
            border: 'none',
            lineHeight: '48px'
          }}
          onClick={({ key }) => {
            // 导航逻辑
            console.log('导航到:', key);
          }}
        />
      </div>
    </>
  );
};

export default HeaderReference;