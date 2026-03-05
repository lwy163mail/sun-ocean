# GitHub上传指南

## 第一步：在GitHub上创建新仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: sun-ocean
   - **Description**: Personal navigation page application for managing app and article links
   - **Public** (选择公开)
   - 不要初始化README、.gitignore或license
3. 点击"Create repository"

## 第二步：设置Git远程仓库

在终端中执行以下命令：

```bash
cd sun-ocean

# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/sun-ocean.git

# 或者使用SSH（推荐）
git remote add origin git@github.com:YOUR_USERNAME/sun-ocean.git
```

## 第三步：推送代码到GitHub

```bash
# 推送代码到GitHub
git push -u origin main

# 如果遇到错误，可能需要先拉取
git pull origin main --allow-unrelated-histories
```

## 第四步：验证上传

1. 访问你的GitHub仓库：`https://github.com/YOUR_USERNAME/sun-ocean`
2. 确认所有文件都已上传
3. 检查README.md是否正确显示

## 使用GitHub CLI（如果已安装）

如果你已经安装了GitHub CLI，可以使用以下命令：

```bash
# 登录GitHub
gh auth login

# 创建仓库
gh repo create sun-ocean --public --source=. --remote=origin --push
```

## 配置Git（如果还没配置）

```bash
# 设置全局用户名和邮箱
git config --global user.name "lwy163mail@163.com"
git config --global user.email "lwy163mail@163.com"

# 生成SSH密钥（如果使用SSH）
ssh-keygen -t ed25519 -C "lwy163mail@163.com"

# 将公钥添加到GitHub
cat ~/.ssh/id_ed25519.pub
# 复制输出内容，添加到GitHub Settings > SSH and GPG keys
```

## 仓库结构预览

上传后，你的仓库应该包含以下文件：

```
sun-ocean/
├── frontend/                 # React前端应用
│   ├── src/
│   │   ├── pages/          # 页面组件
│   │   ├── components/     # 公共组件
│   │   ├── App.tsx        # 主应用
│   │   └── index.tsx      # 入口文件
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                 # Spring Boot后端应用
│   ├── src/main/java/com/sunocean/
│   │   ├── controller/    # REST API
│   │   ├── service/       # 业务逻辑
│   │   ├── repository/    # 数据访问
│   │   ├── entity/        # 数据库实体
│   │   └── dto/          # 数据传输对象
│   ├── pom.xml
│   └── Dockerfile
├── init-database.sql       # 数据库初始化脚本
├── docker-compose.yml      # Docker编排文件
├── start.sh               # 启动脚本
├── test-api.sh            # API测试脚本
├── README.md              # 项目文档
├── QUICK_START.md         # 快速启动指南
├── MANUAL_START.md        # 手动启动指南
├── PROJECT_SUMMARY.md     # 项目总结
└── GITHUB_UPLOAD.md       # 本指南
```

## 设置GitHub Pages（可选）

如果你想通过GitHub Pages部署前端：

1. 进入仓库Settings > Pages
2. 选择部署源：GitHub Actions
3. 选择工作流：Node.js
4. 访问地址：`https://YOUR_USERNAME.github.io/sun-ocean`

## 设置GitHub Actions（可选）

创建持续集成工作流：

1. 在仓库中创建 `.github/workflows/ci.yml`
2. 配置自动测试和构建
3. 启用自动部署

## 常见问题

### 1. 推送被拒绝
```bash
# 强制推送（谨慎使用）
git push -f origin main

# 或者先拉取再推送
git pull origin main --rebase
git push origin main
```

### 2. 认证失败
```bash
# 使用个人访问令牌
git remote set-url origin https://TOKEN@github.com/YOUR_USERNAME/sun-ocean.git

# 或者配置SSH
git remote set-url origin git@github.com:YOUR_USERNAME/sun-ocean.git
```

### 3. 大文件问题
```bash
# 如果文件太大，可能需要Git LFS
git lfs install
git lfs track "*.jar" "*.zip"
git add .gitattributes
git commit -m "Add Git LFS tracking"
```

### 4. 忽略文件
确保 `.gitignore` 文件包含：
```
# 前端
frontend/node_modules/
frontend/.env
frontend/build/

# 后端
backend/target/
backend/.idea/
backend/*.iml

# 通用
.DS_Store
*.log
.env
```

## 完成验证

上传完成后，你可以：
1. 分享仓库链接给他人
2. 克隆到其他机器：`git clone https://github.com/YOUR_USERNAME/sun-ocean.git`
3. 继续开发并推送更新
4. 创建issues和pull requests

## 后续步骤

1. **添加许可证**：在GitHub上添加MIT License
2. **设置标签**：添加相关标签（react, spring-boot, navigation等）
3. **编写Wiki**：创建项目Wiki页面
4. **启用讨论**：开启GitHub Discussions
5. **配置安全**：设置依赖扫描和代码扫描

## 获取帮助

如果遇到问题：
1. 查看Git错误信息
2. 检查网络连接
3. 验证GitHub账户权限
4. 参考Git官方文档

---

**现在你可以按照上述步骤将代码上传到GitHub了！** 🚀