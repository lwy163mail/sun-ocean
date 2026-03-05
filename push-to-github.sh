#!/bin/bash

echo "🚀 Sun Ocean GitHub上传助手"
echo "=============================="

# 检查是否在项目目录
if [ ! -f "README.md" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ 错误：请在sun-ocean项目根目录运行此脚本"
    exit 1
fi

echo "📊 检查Git状态..."
git status

echo ""
echo "📝 请输入你的GitHub用户名："
read -r github_username

if [ -z "$github_username" ]; then
    echo "❌ 用户名不能为空"
    exit 1
fi

echo ""
echo "🔗 设置远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$github_username/sun-ocean.git"

echo ""
echo "📤 推送代码到GitHub..."
echo "提示：如果提示输入用户名密码，请使用："
echo "  用户名：$github_username"
echo "  密码：你的GitHub个人访问令牌（不是登录密码）"
echo ""

# 尝试推送
if git push -u origin main; then
    echo ""
    echo "✅ 代码上传成功！"
    echo ""
    echo "🌐 访问你的仓库："
    echo "  https://github.com/$github_username/sun-ocean"
    echo ""
    echo "📋 仓库信息："
    echo "  名称：sun-ocean"
    echo "  描述：Personal navigation page application"
    echo "  分支：main"
    echo ""
    echo "🎯 下一步："
    echo "  1. 登录GitHub查看仓库"
    echo "  2. 添加项目描述和标签"
    echo "  3. 设置README.md显示"
    echo "  4. 邀请协作者（可选）"
else
    echo ""
    echo "❌ 推送失败，可能的原因："
    echo "  1. 仓库不存在：请先在GitHub创建 sun-ocean 仓库"
    echo "  2. 认证失败：请使用个人访问令牌而不是密码"
    echo "  3. 网络问题：检查网络连接"
    echo ""
    echo "🔧 手动操作指南："
    echo "  1. 访问 https://github.com/new 创建仓库"
    echo "  2. 仓库名：sun-ocean"
    echo "  3. 不要初始化README"
    echo "  4. 按照终端提示的命令手动推送"
    echo ""
    echo "📖 详细指南请查看 GITHUB_UPLOAD.md"
fi

echo ""
echo "💡 创建个人访问令牌："
echo "  1. 访问 https://github.com/settings/tokens"
echo "  2. 点击 Generate new token"
echo "  3. 选择 repo 权限"
echo "  4. 复制生成的令牌"
echo "  5. 推送时使用令牌作为密码"