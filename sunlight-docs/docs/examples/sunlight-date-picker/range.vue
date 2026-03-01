<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";

// 日期范围选择示例数据
const dateRangeValue = ref([]);
const handleDateRangeChange = (val: any) => {
  console.log("日期范围变化:", val);
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <SunlightDatePicker
        v-model="dateRangeValue"
        :item="{
          clearable: true,
          type: 'daterange',
          valueFormat: 'YYYY-MM-DD',
          wrapperStyle: {
            borderColor: '#409eff',
            focusBorderColor: '#409eff',
          },
          config: {
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            unlinkPanels: true,
          },
        }"
        @change="handleDateRangeChange"
      />
    </div>
    <div>
      <p>选择的日期范围: {{ dateRangeValue || "暂无选择" }}</p>
    </div>
  </div>
</template>

<style scoped></style>
