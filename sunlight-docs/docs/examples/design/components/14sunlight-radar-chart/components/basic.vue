<template>
  <div class="demo-container">
    <h3>基础雷达图</h3>
    <SunlightRadarChart
      :data="basicRadarData"
      height="300px"
    />
  </div>
</template>

<script setup lang="ts">
import { SunlightRadarChart } from 'sunlight-ui';

const basicRadarData = {
  indicator: [
    { name: '销售', max: 6500 },
    { name: '管理', max: 16000 },
    { name: '信息技术', max: 30000 },
    { name: '客服', max: 38000 },
    { name: '研发', max: 52000 },
    { name: '市场', max: 25000 }
  ],
  series: [
    {
      value: [4300, 10000, 28000, 35000, 50000, 19000],
      name: '预算分配'
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