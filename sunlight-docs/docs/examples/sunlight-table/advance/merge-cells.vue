<template>
  <div>
    <div>
      <SunlightTable :data="tableData" :columns="columns" :table-props="tableProps" :show-selection="false">
        <!-- 自定义状态列 -->
        <template #status="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'" size="small">
            {{ row.status === "active" ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </SunlightTable>
    </div>

    <!-- <div class="description">
      <h4>合并规则说明：</h4>
      <ul>
        <li>
          <strong>ID列</strong>
          ：相同ID的行进行纵向合并
        </li>
        <li>
          <strong>姓名列</strong>
          ：相同姓名的行进行纵向合并
        </li>
        <li>
          <strong>部门列</strong>
          ：相同部门的行进行纵向合并
        </li>
        <li>
          <strong>职位列</strong>
          ："高级"职位进行纵向合并
        </li>
        <li>
          <strong>薪资列</strong>
          ：薪资大于10000的行进行纵向合并
        </li>
        <li>
          <strong>状态列</strong>
          ："启用"状态的行进行纵向合并
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightTable } from "sunlight-ui";
import { ElTag } from "element-plus";

// 表格数据
const tableData = ref([
  {
    id: 1,
    name: "张三",
    department: "技术部",
    position: "高级前端开发",
    salary: 15000,
    status: "active",
  },
  {
    id: 1,
    name: "张三",
    department: "技术部",
    position: "高级前端开发",
    salary: 15000,
    status: "active",
  },
  {
    id: 1,
    name: "张三",
    department: "技术部",
    position: "高级前端开发",
    salary: 15000,
    status: "active",
  },
  {
    id: 2,
    name: "李四",
    department: "技术部",
    position: "前端开发",
    salary: 9000,
    status: "active",
  },
  {
    id: 3,
    name: "王五",
    department: "技术部",
    position: "高级后端开发",
    salary: 14000,
    status: "active",
  },
  {
    id: 3,
    name: "王五",
    department: "技术部",
    position: "高级后端开发",
    salary: 14000,
    status: "active",
  },
  {
    id: 4,
    name: "赵六",
    department: "产品部",
    position: "产品经理",
    salary: 16000,
    status: "active",
  },
  {
    id: 4,
    name: "赵六",
    department: "产品部",
    position: "产品经理",
    salary: 16000,
    status: "disabled",
  },
  {
    id: 5,
    name: "孙七",
    department: "设计部",
    position: "UI设计师",
    salary: 10000,
    status: "disabled",
  },
  {
    id: 6,
    name: "周八",
    department: "运营部",
    position: "运营专员",
    salary: 8000,
    status: "disabled",
  },
]);

// 列配置
const columns = [
  { prop: "id", label: "ID", align: "center" },
  { prop: "name", label: "姓名" },
  { prop: "department", label: "部门" },
  { prop: "position", label: "职位" },
  { prop: "salary", label: "薪资", align: "right" },
  { prop: "status", label: "状态", align: "center", slotName: "status" },
];

// 表格属性配置
const tableProps = {
  border: true,
  // 复杂的合并单元格逻辑
  spanMethod: ({ row, rowIndex, columnIndex }) => {
    // 处理ID列合并（第一列）
    if (columnIndex === 0) {
      return mergeCellsByField(row, rowIndex, columnIndex, "id");
    }

    // 处理姓名列合并（第二列）
    if (columnIndex === 1) {
      return mergeCellsByField(row, rowIndex, columnIndex, "name");
    }

    // 处理部门列合并（第三列）
    if (columnIndex === 2) {
      return mergeCellsByField(row, rowIndex, columnIndex, "department");
    }

    // 处理职位列合并（第四列）- 只合并高级职位
    if (columnIndex === 3) {
      if (row.position.includes("高级")) {
        return mergeCellsByField(row, rowIndex, columnIndex, "position");
      }
      return { rowspan: 1, colspan: 1 };
    }

    // 处理薪资列合并（第五列）- 只合并薪资大于10000的行
    if (columnIndex === 4) {
      if (row.salary > 10000) {
        return mergeCellsByField(row, rowIndex, columnIndex, "salary");
      }
      return { rowspan: 1, colspan: 1 };
    }

    // 处理状态列合并（第六列）- 只合并启用状态
    if (columnIndex === 5) {
      if (row.status === "active") {
        return mergeCellsByField(row, rowIndex, columnIndex, "status");
      }
      return { rowspan: 1, colspan: 1 };
    }

    // 默认不合并
    return { rowspan: 1, colspan: 1 };
  },
};

// 根据字段值合并单元格的通用方法
const mergeCellsByField = (row, rowIndex, columnIndex, field) => {
  // 向上查找相同值的起始行
  let startRow = rowIndex;
  while (startRow > 0 && tableData.value[startRow - 1][field] === row[field]) {
    startRow--;
  }

  // 向下查找相同值的结束行
  let endRow = rowIndex;
  while (endRow < tableData.value.length - 1 && tableData.value[endRow + 1][field] === row[field]) {
    endRow++;
  }

  // 计算合并的行数
  const rowspan = endRow - startRow + 1;

  // 如果是起始行则合并，否则隐藏
  if (startRow === rowIndex) {
    return { rowspan, colspan: 1 };
  } else {
    return { rowspan: 0, colspan: 0 };
  }
};
</script>

<style scoped>
.demo-container {
  margin: 20px 0;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.description {
  margin-top: 20px;
  padding: 15px;
  background: #e6f7ff;
  border-radius: 8px;
}

description h4 {
  margin-top: 0;
}

.description ul {
  margin-bottom: 0;
}

.description li {
  margin: 5px 0;
}
</style>
