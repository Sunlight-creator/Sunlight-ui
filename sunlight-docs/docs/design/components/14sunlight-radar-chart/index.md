---
title: SunlightRadarChart
lang: zh-CN
date: 2026-01-14 18:48:11
---

# SunlightRadarChart

雷达图组件，用于展示多维度数据的对比分析，适用于评估、评级等场景。

## 基本用法

### 基础雷达图

::: demo
components/design/sunlight-radar-chart/basic
:::

### 带图例的雷达图

::: demo
components/design/sunlight-radar-chart/with-legend
:::

### 自定义样式的雷达图

::: demo
components/design/sunlight-radar-chart/custom-style
:::

### 雷达图特殊样式

::: demo
components/design/sunlight-radar-chart/special-style
:::

### 产品评估雷达图

::: demo
components/design/sunlight-radar-chart/product-evaluation
:::

### 顶部图例雷达图

::: demo
components/design/sunlight-radar-chart/top-legend
:::

### 精简指标雷达图

::: demo
components/design/sunlight-radar-chart/compact
:::

### 自定义title

::: demo
components/design/sunlight-radar-chart/custom-title
:::

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `RadarData` | 必填 | 雷达图数据 |
| `height` | `string` | `'350px'` | 图表高度 |
| `showLegend` | `boolean` | `false` | 是否显示图例 |
| `legendPosition` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | 图例位置 |
| `showTooltip` | `boolean` | `true` | 是否显示提示框 |
| `loading` | `boolean` | `false` | 是否加载中 |
| `isEmpty` | `boolean` | `false` | 是否为空数据 |



## 组件说明

SunlightRadarChart 是一个雷达图组件，用于展示多维度数据的对比分析，适用于评估、评级等场景。

