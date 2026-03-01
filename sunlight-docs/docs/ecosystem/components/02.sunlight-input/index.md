---
date: 2025-06-27 23:28:38
---
# SunlightInput 增强型输入框

SunlightInput 是一个基于 Element Plus 输入框增强的组件，提供了更丰富的配置选项和更好的用户体验。

## 功能特性

- ✅ 支持多种输入类型
- ✅ 自定义前缀和后缀图标
- ✅ 支持清除按钮
- ✅ 支持自定义样式
- ✅ 支持焦点和输入事件
- ✅ 支持 TypeScript 类型定义

## 基本用法

```vue
<template>
  <SunlightInput 
    v-model="inputValue" 
    :item="{
      placeholder: '请输入内容...',
      clearable: true,
      prefixIcon: 'User',
      wrapperStyle: {
        borderColor: '#c0c4cc',
        focusBorderColor: '#409eff'
      }
    }" 
  />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
```