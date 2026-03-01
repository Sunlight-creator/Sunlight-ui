<script setup lang="ts">
import { ref } from "vue";
import { SunlightTextarea } from "sunlight-ui";
import { ElMessage } from "element-plus";

const textareaValue = ref("");

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
      <SunlightTextarea
        v-model="textareaValue"
        :item="{
          placeholder: '输入与变化事件示例',
          rows: 4,
        }"
        @input="handleInput"
        @change="handleChange"
      />
    </div>
  </div>
</template>