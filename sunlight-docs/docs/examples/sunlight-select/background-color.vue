<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";

// 自定义背景色示例数据
const selectValue = ref("");
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认背景色</div>
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options
        }" 
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">浅色背景</div>
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            backgroundColor: '#f5f7fa',
            borderColor: '#c0c4cc'
          }
        }" 
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">彩色背景</div>
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            backgroundColor: '#ecf5ff',
            borderColor: '#409eff',
            focusBorderColor: '#66b1ff'
          }
        }" 
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">深色背景</div>
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            backgroundColor: '#f0f9eb',
            borderColor: '#67c23a',
            focusBorderColor: '#85ce61'
          }
        }" 
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">自定义背景色</div>
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            borderColor: '#e6a23c',
            backgroundColor: '#fdf6ec',
            focusBorderColor: '#e6a23c',
            focusBoxShadow: '0 0 0 3px rgba(230, 162, 60, 0.25)'
          }
        }" 
      />
    </div>
  </div>
</template>