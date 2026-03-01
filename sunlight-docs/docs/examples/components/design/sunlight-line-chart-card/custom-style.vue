<template>
  <div class="demo-container">
    <h2 style="margin: 40px 0 20px 0; color: #333;">自定义样式折线图卡片</h2>
    <el-row :gutter="20">

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLineChartCard
            :count="580"
            title="用户注册量"
            :changeRate="15"
            :dataList="lineChartCardData4"
            card-height="170px"
            chart-color="#909399"
            :enable-area-color="true"
          />
      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLineChartCard
            :count="320"
            title="活跃用户数"
            :changeRate="5"
            :dataList="lineChartCardData5"
            card-height="170px"
            chart-color="#E6A23C"
          />
      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLineChartCard
            :count="750"
            title="页面访问量"
            :changeRate="9"
            :dataList="lineChartCardData6"
            card-height="170px"
            chart-color="#67c23a"
            :enable-area-color="true"
            time-range="2023-10-01"
          />
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLineChartCard
            :count="480"
            title="转化率"
            :changeRate="12"
            :dataList="lineChartCardData7"
            card-height="170px"
            chart-color="#909399"
            :enable-area-color="true"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightLineChartCard } from 'sunlight-ui';
import { ref } from 'vue';

const lineChartCardData4 = ref([80, 120, 150, 100, 90, 130, 160]);
const lineChartCardData5 = ref([40, 60, 80, 70, 90, 80, 100]);
const lineChartCardData6 = ref([100, 140, 180, 120, 110, 150, 190]);
const lineChartCardData7 = ref([60, 90, 70, 120, 100, 130, 150]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>