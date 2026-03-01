#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查是否在正确的目录
const packageJsonPath = path.join(__dirname, '../package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json not found. Please run this script from the component directory.');
  process.exit(1);
}

// 读取 package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

console.log(`📦 Publishing ${packageJson.name}@${packageJson.version}...`);

// 检测包管理器
function detectPackageManager() {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch (e) {
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      return 'yarn';
    } catch (e2) {
      return 'npm';
    }
  }
}

const pm = detectPackageManager();
console.log(`📦 Using package manager: ${pm}`);

try {
  // 1. 清理之前的构建
  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync(path.join(__dirname, '../dist'))) {
    fs.rmSync(path.join(__dirname, '../dist'), { recursive: true, force: true });
  }

  // 2. 安装依赖
  console.log('📥 Installing dependencies...');
  if (pm === 'pnpm') {
    execSync('pnpm install', { stdio: 'inherit' });
  } else if (pm === 'yarn') {
    execSync('yarn install', { stdio: 'inherit' });
  } else {
    execSync('npm install', { stdio: 'inherit' });
  }

  // 3. 构建
  console.log('🔨 Building component...');
  if (pm === 'pnpm') {
    execSync('pnpm run build', { stdio: 'inherit' });
  } else if (pm === 'yarn') {
    execSync('yarn build', { stdio: 'inherit' });
  } else {
    execSync('npm run build', { stdio: 'inherit' });
  }

  // 4. 检查构建结果
  const distPath = path.join(__dirname, '../dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('Build failed: dist directory not found');
  }

  // 检查必要的文件是否存在
  const requiredFiles = [
    'dist/index.umd.js',
    'dist/index.es.js',
    'dist/index.d.ts'
  ];
  
  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Build failed: required file ${file} not found`);
    }
  }

  console.log('✅ Build files verified:');
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const stats = fs.statSync(filePath);
    console.log(`   ✓ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });

  // 5. 发布到 npm（跳过 prepublishOnly 避免重复构建）
  console.log('🚀 Publishing to npm...');
  execSync('npm publish --access public --ignore-scripts', { stdio: 'inherit' });

  console.log('✅ Successfully published!');
  console.log(`📋 Package: ${packageJson.name}@${packageJson.version}`);
  console.log(`🔗 npm: https://www.npmjs.com/package/${packageJson.name}`);

} catch (error) {
  console.error('❌ Publishing failed:', error.message);
  if (error.stdout) {
    console.error('STDOUT:', error.stdout.toString());
  }
  if (error.stderr) {
    console.error('STDERR:', error.stderr.toString());
  }
  process.exit(1);
}
