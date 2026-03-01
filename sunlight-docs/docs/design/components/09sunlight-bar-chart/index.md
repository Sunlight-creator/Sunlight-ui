---
title: SunlightBarChart
lang: zh-CN
date: 2025-08-19 20:42:26
---

# SunlightBarChart

轻量级柱状图组件，用于展示带柱状图的数据统计信息。轻量级柱状图组件，用于展示带柱状图的数据统计信息。

## 基本用法

### 单数据示例

::: demo
components/design/sunlight-bar-chart/basic
:::

### 多数据示例

::: demo
components/design/sunlight-bar-chart/multi-series
:::

## 自定义样式


::: demo
components/design/sunlight-bar-chart/stacked
:::




::: demo
components/design/sunlight-bar-chart/gradient
:::



::: demo
components/design/sunlight-bar-chart/multi-gradient
:::



::: demo
components/design/sunlight-bar-chart/title
:::







## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `SingleBarData \| BarDataItem[]` | 必填 | 图表数据，支持单系列数组或多系列对象数组 |
| `xAxisData` | `string[]` | 必填 | X轴数据 |
| `height` | `string` | `'350px'` | 图表高度 |
| `colors` | `string[]` | `[]` | 颜色数组 |
| `barWidth` | `string \| number` | `'40%'` | 柱宽 |
| `borderRadius` | `number \| number[]` | `4` | 圆角半径 |
| `stack` | `boolean` | `false` | 是否堆叠 |
| `showLegend` | `boolean` | `false` | 是否显示图例 |
| `legendPosition` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | 图例位置 |
| `showTooltip` | `boolean` | `true` | 是否显示提示框 |
| `loading` | `boolean` | `false` | 是否加载中 |
| `showAxisLine` | `boolean` | `true` | 是否显示坐标轴线 |
| `showAxisLabel` | `boolean` | `true` | 是否显示坐标轴标签 |
| `showSplitLine` | `boolean` | `true` | 是否显示分割线 |
| `isEmpty` | `boolean` | `false` | 是否为空数据 |
| `enableGradient` | `boolean` | `false` | 是否开启渐变效果 |
| `title` | `string` | `''` | 图表标题 |
| `showTitle` | `boolean` | `false` | 是否显示标题 |
| `titlePosition` | `'left' \| 'center' \| 'right'` | `'center'` | 标题位置 |
| `titleStyle` | `object` | `{}` | 标题样式，支持 fontSize、fontWeight、color、padding 等属性 |

## 数据结构

### 单系列数据

```typescript
const singleBarData = [120, 200, 150, 80, 70, 110, 130];
```

### 多系列数据

```typescript
const multiBarData = [
  {
    name: "销售额",
    data: [120, 200, 150, 80, 70, 110, 130],
    color: "#5470C6",
    stack: "total",
    barWidth: "30%"
  },
  {
    name: "利润",
    data: [20, 50, 30, 15, 10, 25, 35],
    color: "#91CC75"
  }
];
```

## 组件说明

SunlightBarChart 是一个轻量级的柱状图组件，用于展示带柱状图的数据统计信息。它支持自定义统计数值、标题、变化率、时间范围、数据列表、卡片高度、图表颜色、柱状图宽度和柱状图圆角等内容，使数据展示更加直观和生动。

### 特点

- 支持单系列和多系列数据
- 支持堆叠柱状图
- 支持渐变色效果
- 支持自定义颜色、柱宽、圆角等样式
- 支持图例显示和位置调整
- 支持提示框、坐标轴、分割线等配置
- 响应式设计，适配不同屏幕尺寸

### 适用场景

- 数据统计和分析
- 业务指标监控
- 销售数据展示
- 业绩对比分析
- 趋势变化分析