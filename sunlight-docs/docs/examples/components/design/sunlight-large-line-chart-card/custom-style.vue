<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeLineChartCard
            :count="580"
            title="用户注册量"
            :changeRate="15"
            :dataList="lineChartCardData3"
            card-height="200px"
            chart-color="#F56C6C"
            :enable-area-color="true"
          />
      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeLineChartCard
            :count="320"
            title="活跃用户数"
            :changeRate="5"
            :dataList="lineChartCardData4"
            card-height="200px"
            chart-color="#E6A23C"
          />
      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeLineChartCard
            :count="750"
            title="页面访问量"
            :changeRate="9"
            :dataList="lineChartCardData5"
            card-height="200px"
            chart-color="#67c23a"
            :enable-area-color="true"
            time-range="2023-10"
          />
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeLineChartCard
            :count="480"
            title="转化率"
            :changeRate="12"
            :dataList="lineChartCardData6"
            card-height="200px"
            chart-color="#909399"
            :enable-area-color="true"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightLargeLineChartCard } from 'sunlight-ui';
import { ref } from 'vue';

const lineChartCardData3 = ref([80, 120, 150, 100, 90, 130, 160]);
const lineChartCardData4 = ref([40, 60, 80, 70, 90, 80, 100]);
const lineChartCardData5 = ref([100, 140, 180, 120, 110, 150, 190]);
const lineChartCardData6 = ref([60, 90, 70, 120, 100, 130, 150]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>