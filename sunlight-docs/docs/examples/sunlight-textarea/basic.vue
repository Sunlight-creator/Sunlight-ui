<script setup lang="ts">
import { ref } from "vue";
import { SunlightTextarea } from "sunlight-ui";

// SunlightTextarea 示例数据
const textareaValue = ref("");
const handleTextareaChange = (val: string) => {
  console.log("输入值变化:", val);
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <SunlightTextarea
        v-model="textareaValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          showWordLimit: true,
          maxlength: 200,
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)',
          },
        }"
        @input="handleTextareaChange"
      />
    </div>
    <div>
      <p>输入的值: {{ textareaValue || "暂无输入" }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
