<script setup lang="ts">
import { ref } from "vue";
import { SunlightInput } from "sunlight-ui";

const inputValue = ref("");
const themes = ['default', 'primary', 'success', 'warning', 'danger', 'rounded'];
</script>

<template>
  <div>
    <div v-for="theme in themes" :key="theme" style="margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">{{ theme }} 主题</div>
      <SunlightInput 
        v-model="inputValue" 
        :item="{
          placeholder: `请输入 ${theme} 主题内容...`,
          clearable: true
        }" 
        :theme="theme"
      />
    </div>
    <div style="margin-top: 20px;">
      <p>输入的值: {{ inputValue || '暂无输入' }}</p>
    </div>
  </div>
</template>