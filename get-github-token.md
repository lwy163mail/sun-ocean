# 获取GitHub个人访问令牌

由于GitHub现在要求使用个人访问令牌而不是密码进行API访问，请按照以下步骤获取令牌：

## 步骤1：登录GitHub

1. 打开浏览器访问：https://github.com/login
2. 使用以下信息登录：
   - 用户名：lwy163mail@163.com
   - 密码：Liwangyang_610

## 步骤2：创建个人访问令牌

1. 登录后访问：https://github.com/settings/tokens
2. 点击"Generate new token"（生成新令牌）
3. 点击"Generate new token (classic)"（经典令牌）

4. 填写令牌信息：
   - **Note（备注）**: sun-ocean-upload
   - **Expiration（有效期）**: 90 days（90天）
   - **Select scopes（选择权限）**:
     - ✅ repo（完全控制仓库）
     - ✅ workflow（工作流）

5. 点击"Generate token"（生成令牌）

## 步骤3：复制令牌

**重要**：令牌只会显示一次，请立即复制并保存！

令牌格式类似：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 步骤4：使用令牌上传代码

获取令牌后，运行以下命令：

```bash
cd sun-ocean

# 设置远程仓库（使用你的令牌）
GITHUB_TOKEN="你的令牌"
git remote remove origin 2>/dev/null
git remote add origin https://lwy163mail@163.com:${GITHUB_TOKEN}@github.com/lwy163mail/sun-ocean.git

# 推送代码
git push -u origin main
```

或者，如果你愿意，可以把令牌告诉我，我来帮你完成上传。

## 替代方案：使用SSH密钥

如果你更喜欢使用SSH：

### 1. 生成SSH密钥
```bash
ssh-keygen -t ed25519 -C "lwy163mail@163.com"
# 按Enter接受默认位置
# 可以设置密码或不设置
```

### 2. 查看公钥
```bash
cat ~/.ssh/id_ed25519.pub
```

### 3. 添加到GitHub
1. 访问：https://github.com/settings/keys
2. 点击"New SSH key"
3. 粘贴公钥内容
4. 点击"Add SSH key"

### 4. 使用SSH推送
```bash
cd sun-ocean
git remote remove origin
git remote add origin git@github.com:lwy163mail/sun-ocean.git
git push -u origin main
```

## 问题排查

### 如果遇到"Repository not found"错误
说明仓库还不存在，需要先创建：
1. 访问：https://github.com/new
2. 仓库名：sun-ocean
3. 描述：Personal navigation page application
4. 不要初始化README
5. 点击"Create repository"

### 如果遇到认证错误
1. 确认令牌是否正确
2. 确认用户名是否正确
3. 尝试清除Git凭据：
```bash
git config --global --unset credential.helper
```

### 如果遇到网络问题
1. 检查网络连接
2. 尝试使用代理
3. 使用SSH代替HTTPS

## 安全提示

1. **不要分享你的令牌**给任何人
2. **令牌如密码**，妥善保管
3. 使用后可以考虑撤销令牌
4. 定期更新令牌

## 完成验证

上传成功后，你可以访问：
https://github.com/lwy163mail/sun-ocean

确认所有文件都已正确上传。