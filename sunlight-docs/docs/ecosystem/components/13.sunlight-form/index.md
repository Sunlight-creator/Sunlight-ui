---
title: SunlightForm
lang: zh-CN
date: 2025-06-06 18:01:02
---

# SunlightForm

SunlightForm 是基于 Element Plus 表单组件封装的高级表单组件，提供了更便捷的配置方式和丰富的功能扩展，包括多类型表单控件、动态列配置、表单验证、异步选项加载等功能。

## 特性

- **功能丰富**：支持多种表单控件类型，包括输入框、文本域、下拉选择、日期选择、图片上传等
- **配置简单**：通过简洁的配置数组实现复杂表单，减少模板代码
- **高度可定制**：支持自定义组件样式、事件处理和异步选项加载
- **表单验证**：集成 Element Plus 的表单验证机制
- **响应式设计**：支持响应式布局和动态列配置
- **类型安全**：提供完整的 TypeScript 类型定义
- **易于扩展**：支持自定义表单控件和插槽

## 快速开始

### 基本用法

```vue
<template>
  <SunlightForm v-model="formData" :columns="columns" :rules="rules">
    <template #operation>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleReset">重置</el-button>
    </template>
  </SunlightForm>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SunlightForm } from "@sunlight-ui/components";

// 表单数据
const formData = ref({
  name: "",
  email: "",
  age: null,
  department: "",
});

// 表单列配置
const columns = ref([
  {
    prop: "name",
    label: "姓名",
    type: "input",
    span: 12,
    placeholder: "请输入姓名",
  },
  {
    prop: "email",
    label: "邮箱",
    type: "input",
    span: 12,
    placeholder: "请输入邮箱",
  },
  {
    prop: "age",
    label: "年龄",
    type: "input",
    span: 12,
    inputType: "number",
    placeholder: "请输入年龄",
  },
  {
    prop: "department",
    label: "部门",
    type: "select",
    span: 12,
    placeholder: "请选择部门",
    options: [
      { label: "技术部", value: "tech" },
      { label: "市场部", value: "market" },
      { label: "销售部", value: "sales" },
      { label: "人事部", value: "hr" },
    ],
  },
]);

// 表单验证规则
const rules = ref({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
  department: [{ required: true, message: "请选择部门", trigger: "change" }],
});

// 提交表单
function handleSubmit() {
  // 表单验证和提交逻辑
}

// 重置表单
function handleReset() {
  // 重置表单逻辑
}
</script>
```

## 组件文档

- [基本用法](./10.basic.md)：介绍 SunlightForm 的基本配置和使用方法
- [高级功能](./50.form-advance.md)：介绍 SunlightForm 的高级特性和配置

## API 参考

### Props

| 属性        | 类型   | 默认值 | 说明           |
| ----------- | ------ | ------ | -------------- |
| modelValue  | Object | {}     | 表单数据对象   |
| formOptions | Object | {}     | 表单配置选项   |
| columns     | Array  | -      | 表单列配置数组 |
| rules       | Object | {}     | 表单验证规则   |

### FormOptions

| 属性        | 类型    | 默认值    | 说明           |
| ----------- | ------- | --------- | -------------- |
| labelWidth  | string  | '100px'   | 标签宽度       |
| size        | string  | 'default' | 表单尺寸       |
| inline      | boolean | false     | 是否为行内表单 |
| disabled    | boolean | false     | 是否禁用表单   |
| labelSuffix | string  | ':'       | 标签后缀       |

### FormColumn

| 属性        | 类型    | 默认值 | 说明                             |
| ----------- | ------- | ------ | -------------------------------- |
| prop        | string  | -      | 字段名，对应表单数据的属性       |
| label       | string  | -      | 标签名                           |
| type        | string  | -      | 表单控件类型                     |
| span        | number  | 24     | 所占列数                         |
| offset      | number  | 0      | 偏移列数                         |
| placeholder | string  | -      | 占位符                           |
| disabled    | boolean | false  | 是否禁用                         |
| clearable   | boolean | true   | 是否可清空                       |
| multiple    | boolean | false  | 是否支持多选（针对select等控件） |
| filterable  | boolean | false  | 是否支持过滤（针对select等控件） |
| options     | Array   | []     | 选项列表或异步加载函数           |

## 支持的表单控件类型

| 类型            | 说明           |
| --------------- | -------------- |
| input           | 输入框         |
| textarea        | 文本域         |
| select          | 下拉选择器     |
| cascader        | 级联选择器     |
| radio           | 单选框         |
| checkbox        | 多选框         |
| date-picker     | 日期选择器     |
| datetime-picker | 日期时间选择器 |
| images          | 图片上传       |

## 浏览器兼容性

- Chrome ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- Edge ≥ 90

## 相关链接

- [Element Plus Form 文档](https://element-plus.org/zh-CN/component/form.html)
- [Vue 3 官方文档](https://vuejs.org/guide/introduction.html)
