#!/usr/bin/env python3
"""
GitHub上传助手
这个脚本会引导你完成GitHub上传过程
"""

import os
import subprocess
import sys

def run_command(cmd, check=True):
    """运行命令并返回结果"""
    print(f"🚀 执行: {cmd}")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        if result.returncode != 0 and check:
            print(f"❌ 错误: {result.stderr}")
            return None
        return result
    except Exception as e:
        print(f"❌ 异常: {e}")
        return None

def check_git_status():
    """检查Git状态"""
    print("\n📊 检查Git状态...")
    result = run_command("git status", check=False)
    if not result:
        return False
    
    if "On branch main" in result.stdout:
        print("✅ Git状态正常")
        return True
    else:
        print("❌ 不在main分支")
        return False

def setup_remote_repo(username, token):
    """设置远程仓库"""
    print(f"\n🔗 设置远程仓库...")
    
    # 移除现有的远程仓库
    run_command("git remote remove origin", check=False)
    
    # 添加新的远程仓库
    remote_url = f"https://{username}:{token}@github.com/{username}/sun-ocean.git"
    result = run_command(f"git remote add origin {remote_url}")
    
    if result:
        print(f"✅ 远程仓库设置成功")
        print(f"   仓库URL: https://github.com/{username}/sun-ocean")
        return True
    return False

def push_to_github():
    """推送到GitHub"""
    print("\n📤 推送到GitHub...")
    
    # 先尝试创建仓库（如果不存在）
    print("尝试创建GitHub仓库...")
    
    # 推送代码
    result = run_command("git push -u origin main", check=False)
    
    if result and result.returncode == 0:
        print("✅ 代码推送成功！")
        return True
    else:
        if result and "Repository not found" in result.stderr:
            print("❌ 仓库不存在，需要先创建")
            print("   请访问: https://github.com/new")
            print("   创建名为 'sun-ocean' 的仓库")
        elif result and "Authentication failed" in result.stderr:
            print("❌ 认证失败")
            print("   请检查用户名和令牌是否正确")
        else:
            print(f"❌ 推送失败: {result.stderr if result else '未知错误'}")
        return False

def main():
    print("=" * 50)
    print("🚀 Sun Ocean GitHub上传助手")
    print("=" * 50)
    
    # 检查是否在项目目录
    if not os.path.exists("frontend") or not os.path.exists("backend"):
        print("❌ 错误：请在sun-ocean项目根目录运行此脚本")
        sys.exit(1)
    
    # 检查Git状态
    if not check_git_status():
        print("❌ Git状态检查失败")
        sys.exit(1)
    
    print("\n📝 请输入以下信息：")
    
    # 获取GitHub用户名
    username = input("GitHub用户名 (lwy163mail): ").strip()
    if not username:
        username = "lwy163mail"
    
    # 获取个人访问令牌
    print("\n🔑 需要GitHub个人访问令牌")
    print("   获取方法：")
    print("   1. 访问 https://github.com/settings/tokens")
    print("   2. 点击 Generate new token")
    print("   3. 选择 repo 权限")
    print("   4. 复制生成的令牌")
    print()
    
    token = input("请输入个人访问令牌: ").strip()
    if not token:
        print("❌ 令牌不能为空")
        sys.exit(1)
    
    # 设置远程仓库
    if not setup_remote_repo(username, token):
        sys.exit(1)
    
    # 推送到GitHub
    if push_to_github():
        print("\n" + "=" * 50)
        print("🎉 上传完成！")
        print("=" * 50)
        print(f"\n🌐 访问你的仓库：")
        print(f"   https://github.com/{username}/sun-ocean")
        print(f"\n📁 仓库包含：")
        print(f"   • {sum(1 for _ in os.popen('find . -type f -name "*.java"'))} 个Java文件")
        print(f"   • {sum(1 for _ in os.popen('find . -type f -name "*.tsx"'))} 个TypeScript文件")
        print(f"   • {sum(1 for _ in os.popen('find . -type f -name "*.md"'))} 个文档文件")
        print(f"   • 总计约 {sum(os.path.getsize(f) for f in os.popen('find . -type f').read().strip().split('\\n') if os.path.isfile(f)) // 1024} KB 代码")
        print(f"\n🎯 下一步：")
        print(f"   1. 登录GitHub查看仓库")
        print(f"   2. 添加项目描述和标签")
        print(f"   3. 按照README.md启动应用")
    else:
        print("\n❌ 上传失败，请参考以下解决方案：")
        print("\n🔧 手动上传步骤：")
        print("   1. 访问 https://github.com/new")
        print("   2. 创建名为 'sun-ocean' 的仓库")
        print("   3. 不要初始化README")
        print("   4. 执行以下命令：")
        print(f"      git remote add origin https://github.com/{username}/sun-ocean.git")
        print("      git push -u origin main")
        print("\n📖 详细指南请查看 GITHUB_UPLOAD.md")

if __name__ == "__main__":
    main()