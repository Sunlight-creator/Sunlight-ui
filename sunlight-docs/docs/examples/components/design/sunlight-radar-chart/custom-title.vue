<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="24">
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);">
          <SunlightRadarChart
            :indicator="radarIndicator"
            :data="basicRadarData"
            height="300px"
            :show-title="true"
            title="公司业绩评估"
            title-position="center"
            :title-style="{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#333'
            }"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightRadarChart } from 'sunlight-ui';

// 雷达图指标
const radarIndicator = ref([
  { name: '销售', max: 100 },
  { name: '市场', max: 100 },
  { name: '研发', max: 100 },
  { name: '客服', max: 100 },
  { name: '财务', max: 100 },
  { name: '人事', max: 100 }
]);

// 基础雷达图数据
const basicRadarData = ref([
  {
    name: '公司A',
    value: [80, 70, 90, 60, 85, 75]
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