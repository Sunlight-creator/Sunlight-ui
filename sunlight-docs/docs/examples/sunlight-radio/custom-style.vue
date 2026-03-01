<script setup lang="ts">
import { ref } from "vue";
import { SunlightRadio } from "sunlight-ui";

const radioValue = ref('option2');
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4' }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">自定义边框颜色</div>
      <SunlightRadio 
        v-model="radioValue" 
        :item="{
          options: options,
          wrapperStyle: {
            borderColor: '#909399',
            focusBorderColor: '#67c23a',
            focusBoxShadowColor: 'rgba(103, 194, 58, 0.1)'
          }
        }" 
      />
    </div>
    
    <div style="margin-top: 20px;">
      <p>选中值：{{ radioValue || '暂无选择' }}</p>
    </div>
  </div>
</template>