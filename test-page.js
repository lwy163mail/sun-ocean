const http = require('http');

console.log('🌐 测试Sun Ocean应用访问...\n');

// 测试后端API
console.log('1. 测试后端API:');
http.get('http://localhost:8080/api/categories', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const categories = JSON.parse(data);
      console.log(`   ✅ 后端API正常，返回 ${categories.length} 个分类`);
      categories.forEach(cat => {
        console.log(`      • ${cat.name} (${cat.description})`);
      });
    } catch (e) {
      console.log(`   ❌ API响应解析失败: ${e.message}`);
    }
    
    // 测试前端访问
    console.log('\n2. 测试前端访问:');
    http.get('http://localhost:3000', (res) => {
      console.log(`   ✅ 前端服务正常，HTTP状态码: ${res.statusCode}`);
      console.log(`   📍 访问地址: http://localhost:3000`);
      
      // 显示应用信息
      console.log('\n3. 应用信息:');
      console.log('   🏠 首页: http://localhost:3000');
      console.log('   📊 管理页: http://localhost:3000/manage');
      console.log('   🔧 API文档: http://localhost:8080/api/categories');
      
      console.log('\n4. 数据库状态:');
      // 使用exec检查数据库
      const { exec } = require('child_process');
      exec('mysql -u root -D sun_ocean -e "SELECT name, description FROM categories"', (error, stdout, stderr) => {
        if (!error) {
          const lines = stdout.trim().split('\n').slice(1);
          console.log(`   ✅ 数据库连接正常，包含 ${lines.length} 个分类:`);
          lines.forEach(line => {
            const [name, desc] = line.split('\t');
            console.log(`      • ${name}: ${desc}`);
          });
        } else {
          console.log('   ⚠️  数据库检查失败');
        }
        
        console.log('\n🎉 部署验证完成！');
        console.log('\n📋 下一步操作:');
        console.log('   1. 打开浏览器访问: http://localhost:3000');
        console.log('   2. 点击分类查看链接');
        console.log('   3. 点击"管理"添加新链接');
        console.log('   4. 享受你的个人导航页面！');
      });
    }).on('error', (e) => {
      console.log(`   ❌ 前端访问失败: ${e.message}`);
    });
  });
}).on('error', (e) => {
  console.log(`   ❌ 后端API访问失败: ${e.message}`);
});