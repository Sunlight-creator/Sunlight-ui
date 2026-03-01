---
date: 2025-10-19 21:32:58
---
# SunlightImage 单张图片上传

SunlightImage 是一个基于 Element Plus 上传组件封装的图片上传组件，提供了更简洁的使用方式和丰富的配置选项。

## 功能特性

- ✅ 支持拖拽上传
- ✅ 支持图片预览
- ✅ 支持图片编辑和删除
- ✅ 支持自定义样式
- ✅ 支持文件大小和类型限制
- ✅ 支持错误处理
- ✅ 支持 TypeScript 类型定义

## 基本用法

```html
<SunlightImage
  v-model:imageUrl="imageUrl"
  :api="uploadApi"
  :drag="true"
  :disabled="false"
  :fileSize="5"
  :fileType="['image/jpeg', 'image/png', 'image/gif']"
  :height="'150px'"
  :width="'150px'"
  :borderRadius="'8px'"
  :wrapperStyle="{
    borderColor: '#dcdfe6',
    focusBorderColor: '#409eff',
    backgroundColor: '#f5f7fa',
  }"
  @upload-success="handleUploadSuccess"
  @upload-error="handleUploadError"
/>
```

## 属性说明

```markdown
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| imageUrl | string | '' | 图片地址，支持 v-model 双向绑定 |
| api | (params: any) => Promise<any> | - | 上传图片的 API 方法，必须传入 |
| drag | boolean | true | 是否支持拖拽上传 |
| disabled | boolean | false | 是否禁用上传组件 |
| fileSize | number | 5 | 图片大小限制（单位：M） |
| fileType | string[] | ['image/jpeg', 'image/png', 'image/gif'] | 图片类型限制 |
| height | string | '150px' | 组件高度 |
| width | string | '150px' | 组件宽度 |
| borderRadius | string | '8px' | 组件边框圆角 |
| wrapperStyle | object | {} | 组件样式配置 |
```

## 事件说明

```markdown
| 事件名 | 回调参数 | 说明 |
| --- | --- | --- |
| update:imageUrl | value: string | 图片地址更新事件 |
| upload-success | response: any, file: any | 图片上传成功事件 |
| upload-error | error: any, file: any | 图片上传失败事件 |
```

## 方法说明

```markdown
| 方法名 | 说明 |
| --- | --- |
| editImg | 编辑图片 |
| deleteImg | 删除图片 |
| handleHttpUpload | 处理 HTTP 上传 |
| beforeUpload | 上传前检查 |
| uploadSuccess | 上传成功处理 |
| uploadError | 上传失败处理 |
```