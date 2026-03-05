import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Typography, Spin, Empty } from 'antd';
import { LinkOutlined, BookOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const { Content } = Layout;
const { Title, Text } = Typography;

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  linkCount: number;
}

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/categories');
      const categoriesWithCount = response.data.map((cat: any) => ({
        ...cat,
        linkCount: cat.links ? cat.links.length : 0
      }));
      setCategories(categoriesWithCount);
    } catch (error) {
      console.error('获取分类失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'app':
        return <AppstoreOutlined />;
      case 'book':
        return <BookOutlined />;
      default:
        return <LinkOutlined />;
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ marginBottom: '24px' }}>
          我的导航
        </Title>
        
        {categories.length === 0 ? (
          <Empty description="暂无分类，请先添加分类" />
        ) : (
          <Row gutter={[24, 24]}>
            {categories.map((category) => (
              <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => handleCategoryClick(category.id)}
                  style={{
                    borderRadius: '12px',
                    border: `2px solid ${category.color || '#1890ff'}`,
                    transition: 'all 0.3s',
                  }}
                  bodyStyle={{ padding: '20px' }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: '48px',
                        color: category.color || '#1890ff',
                        marginBottom: '16px',
                      }}
                    >
                      {getIconComponent(category.icon)}
                    </div>
                    <Title level={4} style={{ marginBottom: '8px' }}>
                      {category.name}
                    </Title>
                    <Text type="secondary" style={{ display: 'block', marginBottom: '12px' }}>
                      {category.description}
                    </Text>
                    <div
                      style={{
                        backgroundColor: `${category.color || '#1890ff'}15`,
                        padding: '4px 12px',
                        borderRadius: '12px',
                        display: 'inline-block',
                      }}
                    >
                      <Text type="secondary">
                        {category.linkCount} 个链接
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        
        <div style={{ marginTop: '48px' }}>
          <Title level={3}>快速访问</Title>
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col span={12}>
              <Card
                hoverable
                onClick={() => navigate('/manage')}
                style={{ borderRadius: '8px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SettingOutlined style={{ fontSize: '24px', marginRight: '12px' }} />
                  <div>
                    <Text strong>管理链接</Text>
                    <br />
                    <Text type="secondary">添加、编辑或删除链接</Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                onClick={() => {
                  // 添加新分类的逻辑
                }}
                style={{ borderRadius: '8px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <AppstoreOutlined style={{ fontSize: '24px', marginRight: '12px' }} />
                  <div>
                    <Text strong>添加分类</Text>
                    <br />
                    <Text type="secondary">创建新的分类</Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default HomePage;