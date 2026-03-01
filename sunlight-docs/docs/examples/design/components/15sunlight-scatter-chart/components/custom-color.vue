<template>
  <div class="demo-container">
    <h3>自定义颜色散点图</h3>
    <SunlightScatterChart
      :data="customColorScatterData"
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

const customColorScatterData = {
  series: [
    {
      name: '红色系列',
      data: generateScatterData(30, 100),
      itemStyle: {
        color: '#F56C6C'
      }
    },
    {
      name: '蓝色系列',
      data: generateScatterData(30, 100),
      itemStyle: {
        color: '#409EFF'
      }
    },
    {
      name: '绿色系列',
      data: generateScatterData(30, 100),
      itemStyle: {
        color: '#67C23A'
      }
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