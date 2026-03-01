---
date: 2025-09-08 22:54:14
---
# SunlightThree 树形选择器

SunlightThree 是一个基于 Element Plus Tree 组件增强的树形选择器组件，提供了更丰富的配置选项和更好的用户体验。

## 功能特性

- ✅ 支持单选和多选模式
- ✅ 支持关键字过滤
- ✅ 支持展开/折叠全部节点
- ✅ 支持异步加载
- ✅ 支持自定义节点内容
- ✅ 支持自定义样式

## 基本用法

```vue
<template>
  <SunlightThree 
    :data="treeData"
    title="树形选择器"
    :defaultValue="selectedValue"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { SunlightThree } from 'sunlight-ui'

const treeData = ref([
  {
    id: '1',
    label: '一级 1',
    children: [
      { id: '1-1', label: '二级 1-1' },
      { id: '1-2', label: '二级 1-2' }
    ]
  }
])

const selectedValue = ref('1-1')

const handleChange = (value) => {
  console.log('选中值:', value)
}
</script>
```
