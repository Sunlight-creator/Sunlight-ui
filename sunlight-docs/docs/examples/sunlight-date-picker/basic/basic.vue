<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";

// 基础用法示例数据
const dateValue = ref("");
const yearValue = ref("");
const datetimeValue = ref("");
const rangeValue = ref([]);
const monthValue = ref("");
const multipleValues = ref([]);

const handleDateChange = (val: any) => {
  console.log("日期变化:", val);
};
</script>

<template>
  <div>
    <!-- 基础日期选择 -->
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">基础日期选择</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          type: 'date',
          placeholder: '请选择日期',
          valueFormat: 'YYYY-MM-DD',
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)',
          },
        }"
        @change="handleDateChange"
      />
      <p style="margin-top: 10px">选择的日期: {{ dateValue || "暂无选择" }}</p>
    </div>

    <!-- 选择年案例 -->
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">选择年</div>
      <SunlightDatePicker
        v-model="yearValue"
        :item="{
          type: 'year',
          placeholder: '请选择年份',
          valueFormat: 'YYYY',
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#409eff',
          },
        }"
        @change="handleDateChange"
      />
      <p style="margin-top: 10px">选择的年份: {{ yearValue || "暂无选择" }}</p>
    </div>

    <!-- 选择年月日时分秒案例 -->
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">选择年月日时分秒</div>
      <SunlightDatePicker
        v-model="datetimeValue"
        :item="{
          type: 'datetime',
          placeholder: '请选择日期时间',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#409eff',
          },
        }"
        @change="handleDateChange"
      />
      <p style="margin-top: 10px">选择的日期时间: {{ datetimeValue || "暂无选择" }}</p>
    </div>

    <!-- 月份选择案例 -->
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">月份选择</div>
      <SunlightDatePicker
        v-model="monthValue"
        :item="{
          type: 'month',
          placeholder: '请选择月份',
          valueFormat: 'YYYY-MM',
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#409eff',
          },
        }"
        @change="handleDateChange"
      />
      <p style="margin-top: 10px">选择的月份: {{ monthValue || "暂无选择" }}</p>
    </div>

    <!-- 多个时间选择案例 -->
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">多个时间选择</div>
      <SunlightDatePicker
        v-model="multipleValues"
        :item="{
          type: 'dates',
          placeholder: '请选择多个日期',
          valueFormat: 'YYYY-MM-DD',
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#409eff',
          },
        }"
        @change="handleDateChange"
      />
      <p style="margin-top: 10px">选择的多个日期: {{ multipleValues || "暂无选择" }}</p>
    </div>
  </div>
</template>

<style scoped>
h3 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
</style>
