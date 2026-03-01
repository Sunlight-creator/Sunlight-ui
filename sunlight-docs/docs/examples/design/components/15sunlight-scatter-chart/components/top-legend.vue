<template>
  <div class="demo-container">
    <h3>顶部图例散点图</h3>
    <SunlightScatterChart
      :data="topLegendScatterData"
      height="300px"
      :showLegend="true"
      legendPosition="top"
    />
  </div>
</template>

<script setup lang="ts">
import { SunlightScatterChart } from 'sunlight-ui';
import {ref} from "vue";
// 生成随机散点数据
const generateScatterData = (count: number, range: number) => {
  const data: number[][] = [];
  for (let i = 0; i < count; i++) {
    data.push([
      Math.random() * range,
      Math.random() * range
    ]);
  }
  return data;
};

const topLegendScatterData = {
  series: [
    {
      name: '系列A',
      data: generateScatterData(30, 100)
    },
    {
      name: '系列B',
      data: generateScatterData(30, 100)
    },
    {
      name: '系列C',
      data: generateScatterData(30, 100)
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