<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";

const dateValue = ref("");
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认聚焦样式</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">绿色聚焦样式</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
          wrapperStyle: {
            focusBorderColor: '#67c23a',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">蓝色聚焦样式</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
          wrapperStyle: {
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">红色聚焦样式</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
          wrapperStyle: {
            focusBorderColor: '#f56c6c',
            focusBoxShadow: '0 0 0 3px rgba(245, 108, 108, 0.25)',
          },
        }"
      />
    </div>
    
    <div style="margin-top: 20px;">
      <p>选中日期：{{ dateValue || '暂无选择' }}</p>
    </div>
  </div>
</template>