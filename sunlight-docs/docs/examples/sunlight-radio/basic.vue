<script setup lang="ts">
import { ref } from "vue";
import { SunlightRadio } from "sunlight-ui";

// 基础用法示例数据
const radioValue = ref("");
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4', disabled: true },
  { label: '选项五', value: 'option5' }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SunlightRadio 
        v-model="radioValue" 
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            focusBorderColor: '#409eff'
          }
        }" 
      />
    </div>
    <div style="margin-top: 20px;">
      <p>当前选择值：{{ radioValue || '暂无选择' }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
