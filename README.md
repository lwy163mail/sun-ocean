# Sun Ocean - 个人导航页面应用

一个支持收藏应用链接和文章链接的个人导航页面应用，采用分类图标平铺展示。

## 技术栈

### 前端
- React 18 + TypeScript
- Ant Design 5
- React Router 6
- Axios
- react-json-view

### 后端
- Java 17
- Spring Boot 3.2
- Spring Data JPA
- MySQL 8.0
- Hutool 工具库

## 功能特性

1. **分类管理**
   - 创建、编辑、删除分类
   - 自定义分类图标和颜色
   - 分类排序

2. **链接管理**
   - 添加应用链接和文章链接
   - 链接分类管理
   - 访问统计
   - 链接排序

3. **导航展示**
   - 分类图标平铺展示
   - 响应式设计
   - 快速访问

4. **数据管理**
   - JSON数据视图
   - 批量操作

## 快速开始

### 环境要求
- Node.js 16+
- Java 17
- MySQL 8.0
- Maven 3.6+

### 数据库设置
```sql
CREATE DATABASE sun_ocean CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 后端启动
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 前端启动
```bash
cd frontend
npm install
npm start
```

## 项目结构

```
sun-ocean/
├── frontend/                 # 前端项目
│   ├── src/
│   │   ├── components/      # 公共组件
│   │   ├── pages/          # 页面组件
│   │   ├── App.tsx         # 主应用
│   │   └── index.tsx       # 入口文件
│   └── package.json
├── backend/                 # 后端项目
│   ├── src/main/java/com/sunocean/
│   │   ├── controller/     # 控制器
│   │   ├── service/        # 业务逻辑
│   │   ├── repository/     # 数据访问
│   │   ├── entity/         # 实体类
│   │   ├── dto/           # 数据传输对象
│   │   └── config/        # 配置类
│   └── pom.xml
└── README.md
```

## API接口

### 分类管理
- `GET /api/categories` - 获取所有分类
- `POST /api/categories` - 创建分类
- `PUT /api/categories/{id}` - 更新分类
- `DELETE /api/categories/{id}` - 删除分类

### 链接管理
- `GET /api/links` - 获取所有链接
- `GET /api/links/category/{categoryId}` - 按分类获取链接
- `GET /api/links/type/{linkType}` - 按类型获取链接
- `POST /api/links` - 创建链接
- `PUT /api/links/{id}` - 更新链接
- `DELETE /api/links/{id}` - 删除链接
- `POST /api/links/{id}/visit` - 增加访问计数

## 部署

### 生产环境配置
1. 修改后端 `application.yml` 中的数据库配置
2. 构建前端：`npm run build`
3. 将前端构建文件复制到后端静态资源目录
4. 使用 Docker 或直接部署

### Docker部署
```bash
# 构建镜像
docker build -t sun-ocean .

# 运行容器
docker run -d -p 8080:8080 --name sun-ocean sun-ocean
```

## 开发计划

- [ ] 用户认证和授权
- [ ] 链接导入/导出
- [ ] 浏览器扩展
- [ ] 移动端应用
- [ ] 数据备份和恢复
- [ ] 主题切换
- [ ] 多语言支持

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License