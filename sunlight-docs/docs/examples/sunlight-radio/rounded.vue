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
      <div style="margin-bottom: 8px;">默认圆角 (4px)</div>
      <SunlightRadio 
        v-model="radioValue" 
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            borderRadius: '4px'
          }
        }" 
      />
    </div>
    
    <div style="margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">中等圆角 (8px)</div>
      <SunlightRadio 
        v-model="radioValue" 
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            borderRadius: '8px',
            focusBorderColor: '#409eff'
          }
        }" 
      />
    </div>
    
    <div style="margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">大圆角 (16px)</div>
      <SunlightRadio 
        v-model="radioValue" 
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            borderRadius: '16px',
            focusBorderColor: '#67c23a'
          }
        }" 
      />
    </div>
  </div>
</template>

<style scoped>
</style>
