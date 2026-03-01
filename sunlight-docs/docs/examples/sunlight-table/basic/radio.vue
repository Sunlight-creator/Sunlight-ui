<template>
  <div>
    <SunlightTable
      :data="tableData"
      :columns="columns"
      :show-toolbar="false"
      :show-pagination="true"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
    >
      <template #radio="{ row }">
        <el-radio :model-value="selectedId" :label="row.id" @change="handleSelect(row)">
          <span></span>
        </el-radio>
      </template>
    </SunlightTable>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";

const selectedId = ref();
const selectedRow = ref(null);

// 处理单选选择
function handleSelect(row) {
  selectedId.value = row.id;
  selectedRow.value = row;
  ElMessage.success(`已选择: ${row.name}`);
  console.log("选中行：", row);
}

// 直接定义10条模拟数据
const tableData = ref([
  { id: 1, name: "张三", age: 25, city: "北京", department: "技术部", position: "员工", salary: 15000, status: "在职" },
  { id: 2, name: "李四", age: 28, city: "上海", department: "市场部", position: "主管", salary: 20000, status: "在职" },
  { id: 3, name: "王五", age: 30, city: "广州", department: "销售部", position: "经理", salary: 25000, status: "在职" },
  { id: 4, name: "赵六", age: 26, city: "深圳", department: "人事部", position: "员工", salary: 12000, status: "试用期" },
  { id: 5, name: "刘七", age: 32, city: "杭州", department: "财务部", position: "主管", salary: 18000, status: "在职" },
  { id: 6, name: "孙八", age: 27, city: "南京", department: "技术部", position: "员工", salary: 13000, status: "在职" },
  { id: 7, name: "周九", age: 29, city: "武汉", department: "市场部", position: "经理", salary: 22000, status: "休假中" },
  { id: 8, name: "吴十", age: 24, city: "成都", department: "销售部", position: "员工", salary: 10000, status: "试用期" },
  { id: 9, name: "郑一", age: 31, city: "西安", department: "技术部", position: "主管", salary: 19000, status: "在职" },
  { id: 10, name: "王二", age: 28, city: "重庆", department: "财务部", position: "员工", salary: 14000, status: "在职" }
]);

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(10);

const columns = [
  {
    prop: "radio",
    label: "选择",
    width: 60,
    slotName: "radio",
    align: "center",
  },
  { prop: "id", label: "ID" },
  { prop: "name", label: "姓名" },
  { prop: "age", label: "年龄" },
  { prop: "city", label: "城市" },
  { prop: "department", label: "部门" },
  { prop: "position", label: "职位" },
  { prop: "salary", label: "薪资" },
  { prop: "status", label: "状态" },
];

// 加载数据的方法
const loadData = () => {
  // 直接使用静态数据，无需异步加载
  total.value = tableData.value.length;
};

watch([currentPage, pageSize], () => {
  loadData();
});

loadData();
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.selected-info p {
  margin: 5px 0;
}
</style>
