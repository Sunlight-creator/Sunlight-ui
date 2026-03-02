<script setup lang="ts">
import { ref } from "vue";
import { SunlightCascader } from "sunlight-ui";

const cascaderValue = ref("");
const options = [
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          { value: "yizhi", label: "一致" },
          { value: "fankui", label: "反馈" },
          { value: "xiaolu", label: "效率" },
        ],
      },
      {
        value: "daohang",
        label: "导航",
        children: [
          { value: "cexiangdaohang", label: "侧向导航" },
          { value: "dingbudaohang", label: "顶部导航" },
        ],
      },
    ],
  },
  {
    value: "zujian",
    label: "组件",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          { value: "layout", label: "Layout 布局" },
          { value: "color", label: "Color 色彩" },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          { value: "radio", label: "Radio 单选框" },
          { value: "checkbox", label: "Checkbox 多选框" },
        ],
      },
    ],
  },
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认圆角 (4px)</div>
      <SunlightCascader
        v-model="cascaderValue"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          wrapperStyle: {
            borderRadius: '4px',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">中等圆角 (8px)</div>
      <SunlightCascader
        v-model="cascaderValue"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          wrapperStyle: {
            borderRadius: '8px',
            focusBorderColor: '#67c23a',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)',
          },
        }"
        theme="primary"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">大圆角 (16px)</div>
      <SunlightCascader
        v-model="cascaderValue"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          wrapperStyle: {
            borderRadius: '16px',
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)',
          },
        }"
        theme="success"
      />
    </div>
  </div>
</template>
