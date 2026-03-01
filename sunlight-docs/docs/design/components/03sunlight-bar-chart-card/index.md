---
title: SunlightBarChartCard
lang: zh-CN
date: 2025-12-07 19:32:56
---

# SunlightBarChartCard

轻量级柱状图卡片组件，用于展示带柱状图的数据统计信息。

## 基本用法

::: demo
components/design/sunlight-bar-chart-card/basic
:::

## 自定义样式

::: demo
components/design/sunlight-bar-chart-card/custom-style
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
| `dataList` | `number[]` | `[]` | 柱状图数据列表 |
| `barWidth` | `string` | `'26%'` | 柱状图宽度 |
| `barRadius` | `number` | `2` | 柱状图圆角 |
| `chartWidth` | `string \| number` | `200` | 图表容器宽度 |
| `chartHeight` | `string \| number` | `60` | 图表容器高度 |

## 组件说明

SunlightBarChartCard 是一个轻量级的柱状图卡片组件，用于展示带柱状图的数据统计信息。它支持自定义统计数值、标题、变化率、时间范围、数据列表、卡片高度、图表颜色、柱状图宽度、柱状图圆角、图表容器宽度和图表容器高度等内容，使数据展示更加直观和生动。

