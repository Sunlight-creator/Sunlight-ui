<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12">
          <SunlightLargeLineChartCard
            :count="1250"
            title="总销售额"
            :changeRate="12"
            :dataList="lineChartCardData1"
            card-height="200px"
            chart-color="#409eff"
          />
      </el-col>
      
      <el-col :xs="24" :sm="24" :md="12">
          <SunlightLargeLineChartCard
            :count="850"
            title="总订单量"
            :changeRate="8"
            :dataList="lineChartCardData2"
            card-height="200px"
            chart-color="#67c23a"
            :enable-area-color="true"
            time-range="2023-10-01"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightLargeLineChartCard } from 'sunlight-ui';
import { ref } from 'vue';

const lineChartCardData1 = ref([60, 90, 120, 80, 100, 70, 90]);
const lineChartCardData2 = ref([60, 90, 120, 80, 100, 70, 90]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>