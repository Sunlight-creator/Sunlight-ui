<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeDonutChartCard
            :count="85"
            title="用户留存率"
            :changeRate="15"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData4"
            card-height="250px"
            chart-color="#909399"
          />
      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeDonutChartCard
            :count="58"
            title="用户活跃度"
            :changeRate="23"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData5"
            card-height="250px"
            chart-color="#E6A23C"
            :chart-radius="['65%', '85%']"
          />
      </el-col>
      

      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeDonutChartCard
            :count="92"
            title="系统可用性"
            :changeRate="2"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData6"
            card-height="250px"
            chart-color="#409eff"
            :chart-radius="['75%', '95%']"
            time-range="2023-10"
          />
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 20px;">
          <SunlightLargeDonutChartCard
            :count="35"
            title="错误率"
            :changeRate="-5"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData7"
            card-height="250px"
            chart-color="#f56c6c"
            :chart-radius="['40%', '60%']"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightLargeDonutChartCard } from 'sunlight-ui';
import { ref } from 'vue';

const donutChartCardData4 = ref([85, 15]);
const donutChartCardData5 = ref([58, 42]);
const donutChartCardData6 = ref([92, 8]);
const donutChartCardData7 = ref([35, 65]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>