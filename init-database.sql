-- 创建数据库
CREATE DATABASE IF NOT EXISTS sun_ocean CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE sun_ocean;

-- 创建分类表
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    icon VARCHAR(50),
    color VARCHAR(20),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 创建链接表
CREATE TABLE IF NOT EXISTS links (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    url VARCHAR(500) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    link_type VARCHAR(20) DEFAULT 'app',
    visit_count INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_category_id (category_id),
    INDEX idx_link_type (link_type),
    INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入示例分类数据
INSERT INTO categories (name, description, icon, color, sort_order) VALUES
('开发工具', '编程开发相关工具', 'app', '#1890ff', 1),
('学习资源', '技术学习和文档', 'book', '#52c41a', 2),
('设计资源', 'UI/UX设计工具', 'app', '#722ed1', 3),
('效率工具', '提高工作效率', 'app', '#fa8c16', 4),
('娱乐休闲', '放松娱乐网站', 'app', '#f5222d', 5);

-- 插入示例链接数据
INSERT INTO links (title, url, description, icon, link_type, category_id, sort_order) VALUES
('GitHub', 'https://github.com', '全球最大的代码托管平台', 'github', 'app', 1, 1),
('Stack Overflow', 'https://stackoverflow.com', '程序员问答社区', 'question', 'app', 1, 2),
('MDN Web Docs', 'https://developer.mozilla.org', 'Web开发文档', 'book', 'article', 2, 1),
('React官方文档', 'https://react.dev', 'React官方文档', 'react', 'article', 2, 2),
('Figma', 'https://figma.com', '在线协作设计工具', 'design', 'app', 3, 1),
('Ant Design', 'https://ant.design', '企业级UI设计语言', 'antd', 'app', 3, 2),
('Notion', 'https://notion.so', '一体化工作空间', 'notion', 'app', 4, 1),
('Google Drive', 'https://drive.google.com', '云存储和协作', 'drive', 'app', 4, 2),
('YouTube', 'https://youtube.com', '视频分享平台', 'youtube', 'app', 5, 1),
('Netflix', 'https://netflix.com', '流媒体视频服务', 'netflix', 'app', 5, 2);

-- 查看数据
SELECT '分类数据:' AS '';
SELECT * FROM categories;

SELECT '链接数据:' AS '';
SELECT l.id, l.title, l.url, l.link_type, c.name as category_name 
FROM links l 
LEFT JOIN categories c ON l.category_id = c.id 
ORDER BY l.sort_order;