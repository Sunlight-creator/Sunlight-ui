---
title: SunlightLineChartCard
lang: zh-CN
date: 2025-06-23 23:56:37
---

# SunlightLineChartCard

轻量级折线图卡片组件，用于展示带折线图的数据统计信息。

## 基本用法

::: demo
components/design/sunlight-line-chart-card/basic
:::

## 自定义样式

::: demo
components/design/sunlight-line-chart-card/custom-style
:::

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `count` | `number` | `0` | 统计数值 |
| `title` | `string` | `''` | 卡片标题 |
| `changeRate` | `number` | `0` | 变化率 |
| `timeRange` | `string` | `''` | 时间范围 |
| `cardHeight` | `string \| number` | `11` | 卡片高度 |
| `chartColor` | `string` | `''` | 图表颜色 |
| `enableAreaColor` | `boolean` | `false` | 是否显示区域颜色 |
| `dataList` | `number[]` | `[]` | 图表数据 |
| `chartWidth` | `string \| number` | `200` | 图表容器宽度 |
| `chartHeight` | `string \| number` | `60` | 图表容器高度 |

## 组件说明

SunlightLineChartCard 是一个轻量级的折线图卡片组件，用于展示带折线图的数据统计信息。它支持自定义统计数值、标题、变化率、时间范围、卡片高度、图表颜色、是否显示区域颜色、图表数据、图表容器宽度和图表容器高度等内容，使数据展示更加直观和生动。

