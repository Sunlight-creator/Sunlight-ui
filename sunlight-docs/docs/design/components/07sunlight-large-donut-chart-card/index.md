---
title: SunlightLargeDonutChartCard
lang: zh-CN
date: 2026-01-13 23:39:08
---

# SunlightLargeDonutChartCard

轻量级 large 环形图卡片组件，用于展示带环形图的数据统计信息。

## 基本用法

::: demo
components/design/sunlight-large-donut-chart-card/basic
:::

## 自定义样式

::: demo
components/design/sunlight-large-donut-chart-card/custom-style
:::

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `count` | `number` | `0` | 统计数值 |
| `title` | `string` | `''` | 卡片标题 |
| `changeRate` | `number` | `0` | 变化率 |
| `changeRateLabel` | `string` | `''` | 变化率标签 |
| `currentYear` | `string` | `''` | 当前年份 |
| `previousYear` | `string` | `''` | 去年年份 |
| `timeRange` | `string` | `''` | 时间范围 |
| `cardHeight` | `string \| number` | `11` | 卡片高度 |
| `chartColor` | `string` | `''` | 图表颜色 |
| `chartRadius` | `[string, string]` | `['70%', '90%']` | 环形图半径 |
| `chartData` | `[number, number]` | `[0, 0]` | 图表数据 |

## 组件说明

SunlightLargeDonutChartCard 是一个轻量级的 large 环形图卡片组件，用于展示带环形图的数据统计信息。它支持自定义统计数值、标题、变化率、变化率标签、当前年份、去年年份、时间范围、卡片高度、图表颜色、环形图半径和图表数据等内容，使数据展示更加直观和生动。

