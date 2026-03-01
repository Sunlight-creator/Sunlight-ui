<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" style="margin-bottom: 20px;">
          <SunlightDonutChartCard
            :count="85"
            title="完成率"
            :changeRate="5"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData1"
            card-height="200px"
          />

      </el-col>
      
      <el-col :xs="24" :sm="12" :md="8" style="margin-bottom: 20px;">
          <SunlightDonutChartCard
            :count="60"
            title="转化率"
            :change-rate="-5"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData2"
            card-height="200px"
            chart-color="#67c23a"
          />
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="8" style="margin-bottom: 20px;">
          <SunlightDonutChartCard
            :count="45"
            title="覆盖率"
            :change-rate="8"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData3"
            card-height="200px"
            chart-color="#f56c6c"
            :chart-radius="['60%', '80%']"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightDonutChartCard } from 'sunlight-ui';
import { ref } from 'vue';

const donutChartCardData1 = ref([85, 15]);
const donutChartCardData2 = ref([60, 40]);
const donutChartCardData3 = ref([45, 55]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>