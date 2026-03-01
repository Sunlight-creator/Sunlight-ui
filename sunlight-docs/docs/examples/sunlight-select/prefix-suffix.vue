<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";

// 自定义前缀后缀示例数据
const selectValue = ref("");
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '自定义前缀后缀...',
          clearable: true,
          options: options,
          prefix: '选择:',
          suffix: '▼',
          wrapperStyle: {
            borderColor: '#409eff',
            focusBorderColor: '#66b1ff'
          }
        }" 
      />
    </div>
    <div style="margin-top: 20px;">
      <p>当前选择值：{{ selectValue || '暂无选择' }}</p>
    </div>
  </div>
</template>