<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";

// 自定义圆角示例数据
const selectValue = ref("");
const options = [
  { label: "选项一", value: "option1" },
  { label: "选项二", value: "option2" },
  { label: "选项三", value: "option3" },
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认圆角 (4px)</div>
      <SunlightSelect
        v-model="selectValue"
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            borderRadius: '4px',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">中等圆角 (8px)</div>
      <SunlightSelect
        v-model="selectValue"
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            borderRadius: '8px',
            focusBorderColor: '#67c23a',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">大圆角 (16px)</div>
      <SunlightSelect
        v-model="selectValue"
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            borderRadius: '16px',
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">圆形 (50px)</div>
      <SunlightSelect
        v-model="selectValue"
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            borderRadius: '50px',
            borderColor: '#f56c6c',
          },
        }"
      />
    </div>
  </div>
</template>
