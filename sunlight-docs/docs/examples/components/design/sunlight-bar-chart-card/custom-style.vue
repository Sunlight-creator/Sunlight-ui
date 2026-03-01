<template>
  <div class="demo-container">
    <h2 style="margin: 40px 0 20px 0; color: #333;">自定义样式柱状图卡片</h2>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightBarChartCard
            :count="580"
            title="用户注册量"
            :changeRate="15"
            :dataList="barChartCardData3"
            card-height="150px"
            chart-color="#F56C6C"
            bar-width="45%"
          />
      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightBarChartCard
            :count="320"
            title="活跃用户数"
            :changeRate="5"
            :dataList="barChartCardData4"
            card-height="150px"
            chart-color="#E6A23C"
            bar-width="55%"
          />

      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightBarChartCard
            :count="750"
            title="页面访问量"
            :changeRate="9"
            :dataList="barChartCardData5"
            card-height="150px"
            chart-color="#909399"
            bar-width="60%"
          />
   
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightBarChartCard } from 'sunlight-ui';
import { ElRow, ElCol } from 'element-plus';
import { ref } from 'vue';

const barChartCardData3 = ref([80, 120, 150, 100, 90, 130, 160]);
const barChartCardData4 = ref([40, 60, 80, 70, 90, 80, 100]);
const barChartCardData5 = ref([100, 140, 180, 120, 110, 150, 190]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>