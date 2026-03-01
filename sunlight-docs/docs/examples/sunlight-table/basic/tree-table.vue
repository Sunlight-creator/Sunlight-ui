<template>
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
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { SunlightTable } from "sunlight-ui";

const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);
const hideColumns = ref([]);

const columns = [
  { prop: "name", label: "名称" },
  { prop: "manager", label: "负责人" },
  { prop: "employeeCount", label: "人数" },
];

const tableProps = {
  border: true,
  treeProps: {
    children: "children",
    hasChildren: "hasChildren",
  },
  defaultExpandAll: true,
  indent: 20,
};

const treeData = [
  {
    id: 1,
    name: "技术部",
    manager: "张总",
    employeeCount: 15,
    children: [
      {
        id: 11,
        name: "前端组",
        manager: "李经理",
        employeeCount: 5,
        children: [
          { id: 111, name: "张三", manager: "李经理", employeeCount: 1 },
          { id: 112, name: "李四", manager: "李经理", employeeCount: 1 },
        ],
      },
      {
        id: 12,
        name: "后端组",
        manager: "王经理",
        employeeCount: 8,
        children: [
          { id: 121, name: "王五", manager: "王经理", employeeCount: 1 },
          { id: 122, name: "赵六", manager: "王经理", employeeCount: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "产品部",
    manager: "刘总",
    employeeCount: 8,
    children: [
      {
        id: 21,
        name: "产品组",
        manager: "周经理",
        employeeCount: 5,
        children: [
          { id: 211, name: "钱七", manager: "周经理", employeeCount: 1 },
          { id: 212, name: "孙八", manager: "周经理", employeeCount: 1 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "运营部",
    manager: "陈总",
    employeeCount: 6,
    children: [
      { id: 31, name: "周九", manager: "陈总", employeeCount: 1 },
      { id: 32, name: "吴十", manager: "陈总", employeeCount: 1 },
    ],
  },
];

function fetchTableData(page = 1, pageSizeVal = 10) {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * pageSizeVal;
      const end = start + pageSizeVal;
      resolve({
        data: treeData,
        total: treeData.length,
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
