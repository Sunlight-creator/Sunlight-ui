# 使用访问令牌登录 npm

由于 `npm adduser` 已被弃用，推荐使用访问令牌（Access Token）进行登录。

## 步骤

### 1. 生成访问令牌

1. 访问 npm 官网：https://www.npmjs.com/login
2. 登录你的账号
3. 访问令牌页面：https://www.npmjs.com/settings/[你的用户名]/tokens
   - 例如：https://www.npmjs.com/settings/zhaoyang.dong/tokens
4. 点击 **"Generate New Token"** 按钮
5. 选择令牌类型：
   - **Granular Access Token**（推荐）：更细粒度的权限控制，90天有效期
   - **Classic Token**：传统令牌，将在 2024年11月19日过期
6. 设置令牌名称（如：`publish-token`）
7. 选择权限范围（如果是发布包，选择 `Publish` 权限）
8. 点击 **"Generate Token"**
9. **重要**：立即复制令牌，因为之后无法再查看完整令牌

### 2. 配置令牌

#### 方式一：使用命令行配置（推荐）
```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
```

#### 方式二：手动编辑配置文件
编辑 `~/.npmrc` 文件（Windows: `C:\Users\你的用户名\.npmrc`），添加：
```
//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE
```

### 3. 验证登录
```bash
npm whoami
```
如果显示你的用户名，说明登录成功。

### 4. 发布包
```bash
cd packages/SunlightInput
npm run publish
```

## 注意事项

1. **令牌安全**：
   - 不要将令牌提交到 Git 仓库
   - 不要在公共场合分享令牌
   - 如果令牌泄露，立即在 npm 官网撤销并重新生成

2. **令牌有效期**：
   - Granular Token：默认90天，可配置
   - Classic Token：将在 2024年11月19日过期

3. **CI/CD 使用**：
   - 在 CI/CD 环境中，使用环境变量存储令牌
   - 例如：`NPM_TOKEN` 环境变量

## 撤销令牌

如果需要撤销令牌：
1. 访问：https://www.npmjs.com/settings/[你的用户名]/tokens
2. 找到对应的令牌
3. 点击 **"Revoke"** 按钮




