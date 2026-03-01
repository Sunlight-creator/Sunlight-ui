<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">基础 K线图</h3>
    <SunlightKLineChart
      :data="basicKLineData"
      height="300px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightKLineChart } from 'sunlight-ui';
const basicKLineData = ref([
  { time: '09:00', open: 100, close: 105, low: 98, high: 106 },
  { time: '10:00', open: 105, close: 110, low: 103, high: 112 },
  { time: '11:00', open: 110, close: 108, low: 107, high: 111 },
  { time: '14:00', open: 108, close: 115, low: 106, high: 116 },
  { time: '15:00', open: 115, close: 120, low: 114, high: 122 },
  { time: '16:00', open: 120, close: 118, low: 117, high: 121 },
  { time: '17:00', open: 118, close: 125, low: 116, high: 126 }
]);
</script> 