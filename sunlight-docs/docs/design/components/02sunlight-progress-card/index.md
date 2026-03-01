---
title: SunlightProgressCard
lang: zh-CN
date: 2025-07-28 22:33:26
---

# SunlightProgressCard

轻量级进度卡片组件，用于展示任务完成度、目标达成率等进度信息。

## 基本用法

::: demo
components/design/sunlight-progress-card/basic
:::

## 自定义样式

::: demo
components/design/sunlight-progress-card/custom-style
:::

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `percentage` | `number` | `0` | 进度百分比，范围0-100 |
| `title` | `string` | `''` | 卡片标题 |
| `color` | `string` | `''` | 进度条颜色 |
| `icon` | `string` | `''` | 图标组件 |
| `iconColor` | `string` | `''` | 图标颜色 |
| `iconSize` | `string | number` | `''` | 图标大小 |
| `iconBgColor` | `string` | `''` | 图标背景颜色 |
| `iconBgRadius` | `number` | `8` | 图标背景圆角 |
| `strokeWidth` | `number` | `5` | 进度条宽度 |

## 组件说明

SunlightProgressCard 是一个轻量级的进度卡片组件，用于展示任务完成度、目标达成率等进度信息。它支持自定义进度条颜色、图标、标题等内容，并内置了平滑的进度动画效果，使进度展示更加生动。

