<script setup lang="ts">
import { ref } from "vue";
import { SunlightCheckbox } from "sunlight-ui";

// 分组模式示例数据
const checkboxValue = ref(['option1', 'option3']);
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4' },
  { label: '选项五', value: 'option5' }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <p style="margin-bottom: 10px; font-weight: bold;">分组模式（isGroup: true）</p>
      <SunlightCheckbox 
        v-model="checkboxValue" 
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
      <p>当前选择值：{{ checkboxValue.length > 0 ? checkboxValue : '暂无选择' }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
