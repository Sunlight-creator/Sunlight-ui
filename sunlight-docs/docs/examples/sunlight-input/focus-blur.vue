<script setup lang="ts">
import { ref } from "vue";
import { SunlightInput } from "sunlight-ui";
import { ElMessage } from "element-plus";

const inputValue = ref("");

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
    <div style="margin-bottom: 20px">
      <SunlightInput
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          prefixIcon: 'User',
        }"
        @focus="handleFocus"
        @blur="handleBlur"
        theme="primary"
      />
    </div>
  </div>
</template>
