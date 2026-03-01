---
title: SunlightPolylineChart
lang: zh-CN
date: 2025-12-16 23:56:27
---

# SunlightPolylineChart

折线图组件，支持多组数据的折线展示，适用于展示数据的趋势变化和对比分析。

## 基本用法

### 单系列折线图

::: demo
components/design/sunlight-polyline-chart/basic
:::

### 多系列折线图

::: demo
components/design/sunlight-polyline-chart/multi-series
:::

### 区域填充折线图

::: demo
components/design/sunlight-polyline-chart/area
:::

### 带数据点的折线图

::: demo
components/design/sunlight-polyline-chart/with-points
:::

### 带图例的折线图

::: demo
components/design/sunlight-polyline-chart/with-legend
:::

### 带标题的折线图

::: demo
components/design/sunlight-polyline-chart/with-title
:::

### 自定义标题样式折线图

::: demo
components/design/sunlight-polyline-chart/custom-title
:::

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `SingleLineData \| LineDataItem[]` | 必填 | 支持单系列和多系列数据 |
| `xAxisData` | `string[]` | 必填 | X轴数据数组 |
| `height` | `string` | `'350px'` | 图表高度 |
| `colors` | `string[]` | `[]` | 颜色配置数组 |
| `lineWidth` | `number` | `2.5` | 线宽 |
| `showAreaColor` | `boolean` | `false` | 是否显示区域填充 |
| `smooth` | `boolean` | `true` | 是否平滑 |
| `symbol` | `string` | `'none'` | 数据点类型 |
| `symbolSize` | `number` | `6` | 数据点大小 |
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

## 数据结构

### 单系列数据

```typescript
const singleLineData = [120, 200, 150, 80, 70, 110, 130];
```

### 多系列数据

```typescript
const multiLineData = [
  {
    name: "销售额",
    data: [120, 200, 150, 80, 70, 110, 130],
    color: "#409EFF",
    lineWidth: 3,
    smooth: true,
    symbol: "circle",
    symbolSize: 6,
    areaStyle: true
  },
  {
    name: "利润",
    data: [20, 50, 30, 15, 10, 25, 35],
    color: "#67C23A",
    lineWidth: 3,
    smooth: true,
    symbol: "circle",
    symbolSize: 6,
    areaStyle: true
  }
];
```

## 组件说明

SunlightPolylineChart 是一个折线图组件，支持多组数据的折线展示，适用于展示数据的趋势变化和对比分析。

### 特点

- 支持单系列和多系列数据
- 支持区域填充效果
- 支持自定义颜色、线宽、数据点等样式
- 支持平滑曲线和直线切换
- 支持图例显示和位置调整
- 支持提示框、坐标轴、分割线等配置
- 响应式设计，适配不同屏幕尺寸

### 适用场景

- 数据趋势分析
- 业务指标监控
- 销售数据展示
- 业绩对比分析
- 时间序列数据展示