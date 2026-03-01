---
title: SunlightStackedChart
lang: zh-CN
date: 2025-04-15 21:25:32
---

# SunlightStackedChart

双向堆叠柱状图组件，支持多组数据的对比展示，适用于展示收入与支出、增长与下降等对比数据。

## 基本用法

### 基础双向堆叠柱状图

::: demo
components/design/sunlight-stacked-chart/basic
:::

### 带图例的双向堆叠柱状图

::: demo
components/design/sunlight-stacked-chart/with-legend
:::

### 带数据标签的双向堆叠柱状图

::: demo
components/design/sunlight-stacked-chart/with-data-label
:::

### 自定义圆角的双向堆叠柱状图

::: demo
components/design/sunlight-stacked-chart/custom-radius
:::

### 带网格线的双向堆叠柱状图

::: demo
components/design/sunlight-stacked-chart/with-grid
:::

### 自定义Y轴范围的双向堆叠柱状图

::: demo
components/design/sunlight-stacked-chart/custom-y-axis
:::

### 带自定义标题的双向堆叠柱状图

::: demo
components/design/sunlight-stacked-chart/with-title
:::

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `positiveData` | `number[]` | 必填 | 正向数据数组 |
| `negativeData` | `number[]` | 必填 | 负向数据数组 |
| `xAxisData` | `string[]` | 必填 | X轴数据数组 |
| `height` | `string` | `'350px'` | 图表高度 |
| `colors` | `string[]` | `['#4C87F3', '#8BD8FC']` | 颜色配置数组，分别对应正向和负向数据 |
| `barWidth` | `number` | `16` | 柱状图宽度 |
| `positiveName` | `string` | `'正向数据'` | 正向数据名称 |
| `negativeName` | `string` | `'负向数据'` | 负向数据名称 |
| `yAxisMin` | `number` | `-100` | Y轴最小值 |
| `yAxisMax` | `number` | `100` | Y轴最大值 |
| `positiveBorderRadius` | `number \| number[]` | `[10, 10, 0, 0]` | 正向数据圆角配置 |
| `negativeBorderRadius` | `number \| number[]` | `[0, 0, 10, 10]` | 负向数据圆角配置 |
| `showDataLabel` | `boolean` | `false` | 是否显示数据标签 |
| `showLegend` | `boolean` | `false` | 是否显示图例 |
| `legendPosition` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | 图例位置 |
| `showTooltip` | `boolean` | `true` | 是否显示提示框 |
| `loading` | `boolean` | `false` | 是否加载中 |
| `showAxisLine` | `boolean` | `false` | 是否显示轴线 |
| `showAxisLabel` | `boolean` | `true` | 是否显示轴标签 |
| `showSplitLine` | `boolean` | `false` | 是否显示分割线 |
| `isEmpty` | `boolean` | `false` | 是否为空数据 |
| `title` | `string` | `''` | 图表标题 |
| `showTitle` | `boolean` | `false` | 是否显示标题 |
| `titlePosition` | `'top' \| 'left' \| 'right' \| 'bottom' \| 'center'` | `'top'` | 标题位置 |
| `titleStyle` | `any` | `undefined` | 标题样式 |

## 组件说明

SunlightStackedChart 是一个双向堆叠柱状图组件，支持多组数据的对比展示，适用于展示收入与支出、增长与下降等对比数据。

### 特点

- 支持正向和负向数据的对比展示
- 支持自定义颜色、柱宽、圆角等样式
- 支持图例显示和位置调整
- 支持数据标签、提示框、轴线等配置
- 支持自定义标题，可设置标题内容、位置和样式
- 响应式设计，适配不同屏幕尺寸

### 适用场景

- 收入与支出对比分析
- 增长与下降趋势对比
- 正向与负向数据对比
- 财务数据对比分析
- 业务指标对比分析