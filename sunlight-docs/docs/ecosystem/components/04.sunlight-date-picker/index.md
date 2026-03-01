---
date: 2025-04-04 20:52:24
---
# SunlightDatePicker 日期选择器

SunlightDatePicker 是一个基于 Element Plus DatePicker 组件增强的日期选择器组件，提供了更丰富的配置选项和更好的用户体验。

## 功能特性

- ✅ 支持多种日期类型（日期、日期时间、日期范围等）
- ✅ 支持自定义日期格式
- ✅ 内置多种主题样式
- ✅ 支持自定义边框、圆角和聚焦效果
- ✅ 提供丰富的事件支持

## 基本用法

```vue
<template>
  <SunlightDatePicker 
    v-model="dateValue" 
    :item="{
      type: 'date',
      placeholder: '请选择日期',
      valueFormat: 'YYYY-MM-DD',
      wrapperStyle: {
        borderColor: '#c0c4cc',
        focusBorderColor: '#409eff'
      }
    }" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { SunlightDatePicker } from 'sunlight-ui'

const dateValue = ref('')
</script>
```
