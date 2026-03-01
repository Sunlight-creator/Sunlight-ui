<template>
  <div class="demo-container">
    <h3>散点图特殊样式</h3>
    <SunlightScatterChart
      :data="specialStyleScatterData"
      height="300px"
      :showLegend="true"
      legendPosition="bottom"
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

const specialStyleScatterData = {
  series: [
    {
      name: '三角形点',
      data: generateScatterData(30, 100),
      symbol: 'triangle',
      symbolSize: 10
    },
    {
      name: '方形点',
      data: generateScatterData(30, 100),
      symbol: 'square',
      symbolSize: 10
    },
    {
      name: '钻石点',
      data: generateScatterData(30, 100),
      symbol: 'diamond',
      symbolSize: 10
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