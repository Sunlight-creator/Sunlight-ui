<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <SunlightBarChart
      :data="chartData"
      :xAxisData="xAxisData"
      height="300px"
      :showTitle="true"
      title="月度销售额"
      :titleStyle="{
        color: '#409EFF',
        fontSize: '16px',
        fontWeight: 'bold'
      }"
      :showLegend="false"
      :colors="['#409EFF']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightBarChart } from 'sunlight-ui';
const chartData = ref([120, 200, 150, 80, 70, 110, 130]);
const xAxisData = ref(["一月", "二月", "三月", "四月", "五月", "六月", "七月"]);
</script>
