<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";

const dateValue = ref("");
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认背景色</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">浅色背景</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
          wrapperStyle: {
            backgroundColor: '#f5f7fa',
            borderColor: '#c0c4cc',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">彩色背景</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
          wrapperStyle: {
            backgroundColor: '#ecf5ff',
            borderColor: '#409eff',
            focusBorderColor: '#66b1ff',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">深色背景</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
          wrapperStyle: {
            backgroundColor: '#f0f9eb',
            borderColor: '#67c23a',
            focusBorderColor: '#85ce61',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">自定义背景色</div>
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '请选择日期...',
          wrapperStyle: {
            borderColor: '#e6a23c',
            backgroundColor: '#fdf6ec',
            focusBorderColor: '#e6a23c',
            focusBoxShadow: '0 0 0 3px rgba(230, 162, 60, 0.25)',
          },
        }"
      />
    </div>
    
    <div style="margin-top: 20px;">
      <p>选中日期：{{ dateValue || '暂无选择' }}</p>
    </div>
  </div>
</template>