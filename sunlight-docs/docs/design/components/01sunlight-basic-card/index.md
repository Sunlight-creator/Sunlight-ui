---
title: SunlightBasicCard 基础卡片
lang: zh-CN
date: 2026-01-20 19:43:40
---

# SunlightBasicCard 基础卡片

## 组件介绍

SunlightBasicCard 是一个轻量级的统计卡片组件，用于展示关键数据和指标。它支持图标、标题、数值、描述等内容的展示，并内置了数字滚动动画效果，使数据展示更加生动。

## 基本用法

### 示例

::: demo
components/design/sunlight-basic-card/basic
:::


## 自定义样式

### 示例

::: demo
components/design/sunlight-basic-card/custom-style
:::

### 配置说明

通过设置不同的颜色属性，可以自定义卡片的样式，包括图标颜色、图标背景颜色、文本颜色和卡片背景颜色。

## 数字滚动动画

SunlightBasicCard 组件内置了数字滚动动画效果，当组件挂载时，数值会从 0 平滑滚动到目标值。

### 实现原理

组件使用了 `animate` 函数来实现数字滚动动画：

1. 当组件挂载时，调用 `animate` 函数
2. 动画从 0 开始，到目标值结束
3. 持续时间为 1000 毫秒
4. 使用 `requestAnimationFrame` API 实现平滑的动画效果

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `Component` | `null` | 图标组件 |
| `title` | `string` | `''` | 卡片标题 |
| `count` | `number` | `null` | 统计数值 |
| `description` | `string` | `''` | 描述文本 |
| `iconColor` | `string` | `'#409EFF'` | 图标颜色 |
| `iconBgColor` | `string` | `''` | 图标背景颜色 |
| `iconBgRadius` | `number` | `50` | 图标背景圆角大小 |
| `iconSize` | `number` | `30` | 图标大小 |
| `textColor` | `string` | `'#333333'` | 文本颜色 |
| `backgroundColor` | `string` | `'#fff'` | 卡片背景颜色 |
| `showArrow` | `boolean` | `false` | 是否显示箭头 |



