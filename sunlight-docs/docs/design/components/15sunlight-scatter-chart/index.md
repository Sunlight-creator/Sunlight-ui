---
title: SunlightScatterChart
lang: zh-CN
date: 2025-11-01 19:54:40
---

# SunlightScatterChart

散点图组件，用于展示两个变量之间的关系，适用于相关性分析、分布分析等场景。

## 基本用法

<!-- ### 基础散点图 -->

::: demo
components/design/sunlight-scatter-chart/basic
:::

<!-- ### 多系列散点图 -->

::: demo
components/design/sunlight-scatter-chart/multi-series
:::

<!-- ### 自定义大小散点图 -->

::: demo
components/design/sunlight-scatter-chart/custom-size
:::

<!-- ### 散点图特殊样式 -->

::: demo
components/design/sunlight-scatter-chart/special-style
:::

<!-- ### 自定义颜色散点图 -->

::: demo
components/design/sunlight-scatter-chart/custom-color
:::

<!-- ### 无网格线散点图 -->

::: demo
components/design/sunlight-scatter-chart/no-grid
:::

<!-- ### 顶部图例散点图 -->

::: demo
components/design/sunlight-scatter-chart/top-legend
:::

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `ScatterData` | 必填 | 散点图数据 |
| `height` | `string` | `'350px'` | 图表高度 |
| `showLegend` | `boolean` | `false` | 是否显示图例 |
| `legendPosition` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | 图例位置 |
| `showTooltip` | `boolean` | `true` | 是否显示提示框 |
| `loading` | `boolean` | `false` | 是否加载中 |
| `isEmpty` | `boolean` | `false` | 是否为空数据 |
| `showSplitLine` | `boolean` | `true` | 是否显示分割线 |
| `showAxisLine` | `boolean` | `true` | 是否显示轴线 |
| `showAxisLabel` | `boolean` | `true` | 是否显示轴标签 |


## 组件说明

SunlightScatterChart 是一个散点图组件，用于展示两个变量之间的关系，适用于相关性分析、分布分析等场景。

