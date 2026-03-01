<template>
  <div>
    <!-- :show-pagination="true"  开启分页多选 -->
    <SunlightTable
      :data="tableData"
      :columns="columns"
      :toolbar-config="toolbarConfig"
      :show-pagination="true"
      :show-selection="true"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-model:hide-columns="hideColumns"
      :selected-row-keys="selectedRowKeys"
      :total="total"
      @selection-change="handleSelectionChange"
      @refresh="handleRefresh"
      @custom-button-click="handleCustomButtonClick"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { SunlightTable } from "sunlight-ui";
import { ElMessage } from "element-plus";

const toolbarConfig = reactive({
  showDensity: true, // 显示密度切换
  showColumnConfig: true, // 显示列配置
  showRefresh: true, // 显示刷新按钮
  customButtons: [
    {
      key: "edit",
      label: "编辑",
      icon: "Edit",
      type: "primary",
      position: "left",
    },
    {
      key: "delete",
      label: "删除",
      icon: "Delete",
      type: "danger",
      position: "right",
    },
    {
      key: "export",
      label: "导出",
      icon: "Download",
      type: "success",
      position: "right",
    },
  ],
});

function handleRefresh() {
  loadData();
}

function handleCustomButtonClick(key) {
  console.log("点击了按钮:", key);
  if (key === "edit") {
    if (selectedRowKeys.value.length === 0) {
      ElMessage.warning("请先选择一行数据");
      return;
    }
    if (selectedRowKeys.value.length > 1) {
      ElMessage.warning("只能选择一行数据进行编辑");
      return;
    }
    const selectedRow = tableData.value.find(row => row.id === selectedRowKeys.value[0]);
    ElMessage.info(`编辑: ${selectedRow.name}`);
  } else if (key === "delete") {
    if (selectedRowKeys.value.length === 0) {
      ElMessage.warning("请先选择要删除的数据");
      return;
    }
    ElMessage.success(`已删除 ${selectedRowKeys.value.length} 条数据`);
    selectedRowKeys.value = [];
  } else if (key === "export") {
    if (selectedRowKeys.value.length === 0) {
      ElMessage.warning("请先选择要导出的数据");
      return;
    }
    const selectedRows = tableData.value.filter(row => selectedRowKeys.value.includes(row.id));
    console.log("导出数据:", selectedRows);
    ElMessage.success(`导出 ${selectedRows.length} 条数据`);
  }
}

function handleSelectionChange(selection) {
  selectedRowKeys.value = selection.map(row => row.id);
  console.log("选中的行:", selection);
  console.log("选中行的 ID:", selectedRowKeys.value);
  ElMessage.success(`已选择 ${selectedRowKeys.value.length} 行数据`);
}

const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(30);
const hideColumns = ref([]);
const selectedRowKeys = ref([]);

const columns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "姓名" },
  { prop: "age", label: "年龄", width: 80 },
  { prop: "city", label: "城市" },
  { prop: "department", label: "部门" },
  { prop: "position", label: "职位" },
  { prop: "salary", label: "薪资", width: 100 },
  { prop: "status", label: "状态", width: 100 },
  { prop: "phone", label: "手机号", width: 130 },
  { prop: "joinDate", label: "入职日期", width: 120 },
];

const allData = [
  {
    id: 1,
    name: "张伟",
    age: 25,
    city: "北京",
    department: "技术部",
    position: "员工",
    salary: 15000,
    status: "在职",
    phone: "13800138001",
    joinDate: "2023-01-01",
  },
  {
    id: 2,
    name: "李芳",
    age: 28,
    city: "上海",
    department: "市场部",
    position: "主管",
    salary: 20000,
    status: "在职",
    phone: "13800138002",
    joinDate: "2023-01-02",
  },
  {
    id: 3,
    name: "王娜",
    age: 30,
    city: "广州",
    department: "销售部",
    position: "经理",
    salary: 25000,
    status: "在职",
    phone: "13800138003",
    joinDate: "2023-01-03",
  },
  {
    id: 4,
    name: "赵敏",
    age: 26,
    city: "深圳",
    department: "人事部",
    position: "员工",
    salary: 12000,
    status: "在职",
    phone: "13800138004",
    joinDate: "2023-01-04",
  },
  {
    id: 5,
    name: "刘伟",
    age: 32,
    city: "杭州",
    department: "财务部",
    position: "主管",
    salary: 18000,
    status: "在职",
    phone: "13800138005",
    joinDate: "2023-01-05",
  },
  {
    id: 6,
    name: "陈静",
    age: 27,
    city: "南京",
    department: "运营部",
    position: "员工",
    salary: 13000,
    status: "在职",
    phone: "13800138006",
    joinDate: "2023-01-06",
  },
  {
    id: 7,
    name: "杨强",
    age: 29,
    city: "武汉",
    department: "产品部",
    position: "经理",
    salary: 22000,
    status: "在职",
    phone: "13800138007",
    joinDate: "2023-01-07",
  },
  {
    id: 8,
    name: "黄磊",
    age: 24,
    city: "成都",
    department: "客服部",
    position: "员工",
    salary: 10000,
    status: "试用期",
    phone: "13800138008",
    joinDate: "2023-01-08",
  },
  {
    id: 9,
    name: "周军",
    age: 31,
    city: "西安",
    department: "技术部",
    position: "主管",
    salary: 19000,
    status: "在职",
    phone: "13800138009",
    joinDate: "2023-01-09",
  },
  {
    id: 10,
    name: "吴洋",
    age: 26,
    city: "重庆",
    department: "市场部",
    position: "员工",
    salary: 14000,
    status: "在职",
    phone: "13800138010",
    joinDate: "2023-01-10",
  },
  {
    id: 11,
    name: "徐勇",
    age: 33,
    city: "苏州",
    department: "销售部",
    position: "总监",
    salary: 30000,
    status: "在职",
    phone: "13800138011",
    joinDate: "2023-01-11",
  },
  {
    id: 12,
    name: "孙艳",
    age: 28,
    city: "天津",
    department: "人事部",
    position: "主管",
    salary: 16000,
    status: "在职",
    phone: "13800138012",
    joinDate: "2023-01-12",
  },
  {
    id: 13,
    name: "马杰",
    age: 29,
    city: "长沙",
    department: "财务部",
    position: "经理",
    salary: 23000,
    status: "在职",
    phone: "13800138013",
    joinDate: "2023-01-13",
  },
  {
    id: 14,
    name: "朱娟",
    age: 27,
    city: "郑州",
    department: "运营部",
    position: "主管",
    salary: 17000,
    status: "在职",
    phone: "13800138014",
    joinDate: "2023-01-14",
  },
  {
    id: 15,
    name: "胡涛",
    age: 30,
    city: "青岛",
    department: "产品部",
    position: "总监",
    salary: 28000,
    status: "在职",
    phone: "13800138015",
    joinDate: "2023-01-15",
  },
  {
    id: 16,
    name: "郭霞",
    age: 25,
    city: "北京",
    department: "客服部",
    position: "员工",
    salary: 11000,
    status: "试用期",
    phone: "13800138016",
    joinDate: "2023-01-16",
  },
  {
    id: 17,
    name: "林明",
    age: 31,
    city: "上海",
    department: "技术部",
    position: "经理",
    salary: 24000,
    status: "在职",
    phone: "13800138017",
    joinDate: "2023-01-17",
  },
  {
    id: 18,
    name: "何秀英",
    age: 32,
    city: "广州",
    department: "市场部",
    position: "总监",
    salary: 29000,
    status: "在职",
    phone: "13800138018",
    joinDate: "2023-01-18",
  },
  {
    id: 19,
    name: "高华",
    age: 28,
    city: "深圳",
    department: "销售部",
    position: "主管",
    salary: 18000,
    status: "在职",
    phone: "13800138019",
    joinDate: "2023-01-19",
  },
  {
    id: 20,
    name: "罗平",
    age: 26,
    city: "杭州",
    department: "技术部",
    position: "员工",
    salary: 14000,
    status: "试用期",
    phone: "13800138020",
    joinDate: "2023-01-20",
  },
  {
    id: 21,
    name: "张志",
    age: 29,
    city: "南京",
    department: "财务部",
    position: "员工",
    salary: 13000,
    status: "在职",
    phone: "13800138021",
    joinDate: "2023-01-21",
  },
  {
    id: 22,
    name: "王丽",
    age: 27,
    city: "武汉",
    department: "运营部",
    position: "员工",
    salary: 12000,
    status: "在职",
    phone: "13800138022",
    joinDate: "2023-01-22",
  },
  {
    id: 23,
    name: "李强",
    age: 30,
    city: "成都",
    department: "产品部",
    position: "主管",
    salary: 19000,
    status: "在职",
    phone: "13800138023",
    joinDate: "2023-01-23",
  },
  {
    id: 24,
    name: "赵静",
    age: 26,
    city: "西安",
    department: "人事部",
    position: "员工",
    salary: 11000,
    status: "试用期",
    phone: "13800138024",
    joinDate: "2023-01-24",
  },
  {
    id: 25,
    name: "刘杰",
    age: 31,
    city: "重庆",
    department: "技术部",
    position: "经理",
    salary: 23000,
    status: "在职",
    phone: "13800138025",
    joinDate: "2023-01-25",
  },
  {
    id: 26,
    name: "陈丽",
    age: 28,
    city: "苏州",
    department: "市场部",
    position: "主管",
    salary: 17000,
    status: "在职",
    phone: "13800138026",
    joinDate: "2023-01-26",
  },
  {
    id: 27,
    name: "杨磊",
    age: 29,
    city: "天津",
    department: "销售部",
    position: "员工",
    salary: 14000,
    status: "离职",
    phone: "13800138027",
    joinDate: "2023-01-27",
  },
  {
    id: 28,
    name: "黄军",
    age: 32,
    city: "长沙",
    department: "技术部",
    position: "总监",
    salary: 32000,
    status: "在职",
    phone: "13800138028",
    joinDate: "2023-01-28",
  },
  {
    id: 29,
    name: "周敏",
    age: 26,
    city: "郑州",
    department: "客服部",
    position: "员工",
    salary: 10000,
    status: "试用期",
    phone: "13800138029",
    joinDate: "2023-01-29",
  },
  {
    id: 30,
    name: "吴芳",
    age: 27,
    city: "青岛",
    department: "产品部",
    position: "员工",
    salary: 13000,
    status: "在职",
    phone: "13800138030",
    joinDate: "2023-01-30",
  },
];

function fetchTableData(page = 1, pageSizeVal = 10) {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * pageSizeVal;
      const end = start + pageSizeVal;
      resolve({
        data: allData.slice(start, end),
        total: allData.length,
      });
    }, 300);
  });
}

const loadData = async () => {
  const result = await fetchTableData(currentPage.value, pageSize.value);
  tableData.value = result.data;
  total.value = result.total;
};

watch([currentPage, pageSize], () => {
  loadData();
});

loadData();
</script>
