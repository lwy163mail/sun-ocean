# 手动启动指南

如果你遇到自动启动脚本问题，可以按照以下步骤手动启动：

## 第一步：启动MySQL

```bash
# 方法1：使用brew（推荐）
brew services start mysql

# 方法2：使用mysql.server
mysql.server start

# 检查是否启动成功
brew services list | grep mysql
```

## 第二步：创建数据库

```bash
# 登录MySQL（使用你的密码）
mysql -u root -p

# 在MySQL命令行中执行：
CREATE DATABASE IF NOT EXISTS sun_ocean CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sun_ocean;

# 或者直接运行初始化脚本
mysql -u root -p < init-database.sql
```

## 第三步：启动后端

```bash
cd backend

# 第一次运行需要构建
mvn clean install

# 启动Spring Boot应用
mvn spring-boot:run
```

后端将在 `http://localhost:8080` 启动。

## 第四步：启动前端

```bash
cd frontend

# 安装依赖（第一次需要）
npm install --legacy-peer-deps

# 启动开发服务器
npm start
```

前端将在 `http://localhost:3000` 启动。

## 验证应用

1. 打开浏览器访问：`http://localhost:3000`
2. 你应该看到Sun Ocean的首页
3. 点击分类查看链接
4. 点击"管理"添加新链接

## 故障排除

### 1. MySQL连接问题
```bash
# 检查MySQL版本
mysql --version

# 检查服务状态
brew services list

# 重启MySQL
brew services restart mysql
```

### 2. 端口占用
```bash
# 检查8080端口
lsof -i :8080

# 检查3000端口
lsof -i :3000

# 如果端口被占用，可以修改端口：
# 后端：修改 backend/src/main/resources/application.yml 中的 server.port
# 前端：修改 frontend/package.json 中的 scripts.start
```

### 3. 依赖问题
```bash
# 清除并重新安装前端依赖
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# 清除Maven缓存
cd backend
mvn clean
```

### 4. 数据库权限问题
```sql
-- 在MySQL中执行
GRANT ALL PRIVILEGES ON sun_ocean.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

## 快速命令参考

```bash
# 一键启动（如果脚本可用）
./start.sh

# 单独启动服务
brew services start mysql
cd backend && mvn spring-boot:run
cd frontend && npm start

# 停止服务
cd frontend && npm stop
cd backend && Ctrl+C
brew services stop mysql
```

## 获取帮助

如果仍然遇到问题：
1. 查看控制台错误信息
2. 检查日志文件
3. 确保所有服务都在运行
4. 验证数据库连接信息