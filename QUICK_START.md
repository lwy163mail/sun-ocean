# Sun Ocean 快速启动指南

## 第一步：初始化数据库

1. 登录MySQL：
```bash
mysql -u root -p
```

2. 输入你的MySQL密码：`Liwangyang_610`

3. 执行初始化脚本：
```sql
source /path/to/sun-ocean/init-database.sql
```

或者直接运行：
```bash
mysql -u root -p < init-database.sql
```

## 第二步：启动后端服务

1. 进入后端目录：
```bash
cd backend
```

2. 构建并启动：
```bash
mvn clean install
mvn spring-boot:run
```

后端将在 `http://localhost:8080` 启动。

## 第三步：启动前端服务

1. 进入前端目录：
```bash
cd frontend
```

2. 安装依赖：
```bash
npm install --legacy-peer-deps
```

3. 启动开发服务器：
```bash
npm start
```

前端将在 `http://localhost:3000` 启动。

## 第四步：访问应用

1. 打开浏览器访问：`http://localhost:3000`

2. 你将看到：
   - 首页：分类图标平铺展示
   - 点击分类进入链接列表
   - 管理页面：添加/编辑链接和分类

## 项目结构说明

```
sun-ocean/
├── frontend/          # 前端React应用
│   ├── src/
│   │   ├── pages/    # 页面组件
│   │   │   ├── HomePage.tsx      # 首页
│   │   │   ├── CategoryPage.tsx  # 分类页面
│   │   │   └── LinkManagement.tsx # 管理页面
│   │   └── components/Header.tsx # 头部组件
│   └── package.json
├── backend/           # 后端Spring Boot应用
│   ├── src/main/java/com/sunocean/
│   │   ├── controller/ # REST API控制器
│   │   ├── service/    # 业务逻辑
│   │   ├── repository/ # 数据访问层
│   │   ├── entity/     # 数据库实体
│   │   └── dto/        # 数据传输对象
│   └── pom.xml
├── init-database.sql  # 数据库初始化脚本
├── start.sh          # 启动脚本
└── README.md         # 项目文档
```

## API接口

### 分类接口
- `GET /api/categories` - 获取所有分类
- `POST /api/categories` - 创建分类
- `PUT /api/categories/{id}` - 更新分类
- `DELETE /api/categories/{id}` - 删除分类

### 链接接口
- `GET /api/links` - 获取所有链接
- `GET /api/links/category/{categoryId}` - 按分类获取链接
- `POST /api/links` - 创建链接
- `PUT /api/links/{id}` - 更新链接
- `DELETE /api/links/{id}` - 删除链接
- `POST /api/links/{id}/visit` - 记录访问

## 功能演示

### 1. 添加新分类
1. 点击"管理"页面
2. 点击"添加分类"按钮
3. 输入分类名称、描述、选择图标和颜色
4. 保存

### 2. 添加新链接
1. 点击"管理"页面
2. 点击"添加链接"按钮
3. 填写链接信息：
   - 标题
   - URL
   - 描述
   - 类型（应用/文章）
   - 选择分类
4. 保存

### 3. 查看统计数据
1. 点击"管理"页面
2. 切换到"数据视图"标签
3. 查看JSON格式的所有数据

## 常见问题

### 1. 数据库连接失败
- 检查MySQL服务是否运行：`sudo service mysql status`
- 检查用户名密码是否正确
- 检查数据库是否存在：`SHOW DATABASES;`

### 2. 前端启动失败
- 检查Node.js版本：`node --version` (需要16+)
- 清除npm缓存：`npm cache clean --force`
- 重新安装依赖：`rm -rf node_modules && npm install`

### 3. 后端启动失败
- 检查Java版本：`java --version` (需要17+)
- 检查Maven：`mvn --version`
- 检查端口占用：`lsof -i :8080`

### 4. 跨域问题
- 后端已配置CORS：`@CrossOrigin(origins = "*")`
- 前端代理配置在 `package.json` 中

## 下一步计划

1. **用户认证**：添加登录注册功能
2. **数据导入导出**：支持JSON/CSV格式
3. **浏览器扩展**：一键添加当前页面
4. **移动端适配**：响应式设计优化
5. **数据分析**：访问统计图表
6. **多主题支持**：暗色/亮色主题切换

## 获取帮助

如果遇到问题：
1. 查看控制台错误信息
2. 检查日志文件
3. 参考项目文档
4. 联系开发者