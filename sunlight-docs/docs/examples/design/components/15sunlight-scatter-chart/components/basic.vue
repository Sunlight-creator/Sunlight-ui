<template>
  <div class="demo-container">
    <h3>基础散点图</h3>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="24">
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px;">自定义颜色散点图</h4>
          <SunlightScatterChart
            :data="multiScatterData"
            height="300px"
            :show-legend="true"
            :colors="['#FF6B6B', '#4ECDC4', '#45B7D1', '#F9CA24', '#6C5CE7']"
          />
        </div>
      </el-col>
    </el-row>
         </div>
</template>

<script setup lang="ts">
import { SunlightScatterChart } from 'sunlight-ui';
import {ref} from "vue";
// 生成随机散点数据

const multiScatterData = ref([
  {
    name: "系列1",
    data: [
      { value: [10, 20] },
      { value: [20, 40] },
      { value: [30, 60] },
      { value: [40, 80] },
      { value: [50, 100] }
    ]
  },
  {
    name: "系列2",
    data: [
      { value: [20, 10] },
      { value: [40, 30] },
      { value: [60, 50] },
      { value: [80, 70] },
      { value: [100, 90] }
    ]
  }
]);

</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

h3 {
  margin-bottom: 20px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
</style>