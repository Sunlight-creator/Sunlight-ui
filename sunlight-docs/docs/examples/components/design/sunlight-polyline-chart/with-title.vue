<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="24">
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px;">带标题的折线图</h4>
          <SunlightPolylineChart
            :data="multiLineData"
            :x-axis-data="xAxisData"
            height="300px"
            :show-title="true"
            title="销售趋势分析"
            title-position="center"
            :show-legend="true"
            :colors="['#409EFF', '#67C23A']"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { SunlightPolylineChart } from 'sunlight-ui';

const multiLineData = [
  {
    name: "销售额",
    data: [120, 200, 150, 80, 70, 110, 130]
  },
  {
    name: "利润",
    data: [20, 50, 30, 15, 10, 25, 35]
  }
];

const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

</style>