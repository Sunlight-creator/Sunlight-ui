<template>
  <div>
    <h3>高级搜索示例</h3>
    <p>展示 SunlightTable 组件的高级搜索功能，包括多条件搜索、异步选项加载、搜索列配置等</p>
    <div>
      <SunlightTable
        :data="tableData"
        :columns="columns"
        :table-props="tableProps"
        :show-pagination="true"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        v-model:hide-columns="hideColumns"
        :total="total"
        :search-columns="searchColumns"
        v-model:search-param="searchParam"
        v-model:visible-search-columns="visibleSearchColumns"
        :search-collapsed="searchCollapsed"
        :search-theme-style="searchThemeStyle"
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
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { SunlightTable } from "sunlight-ui";
import { ElTag } from "element-plus";

const toolbarConfig = reactive({
  showDensity: true,
  showColumnConfig: true,
  showRefresh: true,
  showSearchConfig: true,
});

// 搜索主题样式
const searchThemeStyle = computed(() => ({
  borderColor: "#409eff",
  focusBorderColor: "#409eff",
  focusBoxShadow: `0 0 0 3px #409eff26`,
}));

// 可见的搜索列
const visibleSearchColumns = ref(["name", "status", "department", "city", "position", "hireDate", "isActive"]);

// 搜索是否折叠
const searchCollapsed = ref(true);

// 搜索参数
const searchParam = reactive({
  name: "",
  status: null,
  department: null,
  city: null,
  position: [],
  hireDate: null,
  isActive: null,
});

// 异步加载城市选项
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

// 搜索列配置
const searchColumns = [
  {
    prop: "name",
    label: "用户姓名",
    type: "input",
    placeholder: "请输入姓名",
    span: 6,
    attrs: {
      clearable: true,
    },
  },
  {
    prop: "status",
    label: "员工状态",
    type: "select",
    placeholder: "请选择状态",
    span: 6,
    options: [
      { label: "在职", value: "在职" },
      { label: "离职", value: "离职" },
      { label: "休假中", value: "休假中" },
      { label: "试用期", value: "试用期" },
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
    ],
    clearable: true,
  },
  {
    prop: "isActive",
    label: "账户状态",
    type: "select",
    placeholder: "请选择账户状态",
    span: 6,
    multiple: true,
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

// 表格数据
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);
const hideColumns = ref([]);

// 表格属性
const tableProps = {
  border: true,
  stripe: true,
};

// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "姓名" },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "city", label: "城市", width: 120 },
  { prop: "department", label: "部门", width: 120 },
  { prop: "position", label: "职位", width: 120 },
  { prop: "salary", label: "薪资", width: 120 },
  { prop: "hireDate", label: "入职日期", width: 120 },
  {
    prop: "isActive",
    label: "账户状态",
    width: 100,
    slotName: "isActive",
  },
  {
    prop: "tags",
    label: "技能标签",
    width: 200,
    slotName: "tags",
  },
];

// 模拟数据生成
const surnames = ["张", "王", "李", "赵", "刘", "陈", "杨", "黄", "周", "吴"];
const names = ["伟", "芳", "娜", "敏", "静", "丽", "强", "磊", "军", "洋"];
const cities = ["北京", "上海", "广州", "深圳", "杭州", "南京", "武汉", "成都", "西安", "重庆"];
const departments = ["技术部", "市场部", "销售部", "人事部", "财务部", "运营部"];
const positions = ["员工", "主管", "经理", "总监"];
const allSkills = ["JavaScript", "TypeScript", "Vue", "React", "Node.js", "Python", "Java", "C++"];

// 生成模拟数据
const allData = [];
for (let i = 1; i <= 100; i++) {
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const dept = departments[Math.floor(Math.random() * departments.length)];
  const salary = 5000 + Math.floor(Math.random() * 20000);
  const age = 22 + Math.floor(Math.random() * 20);

  let status;
  const statusRand = Math.random();
  if (statusRand < 0.6) {
    status = "在职";
  } else if (statusRand < 0.75) {
    status = "离职";
  } else if (statusRand < 0.85) {
    status = "休假中";
  } else {
    status = "试用期";
  }

  const hireYear = 2020 + Math.floor(Math.random() * 5);
  const hireMonth = 1 + Math.floor(Math.random() * 12);
  const hireDay = 1 + Math.floor(Math.random() * 28);
  const hireDate = `${hireYear}-${String(hireMonth).padStart(2, "0")}-${String(hireDay).padStart(2, "0")}`;

  const skillCount = 1 + Math.floor(Math.random() * 4);
  const skills = [];
  const shuffledSkills = [...allSkills].sort(() => Math.random() - 0.5);
  for (let j = 0; j < skillCount; j++) {
    skills.push(shuffledSkills[j]);
  }

  allData.push({
    id: i,
    name: `${surname}${name}`,
    age,
    city: cities[Math.floor(Math.random() * cities.length)],
    department: dept,
    position: positions[Math.floor(Math.random() * positions.length)],
    salary,
    status,
    hireDate,
    tags: skills,
    isActive: Math.random() > 0.2,
  });
}

// 模拟API请求
function fetchTableData(page = 1, pageSizeVal = 10, searchData = {}) {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredData = [...allData];

      // 应用搜索过滤
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
      if (searchData.hireDate) {
        filteredData = filteredData.filter(item => item.hireDate >= searchData.hireDate);
      }
      if (searchData.isActive !== null && searchData.isActive !== undefined) {
        filteredData = filteredData.filter(item => item.isActive === searchData.isActive);
      }

      // 分页处理
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

// 搜索事件处理
const handleSearch = searchData => {
  currentPage.value = 1;
  fetchTableData(currentPage.value, pageSize.value, searchData).then(result => {
    tableData.value = result.data;
    total.value = result.total;
  });
};

// 重置事件处理
const handleReset = () => {
  // 重置搜索参数
  Object.keys(searchParam).forEach(key => {
    if (Array.isArray(searchParam[key])) {
      searchParam[key] = [];
    } else if (typeof searchParam[key] === "string") {
      searchParam[key] = "";
    } else {
      searchParam[key] = null;
    }
  });

  // 重新加载数据
  currentPage.value = 1;
  loadData();
};

// 初始加载数据
loadData();
</script>

<style scoped>
.tag-item {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
