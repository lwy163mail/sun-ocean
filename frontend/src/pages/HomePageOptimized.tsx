import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layout, Row, Col, Card, Typography, Spin, Empty, 
  Button, Space, Avatar, Badge, Tag, Input, Divider,
  Grid, FloatButton, Select
} from 'antd';
import { 
  SearchOutlined, PlusOutlined, StarOutlined, 
  AppstoreOutlined, SettingOutlined, UserOutlined,
  FireOutlined, RocketOutlined, CompassOutlined,
  HeartOutlined, HistoryOutlined, FolderOutlined,
  ChromeOutlined, GithubOutlined, ToolOutlined,
  BookOutlined, VideoCameraOutlined, CustomerServiceOutlined,
  FilterOutlined, SortAscendingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../theme/ThemeContext';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { useBreakpoint } = Grid;

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  linkCount: number;
  isFavorite?: boolean;
  lastAccessed?: string;
  tags?: string[];
}

type SortType = 'name' | 'count' | 'recent' | 'favorite';

const HomePageOptimized: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortType, setSortType] = useState<SortType>('name');
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const { themeConfig } = useTheme();

  // 分类图标映射
  const iconMap: Record<string, React.ReactNode> = {
    '开发工具': <ToolOutlined />,
    '学习资源': <BookOutlined />,
    '设计资源': <ChromeOutlined />,
    '效率工具': <RocketOutlined />,
    '娱乐休闲': <CustomerServiceOutlined />,
    'default': <AppstoreOutlined />
  };

  // 过滤器选项
  const filters = [
    { key: 'all', label: '全部', icon: <AppstoreOutlined /> },
    { key: 'favorite', label: '收藏', icon: <StarOutlined /> },
    { key: 'recent', label: '最近', icon: <HistoryOutlined /> },
    { key: 'most', label: '最多', icon: <FireOutlined /> },
  ];

  // 排序选项
  const sortOptions = [
    { value: 'name', label: '按名称', icon: <SortAscendingOutlined /> },
    { value: 'count', label: '按链接数', icon: <FireOutlined /> },
    { value: 'recent', label: '按最近访问', icon: <HistoryOutlined /> },
    { value: 'favorite', label: '按收藏', icon: <StarOutlined /> },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/categories');
      const categoriesWithData = response.data.map((cat: any, index: number) => ({
        ...cat,
        linkCount: cat.links ? cat.links.length : 0,
        color: getCategoryColor(cat.name),
        isFavorite: index % 3 === 0,
        lastAccessed: getRandomDate(),
        tags: getCategoryTags(cat.name)
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
    return colorMap[categoryName] || themeConfig.primaryColor;
  };

  const getCategoryTags = (categoryName: string): string[] => {
    const tagMap: Record<string, string[]> = {
      '开发工具': ['工具', '编程', '开发'],
      '学习资源': ['教程', '文档', '学习'],
      '设计资源': ['UI', 'UX', '创意'],
      '效率工具': ['生产力', '办公'],
      '娱乐休闲': ['放松', '视频', '音乐']
    };
    return tagMap[categoryName] || ['常用'];
  };

  const getRandomDate = (): string => {
    const days = ['今天', '昨天', '2天前', '1周前'];
    return days[Math.floor(Math.random() * days.length)];
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  // 过滤和排序逻辑
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categories.filter(category => {
      if (searchQuery) {
        const matchesSearch = 
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        if (!matchesSearch) return false;
      }
      
      switch (activeFilter) {
        case 'favorite':
          return category.isFavorite;
        case 'recent':
          return category.lastAccessed === '今天' || category.lastAccessed === '昨天';
        case 'most':
          return category.linkCount > 3;
        default:
          return true;
      }
    });

    // 排序
    filtered.sort((a, b) => {
      switch (sortType) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'count':
          return b.linkCount - a.linkCount;
        case 'recent':
          const recentOrder = ['今天', '昨天', '2天前', '1周前'];
          return recentOrder.indexOf(a.lastAccessed || '') - recentOrder.indexOf(b.lastAccessed || '');
        case 'favorite':
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [categories, searchQuery, activeFilter, sortType]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        background: themeConfig.backgroundColor
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Content style={{ 
      padding: screens.xs ? '16px' : '24px', 
      minHeight: 'calc(100vh - 64px)',
      background: themeConfig.backgroundColor
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto'
      }}>
        {/* 头部区域 */}
        <div style={{ 
          marginBottom: '32px',
          background: themeConfig.cardBackground,
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: `1px solid ${themeConfig.borderColor}`
        }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={2} style={{ margin: 0, color: themeConfig.textColor }}>
                  我的导航
                </Title>
                <Text type="secondary" style={{ fontSize: '16px', color: themeConfig.textSecondary }}>
                  快速访问你的收藏链接
                </Text>
              </div>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                size="large"
                style={{ borderRadius: '8px' }}
              >
                新建分类
              </Button>
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
                    borderColor: themeConfig.borderColor
                  }}
                />
              </div>
              
              <Select
                value={sortType}
                onChange={setSortType}
                style={{ width: '140px' }}
                suffixIcon={<SortAscendingOutlined />}
              >
                {sortOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    <Space>
                      {option.icon}
                      {option.label}
                    </Space>
                  </Option>
                ))}
              </Select>
            </div>

            {/* 过滤器 */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {filters.map(filter => (
                <Button
                  key={filter.key}
                  type={activeFilter === filter.key ? 'primary' : 'default'}
                  icon={filter.icon}
                  onClick={() => setActiveFilter(filter.key)}
                  style={{ 
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </Space>
        </div>

        {/* 统计信息 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={8}>
            <Card 
              bordered={false}
              style={{ 
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${themeConfig.primaryColor}15, ${themeConfig.primaryColor}05)`,
                border: `1px solid ${themeConfig.borderColor}`
              }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary" style={{ color: themeConfig.textSecondary }}>分类数量</Text>
                <Title level={3} style={{ margin: 0, color: themeConfig.primaryColor }}>
                  {categories.length}
                </Title>
                <Text type="secondary" style={{ fontSize: '12px', color: themeConfig.textSecondary }}>
                  共 {categories.reduce((sum, cat) => sum + cat.linkCount, 0)} 个链接
                </Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              bordered={false}
              style={{ 
                borderRadius: '12px',
                background: `linear-gradient(135deg, #52c41a15, #52c41a05)`,
                border: `1px solid ${themeConfig.borderColor}`
              }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary" style={{ color: themeConfig.textSecondary }}>收藏分类</Text>
                <Title level={3} style={{ margin: 0, color: '#52c41a' }}>
                  {categories.filter(cat => cat.isFavorite).length}
                </Title>
                <Text type="secondary" style={{ fontSize: '12px', color: themeConfig.textSecondary }}>
                  点击星标收藏分类
                </Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              bordered={false}
              style={{ 
                borderRadius: '12px',
                background: `linear-gradient(135deg, #722ed115, #722ed105)`,
                border: `1px solid ${themeConfig.borderColor}`
              }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary" style={{ color: themeConfig.textSecondary }}>今日访问</Text>
                <Title level={3} style={{ margin: 0, color: '#722ed1' }}>
                  {categories.filter(cat => cat.lastAccessed === '今天').length}
                </Title>
                <Text type="secondary" style={{ fontSize: '12px', color: themeConfig.textSecondary }}>
                  保持学习热情
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* 分类网格 - 紧凑布局 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <Title level={4} style={{ margin: 0, color: themeConfig.textColor }}>
              所有分类
              <Badge 
                count={filteredAndSortedCategories.length} 
                style={{ 
                  marginLeft: '12px', 
                  backgroundColor: themeConfig.primaryColor 
                }} 
              />
            </Title>
          </div>

          {filteredAndSortedCategories.length === 0 ? (
            <Empty 
              description={searchQuery ? "未找到相关分类" : "暂无分类，请先添加分类"}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ padding: '40px 0' }}
            />
          ) : (
            <Row gutter={[20, 20]}>
              {filteredAndSortedCategories.map((category) => (
                <Col key={category.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                  {/* 紧凑卡片设计 */}
                  <Card
                    hoverable
                    onClick={() => handleCategoryClick(category.id)}
                    style={{
                      borderRadius: '12px',
                      border: `1px solid ${themeConfig.borderColor}`,
                      background: themeConfig.cardBackground,
                      height: '140px', // 更紧凑的高度
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
                      icon={iconMap[category.name] || iconMap.default}
                      style={{ 
                        backgroundColor: `${category.color}15`,
                        color: category.color,
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
                      minWidth: 0 // 防止内容溢出
                    }}>
                      <div>
                        {/* 主标题 */}
                        <Title level={5} style={{ 
                          margin: 0, 
                          color: themeConfig.textColor,
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
                          color: themeConfig.textSecondary,
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
                          color={category.color} 
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
                          icon={category.isFavorite ? 
                            <StarOutlined style={{ color: '#faad14', fontSize: '14px' }} /> : 
                            <StarOutlined style={{ fontSize: '14px', color: themeConfig.textSecondary }} />
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            // 切换收藏状态
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>

        {/* 快速操作区域 */}
        <div style={{ 
          marginTop: '48px', 
          padding: '24px',
          background: themeConfig.cardBackground,
          borderRadius: '12px',
          border: `1px solid ${themeConfig.borderColor}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}>
          <Title level={3} style={{ marginBottom: '24px', color: themeConfig.textColor }}>
            🚀 快速操作
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card
                hoverable
                onClick={() => navigate('/manage')}
                style={{ 
                  borderRadius: '8px',
                  border: `1px solid ${themeConfig.borderColor}`,
                  height: '100px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                  <Avatar
                    size={32}
                    icon={<SettingOutlined />}
                    style={{ backgroundColor: `${themeConfig.primaryColor}15`, color: themeConfig.primaryColor }}
                  />
                  <Text strong style={{ fontSize: '14px' }}>链接管理</Text>
                  <Text type="secondary" style={{ fontSize: '11px' }}>管理所有链接</Text>
                </Space>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                onClick={() => {/* 导入功能 */}}
                style={{ 
                  borderRadius: '8px',
                  border: `1px solid ${themeConfig.borderColor}`,
                  height: '100px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                  <Avatar
                    size={32}
                    icon={<FolderOutlined />}
                    style={{ backgroundColor: '#52c41a15', color: '#52c41a' }}
                  />
                  <Text strong style={{ fontSize: '14px' }}>批量导入</Text>
                  <Text type="secondary" style={{ fontSize: '11px' }}>导入书签</Text>
                </Space>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                onClick={() => {/* 分享功能 */}}
                style={{ 
                  borderRadius: '8px',
                  border: `1px solid ${themeConfig.borderColor}`,
                  height: '100px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                  <Avatar
                    size={32}
                    icon={<HeartOutlined />}
                    style={{ backgroundColor: '#722ed115', color: '#722ed1' }}
                  />
                  <Text strong style={{ fontSize: '14px' }}>分享收藏</Text>
                  <Text type="secondary" style={{ fontSize: '11px' }}>分享给朋友</Text>
                </Space>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                onClick={() => {/* 设置功能 */}}
                style={{ 
                  borderRadius: '8px',
                  border: `1px solid ${themeConfig.borderColor}`,
                  height: '100px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                  <Avatar
                    size={32}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: '#fa8c1615', color: '#fa8c16' }}
                  />
                  <Text strong style={{ fontSize: '14px' }}>个人设置</Text>
                  <Text type="secondary" style={{ fontSize: '11px' }}>个性化配置</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>

        {/* 浮动按钮 */}
        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          style={{ right: 24, bottom: 24 }}
          onClick={() => {/* 快速添加 */}}
        />
      </div>
    </Content>
  );
};

export default HomePageOptimized;