---
title: SunlightTable
lang: zh-CN
date: 2026-01-29 20:45:39
---

# SunlightTable

SunlightTable 是基于 Element Plus 表格组件封装的高级表格组件，提供了更便捷的配置方式和丰富的功能扩展，包括分页、选择、搜索、工具栏、导出等功能。

## 特性

- **功能丰富**：集成了分页、选择、搜索、工具栏、导出等常用功能
- **配置简单**：通过简洁的配置对象实现复杂功能，减少模板代码
- **高度可定制**：支持自定义渲染、自定义按钮、自定义样式等
- **响应式设计**：自动适应容器高度，支持窗口大小变化
- **类型安全**：提供完整的 TypeScript 类型定义
- **性能优化**：支持虚拟滚动（通过 Element Plus 原生支持）

## 快速开始

### 基本用法

```vue
<template>
  <SunlightTable
    :data="tableData"
    :columns="columns"
    :show-pagination="true"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    @pagination="handlePagination"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightTable } from '@sunlight-ui/components';

// 表格数据
const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' },
]);

// 列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' },
];

// 分页配置
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);

// 分页处理
function handlePagination(data: { page: number; limit: number }) {
  console.log('分页变化:', data);
  currentPage.value = data.page;
  pageSize.value = data.limit;
  // 这里可以调用 API 获取数据
}
</script>
```

## 组件文档

- [基本用法](./10.basic.md)：介绍 SunlightTable 的基本配置和使用方法
- [高级功能](./50.table-advance.md)：介绍 SunlightTable 的高级特性和配置

## API 参考

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | `RowData[]` | - | 表格数据 |
| columns | `TableItem[]` | - | 列配置 |
| showPagination | `boolean` | `false` | 是否显示分页 |
| currentPage | `number` | `1` | 当前页码 |
| pageSize | `number` | `10` | 每页条数 |
| total | `number` | - | 总条数 |
| showSelection | `boolean` | `false` | 是否显示多选框 |
| selectedRowKeys | `(string | number)[]` | - | 选中行的 key 数组 |
| hideColumns | `(string | number)[]` | `[]` | 隐藏的列 key 数组 |
| tableProps | `Partial<ElTableProps>` | - | Element Plus 表格属性 |
| tableListeners | `Record<string, (...args: any[]) => void>` | - | 表格事件监听器 |
| showToolbar | `boolean` | `true` | 是否显示工具栏 |
| toolbarConfig | `ToolbarConfig` | - | 工具栏配置 |
| exportConfig | `ExportColumnConfig` | - | 导出配置 |
| searchColumns | `SearchColumn[]` | - | 搜索表单列配置 |
| searchParam | `Record<string, any>` | `{}` | 搜索参数 |
| visibleSearchColumns | `string[]` | - | 可见的搜索列 |
| searchCollapsed | `boolean` | `false` | 搜索表单是否收起 |

### Events

| 事件 | 参数 | 说明 |
|------|------|------|
| update:currentPage | `page: number` | 当前页码变化 |
| update:pageSize | `size: number` | 每页条数变化 |
| update:hideColumns | `hideColumns: (string | number)[]` | 隐藏列变化 |
| selection-change | `selection: any[]` | 选中行变化 |
| row-click | `row: any, column: any, event: Event` | 行点击 |
| pagination | `data: { page: number; limit: number }` | 分页变化 |
| export | `columns?: string[]` | 导出 |
| density-change | `density: string` | 密度变化 |
| custom-button-click | `key: string` | 自定义按钮点击 |
| search | `searchParam: Record<string, any>` | 搜索 |

### Methods

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| clearSelection | - | - | 清空选择 |
| toggleRowSelection | `row: any, selected?: boolean` | - | 切换行选择状态 |
| toggleAllSelection | - | - | 切换全选状态 |
| setCurrentRow | `row: any` | - | 设置当前行 |
| clearSort | - | - | 清空排序 |
| clearFilter | `columnKey?: string` | - | 清空过滤 |
| doLayout | - | - | 重新布局 |
| sort | `prop: string, order: string` | - | 排序 |

## 类型定义

### TableItem

```typescript
interface TableItem {
  prop: string;              // 列的唯一标识
  label: string;             // 列显示的标题
  width?: number | string;   // 列宽度
  minWidth?: number | string; // 最小列宽
  fixed?: boolean | 'left' | 'right'; // 是否固定列
  align?: 'left' | 'center' | 'right'; // 列对齐方式
  headerAlign?: 'left' | 'center' | 'right'; // 表头对齐方式
  sortable?: boolean | 'custom'; // 是否可排序
  sortMethod?: (a: RowData, b: RowData) => number; // 自定义排序方法
  filterable?: boolean; // 是否可过滤
  filters?: Array<{ text: string; value: any }>; // 过滤条件数组
  filterMethod?: (value: any, row: RowData) => boolean; // 过滤方法
  slotName?: string; // 自定义渲染插槽名称
  hide?: boolean; // 是否隐藏该列
  permission?: Permission; // 权限控制字段
  children?: TableItem[]; // 子列，用于复杂表头合并
  editable?: boolean; // 是否可编辑
  editType?: 'input' | 'input-number' | 'select' | 'date-picker' | 'textarea'; // 编辑组件类型
  editProps?: Record<string, any>; // 编辑组件的属性配置
  editOptions?: Array<{ label: string; value: any; disabled?: boolean }>; // 选择器选项
}
```

### ToolbarConfig

```typescript
interface ToolbarConfig {
  showDensity?: boolean; // 是否显示密度切换按钮
  showExport?: boolean; // 是否显示导出按钮
  showColumnConfig?: boolean; // 是否显示列配置按钮
  showRefresh?: boolean; // 是否显示刷新按钮
  showSearchConfig?: boolean; // 是否显示查询条件配置按钮
  customButtons?: Array<{
    key: string; // 按钮的唯一标识
    label?: string; // 按钮显示的文本
    icon?: string; // 按钮图标
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'; // 按钮类型
    size?: 'large' | 'default' | 'small'; // 按钮大小
    disabled?: boolean; // 是否禁用
    show?: boolean; // 是否显示
    position?: 'left' | 'right'; // 按钮位置
  }>;
}
```

## 浏览器兼容性

- Chrome ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- Edge ≥ 90

## 相关链接

- [Element Plus Table 文档](https://element-plus.org/zh-CN/component/table.html)
- [Vue 3 官方文档](https://vuejs.org/guide/introduction.html)
