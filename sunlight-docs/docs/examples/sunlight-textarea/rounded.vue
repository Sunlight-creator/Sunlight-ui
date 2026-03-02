<script setup lang="ts">
import { ref } from "vue";
import { SunlightTextarea } from "sunlight-ui";

const inputValue = ref("");
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认圆角 (4px)</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          wrapperStyle: {
            borderRadius: '4px',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">中等圆角 (8px)</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
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
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
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
