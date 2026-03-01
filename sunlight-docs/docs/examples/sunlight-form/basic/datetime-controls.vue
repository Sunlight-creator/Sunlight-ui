<template>
  <div>
    <SunlightForm v-model="formData" :columns="columns" :rules="rules">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightForm } from "sunlight-ui";

// 表单数据
const formData = ref({
  // 日期选择器
  date: "",
  dateRange: [],
  // 日期时间选择器
  datetime: "",
  datetimeRange: [],
  // 月份选择器
  month: "",
  // 年份选择器
  year: "",
});

// 表单列配置
const columns = ref([
  // 日期选择器组
  {
    prop: "date",
    label: "日期选择",
    type: "date-picker",
    span: 12,
    placeholder: "请选择日期",
    valueFormat: "YYYY-MM-DD",
    clearable: true,
  },
  {
    prop: "dateRange",
    label: "日期范围",
    type: "date-picker",
    span: 12,
    placeholder: ["开始日期", "结束日期"],
    valueFormat: "YYYY-MM-DD",
    range: true,
    clearable: true,
  },
  // 日期时间选择器组
  {
    prop: "datetime",
    label: "日期时间",
    type: "datetime-picker",
    span: 12,
    placeholder: "请选择日期时间",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    clearable: true,
  },
  {
    prop: "datetimeRange",
    label: "日期时间范围",
    type: "datetime-picker",
    span: 12,
    placeholder: ["开始时间", "结束时间"],
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    range: true,
    clearable: true,
  },
  // 月份选择器
  {
    prop: "month",
    label: "月份选择",
    type: "date-picker",
    span: 12,
    placeholder: "请选择月份",
    valueFormat: "YYYY-MM",
    pickerOptions: {
      type: "month",
    },
    clearable: true,
  },
  // 年份选择器
  {
    prop: "year",
    label: "年份选择",
    type: "date-picker",
    span: 12,
    placeholder: "请选择年份",
    valueFormat: "YYYY",
    pickerOptions: {
      type: "year",
    },
    clearable: true,
  },
]);

// 表单验证规则
const rules = ref({
  date: [{ required: true, message: "请选择日期", trigger: "change" }],
  datetime: [{ required: true, message: "请选择日期时间", trigger: "change" }],
});

// 提交表单
const handleSubmit = () => {
  console.log("表单数据:", formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    date: "",
    dateRange: [],
    datetime: "",
    datetimeRange: [],
    month: "",
    year: "",
  };
};
</script>


