#!/bin/bash

echo "🚀 开始添加用户喜欢的网站链接..."

# 定义分类和链接数据
declare -A categories=(
    ["openclaw专题"]="OpenClaw相关资源和工具"
    ["AI开发工具"]="人工智能开发框架和工具"
    ["AI新闻"]="人工智能最新动态和新闻"
    ["极客新闻"]="科技极客新闻和资讯"
    ["时政要闻"]="时事政治重要新闻"
    ["体育新闻"]="体育赛事和新闻"
    ["读书笔记"]="读书心得和笔记分享"
)

# 定义链接数据（分类 -> 链接数组）
declare -A links_openclaw=(
    ["OpenClaw官网"]="https://openclaw.ai|OpenClaw官方网站"
    ["OpenClaw文档"]="https://docs.openclaw.ai|OpenClaw官方文档"
    ["OpenClaw GitHub"]="https://github.com/openclaw/openclaw|OpenClaw开源代码库"
    ["ClawHub技能市场"]="https://clawhub.com|OpenClaw技能和插件市场"
    ["OpenClaw Discord"]="https://discord.com/invite/clawd|OpenClaw社区Discord"
)

declare -A links_ai_dev=(
    ["OpenAI"]="https://openai.com|OpenAI官方网站"
    ["Anthropic Claude"]="https://claude.ai|Claude AI助手"
    ["Hugging Face"]="https://huggingface.co|AI模型社区"
    ["LangChain"]="https://langchain.com|LLM应用开发框架"
    ["LlamaIndex"]="https://www.llamaindex.ai|LLM数据框架"
    ["TensorFlow"]="https://tensorflow.org|Google深度学习框架"
    ["PyTorch"]="https://pytorch.org|Meta深度学习框架"
    ["Google AI"]="https://ai.google|Google AI研究"
)

declare -A links_ai_news=(
    ["机器之心"]="https://www.jiqizhixin.com|AI领域专业媒体"
    ["AI科技评论"]="https://www.leiphone.com|雷峰网AI频道"
    ["新智元"]="https://www.aixinzhijie.com|人工智能媒体平台"
    ["VentureBeat AI"]="https://venturebeat.com/category/ai|硅谷AI新闻"
    ["MIT Technology Review AI"]="https://www.technologyreview.com/topic/artificial-intelligence|MIT科技评论AI"
)

declare -A links_geek_news=(
    ["Hacker News"]="https://news.ycombinator.com|程序员新闻社区"
    ["Product Hunt"]="https://www.producthunt.com|新产品发现平台"
    ["TechCrunch"]="https://techcrunch.com|科技新闻媒体"
    ["The Verge"]="https://www.theverge.com|科技新闻和评测"
    ["Ars Technica"]="https://arstechnica.com|技术新闻和评测"
    ["Wired"]="https://www.wired.com|科技文化杂志"
    ["Engadget"]="https://www.engadget.com|消费电子新闻"
)

declare -A links_politics=(
    ["人民网"]="http://www.people.com.cn|人民日报官方网站"
    ["新华网"]="http://www.xinhuanet.com|新华社官方网站"
    ["央视新闻"]="https://news.cctv.com|中央电视台新闻"
    ["澎湃新闻"]="https://www.thepaper.cn|时政新闻媒体"
    ["观察者网"]="https://www.guancha.cn|时政评论网站"
    ["环球网"]="https://www.huanqiu.com|环球时报官方网站"
)

declare -A links_sports=(
    ["腾讯体育"]="https://sports.qq.com|腾讯体育新闻"
    ["新浪体育"]="https://sports.sina.com.cn|新浪体育新闻"
    ["虎扑体育"]="https://www.hupu.com|体育社区和新闻"
    ["央视体育"]="https://sports.cctv.com|中央电视台体育频道"
    ["网易体育"]="https://sports.163.com|网易体育新闻"
    ["ESPN"]="https://www.espn.com|全球体育新闻"
)

declare -A links_reading=(
    ["豆瓣读书"]="https://book.douban.com|图书评价和社区"
    ["微信读书"]="https://weread.qq.com|腾讯电子书平台"
    ["得到"]="https://www.dedao.cn|知识服务平台"
    ["知乎"]="https://www.zhihu.com|问答社区"
    ["简书"]="https://www.jianshu.com|创作社区"
    ["Medium"]="https://medium.com|英文写作平台"
)

declare -A links_efficiency=(
    ["Notion"]="https://notion.so|一体化工作空间"
    ["飞书"]="https://www.feishu.cn|字节跳动办公套件"
    ["语雀"]="https://www.yuque.com|阿里云知识库"
    ["Trello"]="https://trello.com|项目管理工具"
    ["Asana"]="https://asana.com|团队任务管理"
    ["Slack"]="https://slack.com|团队沟通工具"
    ["Zoom"]="https://zoom.us|视频会议工具"
    ["Google Workspace"]="https://workspace.google.com|谷歌办公套件"
)

declare -A links_entertainment=(
    ["Bilibili"]="https://www.bilibili.com|视频弹幕网站"
    ["抖音"]="https://www.douyin.com|短视频平台"
    ["YouTube"]="https://youtube.com|视频分享平台"
    ["Netflix"]="https://netflix.com|流媒体视频服务"
    ["Spotify"]="https://spotify.com|音乐流媒体"
    ["Steam"]="https://store.steampowered.com|游戏平台"
    ["豆瓣电影"]="https://movie.douban.com|电影评价和社区"
)

# 添加分类的函数
add_category() {
    local name="$1"
    local description="$2"
    
    echo "添加分类: $name"
    curl -X POST "http://localhost:8080/api/categories" \
        -H "Content-Type: application/json" \
        -d "{
            \"name\": \"$name\",
            \"description\": \"$description\",
            \"icon\": \"app\",
            \"color\": \"#$((RANDOM % 256 * 256 * 256 + RANDOM % 256 * 256 + RANDOM % 256))\",
            \"sortOrder\": $((6 + RANDOM % 10))
        }"
    echo ""
}

# 添加链接的函数
add_link() {
    local category_name="$1"
    local title="$2"
    local url="$3"
    local description="$4"
    
    echo "  添加链接: $title"
    curl -X POST "http://localhost:8080/api/links" \
        -H "Content-Type: application/json" \
        -d "{
            \"title\": \"$title\",
            \"url\": \"$url\",
            \"description\": \"$description\",
            \"icon\": \"link\",
            \"linkType\": \"app\",
            \"sortOrder\": $((RANDOM % 10 + 1)),
            \"categoryName\": \"$category_name\"
        }"
    echo ""
}

# 主程序
echo "📋 添加新分类..."
for category_name in "${!categories[@]}"; do
    add_category "$category_name" "${categories[$category_name]}"
    sleep 0.5
done

echo ""
echo "🔗 添加链接到各分类..."

# 添加openclaw专题链接
echo "添加 openclaw专题 链接..."
for title in "${!links_openclaw[@]}"; do
    IFS='|' read -r url description <<< "${links_openclaw[$title]}"
    add_link "openclaw专题" "$title" "$url" "$description"
    sleep 0.3
done

# 添加AI开发工具链接
echo "添加 AI开发工具 链接..."
for title in "${!links_ai_dev[@]}"; do
    IFS='|' read -r url description <<< "${links_ai_dev[$title]}"
    add_link "AI开发工具" "$title" "$url" "$description"
    sleep 0.3
done

# 添加AI新闻链接
echo "添加 AI新闻 链接..."
for title in "${!links_ai_news[@]}"; do
    IFS='|' read -r url description <<< "${links_ai_news[$title]}"
    add_link "AI新闻" "$title" "$url" "$description"
    sleep 0.3
done

# 添加极客新闻链接
echo "添加 极客新闻 链接..."
for title in "${!links_geek_news[@]}"; do
    IFS='|' read -r url description <<< "${links_geek_news[$title]}"
    add_link "极客新闻" "$title" "$url" "$description"
    sleep 0.3
done

# 添加时政要闻链接
echo "添加 时政要闻 链接..."
for title in "${!links_politics[@]}"; do
    IFS='|' read -r url description <<< "${links_politics[$title]}"
    add_link "时政要闻" "$title" "$url" "$description"
    sleep 0.3
done

# 添加体育新闻链接
echo "添加 体育新闻 链接..."
for title in "${!links_sports[@]}"; do
    IFS='|' read -r url description <<< "${links_sports[$title]}"
    add_link "体育新闻" "$title" "$url" "$description"
    sleep 0.3
done

# 添加读书笔记链接
echo "添加 读书笔记 链接..."
for title in "${!links_reading[@]}"; do
    IFS='|' read -r url description <<< "${links_reading[$title]}"
    add_link "读书笔记" "$title" "$url" "$description"
    sleep 0.3
done

# 补充效率工具链接（添加到现有分类）
echo "补充 效率工具 链接..."
for title in "${!links_efficiency[@]}"; do
    IFS='|' read -r url description <<< "${links_efficiency[$title]}"
    add_link "效率工具" "$title" "$url" "$description"
    sleep 0.3
done

# 补充休闲娱乐链接（添加到现有分类）
echo "补充 休闲娱乐 链接..."
for title in "${!links_entertainment[@]}"; do
    IFS='|' read -r url description <<< "${links_entertainment[$title]}"
    add_link "娱乐休闲" "$title" "$url" "$description"
    sleep 0.3
done

echo ""
echo "✅ 链接添加完成！"
echo "📊 统计信息："
echo "  新增分类: ${#categories[@]} 个"
echo "  新增链接: 约 $(( ${#links_openclaw[@]} + ${#links_ai_dev[@]} + ${#links_ai_news[@]} + ${#links_geek_news[@]} + ${#links_politics[@]} + ${#links_sports[@]} + ${#links_reading[@]} + ${#links_efficiency[@]} + ${#links_entertainment[@]} )) 个"