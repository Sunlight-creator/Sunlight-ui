<template>
  <SunlightTable :data="tableData" :columns="columns">
    <!-- 自定义头像渲染 -->
    <template #avatar="{ row }">
      <el-avatar :size="32" :src="row.avatar" :alt="row.name" />
    </template>

    <!-- 自定义状态渲染 -->
    <template #status="{ row }">
      <el-tag :type="row.status === 'active' ? 'success' : 'danger'" size="small">
        {{ row.status === "active" ? "激活" : "禁用" }}
      </el-tag>
    </template>

    <!-- 自定义操作按钮 -->
    <template #action="{ row }">
      <div class="action-buttons">
        <el-button size="small" type="primary" @click="handleEdit(row)">编辑11</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </div>
    </template>
  </SunlightTable>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SunlightTable } from "sunlight-ui";
import { ElMessage } from "element-plus";

// 表格数据
const tableData = ref([
  {
    id: 1,
    name: "张三",
    age: 25,
    status: "active",
    avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    status: "inactive",
    avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    status: "active",
    avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  },
]);

// 列配置
const columns = [
  { prop: "id", label: "ID", align: "center" },
  { prop: "avatar", label: "头像", align: "center", slotName: "avatar" },
  { prop: "name", label: "姓名" },
  { prop: "age", label: "年龄", align: "center" },
  { prop: "status", label: "状态", align: "center", slotName: "status" },
  { prop: "action", label: "操作", align: "center", slotName: "action" },
];

// 编辑操作
function handleEdit(row: any) {
  ElMessage({
    message: `编辑用户: ${row.name}`,
    type: "success",
  });
}

// 删除操作
function handleDelete(row: any) {
  ElMessage({
    message: `删除用户: ${row.name}`,
    type: "success",
  });
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 8px;
}
</style>
