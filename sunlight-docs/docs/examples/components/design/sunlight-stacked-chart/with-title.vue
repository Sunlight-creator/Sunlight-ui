<template>
  <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1)">
    <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">带自定义标题的双向堆叠柱状图</h4>
    <sunlight-stacked-chart
      :positive-data="positiveData"
      :negative-data="negativeData"
      :x-axis-data="xAxisData"
      height="300px"
      :show-title="true"
      title="双向数据对比"
      title-position="top"
      :title-style="{ fontSize: 18, color: '#333' }"
      :colors="['#4C87F3', '#8BD8FC']"
      :show-legend="true"
      legend-position="bottom"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SunlightStackedChart } from "sunlight-ui";

const positiveData = ref([65, 78, 90, 45, 67, 89, 76]);

const negativeData = ref([45, 32, 56, 23, 45, 34, 56]);

const xAxisData = ref(["周一", "周二", "周三", "周四", "周五", "周六", "周日"]);
</script>
