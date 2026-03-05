#!/usr/bin/env python3
import requests
import json
import time
import random

BASE_URL = "http://localhost:8080/api"

def add_category(name, description):
    """添加分类"""
    print(f"添加分类: {name}")
    data = {
        "name": name,
        "description": description,
        "icon": "app",
        "color": f"#{random.randint(0, 0xFFFFFF):06x}",
        "sortOrder": random.randint(6, 15)
    }
    
    try:
        response = requests.post(f"{BASE_URL}/categories", json=data)
        if response.status_code == 200:
            print(f"  ✅ 成功: {name}")
            return response.json().get("id")
        else:
            print(f"  ❌ 失败: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"  ❌ 错误: {e}")
        return None

def add_link(category_name, title, url, description):
    """添加链接"""
    print(f"  添加链接: {title}")
    data = {
        "title": title,
        "url": url,
        "description": description,
        "icon": "link",
        "linkType": "app",
        "sortOrder": random.randint(1, 10),
        "categoryName": category_name
    }
    
    try:
        response = requests.post(f"{BASE_URL}/links", json=data)
        if response.status_code == 200:
            print(f"    ✅ 成功: {title}")
            return True
        else:
            print(f"    ❌ 失败: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"    ❌ 错误: {e}")
        return False

def main():
    print("🚀 开始添加用户喜欢的网站链接...")
    
    # 定义分类
    categories = {
        "openclaw专题": "OpenClaw相关资源和工具",
        "AI开发工具": "人工智能开发框架和工具", 
        "AI新闻": "人工智能最新动态和新闻",
        "极客新闻": "科技极客新闻和资讯",
        "时政要闻": "时事政治重要新闻",
        "体育新闻": "体育赛事和新闻",
        "读书笔记": "读书心得和笔记分享"
    }
    
    # 定义链接数据
    links_data = {
        "openclaw专题": [
            ("OpenClaw官网", "https://openclaw.ai", "OpenClaw官方网站"),
            ("OpenClaw文档", "https://docs.openclaw.ai", "OpenClaw官方文档"),
            ("OpenClaw GitHub", "https://github.com/openclaw/openclaw", "OpenClaw开源代码库"),
            ("ClawHub技能市场", "https://clawhub.com", "OpenClaw技能和插件市场"),
            ("OpenClaw Discord", "https://discord.com/invite/clawd", "OpenClaw社区Discord")
        ],
        "AI开发工具": [
            ("OpenAI", "https://openai.com", "OpenAI官方网站"),
            ("Anthropic Claude", "https://claude.ai", "Claude AI助手"),
            ("Hugging Face", "https://huggingface.co", "AI模型社区"),
            ("LangChain", "https://langchain.com", "LLM应用开发框架"),
            ("LlamaIndex", "https://www.llamaindex.ai", "LLM数据框架"),
            ("TensorFlow", "https://tensorflow.org", "Google深度学习框架"),
            ("PyTorch", "https://pytorch.org", "Meta深度学习框架"),
            ("Google AI", "https://ai.google", "Google AI研究")
        ],
        "AI新闻": [
            ("机器之心", "https://www.jiqizhixin.com", "AI领域专业媒体"),
            ("AI科技评论", "https://www.leiphone.com", "雷峰网AI频道"),
            ("新智元", "https://www.aixinzhijie.com", "人工智能媒体平台"),
            ("VentureBeat AI", "https://venturebeat.com/category/ai", "硅谷AI新闻"),
            ("MIT Technology Review AI", "https://www.technologyreview.com/topic/artificial-intelligence", "MIT科技评论AI")
        ],
        "极客新闻": [
            ("Hacker News", "https://news.ycombinator.com", "程序员新闻社区"),
            ("Product Hunt", "https://www.producthunt.com", "新产品发现平台"),
            ("TechCrunch", "https://techcrunch.com", "科技新闻媒体"),
            ("The Verge", "https://www.theverge.com", "科技新闻和评测"),
            ("Ars Technica", "https://arstechnica.com", "技术新闻和评测"),
            ("Wired", "https://www.wired.com", "科技文化杂志"),
            ("Engadget", "https://www.engadget.com", "消费电子新闻")
        ],
        "时政要闻": [
            ("人民网", "http://www.people.com.cn", "人民日报官方网站"),
            ("新华网", "http://www.xinhuanet.com", "新华社官方网站"),
            ("央视新闻", "https://news.cctv.com", "中央电视台新闻"),
            ("澎湃新闻", "https://www.thepaper.cn", "时政新闻媒体"),
            ("观察者网", "https://www.guancha.cn", "时政评论网站"),
            ("环球网", "https://www.huanqiu.com", "环球时报官方网站")
        ],
        "体育新闻": [
            ("腾讯体育", "https://sports.qq.com", "腾讯体育新闻"),
            ("新浪体育", "https://sports.sina.com.cn", "新浪体育新闻"),
            ("虎扑体育", "https://www.hupu.com", "体育社区和新闻"),
            ("央视体育", "https://sports.cctv.com", "中央电视台体育频道"),
            ("网易体育", "https://sports.163.com", "网易体育新闻"),
            ("ESPN", "https://www.espn.com", "全球体育新闻")
        ],
        "读书笔记": [
            ("豆瓣读书", "https://book.douban.com", "图书评价和社区"),
            ("微信读书", "https://weread.qq.com", "腾讯电子书平台"),
            ("得到", "https://www.dedao.cn", "知识服务平台"),
            ("知乎", "https://www.zhihu.com", "问答社区"),
            ("简书", "https://www.jianshu.com", "创作社区"),
            ("Medium", "https://medium.com", "英文写作平台")
        ],
        "效率工具": [
            ("Notion", "https://notion.so", "一体化工作空间"),
            ("飞书", "https://www.feishu.cn", "字节跳动办公套件"),
            ("语雀", "https://www.yuque.com", "阿里云知识库"),
            ("Trello", "https://trello.com", "项目管理工具"),
            ("Asana", "https://asana.com", "团队任务管理"),
            ("Slack", "https://slack.com", "团队沟通工具"),
            ("Zoom", "https://zoom.us", "视频会议工具"),
            ("Google Workspace", "https://workspace.google.com", "谷歌办公套件")
        ],
        "娱乐休闲": [
            ("Bilibili", "https://www.bilibili.com", "视频弹幕网站"),
            ("抖音", "https://www.douyin.com", "短视频平台"),
            ("YouTube", "https://youtube.com", "视频分享平台"),
            ("Netflix", "https://netflix.com", "流媒体视频服务"),
            ("Spotify", "https://spotify.com", "音乐流媒体"),
            ("Steam", "https://store.steampowered.com", "游戏平台"),
            ("豆瓣电影", "https://movie.douban.com", "电影评价和社区")
        ]
    }
    
    print("\n📋 添加新分类...")
    category_ids = {}
    for name, description in categories.items():
        category_id = add_category(name, description)
        if category_id:
            category_ids[name] = category_id
        time.sleep(0.5)
    
    print("\n🔗 添加链接到各分类...")
    total_links = 0
    
    for category_name, links in links_data.items():
        print(f"\n添加 {category_name} 链接...")
        for title, url, description in links:
            success = add_link(category_name, title, url, description)
            if success:
                total_links += 1
            time.sleep(0.3)
    
    print(f"\n✅ 链接添加完成！")
    print(f"📊 统计信息：")
    print(f"  新增分类: {len(categories)} 个")
    print(f"  新增链接: {total_links} 个")
    
    # 显示当前所有分类
    print(f"\n📁 当前所有分类：")
    try:
        response = requests.get(f"{BASE_URL}/categories")
        if response.status_code == 200:
            all_categories = response.json()
            for cat in all_categories:
                print(f"  • {cat['name']} ({len(cat.get('links', []))}个链接)")
    except Exception as e:
        print(f"  无法获取分类列表: {e}")

if __name__ == "__main__":
    main()