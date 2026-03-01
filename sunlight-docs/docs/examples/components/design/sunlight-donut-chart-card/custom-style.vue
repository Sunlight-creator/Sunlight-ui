<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" style="margin-bottom: 20px;">
          <SunlightDonutChartCard
            :count="75"
            title="市场份额"
            :changeRate="12"
            change-rate-label="较去年"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData4"
            card-height="200px"
            chart-color="#409EFF"
          />
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="8" style="margin-bottom: 20px;">
          <SunlightDonutChartCard
            :count="35"
            title="参与率"
            :changeRate="-3"
            change-rate-label="较上月"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData5"
            card-height="200px"
            chart-color="#E6A23C"
            :chart-radius="['50%', '70%']"
          />
      </el-col>
      
      <!-- 紫色环形图卡片 -->
      <el-col :xs="24" :sm="12" :md="8" style="margin-bottom: 20px;">
          <SunlightDonutChartCard
            :count="90"
            title="满意度"
            :changeRate="8"
            change-rate-label="较去年"
            current-year="2023"
            previous-year="2022"
            :chart-data="donutChartCardData6"
            card-height="200px"
            chart-color="#909399"
            :chart-radius="['65%', '85%']"
          />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightDonutChartCard } from 'sunlight-ui';
import { ref } from 'vue';

const donutChartCardData4 = ref([75, 25]);
const donutChartCardData5 = ref([35, 65]);
const donutChartCardData6 = ref([90, 10]);
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>