<template>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 20px; color: #666; font-size: 18px;">自定义标题样式和位置</h3>
    
    <!-- 居左标题 -->
    <div style="margin-bottom: 30px;">
      <h4 style="margin-bottom: 15px; color: #999; font-size: 16px;">居左标题</h4>
      <SunlightBarChart
        :data="chartData"
        :x-axis-data="xAxisData"
        height="250px"
        :show-title="true"
        title="月度销售额"
        title-position="left"
        :title-style="{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#409EFF'
        }"
        :show-legend="false"
        :colors="['#409EFF']"
      />
    </div>
    
    <!-- 居中标题 -->
    <div style="margin-bottom: 30px;">
      <h4 style="margin-bottom: 15px; color: #999; font-size: 16px;">居中标题</h4>
      <SunlightBarChart
        :data="chartData"
        :x-axis-data="xAxisData"
        height="250px"
        :show-title="true"
        title="月度销售额"
        title-position="center"
        :title-style="{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#67c23a'
        }"
        :show-legend="false"
        :colors="['#67c23a']"
      />
    </div>
    
    <!-- 居右标题 -->
    <div style="margin-bottom: 30px;">
      <h4 style="margin-bottom: 15px; color: #999; font-size: 16px;">居右标题</h4>
      <SunlightBarChart
        :data="chartData"
        :x-axis-data="xAxisData"
        height="250px"
        :show-title="true"
        title="月度销售额"
        title-position="right"
        :title-style="{
          fontSize: 16,
          fontWeight: 'normal',
          color: '#E6A23C'
        }"
        :show-legend="false"
        :colors="['#E6A23C']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunlightBarChart } from 'sunlight-ui';

const chartData = ref([120, 200, 150, 80, 70, 110, 130]);
const xAxisData = ref(["一月", "二月", "三月", "四月", "五月", "六月", "七月"]);
</script>