<template>
  <div class="demo-container">
    <h3>精简指标雷达图</h3>
    <SunlightRadarChart
      :data="compactRadarData"
      height="300px"
      :showLegend="true"
      legendPosition="bottom"
    />
  </div>
</template>

<script setup lang="ts">
import { SunlightRadarChart } from 'sunlight-ui';

const compactRadarData = {
  indicator: [
    { name: '市场份额', max: 100 },
    { name: '产品质量', max: 100 },
    { name: '客户满意度', max: 100 },
    { name: '品牌知名度', max: 100 }
  ],
  series: [
    {
      value: [85, 90, 88, 92],
      name: '公司A'
    },
    {
      value: [90, 85, 92, 88],
      name: '公司B'
    }
  ]
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

h3 {
  margin-bottom: 20px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
</style>