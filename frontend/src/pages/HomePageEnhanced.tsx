import React, { useState, useEffect } from 'react';
import { 
  Layout, Row, Col, Card, Typography, Spin, Empty, 
  Button, Space, Avatar, Badge, Tag, Input, Select
} from 'antd';
import { 
  SearchOutlined, PlusOutlined, StarOutlined, 
  AppstoreOutlined, SettingOutlined,
  FireOutlined, HistoryOutlined, FolderOutlined,
  ChromeOutlined, GithubOutlined, ToolOutlined,
  BookOutlined, VideoCameraOutlined, CustomerServiceOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface Category {
  id: number;
  name: string;
  description: string;
  linkCount: number;
}

const HomePageEnhanced: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();

  // 主题配置
  const themes = {
    light: {
      backgroundColor: '#f5f5f5',
      cardBackground: '#ffffff',
      textColor: '#262626',
      textSecondary: '#8c8c8c',
      borderColor: '#f0f0f0',
      primaryColor: '#1677ff',
    },
    dark: {
      backgroundColor: '#141414',
      cardBackground: '#1f1f1f',
      textColor: '#ffffff',
      textSecondary: '#a6a6a6',
      borderColor: '#434343',
      primaryColor: '#177ddc',
    }
  };

  const currentTheme = themes[theme];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/categories');
      const categoriesWithData = response.data.map((cat: any) => ({
        ...cat,
        linkCount: cat.links ? cat.links.length : 0,
      }));
      setCategories(categoriesWithData);
    } catch (error) {
      console.error('获取分类失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (categoryName: string): string => {
    const colorMap: Record<string, string> = {
      '开发工具': '#1677ff',
      '学习资源': '#52c41a',
      '设计资源': '#722ed1',
      '效率工具': '#fa8c16',
      '娱乐休闲': '#f5222d',
    };
    return colorMap[categoryName] || currentTheme.primaryColor;
  };

  const getCategoryIcon = (categoryName: string): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
      '开发工具': <ToolOutlined />,
      '学习资源': <BookOutlined />,
      '设计资源': <ChromeOutlined />,
      '效率工具': <GithubOutlined />,
      '娱乐休闲': <CustomerServiceOutlined />,
    };
    return iconMap[categoryName] || <AppstoreOutlined />;
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  // 过滤逻辑
  const filteredCategories = categories.filter(category => {
    if (searchQuery) {
      const matchesSearch = 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
    }
    
    switch (activeFilter) {
      case 'favorite':
        return false; // 暂时没有收藏功能
      case 'recent':
        return true; // 暂时全部显示
      case 'most':
        return category.linkCount > 3;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        background: currentTheme.backgroundColor
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Content style={{ 
      padding: '24px', 
      minHeight: 'calc(100vh - 64px)',
      background: currentTheme.backgroundColor
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto'
      }}>
        {/* 头部区域 */}
        <div style={{ 
          marginBottom: '32px',
          background: currentTheme.cardBackground,
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: `1px solid ${currentTheme.borderColor}`
        }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={2} style={{ margin: 0, color: currentTheme.textColor }}>
                  我的导航
                </Title>
                <Text type="secondary" style={{ fontSize: '16px', color: currentTheme.textSecondary }}>
                  快速访问你的收藏链接
                </Text>
              </div>
              
              <Space>
                {/* 主题切换 */}
                <Select
                  value={theme}
                  onChange={(value) => setTheme(value)}
                  style={{ width: '100px' }}
                >
                  <Option value="light">明亮</Option>
                  <Option value="dark">深色</Option>
                </Select>
                
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  size="large"
                  style={{ borderRadius: '8px' }}
                >
                  新建分类
                </Button>
              </Space>
            </div>

            {/* 搜索和过滤区域 */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <Search
                  placeholder="搜索分类、链接或标签..."
                  enterButton={<SearchOutlined />}
                  size="large"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ 
                    borderRadius: '8px',
                    borderColor: currentTheme.borderColor
                  }}
                />
              </div>
              
              {/* 过滤器 */}
              <Space>
                <Button
                  type={activeFilter === 'all' ? 'primary' : 'default'}
                  onClick={() => setActiveFilter('all')}
                  style={{ borderRadius: '20px' }}
                >
                  全部
                </Button>
                <Button
                  type={activeFilter === 'recent' ? 'primary' : 'default'}
                  icon={<HistoryOutlined />}
                  onClick={() => setActiveFilter('recent')}
                  style={{ borderRadius: '20px' }}
                >
                  最近
                </Button>
                <Button
                  type={activeFilter === 'most' ? 'primary' : 'default'}
                  icon={<FireOutlined />}
                  onClick={() => setActiveFilter('most')}
                  style={{ borderRadius: '20px' }}
                >
                  最多
                </Button>
              </Space>
            </div>
          </Space>
        </div>

        {/* 分类网格 - 紧凑卡片布局 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <Title level={4} style={{ margin: 0, color: currentTheme.textColor }}>
              所有分类
              <Badge 
                count={filteredCategories.length} 
                style={{ 
                  marginLeft: '12px', 
                  backgroundColor: currentTheme.primaryColor 
                }} 
              />
            </Title>
          </div>

          {filteredCategories.length === 0 ? (
            <Empty 
              description={searchQuery ? "未找到相关分类" : "暂无分类，请先添加分类"}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ padding: '40px 0' }}
            />
          ) : (
            <Row gutter={[20, 20]}>
              {filteredCategories.map((category) => {
                const categoryColor = getCategoryColor(category.name);
                return (
                  <Col key={category.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                    {/* 紧凑卡片设计 */}
                    <Card
                      hoverable
                      onClick={() => handleCategoryClick(category.id)}
                      style={{
                        borderRadius: '12px',
                        border: `1px solid ${currentTheme.borderColor}`,
                        background: currentTheme.cardBackground,
                        height: '140px', // 紧凑高度
                        transition: 'all 0.2s',
                        padding: '0',
                        overflow: 'hidden'
                      }}
                      bodyStyle={{ 
                        padding: '16px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* 左侧图标 */}
                      <Avatar
                        size={48}
                        icon={getCategoryIcon(category.name)}
                        style={{ 
                          backgroundColor: `${categoryColor}15`,
                          color: categoryColor,
                          flexShrink: 0
                        }}
                      />
                      
                      {/* 右侧内容 - 上下排列 */}
                      <div style={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        minWidth: 0
                      }}>
                        <div>
                          {/* 主标题 */}
                          <Title level={5} style={{ 
                            margin: 0, 
                            color: currentTheme.textColor,
                            fontSize: '16px',
                            lineHeight: '1.3',
                            marginBottom: '4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {category.name}
                          </Title>
                          
                          {/* 副标题 */}
                          <Text type="secondary" style={{ 
                            fontSize: '12px',
                            lineHeight: '1.4',
                            color: currentTheme.textSecondary,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {category.description}
                          </Text>
                        </div>
                        
                        {/* 底部信息 */}
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginTop: '8px'
                        }}>
                          <Tag 
                            color={categoryColor} 
                            style={{ 
                              margin: 0, 
                              borderRadius: '10px',
                              fontSize: '11px',
                              padding: '2px 8px'
                            }}
                          >
                            {category.linkCount} 链接
                          </Tag>
                          
                          <Button
                            type="text"
                            size="small"
                            icon={<StarOutlined style={{ fontSize: '14px', color: currentTheme.textSecondary }} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              // 收藏功能
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </div>
    </Content>
  );
};

export default HomePageEnhanced;