<script setup lang="ts">
import { ref } from "vue";
import { SunlightInput } from "sunlight-ui";
import { ElMessage } from "element-plus";

const inputValue = ref("");

const handleInput = (val: string) => {
  ElMessage({
    message: 'input事件已触发',
    type: 'success',
  });
};

const handleChange = (val: string) => {
  ElMessage({
    message: 'change事件已触发',
    type: 'success',
  });
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SunlightInput 
        v-model="inputValue" 
        :item="{
          placeholder: '请输入内容...',
          clearable: true
        }" 
        @input="handleInput"
        @change="handleChange"
        theme="primary"
      />
    </div>
  </div>
</template>