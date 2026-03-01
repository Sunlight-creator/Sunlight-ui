<template>
  <div>
    <SunlightTable
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      :show-pagination="true"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      :show-selection="true"
      v-model:selected-row-keys="selectedRowKeys"
      :search-columns="searchColumns"
      v-model:search-param="searchParam"
      :toolbar-config="toolbarConfig"
      :export-config="exportConfig"
      v-model:hide-columns="hideColumns"
      @pagination="handlePagination"
      @selection-change="handleSelectionChange"
      @search="handleSearch"
      @export="handleExport"
      @density-change="handleDensityChange"
      @custom-button-click="handleCustomButtonClick"
      @row-click="handleRowClick"
      @update:hide-columns="handleHideColumnsChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SunlightTable } from 'sunlight-ui';
import { ElMessage } from 'element-plus';

// 表格引用
const tableRef = ref<any>(null);

// 原始数据
const originalData = ref([
  {
    id: 1,
    name: '张三',
    age: 25,
    gender: 'male',
    status: 'active',
    department: 'tech',
    hireDate: '2023-01-01',
  },
  {
    id: 2,
    name: '李四',
    age: 30,
    gender: 'female',
    status: 'inactive',
    department: 'product',
    hireDate: '2023-02-01',
  },
  {
    id: 3,
    name: '王五',
    age: 28,
    gender: 'male',
    status: 'active',
    department: 'design',
    hireDate: '2023-03-01',
  },
  {
    id: 4,
    name: '赵六',
    age: 35,
    gender: 'male',
    status: 'active',
    department: 'tech',
    hireDate: '2023-04-01',
  },
  {
    id: 5,
    name: '孙七',
    age: 22,
    gender: 'female',
    status: 'inactive',
    department: 'product',
    hireDate: '2023-05-01',
  },
  {
    id: 6,
    name: '周八',
    age: 29,
    gender: 'male',
    status: 'active',
    department: 'design',
    hireDate: '2023-06-01',
  },
  {
    id: 7,
    name: '吴九',
    age: 31,
    gender: 'female',
    status: 'active',
    department: 'tech',
    hireDate: '2023-07-01',
  },
  {
    id: 8,
    name: '郑十',
    age: 26,
    gender: 'male',
    status: 'inactive',
    department: 'product',
    hireDate: '2023-08-01',
  },
]);

// 分页配置
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(originalData.value.length);

// 选中行配置
const selectedRowKeys = ref<(string | number)[]>([]);

// 搜索参数
const searchParam = ref({});

// 隐藏列配置
const hideColumns = ref<(string | number)[]>([]);

// 过滤后的数据
const tableData = computed(() => {
  let result = [...originalData.value];
  
  // 根据搜索参数过滤
  if (searchParam.value.name) {
    result = result.filter(item => 
      item.name.includes(searchParam.value.name)
    );
  }
  
  if (searchParam.value.status) {
    result = result.filter(item => 
      item.status === searchParam.value.status
    );
  }
  
  if (searchParam.value.department) {
    result = result.filter(item => 
      item.department === searchParam.value.department
    );
  }
  
  total.value = result.length;
  
  // 分页处理
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return result.slice(start, end);
});

// 列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80, align: 'center' },
  { prop: 'gender', label: '性别', width: 100, align: 'center' },
  { prop: 'status', label: '状态', width: 100, align: 'center' },
  { prop: 'department', label: '部门', width: 120 },
  { prop: 'hireDate', label: '入职日期', width: 150, align: 'center' },
];

// 搜索表单配置
const searchColumns = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    placeholder: '请输入姓名',
    span: 6,
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    placeholder: '请选择状态',
    options: [
      { label: '激活', value: 'active' },
      { label: '禁用', value: 'inactive' },
    ],
    span: 6,
  },
  {
    prop: 'department',
    label: '部门',
    type: 'select',
    placeholder: '请选择部门',
    options: [
      { label: '技术部', value: 'tech' },
      { label: '产品部', value: 'product' },
      { label: '设计部', value: 'design' },
    ],
    span: 6,
  },
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
  defaultExportColumns: ['id', 'name', 'age', 'department'],
};

// 分页处理
function handlePagination(data: { page: number; limit: number }) {
  currentPage.value = data.page;
  pageSize.value = data.limit;
  ElMessage({
    message: `分页变化: 第 ${data.page} 页，每页 ${data.limit} 条`,
    type: 'success',
  });
}

// 选择变化处理
function handleSelectionChange(selection: any[]) {
  selectedRowKeys.value = selection.map(item => item.id);
  ElMessage({
    message: `选中了 ${selection.length} 行数据`,
    type: 'success',
  });
}

// 搜索处理
function handleSearch(params: Record<string, any>) {
  ElMessage({
    message: `搜索参数: ${JSON.stringify(params)}`,
    type: 'success',
  });
}

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

// 自定义按钮点击处理
function handleCustomButtonClick(key: string) {
  ElMessage({
    message: `点击自定义按钮: ${key}`,
    type: 'success',
  });
}

// 行点击处理
function handleRowClick(row: any, column: any, event: Event) {
  ElMessage({
    message: `点击行: ${row.name}`,
    type: 'success',
  });
}

// 隐藏列变化处理
function handleHideColumnsChange(hideColumns: (string | number)[]) {
  ElMessage({
    message: `隐藏列变化: ${hideColumns.join(', ')}`,
    type: 'success',
  });
}
</script>
