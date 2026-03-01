<template>
  <div class="demo-container">
    <h2 style="margin: 40px 0 20px 0; color: #333;">自定义样式大型柱状图卡片</h2>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeBarChartCard
            :count="580"
            title="用户注册量"
            :changeRate="15"
            :dataList="barChartCardData3"
            card-height="200px"
            chart-color="#F56C6C"
            bar-width="35%"
          />
      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeBarChartCard
            :count="320"
            title="活跃用户数"
            :changeRate="5"
            :dataList="barChartCardData4"
            card-height="200px"
            chart-color="#E6A23C"
            bar-width="45%"
            time-range="2023-10"
          />
      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeBarChartCard
            :count="750"
            title="页面访问量"
            :changeRate="9"
            :dataList="barChartCardData5"
            card-height="200px"
            chart-color="#67c23a"
            bar-width="25%"
          />
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeBarChartCard
            :count="480"
            title="转化率"
            :changeRate="12"
            :dataList="barChartCardData6"
            card-height="200px"
            chart-color="#909399"
            bar-width="30%"
            time-range="2023-Q3"
          />
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeBarChartCard
            :count="720"
            title="新用户数"
            :changeRate="18"
            :dataList="barChartCardData7"
            card-height="200px"
            chart-color="#409eff"
            bar-width="35%"
            :bar-radius="6"
          />
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeBarChartCard
            :count="540"
            title="复购率"
            :changeRate="25"
            :dataList="barChartCardData8"
            card-height="200px"
            chart-color="#67c23a"
            bar-width="25%"
            :bar-radius="16"
            time-range="2023-10"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightLargeBarChartCard } from 'sunlight-ui';
import { ref } from 'vue';

const barChartCardData3 = ref([80, 120, 150, 100, 90, 130, 160]);
const barChartCardData4 = ref([40, 60, 80, 70, 90, 80, 100]);
const barChartCardData5 = ref([100, 140, 180, 120, 110, 150, 190]);
const barChartCardData6 = ref([60, 90, 70, 120, 100, 130, 150]);
const barChartCardData7 = ref([90, 130, 160, 110, 100, 140, 170]);
const barChartCardData8 = ref([70, 110, 140, 90, 80, 120, 150]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>