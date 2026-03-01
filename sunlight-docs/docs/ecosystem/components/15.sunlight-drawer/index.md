---
title: SunlightDrawer
lang: zh-CN
date: 2026-01-11 21:21:49
---

# SunlightDrawer

基于 Element Plus Drawer 封装的增强版抽屉组件，支持自定义宽度、灵活的底部按钮配置、内容区域滚动等功能。

## 组件特性

- ✨ 支持自定义宽度和方向
- 📏 支持自适应内容高度
- 🎨 灵活的底部按钮配置
- 🔄 支持双向绑定显示/隐藏
- 📌 支持自定义标题和底部插槽
- 🖱️ 支持全屏切换功能

## 基本使用

### 基础抽屉

最简单的抽屉使用方式，只需要提供标题和内容。

::: demo
sunlight-drawer/basic/basic
:::

### 配置说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model:visible | 抽屉显示状态 | `boolean` | `false` |
| drawerTitle | 抽屉标题 | `string` | `'抽屉'` |
| drawerDirection | 抽屉方向 | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` | `'rtl'` |
| drawerSize | 抽屉大小 | `string \| number` | `'30%'` |
| contentHeight | 内容区域高度 | `number \| string` | `'calc(100vh - 150px)'` |
| withFooter | 是否显示底部按钮 | `boolean` | `true` |
| confirmBtnText | 确认按钮文本 | `string` | `'确认'` |
| cancelBtnText | 取消按钮文本 | `string` | `'取消'` |

## 自定义表单组件

在抽屉中集成复杂的表单组件，实现数据的录入和编辑功能。

::: demo
sunlight-drawer/basic/custom-form
:::

### 配置说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| formOptions | 表单配置项 | `Record<string, any>` | `{}` |
| rules | 表单验证规则 | `Record<string, any[]>` | `{}` |

## 自定义表单 Label

通过插槽自定义表单标签的样式、内容和布局。

::: demo
sunlight-drawer/basic/custom-label
:::

### 配置说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| labelWidth | 标签宽度 | `string \| number` | `'80px'` |
| labelPosition | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |

## 自定义底部

通过插槽自定义抽屉的底部按钮区域，支持多按钮布局和自定义样式。

::: demo
sunlight-drawer/basic/custom-footer
:::

### 配置说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| footerButtonAlign | 底部按钮对齐方式 | `'left' \| 'center' \| 'right'` | `'right'` |

## 事件说明

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:visible | 抽屉显示状态变化事件 | `value: boolean` |
| toggle-fullscreen | 全屏状态切换事件 | `value: boolean` |
| on-confirm | 确认按钮点击事件 | - |
| on-cancel | 取消按钮点击事件 | - |

## 插槽说明

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 抽屉内容区域 | - |
| header | 抽屉头部区域 | `headerScope` |
| header-title | 抽屉标题区域 | - |
| fullscreen-toggle | 全屏切换图标区域 | `{ isFullscreenMode, handleFullscreenToggle }` |
| footer | 抽屉底部按钮区域 | `{ handleConfirmClick, handleCancelClick }` |
| footer-top | 底部按钮上方的插槽 | - |

## 方法说明

| 方法名 | 说明 | 参数 |
|--------|------|------|
| showDrawer | 显示抽屉 | - |
| hideDrawer | 隐藏抽屉 | - |
| handleConfirmClick | 触发确认事件 | - |
| handleCancelClick | 触发取消事件 | - |
| handleFullscreenToggle | 切换全屏状态 | - |