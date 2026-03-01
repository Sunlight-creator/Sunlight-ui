---
date: 2025-02-18 22:22:18
---
# SunlightImages 多张图片上传

SunlightImages 是一个基于 Element Plus 上传组件封装的多张图片上传组件，提供了更简洁的使用方式和丰富的配置选项。

## 功能特性

- ✅ 支持多张图片上传
- ✅ 支持拖拽上传
- ✅ 支持图片预览
- ✅ 支持图片删除
- ✅ 支持自定义样式
- ✅ 支持文件大小和类型限制
- ✅ 支持错误处理
- ✅ 支持 TypeScript 类型定义
- ✅ 支持上传数量限制

## 基本用法

```html
<SunlightImages
  v-model:fileList="fileList"
  :api="uploadApi"
  :limit="5"
  :multiple="true"
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
  @remove="handleRemove"
/>
```

## 属性说明

```markdown
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fileList | array | [] | 文件列表，支持 v-model 双向绑定 |
| api | (formData: FormData) => Promise<{ fileUrl: string }> | - | 上传图片的 API 方法，必须传入 |
| drag | boolean | true | 是否支持拖拽上传 |
| disabled | boolean | false | 是否禁用上传组件 |
| limit | number | 5 | 最大上传数量 |
| multiple | boolean | true | 是否支持多选上传 |
| fileSize | number | 5 | 图片大小限制（单位：M） |
| fileType | array | ['image/jpeg', 'image/png', 'image/gif'] | 图片类型限制 |
| height | string | '150px' | 组件高度 |
| width | string | '150px' | 组件宽度 |
| borderRadius | string | '8px' | 组件边框圆角 |
| wrapperStyle | object | {} | 组件样式配置 |
```

## 事件说明

```markdown
| 事件名 | 回调参数 | 说明 |
| --- | --- | --- |
| update:fileList | value: array | 文件列表更新事件 |
| upload-success | response: any, file: any | 图片上传成功事件 |
| upload-error | error: any, file: any | 图片上传失败事件 |
| remove | file: any | 图片删除事件 |
```

## 方法说明

```markdown
| 方法名 | 说明 |
| --- | --- |
| beforeUpload | 上传前检查 |
| handleHttpUpload | 处理 HTTP 上传 |
| uploadSuccess | 上传成功处理 |
| handleRemove | 删除图片 |
| uploadError | 上传失败处理 |
| handleExceed | 超出上传数量限制处理 |
| handlePictureCardPreview | 图片预览 |
```

## 插槽说明

```markdown
| 插槽名 | 说明 |
| --- | --- |
| empty | 空状态内容 |
| tip | 提示信息 |
```