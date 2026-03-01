<template>
  <SunlightTable
    :data="tableData"
    :columns="columns"
    :show-pagination="true"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    @pagination="handlePagination"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { SunlightTable } from "sunlight-ui";
import { ElMessage } from "element-plus";

// 分页配置
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);
const tableData = ref([]);

// 模拟 API 调用
function fetchTableData(page: number, limit: number): Promise<{ data: any[]; total: number }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = [];
      const startId = (page - 1) * limit + 1;

      // 简化生成模拟数据
      for (let i = 0; i < limit; i++) {
        const id = startId + i;
        data.push({
          id,
          name: `用户${id}`,
          age: 20 + id % 30,
          address: `地址${id}`,
          email: `user${id}@example.com`,
          phone: `1380013800${id % 10}`,
          department: ["技术部", "产品部", "设计部", "市场部"][id % 4],
        });
      }

      resolve({
        data,
        total: 100,
      });
    }, 300);
  });
}

// 加载数据
const loadData = async () => {
  try {
    const result = await fetchTableData(currentPage.value, pageSize.value);
    tableData.value = result.data;
    total.value = result.total;
  } catch (error) {
    ElMessage({
      message: "加载数据失败",
      type: "error",
    });
  }
};

// 监听分页变化
watch([currentPage, pageSize], () => {
  loadData();
});

// 初始加载数据
loadData();

const columns = [
  { prop: "id", label: "ID", width: 80, align: "center" },
  { prop: "name", label: "姓名", width: 120 },
  { prop: "age", label: "年龄", width: 80, align: "center" },
  { prop: "address", label: "地址", width: 200 },
  { prop: "email", label: "邮箱", width: 200 },
  { prop: "phone", label: "电话", width: 150 },
  { prop: "department", label: "部门", width: 120 },
];

// 分页处理
function handlePagination(data: { page: number; limit: number }) {
  currentPage.value = data.page;
  pageSize.value = data.limit;
  ElMessage({
    message: `分页变化: 第 ${data.page} 页，每页 ${data.limit} 条`,
    type: "success",
  });
}
</script>
