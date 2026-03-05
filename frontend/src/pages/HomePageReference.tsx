import React, { useState, useEffect } from 'react';
import { 
  Layout, Row, Col, Card, Typography, Spin, Empty, 
  Button, Space, Avatar, Tag, Grid,
  FloatButton, Dropdown, MenuProps
} from 'antd';
import { 
  PlusOutlined, StarOutlined, 
  AppstoreOutlined, MoreOutlined,
  FireOutlined, HistoryOutlined, FolderOutlined,
  ChromeOutlined, GithubOutlined, ToolOutlined,
  BookOutlined, CustomerServiceOutlined,
  EyeOutlined, ShareAltOutlined, EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;
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
  views?: number;
  shares?: number;
}

const HomePageReference: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const navigate = useNavigate();
  const screens = useBreakpoint();

  // 分类图标映射
  const iconMap: Record<string, React.ReactNode> = {
    '开发工具': <ToolOutlined />,
    '学习资源': <BookOutlined />,
    '设计资源': <ChromeOutlined />,
    '效率工具': <GithubOutlined />,
    '娱乐休闲': <CustomerServiceOutlined />,
    'default': <AppstoreOutlined />
  };

  // 分类颜色映射
  const colorMap: Record<string, string> = {
    '开发工具': '#1677ff',
    '学习资源': '#52c41a',
    '设计资源': '#722ed1',
    '效率工具': '#fa8c16',
    '娱乐休闲': '#f5222d',
  };

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
        color: colorMap[cat.name] || '#1677ff',
        isFavorite: index % 3 === 0,
        lastAccessed: getRandomDate(),
        tags: getCategoryTags(cat.name),
        views: Math.floor(Math.random() * 1000),
        shares: Math.floor(Math.random() * 100)
      }));
      setCategories(categoriesWithData);
    } catch (error) {
      console.error('获取分类失败:', error);
    } finally {
      setLoading(false);
    }
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

  // 卡片操作菜单
  const getCardMenuItems = (categoryId: number): MenuProps['items'] => [
    {
      key: 'view',
      label: '查看详情',
      icon: <EyeOutlined />,
    },
    {
      key: 'edit',
      label: '编辑',
      icon: <EditOutlined />,
    },
    {
      key: 'share',
      label: '分享',
      icon: <ShareAltOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  // 过滤逻辑
  const filteredCategories = categories.filter(category => {
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

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        background: '#f5f5f5'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Content style={{ 
      padding: screens.xs ? '16px' : '24px', 
      minHeight: 'calc(100vh - 112px)', // 减去两个header的高度
      background: '#f5f5f5'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto'
      }}>
        {/* 内容头部 - 参考图片样式 */}
        <div style={{ 
          marginBottom: '32px',
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f0f0f0'
        }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={3} style={{ margin: 0, color: '#262626' }}>
                  我的收藏
                </Title>
                <Text type="secondary" style={{ fontSize: '14px', color: '#8c8c8c' }}>
                  共 {categories.length} 个分类，{categories.reduce((sum, cat) => sum + cat.linkCount, 0)} 个链接
                </Text>
              </div>
              
              <Space>
                <Button 
                  icon={<HistoryOutlined />}
                  onClick={() => setActiveFilter('recent')}
                  type={activeFilter === 'recent' ? 'primary' : 'default'}
                >
                  最近访问
                </Button>
                <Button 
                  icon={<FireOutlined />}
                  onClick={() => setActiveFilter('most')}
                  type={activeFilter === 'most' ? 'primary' : 'default'}
                >
                  最受欢迎
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  style={{ borderRadius: '6px' }}
                >
                  新建分类
                </Button>
              </Space>
            </div>

            {/* 快速筛选标签 */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Tag 
                color={activeFilter === 'all' ? 'blue' : 'default'}
                style={{ cursor: 'pointer', borderRadius: '16px', padding: '4px 12px' }}
                onClick={() => setActiveFilter('all')}
              >
                全部
              </Tag>
              {Object.keys(colorMap).map(categoryName => (
                <Tag 
                  key={categoryName}
                  color={activeFilter === categoryName ? colorMap[categoryName] : 'default'}
                  style={{ 
                    cursor: 'pointer', 
                    borderRadius: '16px', 
                    padding: '4px 12px',
                    borderColor: colorMap[categoryName],
                    color: activeFilter === categoryName ? 'white' : colorMap[categoryName]
                  }}
                  onClick={() => setActiveFilter(categoryName)}
                >
                  {categoryName}
                </Tag>
              ))}
            </div>
          </Space>
        </div>

        {/* 分类网格 - 参考图片的卡片布局 */}
        <div style={{ marginBottom: '32px' }}>
          {filteredCategories.length === 0 ? (
            <Empty 
              description={searchQuery ? "未找到相关分类" : "暂无分类，请先添加分类"}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ 
                padding: '60px 0',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #f0f0f0'
              }}
            />
          ) : (
            <Row gutter={[24, 24]}>
              {filteredCategories.map((category) => {
                const categoryColor = category.color;
                return (
                  <Col key={category.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                    {/* 卡片设计 - 参考图片样式 */}
                    <Card
                      hoverable
                      onClick={() => handleCategoryClick(category.id)}
                      style={{
                        borderRadius: '12px',
                        border: '1px solid #f0f0f0',
                        background: 'white',
                        height: '220px', // 稍大一些的卡片
                        transition: 'all 0.3s',
                        padding: '0',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                      bodyStyle={{ 
                        padding: '20px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* 卡片顶部操作栏 */}
                      <div style={{ 
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        display: 'flex',
                        gap: '8px',
                        zIndex: 2
                      }}>
                        <Button
                          type="text"
                          size="small"
                          icon={category.isFavorite ? 
                            <StarOutlined style={{ color: '#faad14', fontSize: '16px' }} /> : 
                            <StarOutlined style={{ fontSize: '16px', color: '#8c8c8c' }} />
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            // 收藏功能
                          }}
                        />
                        <Dropdown
                          menu={{ items: getCardMenuItems(category.id) }}
                          placement="bottomRight"
                          trigger={['click']}
                        >
                          <Button
                            type="text"
                            size="small"
                            icon={<MoreOutlined style={{ fontSize: '16px', color: '#8c8c8c' }} />}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </Dropdown>
                      </div>
                      
                      {/* 卡片内容 */}
                      <div style={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        {/* 图标和标题区域 */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                          <Avatar
                            size={56}
                            icon={iconMap[category.name] || iconMap.default}
                            style={{ 
                              backgroundColor: `${categoryColor}15`,
                              color: categoryColor,
                              flexShrink: 0
                            }}
                          />
                          
                          <div style={{ flex: 1 }}>
                            <Title level={4} style={{ 
                              margin: 0, 
                              color: '#262626',
                              fontSize: '18px',
                              lineHeight: '1.4',
                              marginBottom: '8px'
                            }}>
                              {category.name}
                            </Title>
                            
                            <Text type="secondary" style={{ 
                              fontSize: '14px',
                              lineHeight: '1.5',
                              color: '#8c8c8c',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {category.description}
                            </Text>
                          </div>
                        </div>
                        
                        {/* 标签区域 */}
                        <div style={{ marginTop: '16px' }}>
                          <Space size={[4, 8]} wrap>
                            {category.tags?.slice(0, 3).map((tag, index) => (
                              <Tag 
                                key={index}
                                style={{ 
                                  borderRadius: '12px',
                                  fontSize: '12px',
                                  padding: '2px 8px',
                                  background: `${categoryColor}10`,
                                  color: categoryColor,
                                  border: 'none'
                                }}
                              >
                                {tag}
                              </Tag>
                            ))}
                            {category.tags && category.tags.length > 3 && (
                              <Tag style={{ borderRadius: '12px', fontSize: '12px', padding: '2px 8px' }}>
                                +{category.tags.length - 3}
                              </Tag>
                            )}
                          </Space>
                        </div>
                        
                        {/* 底部信息栏 */}
                        <div style={{ 
                          marginTop: '20px',
                          paddingTop: '16px',
                          borderTop: '1px solid #f0f0f0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <FolderOutlined style={{ fontSize: '14px', color: '#8c8c8c' }} />
                              <Text type="secondary" style={{ fontSize: '12px' }}>
                                {category.linkCount} 链接
                              </Text>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <EyeOutlined style={{ fontSize: '14px', color: '#8c8c8c' }} />
                              <Text type="secondary" style={{ fontSize: '12px' }}>
                                {category.views} 浏览
                              </Text>
                            </div>
                          </div>
                          
                          <Text type="secondary" style={{ fontSize: '12px', color: '#8c8c8c' }}>
                            {category.lastAccessed} 访问
                          </Text>
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>

        {/* 统计信息卡片 - 参考图片的底部区域 */}
        <div style={{ 
          marginTop: '48px',
          padding: '24px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}>
          <Title level={3} style={{ marginBottom: '24px', color: '#262626' }}>
            数据统计
          </Title>
          <Row gutter={[24, 24]}>
            <Col span={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#1677ff',
                  marginBottom: '8px'
                }}>
                  {categories.length}
                </div>
                <Text type="secondary">分类数量</Text>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#52c41a',
                  marginBottom: '8px'
                }}>
                  {categories.reduce((sum, cat) => sum + cat.linkCount, 0)}
                </div>
                <Text type="secondary">链接总数</Text>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#722ed1',
                  marginBottom: '8px'
                }}>
                  {categories.filter(cat => cat.isFavorite).length}
                </div>
                <Text type="secondary">收藏分类</Text>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#fa8c16',
                  marginBottom: '8px'
                }}>
                  {categories.filter(cat => cat.lastAccessed === '今天').length}
                </div>
                <Text type="secondary">今日访问</Text>
              </div>
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

export default HomePageReference;