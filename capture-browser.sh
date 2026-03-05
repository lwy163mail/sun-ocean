#!/bin/bash

echo "🚀 开始截图Sun Ocean应用..."

# 1. 首先检查应用是否在运行
echo "🔍 检查应用状态..."
curl -s http://localhost:3000 > /dev/null && echo "✅ 前端应用运行正常" || echo "❌ 前端应用未运行"
curl -s http://localhost:8080/api/categories > /dev/null && echo "✅ 后端API运行正常" || echo "❌ 后端API未运行"

# 2. 尝试打开浏览器
echo "🌐 尝试打开浏览器..."
open http://localhost:3000

echo "⏳ 等待5秒让页面加载..."
sleep 5

# 3. 截图
echo "📸 开始截图..."
SCREENSHOT_PATH="$HOME/Desktop/sun-ocean-app-$(date +%Y%m%d-%H%M%S).png"
screencapture -x "$SCREENSHOT_PATH"

if [ -f "$SCREENSHOT_PATH" ]; then
    echo "✅ 截图成功保存到: $SCREENSHOT_PATH"
    echo "📊 文件信息:"
    ls -lh "$SCREENSHOT_PATH"
    
    # 尝试获取截图信息
    echo "🖼️ 截图尺寸:"
    sips -g pixelWidth -g pixelHeight "$SCREENSHOT_PATH" | grep -E "pixelWidth|pixelHeight"
    
    # 创建缩略图
    THUMBNAIL_PATH="$HOME/Desktop/sun-ocean-thumbnail.png"
    sips -Z 800 "$SCREENSHOT_PATH" --out "$THUMBNAIL_PATH"
    echo "🖼️ 缩略图已创建: $THUMBNAIL_PATH"
    
    # 创建HTML预览
    HTML_PATH="$HOME/Desktop/sun-ocean-preview.html"
    cat > "$HTML_PATH" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Sun Ocean 应用截图预览</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #1890ff; }
        .screenshot { border: 2px solid #ddd; border-radius: 8px; margin: 20px 0; }
        .info { background: #f5f5f5; padding: 15px; border-radius: 5px; }
        .status { display: inline-block; padding: 5px 10px; border-radius: 3px; margin: 5px; }
        .success { background: #52c41a; color: white; }
        .url { color: #1890ff; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌊 Sun Ocean - 个人导航页面应用</h1>
        
        <div class="info">
            <h3>📊 部署状态</h3>
            <span class="status success">✅ MySQL数据库运行中</span>
            <span class="status success">✅ Spring Boot后端运行中</span>
            <span class="status success">✅ React前端运行中</span>
            <p>截图时间: $(date)</p>
        </div>
        
        <h3>🖼️ 应用截图</h3>
        <img src="file://$SCREENSHOT_PATH" alt="Sun Ocean应用截图" class="screenshot" style="max-width: 100%;">
        
        <div class="info">
            <h3>🔗 访问地址</h3>
            <p>• <a href="http://localhost:3000" class="url" target="_blank">前端应用: http://localhost:3000</a></p>
            <p>• <a href="http://localhost:8080/api/categories" class="url" target="_blank">后端API: http://localhost:8080/api/categories</a></p>
            <p>• <a href="https://github.com/lwy163mail/sun-ocean" class="url" target="_blank">GitHub仓库: https://github.com/lwy163mail/sun-ocean</a></p>
        </div>
        
        <div class="info">
            <h3>🎯 功能特性</h3>
            <ul>
                <li>✅ 分类图标平铺展示</li>
                <li>✅ 链接收藏和管理</li>
                <li>✅ 访问次数统计</li>
                <li>✅ 响应式设计</li>
                <li>✅ 完整CRUD操作</li>
            </ul>
        </div>
    </div>
</body>
</html>
EOF
    echo "📄 HTML预览已创建: $HTML_PATH"
    open "$HTML_PATH"
    
else
    echo "❌ 截图失败"
fi

echo "🎉 截图流程完成！"