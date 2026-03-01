<script setup lang="ts">
import { ref } from "vue";
import { SunlightRadio } from "sunlight-ui";

const radioValue = ref("");
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">默认背景色</div>
      <SunlightRadio 
        v-model="radioValue" 
        :item="{
          options: options,
          isGroup: true
        }" 
      />
    </div>
    
    <div style="margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">浅色背景</div>
      <SunlightRadio 
        v-model="radioValue" 
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            backgroundColor: '#f5f7fa',
            borderColor: '#c0c4cc'
          }
        }" 
      />
    </div>
    
    <div style="margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">彩色背景</div>
      <SunlightRadio 
        v-model="radioValue" 
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            backgroundColor: '#ecf5ff',
            focusBorderColor: '#409eff',
            focusBoxShadowColor: 'rgba(64, 158, 255, 0.25)'
          }
        }" 
      />
    </div>
    
    <div style="margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">深色背景</div>
      <SunlightRadio 
        v-model="radioValue" 
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            backgroundColor: '#f0f9eb',
            focusBorderColor: '#67c23a',
            focusBoxShadowColor: 'rgba(103, 194, 58, 0.25)'
          }
        }" 
      />
    </div>
  </div>
</template>

<style scoped>
</style>
