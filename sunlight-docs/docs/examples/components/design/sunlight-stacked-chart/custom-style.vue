<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">自定义样式双向堆叠柱状图</h3>
    <SunlightStackedChart
      :positiveData="positiveData"
      :negativeData="negativeData"
      :xAxisData="xAxisData"
      height="300px"
      :colors="['#4CAF50', '#FF5252']"
      :barWidth="20"
      :positiveName="'收入'"
      :negativeName="'支出'"
      :showLegend="true"
      :showDataLabel="true"
      :positiveBorderRadius="[5, 5, 0, 0]"
      :negativeBorderRadius="[0, 0, 5, 5]"
      :showSplitLine="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightStackedChart } from 'sunlight-ui';

const positiveData = ref([65, 78, 90, 85, 76, 92, 88]);
const negativeData = ref([45, 58, 65, 52, 48, 60, 55]);
const xAxisData = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);
</script>