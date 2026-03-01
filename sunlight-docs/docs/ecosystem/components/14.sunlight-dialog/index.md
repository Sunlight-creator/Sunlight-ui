---
title: SunlightDialog
lang: zh-CN
date: 2025-04-14 19:55:27
---

# SunlightDialog

基于 Element Plus Dialog 封装的增强版对话框组件，支持全屏切换、可拖拽、自定义高度、灵活的底部按钮配置等功能。

## 组件特性

- ✨ 支持全屏切换功能
- 🖱️ 支持拖拽功能
- 📏 支持自定义内容高度
- 🎨 灵活的底部按钮配置
- 🔄 支持双向绑定显示/隐藏
- 📌 支持自定义标题和底部插槽

## 基本使用

### 基础对话框

最简单的对话框使用方式，只需要提供标题和内容。

::: demo
sunlight-dialog/basic/basic
:::

### 配置说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model:visible | 对话框显示状态 | `boolean` | `false` |
| dialogTitle | 对话框标题 | `string` | `'对话框'` |
| contentHeight | 内容区域高度 | `number \| string` | `400` |
| withFooter | 是否显示底部按钮 | `boolean` | `true` |
| confirmBtnText | 确认按钮文本 | `string` | `'确认'` |
| cancelBtnText | 取消按钮文本 | `string` | `'取消'` |

## 自定义表单组件

在对话框中集成复杂的表单组件，实现数据的录入和编辑功能。

::: demo
sunlight-dialog/basic/custom-form
:::

### 配置说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| formOptions | 表单配置项 | `Record<string, any>` | `{}` |
| rules | 表单验证规则 | `Record<string, any[]>` | `{}` |

## 自定义表单 Label

通过插槽自定义表单标签的样式、内容和布局。

::: demo
sunlight-dialog/basic/custom-label
:::

### 配置说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| labelWidth | 标签宽度 | `string \| number` | `'80px'` |
| labelPosition | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |

## 自定义底部

通过插槽自定义对话框的底部按钮区域，支持多按钮布局和自定义样式。

::: demo
sunlight-dialog/basic/custom-footer
:::

### 配置说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| footerButtonAlign | 底部按钮对齐方式 | `'left' \| 'center' \| 'right'` | `'right'` |

## 事件说明

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:visible | 对话框显示状态变化事件 | `value: boolean` |
| toggle-fullscreen | 全屏状态切换事件 | `value: boolean` |
| on-confirm | 确认按钮点击事件 | - |
| on-cancel | 取消按钮点击事件 | - |

## 插槽说明

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 对话框内容区域 | - |
| header | 对话框头部区域 | `headerScope` |
| header-title | 对话框标题区域 | - |
| fullscreen-toggle | 全屏切换图标区域 | `{ isFullscreenMode, handleFullscreenToggle }` |
| footer | 对话框底部按钮区域 | `{ handleConfirmClick, handleCancelClick }` |
| footer-top | 底部按钮上方的插槽 | - |

## 方法说明

| 方法名 | 说明 | 参数 |
|--------|------|------|
| showDialog | 显示对话框 | - |
| hideDialog | 隐藏对话框 | - |
| handleConfirmClick | 触发确认事件 | - |
| handleCancelClick | 触发取消事件 | - |
| handleFullscreenToggle | 切换全屏状态 | - |
