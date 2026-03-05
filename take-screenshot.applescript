-- 打开Safari浏览器并访问应用
tell application "Safari"
    activate
    delay 1
    make new document with properties {URL:"http://localhost:3000"}
    delay 3 -- 等待页面加载
end tell

-- 截图
do shell script "screencapture -W ~/Desktop/sun-ocean-safari.png"
delay 1

-- 打开Chrome浏览器并访问应用
tell application "Google Chrome"
    activate
    delay 1
    make new window
    set URL of active tab of front window to "http://localhost:3000"
    delay 3 -- 等待页面加载
end tell

-- 截图
do shell script "screencapture -W ~/Desktop/sun-ocean-chrome.png"

-- 显示完成消息
display dialog "截图已完成！文件已保存到桌面：
1. sun-ocean-safari.png
2. sun-ocean-chrome.png" buttons {"OK"} default button 1