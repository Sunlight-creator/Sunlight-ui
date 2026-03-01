---
date: 2026-01-29 22:51:00
---
# SunlightCascader 级联选择器

SunlightCascader 是一个基于 Element Plus Cascader 组件增强的级联选择器组件，提供了更丰富的配置选项和更好的用户体验。

## 功能特性

- ✅ 支持单选和多选
- ✅ 支持可查询功能
- ✅ 内置多种主题样式
- ✅ 支持自定义边框、圆角和聚焦效果
- ✅ 提供丰富的事件支持
- ✅ 支持自定义选项数据结构

## 基本用法

```vue
<template>
  <SunlightCascader 
    v-model="cascaderValue" 
    :item="{
      placeholder: '请选择内容...',
      clearable: true,
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            { value: 'shejiyuanze', label: '设计原则' },
            { value: 'daohang', label: '导航' }
          ]
        }
      ]
    }" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { SunlightCascader } from 'sunlight-ui'

const cascaderValue = ref('')
</script>
```
