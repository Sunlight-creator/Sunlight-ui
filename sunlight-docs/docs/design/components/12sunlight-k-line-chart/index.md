---
title: SunlightKLineChart
lang: zh-CN
date: 2026-01-21 18:42:56
---

# SunlightKLineChart

K线图组件，支持多组数据的K线展示，适用于展示股票、期货等金融数据的走势。

## 基本用法

### 基础 K线图

::: demo
components/design/sunlight-k-line-chart/basic
:::

### 带数据缩放的 K线图

::: demo
components/design/sunlight-k-line-chart/with-data-zoom
:::

### 多系列 K线图

::: demo
components/design/sunlight-k-line-chart/multi-series
:::

### 紧凑布局 K线图

::: demo
components/design/sunlight-k-line-chart/compact
:::

### 详细信息 K线图

::: demo
components/design/sunlight-k-line-chart/detailed
:::

### 自定义颜色 K线图

::: demo
components/design/sunlight-k-line-chart/custom-colors
:::

### 带标题的 K线图

::: demo
components/design/sunlight-k-line-chart/with-title
:::

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `SingleKLineData \| KLineSeriesItem[]` | 必填 | 支持单系列和多系列K线数据 |
| `height` | `string` | `'350px'` | 图表高度 |
| `colors` | `string[]` | `['#4C87F3', '#8BD8FC']` | 颜色配置数组 |
| `showLegend` | `boolean` | `false` | 是否显示图例 |
| `legendPosition` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | 图例位置 |
| `showTooltip` | `boolean` | `true` | 是否显示提示框 |
| `loading` | `boolean` | `false` | 是否加载中 |
| `showDataZoom` | `boolean` | `false` | 是否显示数据缩放 |
| `dataZoomStart` | `number` | `0` | 数据缩放起始位置 |
| `dataZoomEnd` | `number` | `100` | 数据缩放结束位置 |
| `showAxisLine` | `boolean` | `true` | 是否显示轴线 |
| `showAxisLabel` | `boolean` | `true` | 是否显示轴标签 |
| `showSplitLine` | `boolean` | `true` | 是否显示分割线 |
| `isEmpty` | `boolean` | `false` | 是否为空数据 |
| `title` | `string` | `''` | 图表标题 |
| `showTitle` | `boolean` | `false` | 是否显示标题 |
| `titlePosition` | `'left' \| 'center' \| 'right'` | `'center'` | 标题位置 |
| `titleStyle` | `object` | `{}` | 标题样式 |

## 组件说明

SunlightKLineChart 是一个K线图组件，支持多组数据的K线展示，适用于展示股票、期货等金融数据的走势。
