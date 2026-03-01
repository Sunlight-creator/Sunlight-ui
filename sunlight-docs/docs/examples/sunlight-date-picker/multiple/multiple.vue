<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";

// 多日期选择示例数据（日期范围）
const dateRangeValue = ref([]);
const handleDateRangeChange = (val: any) => {
  console.log("日期范围变化:", val);
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <p style="margin-bottom: 10px; font-weight: bold;">日期范围选择（daterange）</p>
      <SunlightDatePicker
        v-model="dateRangeValue"
        :item="{
          type: 'daterange',
          placeholder: '请选择日期范围',
          valueFormat: 'YYYY-MM-DD',
          config: {
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            unlinkPanels: true
          },
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)',
          },
        }"
        @change="handleDateRangeChange"
      />
    </div>
    <div>
      <p>选择的日期范围: {{ dateRangeValue.length > 0 ? dateRangeValue.join(' 至 ') : "暂无选择" }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
