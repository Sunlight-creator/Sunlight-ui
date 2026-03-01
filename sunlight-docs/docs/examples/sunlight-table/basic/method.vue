<template>
  <div>
    <h3>方法调用示例</h3>
    <p>点击下面的按钮，演示 SunlightTable 组件的方法调用功能</p>

    <div class="button-group" style="margin-bottom: 16px">
      <el-button @click="clearSelection">清空选择</el-button>
      <el-button @click="toggleRowSelection">切换第一行选择</el-button>
      <el-button @click="toggleAllSelection">切换全选</el-button>
      <el-button type="primary" @click="setCurrentRow">设置当前行</el-button>
      <el-button @click="clearSort">清空排序</el-button>
      <el-button type="warning" @click="doLayout">重新布局</el-button>
    </div>

    <SunlightTable
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      :show-selection="true"
      :highlight-current-row="true"
      :row-class-name="rowClassName"
    />
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
  { prop: "id", label: "ID", width: 80, align: "center", sortable: true },
  { prop: "name", label: "姓名", width: 120, sortable: true },
  { prop: "age", label: "年龄", width: 80, align: "center", sortable: true },
  { prop: "department", label: "部门", width: 120 },
  { prop: "address", label: "地址" },
];

// 表格引用
const tableRef = ref(null);

// 状态信息
const currentRowName = ref("无");
const tableStatus = ref("就绪");

// 行样式函数
function rowClassName({ row, rowIndex }) {
  if (row.id === 1) {
    return "current-row-highlight";
  }
  return "";
}

// 清空选择
function clearSelection() {
  tableRef.value?.clearSelection();
  ElMessage.success("已清空选择");
}

// 切换第一行选择
function toggleRowSelection() {
  if (tableData.value.length > 0) {
    tableRef.value?.toggleRowSelection(tableData.value[0]);
    ElMessage.success("已切换第一行选择状态");
  }
}

// 切换全选
function toggleAllSelection() {
  tableRef.value?.toggleAllSelection();
  ElMessage.success("已切换全选状态");
}

// 设置当前行
function setCurrentRow() {
  if (tableData.value.length > 0) {
    const firstRow = tableData.value[0];
    tableRef.value?.setCurrentRow(firstRow);
    currentRowName.value = firstRow.name;
    tableStatus.value = "已设置当前行";
    ElMessage.success(`已设置当前行: ${firstRow.name}`);

    // 添加视觉反馈，临时高亮第一行
    const tableEl = tableRef.value?.tableRef?.$el;
    if (tableEl) {
      const rows = tableEl.querySelectorAll(".el-table__row");
      if (rows.length > 0) {
        const firstRowEl = rows[0];
        const originalBg = firstRowEl.style.backgroundColor;
        firstRowEl.style.backgroundColor = "#ecf5ff";
        setTimeout(() => {
          firstRowEl.style.backgroundColor = originalBg;
        }, 1500);
      }
    }
  }
}

// 清空排序
function clearSort() {
  tableRef.value?.clearSort();
  tableStatus.value = "已清空排序";
  ElMessage.success("已清空排序");
}

// 重新布局
function doLayout() {
  tableRef.value?.doLayout();
  tableStatus.value = "已重新布局";
  ElMessage.success("已重新布局");

  // 添加视觉反馈，临时改变表格边框颜色
  const tableEl = tableRef.value?.tableRef?.$el;
  if (tableEl) {
    const originalBorder = tableEl.style.border;
    tableEl.style.border = "2px solid #409eff";
    setTimeout(() => {
      tableEl.style.border = originalBorder;
    }, 1000);
  }

  // 模拟表格尺寸变化，增强视觉效果
  const tableContainer = tableEl?.parentElement;
  if (tableContainer) {
    const originalPadding = tableContainer.style.padding;
    tableContainer.style.padding = "10px";
    setTimeout(() => {
      tableContainer.style.padding = originalPadding;
    }, 500);
  }
}
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.current-row-highlight {
  background-color: #ecf5ff !important;
}

/* 增强当前行高亮效果 */
:deep(.el-table__row.current-row) {
  background-color: #ecf5ff !important;
}
</style>
