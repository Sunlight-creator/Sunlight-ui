<template>
  <div class="demo-container">
    <h3>雷达图特殊样式</h3>
    <SunlightRadarChart
      :data="specialStyleRadarData"
      height="300px"
      :showLegend="true"
      legendPosition="bottom"
    />
  </div>
</template>

<script setup lang="ts">
import { SunlightRadarChart } from 'sunlight-ui';

const specialStyleRadarData = {
  indicator: [
    { name: '创新能力', max: 100 },
    { name: '执行能力', max: 100 },
    { name: '团队协作', max: 100 },
    { name: '沟通能力', max: 100 },
    { name: '问题解决', max: 100 },
    { name: '学习能力', max: 100 }
  ],
  series: [
    {
      value: [80, 90, 85, 95, 88, 92],
      name: '团队A',
      areaStyle: {
        color: 'rgba(255, 170, 0, 0.3)'
      },
      lineStyle: {
        color: '#E6A23C',
        width: 3,
        type: 'dashed'
      },
      itemStyle: {
        color: '#E6A23C',
        borderWidth: 2
      },
      symbol: 'triangle',
      symbolSize: 8
    },
    {
      value: [90, 85, 92, 88, 95, 80],
      name: '团队B',
      areaStyle: {
        color: 'rgba(103, 194, 58, 0.3)'
      },
      lineStyle: {
        color: '#67C23A',
        width: 3,
        type: 'solid'
      },
      itemStyle: {
        color: '#67C23A',
        borderWidth: 2
      },
      symbol: 'circle',
      symbolSize: 8
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