import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Button, Modal, Form, Input, Select, message, Space, Card, Row, Col, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReactJson from 'react-json-view';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Title } = Typography;
const { Option } = Select;

interface Category {
  id: number;
  name: string;
}

interface Link {
  id: number;
  title: string;
  url: string;
  description: string;
  icon: string;
  linkType: string;
  categoryId?: number;
}

const LinkManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('links');

  useEffect(() => {
    fetchCategories();
    fetchLinks();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('获取分类失败:', error);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/links');
      setLinks(response.data);
    } catch (error) {
      console.error('获取链接失败:', error);
    }
  };

  const handleAddLink = () => {
    setEditingLink(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    form.setFieldsValue({
      ...link,
      categoryId: link.categoryId || undefined,
    });
    setIsModalVisible(true);
  };

  const handleDeleteLink = async (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个链接吗？',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8080/api/links/${id}`);
          message.success('删除成功');
          fetchLinks();
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingLink) {
        await axios.put(`http://localhost:8080/api/links/${editingLink.id}`, values);
        message.success('更新成功');
      } else {
        await axios.post('http://localhost:8080/api/links', values);
        message.success('添加成功');
      }
      
      setIsModalVisible(false);
      fetchLinks();
    } catch (error) {
      console.error('保存失败:', error);
      message.error('保存失败');
    }
  };

  const handleAddCategory = async () => {
    Modal.confirm({
      title: '添加分类',
      content: (
        <Form>
          <Form.Item name="name" rules={[{ required: true, message: '请输入分类名称' }]}>
            <Input placeholder="分类名称" />
          </Form.Item>
        </Form>
      ),
      onOk: async (close) => {
        const form = Modal.confirm?.arguments?.[0]?.content?.props?.children?.props?.form;
        if (form) {
          try {
            const values = await form.validateFields();
            await axios.post('http://localhost:8080/api/categories', {
              ...values,
              icon: 'app',
              color: '#1890ff',
            });
            message.success('添加成功');
            fetchCategories();
            close();
          } catch (error) {
            console.error('添加分类失败:', error);
          }
        }
      },
    });
  };

  return (
    <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ marginBottom: '24px' }}>
          链接管理
        </Title>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="链接管理" key="links">
            <Space style={{ marginBottom: '16px' }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddLink}>
                添加链接
              </Button>
              <Button icon={<PlusOutlined />} onClick={handleAddCategory}>
                添加分类
              </Button>
            </Space>

            <Row gutter={[24, 24]}>
              {links.map((link) => (
                <Col key={link.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    style={{ borderRadius: '8px' }}
                    actions={[
                      <EditOutlined key="edit" onClick={() => handleEditLink(link)} />,
                      <DeleteOutlined key="delete" onClick={() => handleDeleteLink(link.id)} />,
                    ]}
                  >
                    <Card.Meta
                      avatar={<LinkOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                      title={link.title}
                      description={
                        <div>
                          <div style={{ marginBottom: '8px' }}>{link.description}</div>
                          <div>
                            <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                              {link.linkType === 'app' ? '应用' : '文章'} •{' '}
                              {categories.find(c => c.id === link.categoryId)?.name || '未分类'}
                            </Typography.Text>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane tab="数据视图" key="data">
            <Card title="所有链接数据" style={{ marginBottom: '24px' }}>
              <ReactJson
                src={links}
                theme="monokai"
                displayDataTypes={false}
                collapsed={2}
                style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#272822' }}
              />
            </Card>
            
            <Card title="所有分类数据">
              <ReactJson
                src={categories}
                theme="monokai"
                displayDataTypes={false}
                collapsed={2}
                style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#272822' }}
              />
            </Card>
          </TabPane>
        </Tabs>

        <Modal
          title={editingLink ? '编辑链接' : '添加链接'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="标题"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input placeholder="链接标题" />
            </Form.Item>

            <Form.Item
              name="url"
              label="URL"
              rules={[
                { required: true, message: '请输入URL' },
                { type: 'url', message: '请输入有效的URL' },
              ]}
            >
              <Input placeholder="https://example.com" />
            </Form.Item>

            <Form.Item name="description" label="描述">
              <Input.TextArea placeholder="链接描述" rows={3} />
            </Form.Item>

            <Form.Item name="icon" label="图标" initialValue="link">
              <Select>
                <Option value="link">链接</Option>
                <Option value="app">应用</Option>
                <Option value="book">文章</Option>
              </Select>
            </Form.Item>

            <Form.Item name="linkType" label="链接类型" initialValue="app">
              <Select>
                <Option value="app">应用</Option>
                <Option value="article">文章</Option>
              </Select>
            </Form.Item>

            <Form.Item name="categoryId" label="分类">
              <Select placeholder="选择分类" allowClear>
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="sortOrder" label="排序" initialValue={0}>
              <Input type="number" placeholder="排序数字，越小越靠前" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Content>
  );
};

export default LinkManagement;