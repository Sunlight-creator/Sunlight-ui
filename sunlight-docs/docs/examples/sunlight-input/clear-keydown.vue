<script setup lang="ts">
import { ref } from "vue";
import { SunlightInput } from "sunlight-ui";
import { ElMessage } from "element-plus";

const inputValue = ref("");

const handleClear = (e: Event) => {
  ElMessage({
    message: 'clear事件已触发',
    type: 'success',
  });
};

const handleKeydown = (e: KeyboardEvent) => {
  ElMessage({
    message: 'keydown事件已触发',
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
          clearable: true,
          prefixIcon: 'Search'
        }" 
        @clear="handleClear"
        @keydown="handleKeydown"
        theme="primary"
      />
    </div>
  </div>
</template>