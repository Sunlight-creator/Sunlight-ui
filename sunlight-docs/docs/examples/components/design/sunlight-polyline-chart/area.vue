<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="24">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">区域填充折线图</h4>
          <SunlightPolylineChart
            :data="areaLineData"
            :xAxisData="xAxisData"
            height="300px"
            :showLegend="true"
            :colors="['#409EFF', '#67C23A']"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SunlightPolylineChart } from "sunlight-ui";

const areaLineData = ref([
  {
    name: "销售额",
    data: [120, 200, 150, 80, 70, 110, 130],
    areaStyle: true,
  },
  {
    name: "利润",
    data: [20, 50, 30, 15, 10, 25, 35],
    areaStyle: true,
  },
]);
const xAxisData = ref(["周一", "周二", "周三", "周四", "周五", "周六", "周日"]);
</script>
