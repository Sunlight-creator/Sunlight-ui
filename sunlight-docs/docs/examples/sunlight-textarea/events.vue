<script setup lang="ts">
import { ref } from "vue";
import { SunlightTextarea } from "sunlight-ui";
import { ElMessage } from "element-plus";

const textareaValue = ref("");

const handleInput = (val: string) => {
  ElMessage({
    message: "input事件已触发",
    type: "success",
  });
};

const handleChange = (val: string) => {
  ElMessage({
    message: "change事件已触发",
    type: "success",
  });
};

const handleFocus = (e: Event) => {
  ElMessage({
    message: "focus事件已触发",
    type: "success",
  });
};

const handleBlur = (e: Event) => {
  ElMessage({
    message: "blur事件已触发",
    type: "success",
  });
};

const handleClear = (e: Event) => {
  ElMessage({
    message: "clear事件已触发",
    type: "success",
  });
};

const handleKeydown = (e: KeyboardEvent) => {
  ElMessage({
    message: "keydown事件已触发",
    type: "success",
  });
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <SunlightTextarea
        v-model="textareaValue"
        :item="{
          placeholder: '基础事件处理示例',
          rows: 4,
          clearable: true,
        }"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="handleClear"
        @keydown="handleKeydown"
      />
    </div>
  </div>
</template>
