<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="24">
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px;">顶部图例雷达图</h4>
          <SunlightRadarChart
            :indicator="radarIndicator"
            :data="multiRadarData"
            height="300px"
            :show-legend="true"
            legend-position="top"
            :colors="['#3498DB', '#E74C3C', '#9B59B6']"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightRadarChart } from 'sunlight-ui';


const radarIndicator = ref([
  { name: '销售', max: 100 },
  { name: '市场', max: 100 },
  { name: '研发', max: 100 },
  { name: '客服', max: 100 },
  { name: '财务', max: 100 },
  { name: '人事', max: 100 }
]);

const multiRadarData = ref([
  {
    name: '公司A',
    value: [80, 70, 90, 60, 85, 75]
  },
  {
    name: '公司B',
    value: [70, 80, 60, 90, 75, 85]
  },
  {
    name: '公司C',
    value: [90, 60, 80, 70, 65, 90]
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