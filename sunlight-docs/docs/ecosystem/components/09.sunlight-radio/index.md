---
date: 2025-12-22 20:36:19
---
# SunlightRadio 单选框

SunlightRadio 是一个基于 Element Plus Radio 组件增强的单选框组件，提供了更丰富的配置选项和更好的用户体验。

## 功能特性

- ✅ 支持单选和分组模式
- ✅ 支持异步选项加载
- ✅ 内置多种主题样式
- ✅ 支持自定义边框、圆角和聚焦效果
- ✅ 提供丰富的事件支持
- ✅ 支持自定义选项数据结构

## 基本用法

```vue
<template>
  <SunlightRadio 
    v-model="radioValue" 
    :item="{
      options: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' }
      ],
      isGroup: true
    }" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { SunlightRadio } from 'sunlight-ui'

const radioValue = ref('')
</script>
```
