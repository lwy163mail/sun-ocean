import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card, Typography, Button, Spin, Empty, Tag, Space } from 'antd';
import { ArrowLeftOutlined, LinkOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;

interface Link {
  id: number;
  title: string;
  url: string;
  description: string;
  icon: string;
  linkType: string;
  visitCount: number;
}

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [links, setLinks] = useState<Link[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCategoryLinks();
    }
  }, [id]);

  const fetchCategoryLinks = async () => {
    try {
      setLoading(true);
      // 获取分类信息
      const categoryResponse = await axios.get(`http://localhost:8080/api/categories`);
      const category = categoryResponse.data.find((cat: any) => cat.id === parseInt(id));
      if (category) {
        setCategoryName(category.name);
      }
      
      // 获取链接
      const linksResponse = await axios.get(`http://localhost:8080/api/links/category/${id}`);
      setLinks(linksResponse.data);
    } catch (error) {
      console.error('获取链接失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (linkId: number, url: string) => {
    try {
      // 增加访问计数
      await axios.post(`http://localhost:8080/api/links/${linkId}/visit`);
      // 打开链接
      window.open(url, '_blank');
    } catch (error) {
      console.error('记录访问失败:', error);
      window.open(url, '_blank');
    }
  };

  const getLinkTypeTag = (type: string) => {
    const typeMap: Record<string, { color: string; text: string }> = {
      app: { color: 'blue', text: '应用' },
      article: { color: 'green', text: '文章' },
    };
    const config = typeMap[type] || { color: 'default', text: type };
    return <Tag color={config.color}>{config.text}</Tag>;
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
        <Space style={{ marginBottom: '24px' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
          >
            返回首页
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            {categoryName || '分类'}
          </Title>
        </Space>

        {links.length === 0 ? (
          <Empty description="该分类下暂无链接" />
        ) : (
          <Row gutter={[24, 24]}>
            {links.map((link) => (
              <Col key={link.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => handleLinkClick(link.id, link.url)}
                  style={{
                    borderRadius: '12px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  bodyStyle={{ flex: 1, padding: '20px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div
                      style={{
                        fontSize: '32px',
                        color: '#1890ff',
                        marginRight: '12px',
                      }}
                    >
                      <LinkOutlined />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                        {link.title}
                      </Title>
                      {getLinkTypeTag(link.linkType)}
                    </div>
                  </div>
                  
                  <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
                    {link.description || '暂无描述'}
                  </Text>
                  
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {new URL(link.url).hostname}
                      </Text>
                      <Space>
                        <EyeOutlined />
                        <Text type="secondary">{link.visitCount}</Text>
                      </Space>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Text type="secondary">
            共 {links.length} 个链接 • 点击卡片即可访问
          </Text>
        </div>
      </div>
    </Content>
  );
};

export default CategoryPage;