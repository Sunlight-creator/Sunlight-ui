<template>
  <div>
    <h3>事件处理示例</h3>
    <p>点击表格行或工具栏按钮，查看事件触发效果</p>
    <!-- 行点击事件 -->
    <!-- @row-click="handleRowClick" -->
    <!-- 行双击事件 -->
    <!-- @row-dblclick="handleRowDblclick" -->
    <!-- 自定义按钮点击事件 -->
    <!-- @custom-button-click="handleCustomButtonClick" -->
    <!-- 刷新事件 -->
    <!-- @refresh="handleRefresh" -->
    <!-- 密度变化事件 -->
    <!-- @density-change="handleDensityChange" -->
    <!-- 打开设置事件 -->
    <!-- @open-settings="handleOpenSettings" -->
    <!-- 打开动态列事件 -->
    <!-- @open-dynamic-columns="handleOpenDynamicColumns" -->
    <SunlightTable
      :data="tableData"
      :columns="columns"
      :show-selection="true"
      :selected-row-keys="selectedRowKeys"
      @selection-change="handleSelectionChange"
    >
      <template #action="{ row }">
        <el-popconfirm title="确定删除吗?" @confirm="handleDelete(row)">
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </SunlightTable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightTable } from "sunlight-ui";
import { ElMessage } from "element-plus";

// 表格数据
const tableData = ref([
  { id: 1, name: "张三", age: 25, address: "北京市朝阳区", department: "技术部" },
  { id: 2, name: "李四", age: 30, address: "上海市浦东新区", department: "市场部" },
  { id: 3, name: "王五", age: 28, address: "广州市天河区", department: "销售部" },
  { id: 4, name: "赵六", age: 35, address: "深圳市南山区", department: "人事部" },
  { id: 5, name: "钱七", age: 22, address: "杭州市西湖区", department: "财务部" },
]);

// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80, align: "center" },
  { prop: "name", label: "姓名", width: 120 },
  { prop: "age", label: "年龄", width: 80, align: "center" },
  { prop: "department", label: "部门", width: 120 },
  { prop: "address", label: "地址" },
  {
    prop: "action",
    label: "操作",
    width: 100,
    align: "center",
    slotName: "action",
  },
];

// 选中行
const selectedRowKeys = ref([]);

// 选中变化事件
function handleSelectionChange(selection) {
  selectedRowKeys.value = selection.map(item => item.id);
  ElMessage({ message: `选中了 ${selection.length} 行`, type: "info" });
}

// 删除按钮点击事件
function handleDelete(row) {
  const index = tableData.value.findIndex(item => item.id === row.id);
  if (index !== -1) {
    tableData.value.splice(index, 1);
    ElMessage.success(`已删除行: ${row.name}`);
  }
}
</script>

<style scoped></style>
