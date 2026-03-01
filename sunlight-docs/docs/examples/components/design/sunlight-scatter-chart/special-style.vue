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
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">散点图特殊样式</h4>
          <SunlightScatterChart
            :data="specialStyleScatterData"
            height="300px"
            :showLegend="true"
            legendPosition="bottom"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { SunlightScatterChart } from "sunlight-ui";
import { ref } from "vue";

// 散点图特殊样式数据
const specialStyleScatterData = ref([
  {
    name: "三角形点",
    data: [{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 40] }],
  },
  {
    name: "方形点",
    data: [{ value: [15, 25] }, { value: [25, 35] }, { value: [35, 45] }],
  },
  {
    name: "钻石点",
    data: [{ value: [20, 30] }, { value: [30, 40] }, { value: [40, 50] }],
  },
]);
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
