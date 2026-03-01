<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="24">
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px;">产品评估雷达图</h4>
          <SunlightRadarChart
            :indicator="productIndicator"
            :data="productRadarData"
            height="300px"
            :show-legend="true"
            :colors="['#FF6B6B', '#4ECDC4']"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightRadarChart } from 'sunlight-ui';

const productIndicator = ref([
  { name: '功能', max: 100 },
  { name: '性能', max: 100 },
  { name: '易用性', max: 100 },
  { name: '稳定性', max: 100 },
  { name: '美观度', max: 100 },
  { name: '性价比', max: 100 }
]);

const productRadarData = ref([
  {
    name: '产品X',
    value: [85, 90, 80, 95, 85, 90]
  },
  {
    name: '产品Y',
    value: [75, 80, 90, 85, 95, 80]
  }
]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

</style>