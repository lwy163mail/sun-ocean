import React, { useState } from 'react';
import { Layout, Menu, Typography, Space, Avatar, Input, Button, Dropdown, Select, Badge } from 'antd';
import { 
  HomeOutlined, AppstoreOutlined, SettingOutlined, 
  UserOutlined, SearchOutlined, PlusCircleOutlined,
  MenuOutlined, DashboardOutlined, BulbOutlined,
  StarOutlined, FilterOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme, ThemeType, themes } from '../theme/ThemeContext';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface HeaderOptimizedProps {
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
}

const HeaderOptimized: React.FC<HeaderOptimizedProps> = ({ 
  onSearch, 
  searchPlaceholder = "搜索链接、分类或标签..." 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme, themeConfig, setTheme, availableThemes } = useTheme();
  const [searchValue, setSearchValue] = useState('');

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/categories',
      icon: <AppstoreOutlined />,
      label: '分类',
    },
    {
      key: '/discover',
      icon: <DashboardOutlined />,
      label: '发现',
    },
    {
      key: '/manage',
      icon: <SettingOutlined />,
      label: '管理',
    },
  ];

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

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme);
  };

  return (
    <AntHeader style={{ 
      background: themeConfig.cardBackground,
      padding: '0 24px',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${themeConfig.borderColor}`,
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* 左侧：Logo和品牌 */}
      <Space style={{ alignItems: 'center' }}>
        <Button 
          type="text" 
          icon={<MenuOutlined />}
          style={{ marginRight: '8px', color: themeConfig.textColor }}
          onClick={() => {/* 侧边栏切换 */}}
        />
        <div 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Avatar
            size={32}
            icon={<AppstoreOutlined />}
            style={{ 
              backgroundColor: themeConfig.primaryColor,
              color: 'white',
              marginRight: '12px'
            }}
          />
          <div>
            <Title level={5} style={{ margin: 0, color: themeConfig.primaryColor }}>
              Sun Ocean
            </Title>
            <Text type="secondary" style={{ fontSize: '12px', color: themeConfig.textSecondary }}>
              个人导航中心
            </Text>
          </div>
        </div>
      </Space>
      
      {/* 中间：搜索框 */}
      <div style={{ flex: 1, maxWidth: '500px', margin: '0 24px' }}>
        <Search
          placeholder={searchPlaceholder}
          enterButton={<SearchOutlined />}
          size="middle"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          style={{ 
            borderRadius: '6px',
            borderColor: themeConfig.borderColor
          }}
        />
      </div>
      
      {/* 右侧：导航和用户操作 */}
      <Space size="middle" align="center">
        {/* 主题切换 */}
        <Dropdown
          menu={{
            items: availableThemes.map(theme => ({
              key: theme,
              label: (
                <Space>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    background: themes[theme].primaryColor,
                    marginRight: '8px'
                  }} />
                  <span>{themes[theme].name}</span>
                  {currentTheme === theme && <StarOutlined style={{ color: '#faad14' }} />}
                </Space>
              ),
              onClick: () => handleThemeChange(theme)
            }))
          }}
          placement="bottomRight"
        >
          <Button 
            type="text" 
            icon={<BulbOutlined />}
            style={{ color: themeConfig.textColor }}
          >
            主题
          </Button>
        </Dropdown>
        
        {/* 过滤器 */}
        <Button 
          type="text" 
          icon={<FilterOutlined />}
          style={{ color: themeConfig.textColor }}
          onClick={() => {/* 过滤器功能 */}}
        />
        
        {/* 导航菜单 */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ 
            border: 'none', 
            background: 'transparent',
            lineHeight: '62px',
            color: themeConfig.textColor
          }}
        />
        
        {/* 快速添加 */}
        <Button 
          type="primary" 
          icon={<PlusCircleOutlined />}
          size="middle"
          onClick={() => navigate('/manage?action=add')}
          style={{ 
            borderRadius: '6px',
            background: themeConfig.primaryColor,
            border: 'none'
          }}
        >
          添加
        </Button>
        
        {/* 用户头像 */}
        <Dropdown
          menu={{
            items: userMenuItems,
          }}
          placement="bottomRight"
        >
          <Avatar
            size={36}
            icon={<UserOutlined />}
            style={{ 
              cursor: 'pointer',
              backgroundColor: `${themeConfig.primaryColor}15`,
              color: themeConfig.primaryColor
            }}
          />
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default HeaderOptimized;