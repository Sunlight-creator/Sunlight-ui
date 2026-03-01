<script setup lang="ts">
import { ref } from "vue";
import { SunlightInput } from "sunlight-ui";

// SunlightInput 示例数据
const inputValue = ref("");
const handleInputChange = (val: string) => {
  console.log("输入值变化:", val);
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
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)',
          },
        }"
        @input="handleInputChange"
      />
    </div>
    <div>
      <p>输入的值: {{ inputValue || "暂无输入" }}</p>
    </div>
  </div>
</template>
