---
date: 2025-02-23 19:50:03
---
# SunlightTextarea 多行文本输入框

SunlightTextarea 是一个基于 Element Plus Input 组件增强的多行文本输入框组件，提供了更丰富的配置选项和更好的用户体验。

## 功能特性

- ✅ 支持双向数据绑定
- ✅ 内置多种主题样式
- ✅ 支持自定义边框、圆角和聚焦效果
- ✅ 支持前缀和后缀图标
- ✅ 支持字数限制和显示
- ✅ 提供丰富的事件支持

## 基本用法

```vue
<template>
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
        focusBorderColor: '#409eff'
      }
    }" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { SunlightTextarea } from 'sunlight-ui'

const textareaValue = ref('')
</script>
```
