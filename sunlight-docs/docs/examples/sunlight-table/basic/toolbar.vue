<template>
  <SunlightTable
    :data="tableData"
    :columns="columns"
    :toolbar-config="toolbarConfig"
    :export-config="exportConfig"
    @export="handleExport"
    @density-change="handleDensityChange"
    @refresh="handleRefresh"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightTable } from 'sunlight-ui';
import { ElMessage } from 'element-plus';

// 表格数据
const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, address: '深圳市南山区' },
  { id: 5, name: '孙七', age: 22, address: '杭州市西湖区' },
]);

// 列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80, align: 'center' },
  { prop: 'address', label: '地址' },
];

// 工具栏配置
const toolbarConfig = {
  showDensity: true,
  showExport: true,
  showColumnConfig: true,
  showRefresh: true,
  customButtons: [
    {
      key: 'add',
      label: '新增',
      type: 'primary',
      icon: 'Plus',
      position: 'left',
    },
    {
      key: 'delete',
      label: '删除',
      type: 'danger',
      icon: 'Delete',
      position: 'left',
    },
  ],
};

// 导出配置
const exportConfig = {
  enableColumnSelection: true,
  defaultExportColumns: ['id', 'name', 'age'],
};

// 导出处理
function handleExport(columns?: string[]) {
  ElMessage({
    message: `导出列: ${columns?.join(', ') || '所有列'}`,
    type: 'success',
  });
}

// 密度变化处理
function handleDensityChange(density: string) {
  ElMessage({
    message: `密度变化: ${density}`,
    type: 'success',
  });
}

// 刷新处理
function handleRefresh() {
  ElMessage({
    message: '刷新表格',
    type: 'success',
  });
}
</script>
