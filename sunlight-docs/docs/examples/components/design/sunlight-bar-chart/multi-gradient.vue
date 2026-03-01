<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">多数据渐变柱状图</h3>
    <SunlightBarChart
      :data="multiBarData"
      :xAxisData="xAxisData"
      height="300px"
      :showLegend="true"
      :enableGradient="true"
      :colors="['#409EFF', '#67c23a']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightBarChart } from 'sunlight-ui';

// 多数据示例
const multiBarData = ref([
  {
    name: "销售额",
    data: [120, 200, 150, 80, 70, 110, 130],
  },
  {
    name: "利润",
    data: [20, 50, 30, 15, 10, 25, 35],
  },
]);
const xAxisData = ref(["周一", "周二", "周三", "周四", "周五", "周六", "周日"]);
</script>
