<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="24">
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
          <SunlightLevelChart
            :data="multiHBarData"
            :x-axis-data="hBarXAxisData"
            height="300px"
            :show-title="true"
            title="产品销量对比"
            title-position="center"
            :title-style="{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#333'
            }"
            :show-legend="true"
            :colors="['#FF6B6B', '#4ECDC4']"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { SunlightLevelChart } from 'sunlight-ui';

const multiHBarData = [
  {
    name: '系列1',
    data: [120, 200, 150, 80, 70, 110, 130]
  },
  {
    name: '系列2',
    data: [80, 150, 120, 50, 40, 80, 90]
  }
];

// X轴数据
const hBarXAxisData = ['类别1', '类别2', '类别3', '类别4', '类别5', '类别6', '类别7'];
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

</style>