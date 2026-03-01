<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">堆叠柱状图</h3>
    <SunlightBarChart
      :data="stackBarData"
      :xAxisData="['一月', '二月', '三月', '四月', '五月']"
      height="300px"
      :stack="true"
      :showLegend="true"
      :colors="['#E6A23C', '#67c23a']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightBarChart } from 'sunlight-ui';

const stackBarData = ref([
  {
    name: "Q1",
    data: [20, 25, 30, 35, 40],
    stack: "total",
  },
  {
    name: "Q2",
    data: [30, 35, 40, 45, 50],
    stack: "total",
  },
]);
</script>
<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>