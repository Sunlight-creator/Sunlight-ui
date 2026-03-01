<script setup lang="ts">
import { ref } from "vue";
import { SunlightTextarea } from "sunlight-ui";
import { ElMessage } from "element-plus";

const textareaValue = ref("");

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
      <SunlightTextarea
        v-model="textareaValue"
        :item="{
          placeholder: '清除与键盘事件示例',
          rows: 4,
          clearable: true,
        }"
        @clear="handleClear"
        @keydown="handleKeydown"
      />
    </div>
  </div>
</template>