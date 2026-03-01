<template>
  <div class="demo-container">
    <h3>产品评估雷达图</h3>
    <SunlightRadarChart
      :data="productEvaluationData"
      height="300px"
      :showLegend="true"
      legendPosition="bottom"
    />
  </div>
</template>

<script setup lang="ts">
import { SunlightRadarChart } from 'sunlight-ui';

const productEvaluationData = {
  indicator: [
    { name: '用户体验', max: 100 },
    { name: '功能完整性', max: 100 },
    { name: '性能表现', max: 100 },
    { name: '安全性', max: 100 },
    { name: '可扩展性', max: 100 },
    { name: '性价比', max: 100 }
  ],
  series: [
    {
      value: [85, 90, 88, 92, 86, 89],
      name: '产品A'
    },
    {
      value: [90, 85, 92, 88, 95, 80],
      name: '产品B'
    },
    {
      value: [80, 92, 85, 90, 88, 92],
      name: '产品C'
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