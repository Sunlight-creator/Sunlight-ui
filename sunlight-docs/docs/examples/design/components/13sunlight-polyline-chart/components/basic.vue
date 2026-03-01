<template>
  <div class="demo-container">
    <h3>单系列折线图</h3>
    <SunlightPolylineChart
      :data="singleLineData"
      :xAxisData="xAxisData"
      height="300px"
      :smooth="true"
      :symbol="'circle'"
      :symbolSize="6"
    />
  </div>
</template>

<script setup lang="ts">
import { SunlightPolylineChart } from 'sunlight-ui';

const xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];
const singleLineData = [120, 200, 150, 80, 70, 110, 130];
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

h3 {
  margin-bottom: 20px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
</style>