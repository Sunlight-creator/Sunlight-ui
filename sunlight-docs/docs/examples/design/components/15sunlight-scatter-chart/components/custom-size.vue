<template>
  <div class="demo-container">
    <h3>自定义大小散点图</h3>
    <SunlightScatterChart
      :data="customSizeScatterData"
      height="300px"
      :showLegend="true"
      legendPosition="bottom"
    />
  </div>
</template>

<script setup lang="ts">
import { SunlightScatterChart } from 'sunlight-ui';
import {ref} from "vue";
// 生成带大小的散点数据
const generateSizeScatterData = (count: number, range: number) => {
  const data: number[][] = [];
  for (let i = 0; i < count; i++) {
    // 第三个值表示点的大小
    data.push([
      Math.random() * range,
      Math.random() * range,
      Math.random() * 50 + 10 // 大小范围 10-60
    ]);
  }
  return data;
};

const customSizeScatterData = {
  series: [
    {
      name: '大小变化数据',
      data: generateSizeScatterData(50, 100)
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