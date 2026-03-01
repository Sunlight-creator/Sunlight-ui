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
  { prop: "id", label: "ID" },
  { prop: "name", label: "姓名" },
  { prop: "department", label: "部门" },
  { prop: "position", label: "职位" },
  { prop: "salary", label: "薪资" },
];

const tableProps = {
  border: true,
  /**
   * 单元格合并方法
   * @param {Object} params - 合并方法参数对象
   * @param {Object} params.row - 当前行数据
   * @param {number} params.rowIndex - 当前行索引
   * @param {number} params.columnIndex - 当前列索引
   * @returns {Object} 合并配置对象 { rowspan, colspan }
   *   - rowspan: 纵向合并的行数，0 表示隐藏该单元格
   *   - colspan: 横向合并的列数，0 表示隐藏该单元格
   */
  spanMethod: ({ row, rowIndex, columnIndex }) => {
    // 只对第3列（部门列，索引从0开始）进行合并
    if (columnIndex === 2) {
      // 获取上一行数据
      // rowIndex > 0 时取上一行，否则为 null
      const prevRow = rowIndex > 0 ? tableData.value[rowIndex - 1] : null;

      // 判断逻辑：
      // 1. 上一行存在
      // 2. 上一行的部门与当前行的部门相同
      // 说明：当前单元格应该被隐藏（因为它的值已经合并到上面的单元格了）
      if (prevRow && prevRow.department === row.department) {
        // rowspan: 0 表示该单元格不显示
        // colspan: 0 表示该单元格不占用列宽
        return { rowspan: 0, colspan: 0 };
      }

      // 初始化 rowspan 为 1，表示当前单元格自己占一行
      let rowspan = 1;

      // 向下遍历后续行，统计连续相同部门的行数
      // 这些行都会被合并到当前单元格
      for (let i = rowIndex + 1; i < tableData.value.length; i++) {
        if (tableData.value[i].department === row.department) {
          // 找到相同部门的行，rowspan 加 1
          rowspan++;
        } else {
          // 遇到不同部门的行，停止查找
          break;
        }
      }

      // 返回合并配置：
      // rowspan: 纵向合并的行数
      // colspan: 横向合并的列数（这里只合并1列）
      return { rowspan, colspan: 1 };
    }

    // 其他列不进行合并，返回默认配置：每个单元格各占一行一列
    return { rowspan: 1, colspan: 1 };
  },
};

const allData = [
  { id: 1, name: "张三", department: "技术部", position: "前端开发", salary: 8000 },
  { id: 2, name: "李四", department: "技术部", position: "前端开发", salary: 9000 },
  { id: 3, name: "王五", department: "技术部", position: "后端开发", salary: 10000 },
  { id: 4, name: "赵六", department: "技术部", position: "后端开发", salary: 11000 },
  { id: 5, name: "钱七", department: "产品部", position: "产品经理", salary: 12000 },
  { id: 6, name: "孙八", department: "产品部", position: "产品经理", salary: 13000 },
  { id: 7, name: "周九", department: "运营部", position: "运营专员", salary: 7000 },
  { id: 8, name: "吴十", department: "运营部", position: "运营专员", salary: 7500 },
  { id: 9, name: "张伟", department: "技术部", position: "前端开发", salary: 8500 },
  { id: 10, name: "李娜", department: "技术部", position: "后端开发", salary: 9500 },
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
