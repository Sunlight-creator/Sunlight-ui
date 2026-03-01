<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24">
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px;">精简指标雷达图</h4>
          <SunlightRadarChart
            :indicator="simpleIndicator"
            :data="simpleRadarData"
            height="300px"
            :show-legend="true"
            :colors="['#2196F3', '#FF9800']"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightRadarChart } from 'sunlight-ui';

// 精简指标雷达图数据
const simpleIndicator = ref([
  { name: '效率', max: 100 },
  { name: '质量', max: 100 },
  { name: '成本', max: 100 },
  { name: '创新', max: 100 }
]);

const simpleRadarData = ref([
  {
    name: '团队A',
    value: [90, 85, 75, 95]
  },
  {
    name: '团队B',
    value: [80, 90, 95, 75]
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