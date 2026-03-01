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
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">自定义大小散点图</h4>
          <SunlightScatterChart :data="sizeScatterData" height="300px" :symbol-size="20" :colors="['#E6A23C']" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { SunlightScatterChart } from "sunlight-ui";
import { ref } from "vue";

const sizeScatterData = ref([
  { value: [15, 25] },
  { value: [25, 35] },
  { value: [35, 45] },
  { value: [45, 55] },
  { value: [55, 65] },
  { value: [65, 75] },
  { value: [75, 85] },
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
