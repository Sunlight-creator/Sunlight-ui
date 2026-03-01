<template>
  <SunlightTable
    :data="tableData"
    :columns="columns"
    :toolbar-config="toolbarConfig"
    :show-pagination="true"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :search-columns="searchColumns"
    v-model:search-param="searchParam"
    v-model:visible-search-columns="visibleSearchColumns"
    v-model:hide-columns="hideColumns"
    :search-collapsed="searchCollapsed"
    @refresh="handleRefresh"
    @search="handleSearch"
    @reset="handleReset"
  >
    <template #isActive="{ row }">
      <el-tag :type="row.isActive ? 'success' : 'danger'" size="small">
        {{ row.isActive ? "已激活" : "未激活" }}
      </el-tag>
    </template>
    <template #tags="{ row }">
      <el-tag v-for="tag in row.tags" :key="tag" size="small" class="tag-item">
        {{ tag }}
      </el-tag>
    </template>
  </SunlightTable>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { SunlightTable } from "sunlight-ui";
import { ElMessage } from "element-plus";

// 工具栏配置
const toolbarConfig = reactive({
  showDensity: true,
  showColumnConfig: true,
  showRefresh: true,
  showSearchConfig: true,
});

// 搜索配置
const visibleSearchColumns = ref(["name", "status", "department", "city", "position", "isActive", "hireDate"]);
// 表头配置
const hideColumns = ref([]);
const searchCollapsed = ref(false);
const searchParam = reactive({
  name: "",
  status: null,
  department: null,
  city: null,
  position: [],
  isActive: null,
  hireDate: null,
});

// 模拟异步获取城市选项
async function fetchCityOptions() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { label: "北京", value: "北京" },
    { label: "上海", value: "上海" },
    { label: "广州", value: "广州" },
    { label: "深圳", value: "深圳" },
    { label: "杭州", value: "杭州" },
    { label: "南京", value: "南京" },
    { label: "武汉", value: "武汉" },
    { label: "成都", value: "成都" },
    { label: "西安", value: "西安" },
    { label: "重庆", value: "重庆" },
  ];
}

// 搜索表单配置
const searchColumns = [
  {
    prop: "name",
    label: "姓名",
    type: "input",
    placeholder: "请输入姓名",
    span: 6,
    attrs: {
      clearable: true,
    },
  },
  {
    prop: "status",
    label: "状态",
    type: "select",
    placeholder: "请选择状态",
    span: 6,
    options: [
      { label: "激活", value: "active" },
      { label: "禁用", value: "inactive" },
    ],
    clearable: true,
  },
  {
    prop: "department",
    label: "部门",
    type: "select",
    placeholder: "请选择部门",
    span: 6,
    options: [
      { label: "技术部", value: "技术部" },
      { label: "市场部", value: "市场部" },
      { label: "销售部", value: "销售部" },
      { label: "人事部", value: "人事部" },
      { label: "财务部", value: "财务部" },
    ],
    clearable: true,
  },
  {
    prop: "city",
    label: "城市",
    type: "select",
    placeholder: "请选择城市（异步加载）",
    span: 6,
    options: () => fetchCityOptions(),
    clearable: true,
  },
  {
    prop: "position",
    label: "职位",
    type: "select",
    placeholder: "请选择职位",
    span: 6,
    multiple: true,
    options: [
      { label: "员工", value: "员工" },
      { label: "主管", value: "主管" },
      { label: "经理", value: "经理" },
      { label: "总监", value: "总监" },
      { label: "副总裁", value: "副总裁" },
      { label: "总经理", value: "总经理" },
    ],
    clearable: true,
  },
  {
    prop: "isActive",
    label: "账户状态",
    type: "select",
    placeholder: "请选择账户状态",
    span: 6,
    options: [
      { label: "已激活", value: true },
      { label: "未激活", value: false },
    ],
    clearable: true,
  },
  {
    prop: "hireDate",
    label: "入职日期",
    type: "date-picker",
    placeholder: "请选择入职日期",
    span: 6,
    config: {
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
    },
  },
];

// 分页配置
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);
const tableData = ref([]);

// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80, align: "center" },
  { prop: "name", label: "姓名", width: 120 },
  { prop: "age", label: "年龄", width: 80, align: "center" },
  { prop: "city", label: "城市", width: 120 },
  { prop: "department", label: "部门", width: 120 },
  { prop: "position", label: "职位", width: 120 },
  { prop: "salary", label: "薪资", width: 120, align: "center" },
  { prop: "status", label: "状态", width: 100, align: "center" },
  { prop: "hireDate", label: "入职日期", width: 120, align: "center" },
  {
    prop: "isActive",
    label: "账户状态",
    width: 100,
    align: "center",
    slotName: "isActive",
  },
  {
    prop: "tags",
    label: "技能标签",
    width: 200,
    slotName: "tags",
  },
];

// 生成模拟数据
// 简化生成模拟数据
const allData = [];
const departments = ["技术部", "市场部", "销售部", "人事部", "财务部"];
const positions = ["员工", "主管", "经理", "总监", "副总裁"];
const cities = ["北京", "上海", "广州", "深圳", "杭州"];
const skills = ["JavaScript", "Vue", "React", "Node.js", "Python"];

for (let i = 1; i <= 100; i++) {
  allData.push({
    id: i,
    name: `用户${i}`,
    age: 22 + (i % 20),
    city: cities[i % cities.length],
    department: departments[i % departments.length],
    position: positions[i % positions.length],
    salary: 5000 + i * 200,
    status: i % 3 === 0 ? "inactive" : "active",
    hireDate: `202${i % 5}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    tags: [skills[i % skills.length], skills[(i + 1) % skills.length]].slice(0, 1 + (i % 2)),
    isActive: i % 5 !== 0,
  });
}

// 模拟 API 调用
function fetchTableData(page = 1, pageSizeVal = 10, searchData = {}) {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredData = [...allData];
      //  模拟查询过滤
      if (searchData.name) {
        filteredData = filteredData.filter(item => item.name.includes(searchData.name));
      }
      if (searchData.status) {
        filteredData = filteredData.filter(item => item.status === searchData.status);
      }
      if (searchData.department) {
        filteredData = filteredData.filter(item => item.department === searchData.department);
      }
      if (searchData.city) {
        filteredData = filteredData.filter(item => item.city === searchData.city);
      }
      if (searchData.position && searchData.position.length > 0) {
        filteredData = filteredData.filter(item => searchData.position.includes(item.position));
      }
      if (searchData.isActive !== null && searchData.isActive !== undefined) {
        filteredData = filteredData.filter(item => item.isActive === searchData.isActive);
      }
      if (searchData.hireDate) {
        filteredData = filteredData.filter(item => item.hireDate >= searchData.hireDate);
      }

      const start = (page - 1) * pageSizeVal;
      const end = start + pageSizeVal;
      resolve({
        data: filteredData.slice(start, end),
        total: filteredData.length,
      });
    }, 300);
  });
}

// 加载数据
const loadData = async () => {
  const result = await fetchTableData(currentPage.value, pageSize.value, searchParam);
  tableData.value = result.data;
  total.value = result.total;
};

// 刷新处理
function handleRefresh() {
  loadData();
  ElMessage({
    message: "数据已刷新",
    type: "success",
  });
}

// 搜索处理
function handleSearch(params: Record<string, any>) {
  ElMessage({
    message: `搜索参数: ${JSON.stringify(params)}`,
    type: "success",
  });
  currentPage.value = 1;
  fetchTableData(currentPage.value, pageSize.value, params).then(result => {
    tableData.value = result.data;
    total.value = result.total;
  });
}

// 重置处理
function handleReset() {
  ElMessage({
    message: "搜索条件已重置",
    type: "success",
  });
  Object.keys(searchParam).forEach(key => {
    if (Array.isArray(searchParam[key])) {
      searchParam[key] = [];
    } else if (typeof searchParam[key] === "string") {
      searchParam[key] = "";
    } else {
      searchParam[key] = null;
    }
  });
  currentPage.value = 1;
  fetchTableData(currentPage.value, pageSize.value, searchParam).then(result => {
    tableData.value = result.data;
    total.value = result.total;
  });
}

// 监听分页变化
watch([currentPage, pageSize], () => {
  loadData();
});

// 初始加载数据
loadData();
</script>

<style scoped>
.tag-item {
  margin-right: 4px;
  margin-bottom: 4px;
}
</style>
