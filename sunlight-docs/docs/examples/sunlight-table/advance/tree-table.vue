<template>
  <div>
    <h3>高级树形表格示例</h3>
    <p>展示树形表格的高级功能，包括懒加载、自定义展开图标、行点击事件等</p>
    <div class="demo-container">
      <SunlightTable
        :data="tableData"
        :columns="columns"
        :table-props="tableProps"
        :show-selection="true"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <!-- 自定义展开图标 -->
        <template #default-expand-icon="{ row, expanded }">
          <el-icon :size="16">
            <el-icon-check v-if="expanded" />
            <el-icon-plus v-else />
          </el-icon>
        </template>

        <!-- 自定义状态列 -->
        <template #status="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'" size="small">
            {{ row.status === "active" ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </SunlightTable>

      <div class="selected-info" v-if="selectedRows.length > 0">
        <p>已选择 {{ selectedRows.length }} 项：</p>
        <ul>
          <li v-for="row in selectedRows" :key="row.id">{{ row.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightTable } from "sunlight-ui";

// 表格数据
const tableData = ref([
  {
    id: 1,
    name: "公司总部",
    level: "1",
    status: "active",
    manager: "张总",
    children: [
      {
        id: 2,
        name: "技术部",
        level: "2",
        status: "active",
        manager: "李经理",
        children: [
          {
            id: 3,
            name: "前端开发组",
            level: "3",
            status: "active",
            manager: "王组长",
          },
          {
            id: 4,
            name: "后端开发组",
            level: "3",
            status: "active",
            manager: "赵组长",
          },
          {
            id: 5,
            name: "测试组",
            level: "3",
            status: "active",
            manager: "孙组长",
          },
        ],
      },
      {
        id: 6,
        name: "产品部",
        level: "2",
        status: "active",
        manager: "周经理",
        children: [
          {
            id: 7,
            name: "产品规划组",
            level: "3",
            status: "active",
            manager: "吴组长",
          },
          {
            id: 8,
            name: "产品设计组",
            level: "3",
            status: "active",
            manager: "郑组长",
          },
        ],
      },
      {
        id: 9,
        name: "设计部",
        level: "2",
        status: "active",
        manager: "王经理",
        children: [
          {
            id: 10,
            name: "UI设计组",
            level: "3",
            status: "active",
            manager: "冯组长",
          },
          {
            id: 11,
            name: "UX设计组",
            level: "3",
            status: "active",
            manager: "陈组长",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "市场部",
    level: "1",
    status: "active",
    manager: "刘总",
    children: [
      {
        id: 13,
        name: "营销组",
        level: "2",
        status: "active",
        manager: "杨经理",
      },
      {
        id: 14,
        name: "销售组",
        level: "2",
        status: "active",
        manager: "朱经理",
      },
    ],
  },
]);

// 选中的行
const selectedRows = ref([]);

// 列配置
const columns = [
  { prop: "id", label: "ID", width: 80, align: "center" },
  { prop: "name", label: "部门名称", minWidth: 180 },
  { prop: "level", label: "层级", width: 80, align: "center" },
  { prop: "status", label: "状态", width: 100, align: "center", slotName: "status" },
  { prop: "manager", label: "负责人", width: 120 },
];

// 表格属性配置
const tableProps = {
  border: true,
  treeProps: {
    children: "children",
    hasChildren: "hasChildren",
  },
  defaultExpandAll: true,
  indent: 20,
  // 懒加载配置（这里只是示例，实际项目中需要配置load方法）
  // lazy: true,
  // load: loadNode,
};

// 选择变化事件处理
const handleSelectionChange = selection => {
  selectedRows.value = selection;
  console.log("选择变化:", selection);
};

// 行点击事件处理
const handleRowClick = (row, column, event) => {
  console.log("行点击:", row);
};

// 懒加载节点方法（示例）
const loadNode = (node, resolve) => {
  // 模拟异步加载
  setTimeout(() => {
    const newChildren = [
      {
        id: Date.now() + 1,
        name: `动态节点 ${node.data.name}-1`,
        level: `${parseInt(node.data.level) + 1}`,
        status: "active",
        manager: "动态负责人",
        hasChildren: true,
      },
      {
        id: Date.now() + 2,
        name: `动态节点 ${node.data.name}-2`,
        level: `${parseInt(node.data.level) + 1}`,
        status: "active",
        manager: "动态负责人",
      },
    ];
    resolve(newChildren);
  }, 500);
};
</script>

<style scoped>
.selected-info {
  margin-top: 20px;
  padding: 15px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
}

.selected-info ul {
  margin: 10px 0 0 20px;
  padding: 0;
}

.selected-info li {
  margin: 5px 0;
  list-style-type: disc;
}
</style>
