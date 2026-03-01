<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">单数据柱状图</h3>
    <SunlightBarChart
      :data="singleBarData"
      :xAxisData="xAxisData"
      height="300px"
      :showLegend="false"
      :colors="['#409EFF']"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { SunlightBarChart } from 'sunlight-ui';
const singleBarData = ref([120, 200, 150, 80, 70, 110, 130]);
const xAxisData = ref(["周一", "周二", "周三", "周四", "周五", "周六", "周日11"]);
</script>