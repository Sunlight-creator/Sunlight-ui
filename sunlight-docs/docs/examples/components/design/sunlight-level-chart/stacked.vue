<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">堆叠水平柱状图</h3>
    <SunlightLevelChart
      :data="stackData"
      :xAxisData="xAxisData"
      height="300px"
      :stack="true"
      :showLegend="true"
      :colors="['#E6A23C', '#F56C6C']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightLevelChart } from 'sunlight-ui';

const stackData = ref([
  {
    name: '部分1',
    data: [60, 100, 75, 40, 35, 55, 65]
  },
  {
    name: '部分2',
    data: [60, 100, 75, 40, 35, 55, 65]
  }
]);
const xAxisData = ref(['类别1', '类别2', '类别3', '类别4', '类别5', '类别6', '类别7']);
</script>