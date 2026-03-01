<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">详细信息 K线图</h3>
    <SunlightKLineChart
      :data="detailedKLineData"
      height="350px"
      :showDataZoom="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightKLineChart } from 'sunlight-ui';

const detailedKLineData = ref([
  { time: '09:00', open: 100, close: 105, low: 98, high: 106 },
  { time: '09:30', open: 105, close: 108, low: 104, high: 109 },
  { time: '10:00', open: 108, close: 110, low: 107, high: 112 },
  { time: '10:30', open: 110, close: 107, low: 106, high: 111 },
  { time: '11:00', open: 107, close: 109, low: 105, high: 110 },
  { time: '14:00', open: 109, close: 115, low: 108, high: 116 },
  { time: '14:30', open: 115, close: 118, low: 114, high: 119 },
  { time: '15:00', open: 118, close: 120, low: 117, high: 122 },
  { time: '15:30', open: 120, close: 119, low: 118, high: 121 },
  { time: '16:00', open: 119, close: 123, low: 117, high: 124 },
  { time: '16:30', open: 123, close: 121, low: 120, high: 125 },
  { time: '17:00', open: 121, close: 125, low: 120, high: 126 }
]);
</script>