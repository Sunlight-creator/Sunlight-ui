<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";

const dateValue = ref("");
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认圆角 (4px)</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
          wrapperStyle: {
            borderRadius: '4px',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">中等圆角 (8px)</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
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
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
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
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
          wrapperStyle: {
            borderRadius: '50px',
            borderColor: '#f56c6c',
          },
        }"
      />
    </div>
    
    <div style="margin-top: 20px;">
      <p>选中日期：{{ dateValue || '暂无选择' }}</p>
    </div>
  </div>
</template>