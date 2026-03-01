<template>
  <div class="app-container">
    <header class="app-header">
      <h1>SunlightTable 隐藏列功能完整项目示例</h1>
    </header>
    
    <main class="app-main">
      <!-- 表格操作区 -->
      <div class="table-operations">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增用户
        </el-button>
        <el-button type="success" @click="handleBatchExport">
          <el-icon><Download /></el-icon>
          批量导出
        </el-button>
        <el-button type="warning" @click="handleBatchEdit">
          <el-icon><Edit /></el-icon>
          批量编辑
        </el-button>
        <el-button type="danger" @click="handleBatchDelete" :disabled="selectedRowKeys.length === 0">
          <el-icon><Delete /></el-icon>
          批量删除
          <el-badge :value="selectedRowKeys.length" class="item" />
        </el-button>
      </div>
      
      <!-- 表格筛选区 -->
      <div class="table-filter">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="filterForm.name" placeholder="请输入姓名" clearable />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="filterForm.status" placeholder="请选择状态" clearable>
              <el-option label="在职" value="在职" />
              <el-option label="离职" value="离职" />
              <el-option label="试用期" value="试用期" />
            </el-select>
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="filterForm.city" placeholder="请选择城市" clearable>
              <el-option v-for="city in cities" :key="city" :label="city" :value="city" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">
              <el-icon><Search /></el-icon>
              查询
            </el-button>
            <el-button @click="resetFilter">
              <el-icon><RefreshRight /></el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 隐藏列控制区 -->
      <div class="hide-columns-control">
        <h3>列显示控制</h3>
        <el-space>
          <el-checkbox v-model="columnVisible.id" label="ID" @change="updateHideColumns">显示ID</el-checkbox>
          <el-checkbox v-model="columnVisible.name" label="姓名" @change="updateHideColumns">显示姓名</el-checkbox>
          <el-checkbox v-model="columnVisible.age" label="年龄" @change="updateHideColumns">显示年龄</el-checkbox>
          <el-checkbox v-model="columnVisible.city" label="城市" @change="updateHideColumns">显示城市</el-checkbox>
          <el-checkbox v-model="columnVisible.email" label="邮箱" @change="updateHideColumns">显示邮箱</el-checkbox>
          <el-checkbox v-model="columnVisible.phone" label="电话" @change="updateHideColumns">显示电话</el-checkbox>
          <el-checkbox v-model="columnVisible.status" label="状态" @change="updateHideColumns">显示状态</el-checkbox>
          <el-checkbox v-model="columnVisible.joinDate" label="入职日期" @change="updateHideColumns">显示入职日期</el-checkbox>
        </el-space>
      </div>
      
      <!-- SunlightTable 组件 -->
      <SunlightTable
        :data="tableData"
        :columns="columns"
        :toolbar-config="toolbarConfig"
        :export-config="exportConfig"
        v-model:hide-columns="hideColumns"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :show-selection="true"
        :selected-row-keys="selectedRowKeys"
        @selection-change="handleSelectionChange"
        @export="handleExport"
        @refresh="handleRefresh"
        @changeDensity="handleDensityChange"
        @custom-button-click="handleCustomButtonClick"
      >
        <!-- 自定义操作列 -->
        <template #action="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)">
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </template>
      </SunlightTable>
      
      <!-- 详情面板 -->
      <el-drawer
        v-model="drawerVisible"
        title="用户详情"
        direction="rtl"
        size="50%"
      >
        <div v-if="selectedUser" class="user-detail">
          <el-descriptions :column="1" border>
            <el-descriptions-item label="ID">{{ selectedUser.id }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ selectedUser.name }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ selectedUser.age }}</el-descriptions-item>
            <el-descriptions-item label="城市">{{ selectedUser.city }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ selectedUser.email }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ selectedUser.phone }}</el-descriptions-item>
            <el-descriptions-item label="状态">{{ selectedUser.status }}</el-descriptions-item>
            <el-descriptions-item label="入职日期">{{ selectedUser.joinDate }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-drawer>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { SunlightTable } from '../../index'
import { 
  ElButton, ElInput, ElSelect, ElOption, ElForm, ElFormItem, 
  ElBadge, ElCheckbox, ElSpace, ElDrawer, ElDescriptions, 
  ElDescriptionsItem, ElMessage
} from 'element-plus'
import { 
  Plus, Delete, Edit, Download, Search, RefreshRight, 
  Refresh, Setting, SetUp
} from '@element-plus/icons-vue'

// 全局数据
const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '苏州']

// 表格数据
const tableData = ref([])
const total = ref(100)

// 分页配置
const currentPage = ref(1)
const pageSize = ref(10)

// 选择功能
const selectedRowKeys = ref([])
const selectedRows = ref([])

// 抽屉面板
const drawerVisible = ref(false)
const selectedUser = ref(null)

// 过滤表单
const filterForm = reactive({
  name: '',
  status: '',
  city: ''
})

// 隐藏列配置
const hideColumns = ref(['id', 'email']) // 初始隐藏ID和邮箱列

// 列可见性状态
const columnVisible = reactive({
  id: false,
  name: true,
  age: true,
  city: true,
  email: false,
  phone: true,
  status: true,
  joinDate: true
})

// 监听列可见性变化，更新隐藏列
function updateHideColumns() {
  const hidden = []
  for (const [prop, visible] of Object.entries(columnVisible)) {
    if (!visible) {
      hidden.push(prop)
    }
  }
  hideColumns.value = hidden
}

// 工具栏配置
const toolbarConfig = reactive({
  showDensity: true,
  showExport: true,
  showColumnConfig: true, // 启用列配置功能
  showRefresh: true,
  customButtons: [
    {
      key: 'advancedFilter',
      label: '高级筛选',
      icon: 'Search',
      type: 'primary',
      position: 'left'
    },
    {
      key: 'exportAll',
      label: '导出全部',
      icon: 'Download',
      type: 'success',
      position: 'right'
    }
  ]
})

// 导出配置
const exportConfig = reactive({
  enableColumnSelection: true,
  defaultExportColumns: ['name', 'age', 'city', 'status'],
  excludeColumns: ['action']
})

// 列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120, sortable: true },
  { prop: 'age', label: '年龄', width: 80, sortable: true },
  { prop: 'city', label: '城市', width: 100, sortable: true, filterable: true, filters: cities.map(city => ({ text: city, value: city })) },
  { prop: 'email', label: '邮箱' },
  { prop: 'phone', label: '电话', width: 130 },
  { prop: 'status', label: '状态', width: 100, sortable: true, filterable: true, filters: [
    { text: '在职', value: '在职' },
    { text: '离职', value: '离职' },
    { text: '试用期', value: '试用期' }
  ] },
  { prop: 'joinDate', label: '入职日期', width: 130, sortable: true },
  { prop: 'action', label: '操作', width: 150, slotName: 'action', hide: false, disableToggle: true } // 操作列不可隐藏
]

// 模拟数据获取
async function fetchTableData(page = 1, pageSize = 10) {
  return new Promise(resolve => {
    setTimeout(() => {
      const allData = []
      for (let i = 1; i <= 100; i++) {
        allData.push({
          id: i,
          name: `用户${i}`,
          age: 20 + (i % 30),
          city: cities[i % cities.length],
          email: `user${i}@example.com`,
          phone: `138${10000000 + i}`,
          status: i % 3 === 0 ? '离职' : i % 3 === 1 ? '在职' : '试用期',
          joinDate: new Date(2023, (i % 12), (i % 28) + 1).toLocaleDateString()
        })
      }
      
      // 模拟过滤
      let filteredData = [...allData]
      if (filterForm.name) {
        filteredData = filteredData.filter(item => item.name.includes(filterForm.name))
      }
      if (filterForm.status) {
        filteredData = filteredData.filter(item => item.status === filterForm.status)
      }
      if (filterForm.city) {
        filteredData = filteredData.filter(item => item.city === filterForm.city)
      }
      
      // 更新总数
      total.value = filteredData.length
      
      // 返回分页数据
      const start = (page - 1) * pageSize
      const end = start + pageSize
      resolve(filteredData.slice(start, end))
    }, 300)
  })
}

// 加载数据
async function loadData() {
  try {
    const data = await fetchTableData(currentPage.value, pageSize.value)
    tableData.value = data
  } catch (error) {
    console.error('加载数据失败:', error)
    ElMessage.error('加载数据失败，请稍后重试')
  }
}

// 初始化加载数据
loadData()

// 监听分页变化
watch([currentPage, pageSize], () => {
  loadData()
})

// 监听隐藏列变化，更新列可见性状态
watch(hideColumns, (newHideColumns) => {
  for (const prop in columnVisible) {
    columnVisible[prop] = !newHideColumns.includes(prop)
  }
}, { deep: true })

// 表格事件处理
function handleSelectionChange(selection) {
  selectedRowKeys.value = selection.map(row => row.id)
  selectedRows.value = selection
}

function handleFilter() {
  currentPage.value = 1
  loadData()
  ElMessage.success('筛选条件已应用')
}

function handleRefresh() {
  loadData()
  ElMessage.success('表格已刷新')
}

function handleExport(columns) {
  console.log('导出列:', columns)
  ElMessage.success(`已导出 ${columns.length} 列数据`)
}

function handleDensityChange(density) {
  console.log('密度变化:', density)
  ElMessage.info(`表格密度已切换为 ${density}`)
}

function handleCustomButtonClick(key) {
  console.log('自定义按钮点击:', key)
  if (key === 'advancedFilter') {
    ElMessage.info('高级筛选功能开发中...')
  } else if (key === 'exportAll') {
    ElMessage.success('导出全部数据功能开发中...')
  }
}

// 操作按钮事件
function handleAdd() {
  ElMessage.info('新增用户功能开发中...')
}

function handleBatchExport() {
  if (selectedRowKeys.value.length === 0) {
    ElMessage.warning('请先选择要导出的数据')
    return
  }
  ElMessage.success(`已导出 ${selectedRowKeys.value.length} 条数据`)
}

function handleBatchEdit() {
  if (selectedRowKeys.value.length === 0) {
    ElMessage.warning('请先选择要编辑的数据')
    return
  }
  ElMessage.info('批量编辑功能开发中...')
}

function handleBatchDelete() {
  if (selectedRowKeys.value.length === 0) {
    ElMessage.warning('请先选择要删除的数据')
    return
  }
  ElMessage.success(`已删除 ${selectedRowKeys.value.length} 条数据`)
  selectedRowKeys.value = []
  selectedRows.value = []
}

function handleEdit(row) {
  selectedUser.value = row
  drawerVisible.value = true
}

function handleDelete(row) {
  ElMessage.success(`已删除用户: ${row.name}`)
  // 模拟删除数据
  const index = tableData.value.findIndex(item => item.id === row.id)
  if (index > -1) {
    tableData.value.splice(index, 1)
  }
}

function resetFilter() {
  Object.assign(filterForm, {
    name: '',
    status: '',
    city: ''
  })
  loadData()
  ElMessage.success('筛选条件已重置')
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.app-header {
  background-color: #fff;
  padding: 20px 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.app-header h1 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.app-main {
  flex: 1;
  padding: 20px 40px;
}

.table-operations {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.table-filter {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.hide-columns-control {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.hide-columns-control h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
}

.user-detail {
  padding: 20px;
}
</style>