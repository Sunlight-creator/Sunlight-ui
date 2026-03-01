<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">多系列 K线图</h3>
    <SunlightKLineChart
      :data="multiKLineData"
      height="300px"
      :showLegend="true"
      :colors="['#409EFF', '#67C23A']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightKLineChart } from 'sunlight-ui';

const multiKLineData = ref([
  {
    name: "股票A",
    data: [
      { time: '09:00', open: 100, close: 105, low: 98, high: 106 },
      { time: '10:00', open: 105, close: 110, low: 103, high: 112 },
      { time: '11:00', open: 110, close: 108, low: 107, high: 111 },
      { time: '14:00', open: 108, close: 115, low: 106, high: 116 },
      { time: '15:00', open: 115, close: 120, low: 114, high: 122 }
    ]
  },
  {
    name: "股票B",
    data: [
      { time: '09:00', open: 200, close: 205, low: 198, high: 206 },
      { time: '10:00', open: 205, close: 210, low: 203, high: 212 },
      { time: '11:00', open: 210, close: 208, low: 207, high: 211 },
      { time: '14:00', open: 208, close: 215, low: 206, high: 216 },
      { time: '15:00', open: 215, close: 220, low: 214, high: 222 }
    ]
  }
]);
</script>