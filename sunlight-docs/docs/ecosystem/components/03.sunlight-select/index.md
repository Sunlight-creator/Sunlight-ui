---
date: 2025-04-14 21:35:56
---
# SunlightSelect 选择器

SunlightSelect 是一个基于 Element Plus Select 组件增强的自定义选择器组件，提供了更丰富的配置选项和更好的用户体验。

## 功能特性

- ✅ 支持单选和多选
- ✅ 支持可查询功能
- ✅ 内置多种主题样式
- ✅ 支持自定义选项模板
- ✅ 支持自定义边框、圆角和聚焦效果
- ✅ 提供丰富的事件支持
- ✅ 支持自定义选项数据结构

## 基本用法

```vue
<template>
  <SunlightSelect
    v-model="selectValue"
    :item="{
      placeholder: '请选择内容...',
      clearable: true,
      options: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ],
    }"
  />
</template>

<script setup>
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";

const selectValue = ref("");
</script>
```
