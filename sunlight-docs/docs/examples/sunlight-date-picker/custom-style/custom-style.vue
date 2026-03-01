<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";

// 自定义样式示例数据
const dateValue = ref("");
const handleDateChange = (val: string) => {
  console.log("日期变化:", val);
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <p style="margin-bottom: 10px; font-weight: bold;">自定义样式示例</p>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          type: 'date',
          placeholder: '自定义样式示例',
          valueFormat: 'YYYY-MM-DD',
          wrapperStyle: {
            borderColor: '#67c23a',
            borderRadius: '8px',
            focusBorderColor: '#85ce61',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.15)',
          },
        }"
        @change="handleDateChange"
      />
    </div>
    <div>
      <p>选择的日期: {{ dateValue || "暂无选择" }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
