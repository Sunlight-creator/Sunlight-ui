---
title: SunlightLevelChart
lang: zh-CN
date: 2025-04-15 21:51:57
---

# SunlightLevelChart

水平柱状图组件，支持多组数据的水平展示，适用于展示各类别数据的横向对比。

## 基本用法

### 基础水平柱状图

::: demo
components/design/sunlight-level-chart/basic
:::

### 多系列水平柱状图

::: demo
components/design/sunlight-level-chart/multi-series
:::

### 堆叠水平柱状图

::: demo
components/design/sunlight-level-chart/stacked
:::

### 带标题的水平柱状图

::: demo
components/design/sunlight-level-chart/with-title
:::

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `SingleBarData \| BarSeriesItem[]` | 必填 | 支持单系列和多系列数据 |
| `xAxisData` | `string[]` | 必填 | X轴数据数组 |
| `height` | `string` | `'350px'` | 图表高度 |
| `barWidth` | `string \| number` | `'36%'` | 柱状图宽度 |
| `stack` | `boolean` | `false` | 是否堆叠 |
| `colors` | `string[]` | `['#4C87F3', '#8BD8FC', '#43A047', '#FB8C00', '#E53935']` | 颜色配置数组 |
| `showLegend` | `boolean` | `false` | 是否显示图例 |
| `legendPosition` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | 图例位置 |
| `showTooltip` | `boolean` | `true` | 是否显示提示框 |
| `loading` | `boolean` | `false` | 是否加载中 |
| `showAxisLine` | `boolean` | `true` | 是否显示轴线 |
| `showAxisLabel` | `boolean` | `true` | 是否显示轴标签 |
| `showSplitLine` | `boolean` | `true` | 是否显示分割线 |
| `isEmpty` | `boolean` | `false` | 是否为空数据 |
| `title` | `string` | `''` | 图表标题 |
| `showTitle` | `boolean` | `false` | 是否显示标题 |
| `titlePosition` | `'left' \| 'center' \| 'right'` | `'center'` | 标题位置 |
| `titleStyle` | `object` | `{}` | 标题样式 |


## 组件说明

SunlightLevelChart 是一个水平柱状图组件，支持多组数据的水平展示，适用于展示各类别数据的横向对比。
