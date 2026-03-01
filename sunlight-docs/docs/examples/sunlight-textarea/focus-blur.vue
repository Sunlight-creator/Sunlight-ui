<script setup lang="ts">
import { ref } from "vue";
import { SunlightTextarea } from "sunlight-ui";
import { ElMessage } from "element-plus";

const textareaValue = ref("");

const handleFocus = (e: Event) => {
  ElMessage({
    message: 'focus事件已触发',
    type: 'success',
  });
};

const handleBlur = (e: Event) => {
  ElMessage({
    message: 'blur事件已触发',
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
          placeholder: '焦点与失焦事件示例',
          rows: 4,
        }"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>