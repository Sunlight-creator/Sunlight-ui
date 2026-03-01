<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightTable 案例12 - 综合功能表格（多选、事件监听、样式配置）</span>
    </div>

    <!-- 综合功能表格：展示多选、事件监听、tableProps 等多种功能 -->
    <div class="table-controls">
      <!-- 控制按钮：展示选中行的信息 -->
      <el-button type="primary" @click="handleBatchDelete" :disabled="selectedRowKeys.length === 0">
        批量删除 (已选 {{ selectedRowKeys.length }} 条)
      </el-button>
      <el-button @click="toggleColumnVisibility">
        {{ hideColumns.length > 0 ? '显示所有列' : '隐藏邮箱列' }}
      </el-button>
    </div>

    <SunlightTable
      :data="tableData"
      :columns="columns"
      :show-selection="true"
      :selected-row-keys="selectedRowKeys"
      :hide-columns="hideColumns"
      :table-props="tableProps"
      :table-listeners="tableListeners"
    >
      <!-- 自定义状态列：使用插槽自定义渲染 -->
      <template #status="{ row }">
        <el-tag :type="row.status === '在职' ? 'success' : 'danger'" size="small">
          {{ row.status }}
        </el-tag>
      </template>

      <!-- 自定义操作列：添加操作按钮 -->
      <template #action="{ row }">
        <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </SunlightTable>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightTable } from 'sunlight-ui'
import { ElMessage, ElMessageBox } from 'element-plus'

// 模拟数据：类似于 fetchCityOptions，创建一个异步函数返回假数据
async function fetchTableData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '张三',
          age: 25,
          city: '北京',
          email: 'zhangsan@example.com',
          phone: '13800138001',
          status: '在职',
          department: '技术部'
        },
        {
          id: 2,
          name: '李四',
          age: 30,
          city: '上海',
          email: 'lisi@example.com',
          phone: '13800138002',
          status: '在职',
          department: '产品部'
        },
        {
          id: 3,
          name: '王五',
          age: 28,
          city: '广州',
          email: 'wangwu@example.com',
          phone: '13800138003',
          status: '离职',
          department: '技术部'
        },
        {
          id: 4,
          name: '赵六',
          age: 32,
          city: '深圳',
          email: 'zhaoliu@example.com',
          phone: '13800138004',
          status: '在职',
          department: '运营部'
        },
        {
          id: 5,
          name: '钱七',
          age: 26,
          city: '杭州',
          email: 'qianqi@example.com',
          phone: '13800138005',
          status: '在职',
          department: '技术部'
        },
        {
          id: 6,
          name: '孙八',
          age: 29,
          city: '北京',
          email: 'sunba@example.com',
          phone: '13800138006',
          status: '离职',
          department: '产品部'
        },
        {
          id: 7,
          name: '周九',
          age: 27,
          city: '上海',
          email: 'zhoujiu@example.com',
          phone: '13800138007',
          status: '在职',
          department: '运营部'
        },
        {
          id: 8,
          name: '吴十',
          age: 31,
          city: '深圳',
          email: 'wushi@example.com',
          phone: '13800138008',
          status: '在职',
          department: '技术部'
        }
      ])
    }, 300)
  })
}

// 表格数据
const tableData = ref([])

// 选中的行 key 数组：用于多选功能
const selectedRowKeys = ref([])

// 动态隐藏的列：用于控制列的显示/隐藏
const hideColumns = ref([])

// 列配置：包含排序、过滤、自定义插槽等功能
const columns = [
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120, sortable: true },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  {
    prop: 'city',
    label: '城市',
    width: 120,
    filterable: true,
    filters: [
      { text: '北京', value: '北京' },
      { text: '上海', value: '上海' },
      { text: '广州', value: '广州' },
      { text: '深圳', value: '深圳' },
      { text: '杭州', value: '杭州' }
    ]
  },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'phone', label: '电话', width: 150 },
  {
    prop: 'department',
    label: '部门',
    width: 120,
    filterable: true,
    filters: [
      { text: '技术部', value: '技术部' },
      { text: '产品部', value: '产品部' },
      { text: '运营部', value: '运营部' }
    ]
  },
  { prop: 'status', label: '状态', width: 100, slotName: 'status' },
  { prop: 'action', label: '操作', width: 180, fixed: 'right', slotName: 'action' }
]

// 表格属性配置：通过 tableProps 传递 Element Plus Table 的属性
// 这里配置了斑马纹、边框、高度等样式
const tableProps = {
  stripe: true, // 显示斑马纹
  border: true, // 显示边框
  height: '400px', // 固定表格高度
  highlightCurrentRow: true, // 高亮当前行
  emptyText: '暂无数据' // 空数据提示文本
}

// 表格事件监听：通过 tableListeners 监听 Element Plus Table 的各种事件
const tableListeners = {
  // 行点击事件：点击表格行时触发
  'row-click': row => {
    console.log('点击行：', row)
    ElMessage.info(`点击了 ${row.name} 的行`)
  },
  // 行双击事件：双击表格行时触发
  'row-dblclick': row => {
    console.log('双击行：', row)
    ElMessage.success(`双击了 ${row.name} 的行`)
  },
  // 选择变化事件：多选框状态改变时触发
  // selection 是选中的行数据数组，提取 id 更新 selectedRowKeys
  'selection-change': selection => {
    selectedRowKeys.value = selection.map(row => row.id)
    console.log('选中行变化：', selection)
    console.log('当前选中数量：', selection.length)
  },
  // 当前行变化事件：当前高亮行改变时触发
  'current-change': currentRow => {
    console.log('当前行变化：', currentRow)
  }
}

// 编辑操作
const handleEdit = row => {
  ElMessage.success(`编辑用户：${row.name}`)
  console.log('编辑行数据：', row)
}

// 删除操作
const handleDelete = async row => {
  try {
    await ElMessageBox.confirm(`确定要删除用户 ${row.name} 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    ElMessage.success(`已删除用户：${row.name}`)
    console.log('删除行数据：', row)
  } catch {
    ElMessage.info('已取消删除')
  }
}

// 批量删除操作
const handleBatchDelete = async () => {
  if (selectedRowKeys.value.length === 0) {
    ElMessage.warning('请先选择要删除的数据')
    return
  }

  try {
    await ElMessageBox.confirm(`确定要删除选中的 ${selectedRowKeys.value.length} 条数据吗？`, '批量删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const selectedNames = tableData.value
      .filter(item => selectedRowKeys.value.includes(item.id))
      .map(item => item.name)
      .join('、')
    ElMessage.success(`已删除用户：${selectedNames}`)
    selectedRowKeys.value = []
  } catch {
    ElMessage.info('已取消删除')
  }
}

// 切换列显示/隐藏
const toggleColumnVisibility = () => {
  if (hideColumns.value.length > 0) {
    // 显示所有列
    hideColumns.value = []
    ElMessage.success('已显示所有列')
  } else {
    // 隐藏邮箱列
    hideColumns.value = ['email']
    ElMessage.info('已隐藏邮箱列')
  }
}

// 初始化加载数据
fetchTableData().then(data => {
  tableData.value = data
})
</script>

<style scoped>
.box-card {
  margin: 20px;
}
.card-header {
  margin-bottom: 20px;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.table-controls {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}
</style>
