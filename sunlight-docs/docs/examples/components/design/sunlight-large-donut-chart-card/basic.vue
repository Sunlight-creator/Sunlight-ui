<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8">
          <SunlightLargeDonutChartCard
            :count="75"
            title="完成率"
            :changeRate="12"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData1"
            card-height="200px"
            chart-color="#409eff"
          />
      </el-col>
      <el-col :xs="24" :sm="24" :md="8">
          <SunlightLargeDonutChartCard
            :count="60"
            title="转化率"
            :changeRate="8"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData2"
            card-height="200px"
            chart-color="#67c23a"
            :chart-radius="['60%', '80%']"
            time-range="2023-10-01"
          />
      </el-col>
      
      <el-col :xs="24" :sm="24" :md="8">
          <SunlightLargeDonutChartCard
            :count="45"
            title="覆盖率"
            :changeRate="-3"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData3"
            card-height="200px"
            chart-color="#f56c6c"
            :chart-radius="['50%', '70%']"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightLargeDonutChartCard } from 'sunlight-ui';
import { ref } from 'vue';

const donutChartCardData1 = ref([75, 25]);
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