#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔍 检查 npm 登录状态...\n');

try {
  // 1. 检查 registry
  console.log('1️⃣  检查 npm registry 配置...');
  const registry = execSync('npm config get registry', { encoding: 'utf8' }).trim();
  console.log(`   Registry: ${registry}`);
  
  if (registry.includes('taobao') || registry.includes('cnpm')) {
    console.log('   ⚠️  检测到使用了国内镜像源，需要切换到官方源才能登录');
    console.log('   💡 执行以下命令切换：');
    console.log('      npm config set registry https://registry.npmjs.org/\n');
  } else if (registry === 'https://registry.npmjs.org/') {
    console.log('   ✅ Registry 配置正确\n');
  } else {
    console.log('   ⚠️  当前 registry:', registry);
    console.log('   💡 建议使用官方源：npm config set registry https://registry.npmjs.org/\n');
  }

  // 2. 检查是否已登录
  console.log('2️⃣  检查登录状态...');
  try {
    const username = execSync('npm whoami', { encoding: 'utf8' }).trim();
    console.log(`   ✅ 已登录，当前用户: ${username}\n`);
  } catch (e) {
    console.log('   ❌ 未登录或登录已过期\n');
    console.log('   💡 请使用以下命令登录：');
    console.log('      npm login');
    console.log('   或使用访问令牌：');
    console.log('      1. 访问 https://www.npmjs.com/settings/[你的用户名]/tokens');
    console.log('      2. 生成新的访问令牌');
    console.log('      3. npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN\n');
  }

  // 3. 检查 npm 版本
  console.log('3️⃣  检查 npm 版本...');
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`   npm 版本: ${npmVersion}\n`);

  // 4. 提供登录帮助
  console.log('📝 登录步骤（推荐方法）：');
  console.log('   方法一：使用 npm login');
  console.log('     1. 确保 registry 是官方源：npm config set registry https://registry.npmjs.org/');
  console.log('     2. 执行登录命令：npm login');
  console.log('     3. 输入用户名、密码和邮箱（如启用2FA，需要输入OTP）');
  console.log('     4. 验证登录：npm whoami');
  console.log('');
  console.log('   方法二：使用访问令牌（推荐用于CI/CD）');
  console.log('     1. 访问 https://www.npmjs.com/settings/[你的用户名]/tokens');
  console.log('     2. 点击 "Generate New Token" 创建新令牌');
  console.log('     3. 复制令牌，然后执行：');
  console.log('        npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN');
  console.log('     4. 验证登录：npm whoami');
  console.log('\n');

} catch (error) {
  console.error('❌ 检查失败:', error.message);
  process.exit(1);
}

