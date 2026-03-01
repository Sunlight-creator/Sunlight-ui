<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="24">
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px;">基础散点图</h4>
          <SunlightScatterChart
            :data="basicScatterData"
            height="300px"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { SunlightScatterChart } from 'sunlight-ui';
import {ref} from "vue";
// 散点图示例数据
const basicScatterData = ref([
  { value: [10, 20] },
  { value: [20, 30] },
  { value: [30, 40] },
  { value: [40, 50] },
  { value: [50, 60] },
  { value: [60, 70] },
  { value: [70, 80] },
  { value: [80, 90] },
  { value: [90, 100] },
  { value: [100, 110] }
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