<template>
  <div>
    <SunlightTable
      :data="tableData"
      :columns="columns"
      :table-props="tableProps"
      :show-pagination="true"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { SunlightTable } from "sunlight-ui";

// 分页配置
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(20);

// 过滤相关配置
const tableProps = reactive({
  // 是否多选过滤
  filterMultiple: true,
  // 过滤后的值
  filteredValue: {},
  // 过滤框的弹出位置
  filterPlacement: "bottom-end",
});

const tableData = ref([
  {
    id: 1,
    name: "员工1",
    age: 25,
    department: "技术部",
    position: "员工",
    status: "在职",
    city: "北京",
    salary: 15000,
  },
  {
    id: 2,
    name: "员工2",
    age: 28,
    department: "市场部",
    position: "主管",
    status: "在职",
    city: "上海",
    salary: 20000,
  },
  {
    id: 3,
    name: "员工3",
    age: 30,
    department: "销售部",
    position: "经理",
    status: "在职",
    city: "广州",
    salary: 25000,
  },
  {
    id: 4,
    name: "员工4",
    age: 26,
    department: "人事部",
    position: "员工",
    status: "试用期",
    city: "深圳",
    salary: 12000,
  },
  {
    id: 5,
    name: "员工5",
    age: 32,
    department: "财务部",
    position: "主管",
    status: "在职",
    city: "杭州",
    salary: 18000,
  },
  {
    id: 6,
    name: "员工6",
    age: 27,
    department: "技术部",
    position: "员工",
    status: "在职",
    city: "北京",
    salary: 13000,
  },
  {
    id: 7,
    name: "员工7",
    age: 29,
    department: "市场部",
    position: "经理",
    status: "休假中",
    city: "上海",
    salary: 22000,
  },
  {
    id: 8,
    name: "员工8",
    age: 24,
    department: "销售部",
    position: "员工",
    status: "试用期",
    city: "广州",
    salary: 10000,
  },
  {
    id: 9,
    name: "员工9",
    age: 31,
    department: "技术部",
    position: "主管",
    status: "在职",
    city: "深圳",
    salary: 19000,
  },
  {
    id: 10,
    name: "员工10",
    age: 28,
    department: "财务部",
    position: "员工",
    status: "在职",
    city: "杭州",
    salary: 14000,
  },
  {
    id: 11,
    name: "员工11",
    age: 33,
    department: "技术部",
    position: "总监",
    status: "在职",
    city: "北京",
    salary: 30000,
  },
  {
    id: 12,
    name: "员工12",
    age: 26,
    department: "市场部",
    position: "员工",
    status: "在职",
    city: "上海",
    salary: 16000,
  },
  {
    id: 13,
    name: "员工13",
    age: 30,
    department: "销售部",
    position: "主管",
    status: "在职",
    city: "广州",
    salary: 21000,
  },
  {
    id: 14,
    name: "员工14",
    age: 27,
    department: "人事部",
    position: "主管",
    status: "在职",
    city: "深圳",
    salary: 17000,
  },
  {
    id: 15,
    name: "员工15",
    age: 29,
    department: "财务部",
    position: "经理",
    status: "在职",
    city: "杭州",
    salary: 23000,
  },
  {
    id: 16,
    name: "员工16",
    age: 25,
    department: "技术部",
    position: "员工",
    status: "离职",
    city: "北京",
    salary: 15000,
  },
  {
    id: 17,
    name: "员工17",
    age: 28,
    department: "市场部",
    position: "主管",
    status: "在职",
    city: "上海",
    salary: 19000,
  },
  {
    id: 18,
    name: "员工18",
    age: 31,
    department: "销售部",
    position: "经理",
    status: "休假中",
    city: "广州",
    salary: 24000,
  },
  {
    id: 19,
    name: "员工19",
    age: 26,
    department: "技术部",
    position: "员工",
    status: "试用期",
    city: "深圳",
    salary: 12000,
  },
  {
    id: 20,
    name: "员工20",
    age: 32,
    department: "财务部",
    position: "经理",
    status: "在职",
    city: "杭州",
    salary: 22000,
  },
]);

// 过滤方法
const filterMethod = (value, row, column) => {
  const property = column.property;
  return row[property] === value;
};

// 列配置，包含过滤功能
const columns = [
  {
    prop: "id",
    label: "ID",
    width: 80,
    align: "center",
  },
  {
    prop: "name",
    label: "姓名",
    width: 120,
  },
  {
    prop: "age",
    label: "年龄",
    width: 80,
    align: "center",
    // 年龄过滤
    filterable: true,
    filters: [
      { text: "20-29岁", value: "young" },
      { text: "30-39岁", value: "middle" },
      { text: "40岁以上", value: "old" },
    ],
    filterMethod: (value, row) => {
      if (value === "young") {
        return row.age >= 20 && row.age < 30;
      } else if (value === "middle") {
        return row.age >= 30 && row.age < 40;
      } else if (value === "old") {
        return row.age >= 40;
      }
      return true;
    },
  },
  {
    prop: "department",
    label: "部门",
    width: 120,
    // 部门过滤
    filterable: true,
    filters: [
      { text: "技术部", value: "技术部" },
      { text: "市场部", value: "市场部" },
      { text: "销售部", value: "销售部" },
      { text: "人事部", value: "人事部" },
      { text: "财务部", value: "财务部" },
    ],
    filterMethod,
  },
  {
    prop: "position",
    label: "职位",
    width: 100,
    // 职位过滤
    filterable: true,
    filters: [
      { text: "员工", value: "员工" },
      { text: "主管", value: "主管" },
      { text: "经理", value: "经理" },
      { text: "总监", value: "总监" },
    ],
    filterMethod,
  },
  {
    prop: "status",
    label: "状态",
    width: 100,
    align: "center",
    // 状态过滤
    filterable: true,
    filters: [
      { text: "在职", value: "在职" },
      { text: "离职", value: "离职" },
      { text: "休假中", value: "休假中" },
      { text: "试用期", value: "试用期" },
    ],
    filterMethod,
  },
  {
    prop: "city",
    label: "城市",
    width: 100,
    // 城市过滤，使用不同的弹出位置
    filterable: true,
    filters: [
      { text: "北京", value: "北京" },
      { text: "上海", value: "上海" },
      { text: "广州", value: "广州" },
      { text: "深圳", value: "深圳" },
      { text: "杭州", value: "杭州" },
    ],
    filterMethod,
    // 自定义过滤框弹出位置
    filterPlacement: "top-end",
  },
  {
    prop: "salary",
    label: "薪资",
    width: 120,
    align: "right",
    // 薪资过滤
    filterable: true,
    filters: [
      { text: "10k以下", value: "low" },
      { text: "10k-20k", value: "middle" },
      { text: "20k以上", value: "high" },
    ],
    filterMethod: (value, row) => {
      if (value === "low") {
        return row.salary < 10000;
      } else if (value === "middle") {
        return row.salary >= 10000 && row.salary < 20000;
      } else if (value === "high") {
        return row.salary >= 20000;
      }
      return true;
    },
  },
];
</script>

<style scoped>
/* 可根据需要添加自定义样式 */
</style>
