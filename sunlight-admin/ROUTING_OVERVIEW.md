# Vue 3 路由概述

## 路由起步

sunlight-admin 项目采用 Vue Router 4.x 实现前端路由管理，支持静态路由、动态路由、路由守卫和基于角色的权限控制。本文档将详细介绍项目的路由系统设计与实现。

## 路由配置结构

项目的路由配置采用模块化设计，主要文件包括：

```
src/router/
├── index.ts              # 路由实例创建与守卫配置
└── modules/
    ├── staticRouter.ts   # 静态路由定义
    └── asyncRouter.ts    # 动态路由定义
```

## 路由创建与初始化

在 `src/router/index.ts` 中创建路由实例：

```typescript
import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRouter, errorRouter } from '@/router/modules/staticRouter'

const CreateRouter = () =>
  createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHashHistory(),
    routes: [...staticRouter, ...errorRouter]
  })

const router = CreateRouter()
```

项目使用 `createWebHashHistory` 模式，URL 中会包含 `#` 符号，适合单页应用部署。

## 路由类型

### 1. 静态路由

静态路由定义在 `src/router/modules/staticRouter.ts` 中，包括无需权限验证的页面：

```typescript
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'menu-home' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  }
]

// 错误页面路由
export const errorRouter = [
  { path: '/401', name: '401', component: comp401, meta: { title: '401', hidden: true } },
  { path: '/404', name: '404', component: comp404, meta: { title: '404', hidden: true } },
  { path: '/500', name: '500', component: comp500, meta: { title: '500', hidden: true } },
  { path: '/:pathMatch(.*)*', component: comp404 } // 404 兜底
]
```

### 2. 动态路由

动态路由定义在 `src/router/modules/asyncRouter.ts` 中，需要根据用户角色进行权限控制：

```typescript
export const asyncRoutes: MenuType.MenuOptions[] = [
  {
    path: '/project',
    name: 'project',
    component: Layout,
    meta: {
      title: '项目列表',
      icon: 'menu-project',
      roles: ['administrator'], // 只有管理员角色可访问
      isKeepAlive: true
    },
    children: [
      {
        path: 'project-test',
        component: () => import('@/views/project/index.vue'),
        name: 'ProjectTest',
        meta: {
          title: '项目测试',
          icon: 'menu-project',
          roles: ['administrator'],
          isKeepAlive: true
        }
      }
    ]
  }
  // 更多动态路由...
]
```

## 路由守卫

项目使用全局前置守卫实现认证和权限控制，在 `src/router/index.ts` 中配置：

```typescript
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = userStore.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户角色
          const { roles } = await userStore.getInfo()
          // 生成可访问的动态路由
          const accessRoutes = await authStore.generateAsyncRoutes(roles)
          // 动态添加路由
          accessRoutes.forEach(item => router.addRoute(item))
          // 重新导航，确保动态路由生效
          next({ ...to, replace: true })
        } catch (error) {
          // 处理错误
          await userStore.resetToken()
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 未登录处理
    whiteList.includes(to.path) ? next() : next(`/login?redirect=${to.path}`)
  }
})
```

## 权限控制流程

1. 用户登录后获取 `token`
2. 首次导航时，通过 `userStore.getInfo()` 获取用户角色
3. 根据角色调用 `authStore.generateAsyncRoutes(roles)` 生成可访问路由
4. 使用 `router.addRoute()` 动态注入路由
5. 调用 `next({ ...to, replace: true })` 重新导航

## 路由元信息

路由配置支持丰富的元信息：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| title | string | 页面标题 |
| icon | string | 菜单图标 |
| roles | string[] | 可访问角色列表 |
| hidden | boolean | 是否在菜单中隐藏 |
| isKeepAlive | boolean | 是否缓存页面 |

## 路由重置

提供路由重置功能，用于用户登出或角色切换时：

```typescript
export const resetRouter = () => {
  const authStore = useAuthStore()
  // 移除动态添加的路由
  authStore.addRoutes.forEach(route => {
    const { name } = route
    if (name && router.hasRoute(name)) router.removeRoute(name)
  })
  // 重置路由实例
  const newRouter = CreateRouter()
  router.options.routes = newRouter.options.routes
}
```

## 导航流程

1. 用户访问页面触发路由导航
2. 路由前置守卫检查用户认证状态
3. 未登录用户重定向到登录页
4. 已登录用户检查是否有角色信息
5. 无角色信息时获取用户信息并生成动态路由
6. 完成导航，显示对应页面
7. 路由后置守卫结束进度条

## 与 Pinia 集成

路由系统与 Pinia 状态管理紧密集成：

- `useUserStore`：管理用户信息、角色和 token
- `useAuthStore`：管理路由生成和权限控制
- `useGlobalStore`：管理全局配置，如页面标题

## 总结

sunlight-admin 项目的路由系统采用 Vue Router 4.x 实现，通过模块化设计、动态路由注入和基于角色的权限控制，提供了灵活、安全的前端路由管理方案。路由守卫确保了用户认证和权限验证，Pinia 集成实现了状态的集中管理，为项目提供了良好的可扩展性和维护性。