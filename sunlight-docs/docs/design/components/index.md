---
title: 组件设计
lang: zh-CN
date: 2025-02-26 19:45:57
---

# 组件设计

本章节包含了 Sunlight UI 组件库中的各种组件设计文档，提供了详细的使用说明和示例。

## 组件列表

### 基础卡片

<SunlightCard>
  <template #header>
    <div class="card-header">
      <h3>SunlightBasicCard</h3>
      <p>轻量级统计卡片组件，用于展示关键数据和指标</p>
    </div>
  </template>
  <template #body>
    <div class="card-body">
      <p>SunlightBasicCard 是一个轻量级的统计卡片组件，用于展示关键数据和指标。它支持图标、标题、数值、描述等内容的展示，并内置了数字滚动动画效果，使数据展示更加生动。</p>
      <div class="card-actions">
        <a href="/design/components/01sunlight-basic-card/" class="btn">查看文档</a>
      </div>
    </div>
  </template>
</SunlightCard>

### 进度卡片

<SunlightCard>
  <template #header>
    <div class="card-header">
      <h3>SunlightProgressCard</h3>
      <p>轻量级进度卡片组件，用于展示任务完成度、目标达成率等进度信息</p>
    </div>
  </template>
  <template #body>
    <div class="card-body">
      <p>SunlightProgressCard 是一个轻量级的进度卡片组件，用于展示任务完成度、目标达成率等进度信息。它支持自定义进度条颜色、图标、标题等内容，并内置了平滑的进度动画效果，使进度展示更加生动。</p>
      <div class="card-actions">
        <a href="/design/components/02sunlight-progress-card/" class="btn">查看文档</a>
      </div>
    </div>
  </template>
</SunlightCard>

### 柱状图卡片

<SunlightCard>
  <template #header>
    <div class="card-header">
      <h3>SunlightBarChartCard</h3>
      <p>轻量级柱状图卡片组件，用于展示带柱状图的数据统计信息</p>
    </div>
  </template>
  <template #body>
    <div class="card-body">
      <p>SunlightBarChartCard 是一个轻量级的柱状图卡片组件，用于展示带柱状图的数据统计信息。它支持自定义统计数值、标题、变化率、时间范围、数据列表、卡片高度、图表颜色、柱状图宽度、是否为迷你图表、图表容器宽度和图表容器高度等内容，使数据展示更加直观和生动。</p>
      <div class="card-actions">
        <a href="/design/components/03sunlight-bar-chart-card/" class="btn">查看文档</a>
      </div>
    </div>
  </template>
</SunlightCard>

### 环形图卡片

<SunlightCard>
  <template #header>
    <div class="card-header">
      <h3>SunlightDonutChartCard</h3>
      <p>轻量级环形图卡片组件，用于展示带环形图的数据统计信息</p>
    </div>
  </template>
  <template #body>
    <div class="card-body">
      <p>SunlightDonutChartCard 是一个轻量级的环形图卡片组件，用于展示带环形图的数据统计信息。它支持自定义统计数值、标题、变化率、变化率标签、当前年份、去年年份、卡片高度、图表颜色、环形图半径和环形图数据等内容，使数据展示更加直观和生动。</p>
      <div class="card-actions">
        <a href="/design/components/04sunlight-donut-chart-card/" class="btn">查看文档</a>
      </div>
    </div>
  </template>
</SunlightCard>

### 折线图卡片

<SunlightCard>
  <template #header>
    <div class="card-header">
      <h3>SunlightLineChartCard</h3>
      <p>轻量级折线图卡片组件，用于展示带折线图的数据统计信息</p>
    </div>
  </template>
  <template #body>
    <div class="card-body">
      <p>SunlightLineChartCard 是一个轻量级的折线图卡片组件，用于展示带折线图的数据统计信息。它支持自定义统计数值、标题、变化率、时间范围、卡片高度、图表颜色、是否显示区域颜色、图表数据、是否为迷你图表、图表容器宽度和图表容器高度等内容，使数据展示更加直观和生动。</p>
      <div class="card-actions">
        <a href="/design/components/05sunlight-line-chart-card/" class="btn">查看文档</a>
      </div>
    </div>
  </template>
</SunlightCard>

## 设计原则

所有组件设计都遵循以下原则：

1. **简洁易用**：组件设计简洁明了，使用方法简单直观
2. **响应式布局**：组件支持响应式布局，适配不同屏幕尺寸
3. **可定制性**：组件提供丰富的配置选项，支持自定义样式和行为
4. **性能优化**：组件实现考虑性能因素，避免不必要的渲染和计算
5. **可访问性**：组件设计考虑可访问性，确保所有用户都能正常使用

## 开发指南

### 组件使用

在使用组件时，请参考各组件的详细文档，了解组件的属性、事件和使用方法。

### 自定义组件

如果需要自定义组件，可以基于现有组件进行扩展，或者参考组件的实现方式创建新组件。


## 相关资源

- [Element Plus 组件库](https://element-plus.gitee.io/zh-CN/)
- [Vue 3 文档](https://v3.cn.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/zh/docs/)

## 联系我们

如果您对组件设计有任何疑问或建议，欢迎联系。

- GitHub: [Sunlight UI](https://github.com/Sunlight-creator/Sunlight-ui.git)
- 邮箱: zhaoyang.dong@hotmail.com

<style>
  .SunlightCard {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow: hidden;
  }
  
  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #eaeaea;
    background-color: #f9f9f9;
  }
  
  .card-header h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    color: #333;
  }
  
  .card-header p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-body p {
    margin: 0 0 16px 0;
    line-height: 1.5;
    color: #555;
  }
  
  .card-actions {
    margin-top: 16px;
  }
  
  .btn {
    display: inline-block;
    padding: 8px 16px;
    background-color: #409EFF;
    color: #fff;
    border-radius: 4px;
    text-decoration: none;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #66b1ff;
  }
</style>