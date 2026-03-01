<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";

// 自定义聚焦样式示例数据
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
      <div style="margin-bottom: 8px">默认聚焦样式</div>
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
      <div style="margin-bottom: 8px">绿色聚焦样式</div>
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            focusBorderColor: '#67c23a',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)'
          }
        }" 
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">蓝色聚焦样式</div>
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)'
          }
        }" 
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">红色聚焦样式</div>
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '请选择...',
          clearable: true,
          options: options,
          wrapperStyle: {
            focusBorderColor: '#f56c6c',
            focusBoxShadow: '0 0 0 3px rgba(245, 108, 108, 0.25)'
          }
        }" 
      />
    </div>
  </div>
</template>