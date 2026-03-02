# Sunlight-ui

一个基于 Element Plus 构建的 Vue 3 组件库，专注于提供高质量、易用的 UI 组件。

## 📦 安装

### 使用 npm
```bash
npm install sunlight-ui
```

### 使用 yarn
```bash
yarn add sunlight-ui
```

### 使用 pnpm
```bash
pnpm add sunlight-ui
```

## 🚀 快速开始

### 全局引入

在 main.ts 中引入：

```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SunlightUI from 'sunlight-ui'
import 'sunlight-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(SunlightUI)
app.mount('#app')
```

### 按需引入

```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { SunlightTable, SunlightInput } from 'sunlight-ui'
import 'sunlight-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.component('SunlightTable', SunlightTable)
app.component('SunlightInput', SunlightInput)
app.mount('#app')
```

## 📚 组件列表

### 基础组件

| 组件名称 | 描述 |
|---------|------|
| SunlightInput | 增强型输入框 |
| SunlightTextarea | 增强型文本域 |
| SunlightSelect | 增强型选择器 |
| SunlightCascader | 级联选择器 |
| SunlightRadio | 单选框 |
| SunlightCheckbox | 复选框 |
| SunlightDatePicker | 日期选择器 |
| SunlightImage | 图片组件 |
| SunlightImages | 多图片上传组件 |

### 高级组件

| 组件名称 | 描述 |
|---------|------|
| **SunlightTable** | 功能丰富的数据表格 |
| SunlightForm | 表单组件 |
| SunlightThree | 相关组件 |

## 🎯 核心组件 - SunlightTable

### 功能特性

- ✅ 支持多种搜索字段类型
- ✅ 支持异步选项加载
- ✅ 支持搜索条件的显示/隐藏配置
- ✅ 支持搜索表单的收起/展开
- ✅ 支持列配置（显示/隐藏列）
- ✅ 支持密度切换（紧凑、默认、宽松）
- ✅ 支持自定义主题样式
- ✅ 支持行选择
- ✅ 支持远程数据加载
- ✅ 支持本地数据过滤
- ✅ 支持分页
- ✅ 支持排序

### 使用示例

```vue
<template>
  <SunlightTable
    :data="tableData"
    :columns="columns"
    :toolbar-config="toolbarConfig"
    :search-columns="searchColumns"
    v-model:search-param="searchParam"
    v-model:visible-search-columns="visibleSearchColumns"
    :search-theme-style="searchThemeStyle"
    @search="handleSearch"
    @reset="handleReset"
  >
    <template #status="{ row }">
      <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
        {{ row.status === 'active' ? '已激活' : '未激活' }}
      </el-tag>
    </template>
  </SunlightTable>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { SunlightTable } from 'sunlight-ui'

// 表格数据
const tableData = ref([
  // 数据项
])

// 列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'status', label: '状态', width: 100, slotName: 'status' },
  // 更多列...
]

// 工具栏配置
const toolbarConfig = reactive({
  showDensity: true,
  showColumnConfig: true,
  showRefresh: true,
  showSearchConfig: true
})

// 搜索配置
const searchColumns = [
  { prop: 'name', label: '姓名', type: 'input', placeholder: '请输入姓名' },
  { prop: 'status', label: '状态', type: 'select', options: [{ label: '已激活', value: 'active' }, { label: '未激活', value: 'inactive' }] },
  // 更多搜索字段...
]

// 搜索参数
const searchParam = reactive({})

// 可见搜索字段
const visibleSearchColumns = ref(['name', 'status'])

// 搜索主题样式
const searchThemeStyle = computed(() => ({
  borderColor: '#e4e7ed',
  focusBorderColor: '#409eff',
  focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.15)'
}))

// 搜索事件
const handleSearch = (searchData) => {
  console.log('搜索参数:', searchData)
  // 处理搜索逻辑
}

// 重置事件
const handleReset = () => {
  console.log('重置搜索条件')
  // 处理重置逻辑
}
</script>
```

## 🎨 主题配置

Sunlight-ui 支持主题定制，可以通过 CSS 变量或组件属性进行配置。

### CSS 变量

```css
:root {
  --el-color-primary: #409eff;
  --el-color-primary-light-1: #53a8ff;
  --el-color-primary-light-2: #66b1ff;
  /* 更多主题变量... */
}
```

### 组件属性配置

#### wrapperStyle 自定义样式

`wrapperStyle` 是一个用于自定义组件样式的配置项，支持多种组件，如输入框、选择器、日期选择器等。

**支持的属性：**
- `borderColor`：默认边框颜色
- `focusBorderColor`：聚焦时边框颜色
- `focusBoxShadow`：聚焦时阴影效果
- `backgroundColor`：背景颜色
- `boxShadow`：阴影效果

**使用示例：**

```typescript
const searchThemeStyle = {
  borderColor: '#e4e7ed',
  focusBorderColor: '#409eff',
  focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.15)'
}

// 在组件中使用
const inputConfig = {
  wrapperStyle: {
    borderColor: '#c0c4cc',
    borderRadius: '4px',
    focusBorderColor: '#409eff',
    focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)'
  }
}
```

## 📖 API 文档

### SunlightTable Props

| 属性名 | 类型 | 默认值 | 描述 |
|-------|------|--------|------|
| data | `Array` | `[]` | 表格数据 |
| columns | `Array` | `[]` | 列配置 |
| toolbar-config | `Object` | `{}` | 工具栏配置 |
| search-columns | `Array` | `[]` | 搜索字段配置 |
| search-param | `Object` | `{}` | 搜索参数 |
| visible-search-columns | `Array` | `[]` | 可见搜索字段 |
| search-theme-style | `Object` | `{}` | 搜索主题样式 |
| search-collapsed | `Boolean` | `false` | 搜索表单是否收起 |
| show-pagination | `Boolean` | `false` | 是否显示分页 |
| current-page | `Number` | `1` | 当前页码 |
| page-size | `Number` | `10` | 每页条数 |
| total | `Number` | `0` | 总条数 |

### SunlightTable Events

| 事件名 | 描述 | 参数 |
|-------|------|------|
| search | 搜索事件 | `searchParam` |
| reset | 重置事件 | - |
| refresh | 刷新事件 | - |
| update:current-page | 页码变化事件 | `currentPage` |
| update:page-size | 每页条数变化事件 | `pageSize` |

## 🔧 开发

### 克隆仓库

```bash
git clone https://github.com/Sunlight-creator/Sunlight-ui
cd Sunlight-ui
```

### 安装依赖

```bash
pnpm install
```

### 构建组件库

```bash
cd packages/Sunlight-ui
pnpm run build
```

### 运行示例

```bash
cd sunlight-admin
pnpm run dev
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📊 版本历史

### 1.0.9
- 修复 TableToolbar 组件 columns 未定义时的错误
- 增强组件鲁棒性

### 1.0.0
- 初始发布
- 包含核心组件：SunlightTable、SunlightInput、SunlightSelect 等

**Sunlight-ui** - 让 UI 开发更简单、更高效！