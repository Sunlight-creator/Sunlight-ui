<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">多系列水平柱状图</h3>
    <SunlightLevelChart
      :data="multiData"
      :xAxisData="xAxisData"
      height="300px"
      :showLegend="true"
      :colors="['#409EFF', '#67C23A']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightLevelChart } from 'sunlight-ui';

const multiData = ref([
  {
    name: '系列1',
    data: [120, 200, 150, 80, 70, 110, 130]
  },
  {
    name: '系列2',
    data: [80, 150, 120, 50, 40, 80, 90]
  }
]);
const xAxisData = ref(['类别1', '类别2', '类别3', '类别4', '类别5', '类别6', '类别7']);
</script>