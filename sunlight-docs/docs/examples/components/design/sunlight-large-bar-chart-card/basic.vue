<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12">

          <SunlightLargeBarChartCard
            :count="1250"
            title="总销售额"
            :changeRate="12"
            :dataList="barChartCardData1"
            card-height="200px"
            chart-color="#409eff"
          />
      </el-col>
      
      <el-col :xs="24" :sm="24" :md="12">
          <SunlightLargeBarChartCard
            :count="850"
            title="总订单量"
            :changeRate="8"
            :dataList="barChartCardData2"
            card-height="200px"
            chart-color="#67c23a"
            bar-width="40%"
            time-range="2023-10-01"
          />
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :xs="24" :sm="24" :md="12">
          <SunlightLargeBarChartCard
            :count="620"
            title="用户活跃度"
            :changeRate="23"
            :dataList="barChartCardData3"
            card-height="200px"
            chart-color="#E6A23C"
            bar-width="35%"
            :bar-radius="8"
          />
      </el-col>
      

      <el-col :xs="24" :sm="24" :md="12">
          <SunlightLargeBarChartCard
            :count="980"
            title="页面访问量"
            :changeRate="15"
            :dataList="barChartCardData4"
            card-height="200px"
            chart-color="#909399"
            bar-width="30%"
            :bar-radius="12"
            time-range="2023-10"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightLargeBarChartCard } from 'sunlight-ui';
import { ref } from 'vue';

const barChartCardData1 = ref([120, 200, 150, 80, 70, 110, 130]);
const barChartCardData2 = ref([60, 90, 120, 80, 100, 70, 90]);
const barChartCardData3 = ref([80, 120, 150, 100, 90, 130, 160]);
const barChartCardData4 = ref([100, 140, 180, 120, 110, 150, 190]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>