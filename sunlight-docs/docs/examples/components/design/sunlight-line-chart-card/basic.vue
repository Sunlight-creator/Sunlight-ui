<template>
  <div class="demo-container">
    <el-row :gutter="20">

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLineChartCard
            :count="1250"
            title="总销售额"
            :changeRate="12"
            :dataList="lineChartCardData1"
            card-height="170px"
            chart-color="#409eff"
            chart-width="200px"
            chart-height="50px"
          />
 
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLineChartCard
            :count="850"
            title="总订单量"
            :changeRate="8"
            :dataList="lineChartCardData2"
            card-height="170px"
            chart-color="#67c23a"
            :enable-area-color="true"
          />
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLineChartCard
            :count="320"
            title="新客户数"
            :changeRate="-3"
            :dataList="lineChartCardData3"
            card-height="170px"
            chart-color="#f56c6c"
            time-range="2023-10-01"
          />
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLineChartCard
            :count="650"
            title="页面访问量"
            :changeRate="5"
            :dataList="lineChartCardData4"
            card-height="170px"
            chart-color="#E6A23C"
            :enable-area-color="true"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightLineChartCard } from 'sunlight-ui';
import { ref } from 'vue';
const lineChartCardData1 = ref([60, 90, 120, 80, 100, 70, 90]);
const lineChartCardData2 = ref([60, 90, 120, 80, 100, 70, 90]);
const lineChartCardData3 = ref([100, 80, 90, 110, 70, 60, 80]);
const lineChartCardData4 = ref([80, 120, 150, 100, 90, 130, 160]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>