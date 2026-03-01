<template>
  <el-card shadow="hover">
    <!-- 表格直接展示在主页面 -->
    <SunlightTable
      ref="tableRef"
      :columns="tableColumns"
      :data="tableData"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      :toolbar-config="toolbarConfig"
      :search-columns="searchColumns"
      v-model:search-param="searchParam"
      :show-pagination="true"
      @pagination="handlePagination"
      @custom-button-click="handleCustomButtonClick"
      @search="handleSearch"
    >
      <!-- 性别插槽 -->
      <template #gender="{ row }">
        <el-tag size="small">
          {{ row.gender === 'male' ? '男' : '女' }}
        </el-tag>
      </template>

      <!-- 状态插槽 -->
      <template #status="{ row }">
        <el-tag :type="row.status ? 'success' : 'danger'" size="small">
          {{ row.status ? '启用' : '禁用' }}
        </el-tag>
      </template>

      <!-- 操作插槽 -->
      <template #operation="scope">
        <el-button type="danger" size="small" @click="handleDelete(scope.row)">
          <el-icon><Delete /></el-icon> 删除
        </el-button>
      </template>
    </SunlightTable>

    <!-- 新增表单抽屉 -->
    <SunlightDrawer
      v-model:visible="formDrawerVisible"
      drawerTitle="添加用户"
      drawerDirection="rtl"
      :drawerSize="'80%'"
      :with-footer="true"
      :is-confirm-loading="submitting"
      @on-confirm="handleFormSubmit"
      :content-height="'calc(100vh - 200px)'"
    >
      <SunlightForm ref="formRef" v-model="formData" :columns="formColumns" :form-options="formOptions" />
    </SunlightDrawer>
  </el-card>
</template>

<script setup lang="ts">
// =============================================================================
// 导入部分
// =============================================================================
import { ref, reactive } from 'vue'
import { SunlightTable, SunlightForm, SunlightDrawer } from 'sunlight-ui'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

// =============================================================================
// 类型定义
// =============================================================================
// 表格数据类型定义
interface User {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  gender: 'male' | 'female'
  status: boolean
}

// =============================================================================
// 数据生成与初始化
// =============================================================================

// 生成随机数据的辅助函数
const generateRandomData = (): User[] => {
  const surnames = ['张', '王', '李', '赵', '刘', '陈', '杨', '黄', '周', '吴']
  const firstNames = ['明', '芳', '军', '兰', '红', '伟', '秀英', '娜', '敏', '静']
  const departments = ['tech', 'product', 'operation', 'market', 'sales', 'hr']
  const positions = [
    '工程师',
    '产品经理',
    '运营专员',
    '市场经理',
    '销售专员',
    '人事专员',
    '主管',
    '经理',
    '助理',
    '设计师'
  ]

  const data: User[] = []

  for (let i = 1; i <= 50; i++) {
    const surname = surnames[Math.floor(Math.random() * surnames.length)]
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const name = surname + firstName

    data.push({
      id: `user-${i}`,
      name,
      email: `${name.toLowerCase()}@example.com`,
      phone: `138${Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, '0')}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      gender: Math.random() > 0.5 ? 'male' : 'female',
      status: Math.random() > 0.3
    })
  }

  return data
}

// 静态原始数据，用于搜索和重置
const allData = generateRandomData()

// =============================================================================
// 响应式数据定义
// =============================================================================

// 表格数据相关
const tableData = ref<User[]>([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

// 动态数据，用于增删改操作
const mockDatabase = ref<User[]>(JSON.parse(JSON.stringify(allData)))

// 组件引用
const tableRef = ref()
const formRef = ref()

// 抽屉控制
const formDrawerVisible = ref(false)
const submitting = ref(false)

// 表单数据
const formData = ref({
  id: '',
  name: '',
  email: '',
  phone: '',
  department: '',
  position: '',
  gender: 'male' as 'male' | 'female',
  status: true
})

// 工具栏配置
const toolbarConfig = reactive({
  showSearchConfig: true,
  customButtons: [
    {
      key: 'add',
      label: '添加用户',
      type: 'primary',
      icon: 'Plus',
      position: 'left'
    }
  ]
})

// 搜索参数
const searchParam = reactive({
  name: '',
  email: ''
})

// 搜索列配置
const searchColumns = [
  {
    prop: 'name',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    span: 6,
    attrs: {
      clearable: true
    }
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    span: 6,
    attrs: {
      clearable: true,
      type: 'email'
    }
  }
]

// 表格列配置
const tableColumns = [
  {
    prop: 'name',
    label: '姓名',
    align: 'center'
  },
  {
    prop: 'email',
    label: '邮箱',
    align: 'center'
  },
  {
    prop: 'phone',
    label: '手机号',
    align: 'center'
  },
  {
    prop: 'department',
    label: '部门',
    align: 'center',
    formatter: (row: User) => {
      const deptMap = {
        tech: '技术部',
        product: '产品部',
        operation: '运营部',
        market: '市场部',
        sales: '销售部',
        hr: '人事部'
      }
      return deptMap[row.department] || row.department
    }
  },
  {
    prop: 'position',
    label: '职位',
    align: 'center'
  },
  {
    prop: 'gender',
    label: '性别',
    slotName: 'gender',
    align: 'center'
  },
  {
    prop: 'status',
    label: '状态',
    slotName: 'status',
    align: 'center'
  },
  {
    label: '操作',
    slotName: 'operation',
    align: 'center'
  }
]

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }]
}

// 部门选项
const departmentOptions = [
  { value: 'tech', label: '技术部' },
  { value: 'product', label: '产品部' },
  { value: 'operation', label: '运营部' },
  { value: 'market', label: '市场部' },
  { value: 'sales', label: '销售部' },
  { value: 'hr', label: '人事部' }
]

// 性别选项
const genderOptions = [
  { value: 'male', label: '男' },
  { value: 'female', label: '女' }
]

// 表单列配置
const formColumns = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    placeholder: '请输入姓名',
    clearable: true,
    rules: rules.name
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    placeholder: '请输入邮箱',
    inputType: 'email',
    clearable: true,
    rules: rules.email
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    span: 12,
    placeholder: '请输入手机号',
    inputType: 'tel',
    clearable: true,
    rules: rules.phone
  },
  {
    prop: 'department',
    label: '部门',
    type: 'select',
    span: 12,
    placeholder: '请选择部门',
    options: departmentOptions,
    clearable: true,
    rules: rules.department
  },
  {
    prop: 'position',
    label: '职位',
    type: 'input',
    span: 12,
    placeholder: '请输入职位',
    clearable: true,
    rules: rules.position
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'radio',
    span: 12,
    options: genderOptions,
    isGroup: true
  },
  {
    prop: 'status',
    label: '状态',
    type: 'radio',
    span: 12,
    options: [
      { value: true, label: '启用' },
      { value: false, label: '禁用' }
    ],
    isGroup: true
  }
]

// 表单配置
const formOptions = {
  labelWidth: '100px',
  size: 'default'
}

// 刷新表格数据
const refreshTableData = () => {
  // 模拟分页和搜索
  let filteredData = [...mockDatabase.value]

  // 根据搜索参数过滤
  if (searchParam.name) {
    filteredData = filteredData.filter(item => item.name.includes(searchParam.name))
  }
  if (searchParam.email) {
    filteredData = filteredData.filter(item => item.email.includes(searchParam.email))
  }

  total.value = filteredData.length

  // 分页处理
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  tableData.value = filteredData.slice(start, end)
}

// 搜索处理（包含重置逻辑）
const handleSearch = (search: any) => {
  // 处理重置事件：如果search是空对象，说明是重置操作
  if (Object.keys(search).length === 0) {
    // 清空所有搜索参数
    Object.keys(searchParam).forEach(key => {
      if (typeof searchParam[key] === 'string') {
        searchParam[key] = ''
      }
    })

    // 恢复原始数据
    mockDatabase.value = JSON.parse(JSON.stringify(allData))
  } else {
    // 正常搜索：将搜索参数赋值给searchParam
    Object.assign(searchParam, search)
  }

  // 重置页码到第一页
  currentPage.value = 1

  // 重新加载数据
  refreshTableData()
}

// 分页变化处理
const handlePagination = (data: { page: number; limit: number }) => {
  currentPage.value = data.page
  pageSize.value = data.limit
  refreshTableData()
}

// 自定义按钮点击处理
const handleCustomButtonClick = (key: string) => {
  if (key === 'add') {
    openAddForm()
  }
}

// 打开添加表单
const openAddForm = () => {
  // 重置表单数据 - 同时重置父组件formData和子组件内部model
  const resetData = {
    id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    gender: 'male',
    status: true
  }

  // 更新父组件的formData（正确访问ref对象的值）
  Object.assign(formData.value, resetData)

  // 更新SunlightForm内部的model
  if (formRef.value) {
    Object.assign(formRef.value.model, resetData)
  }

  formDrawerVisible.value = true
}

// 表单提交
const handleFormSubmit = async () => {
  if (!formRef.value) return

  submitting.value = true

  try {
    // 执行表单验证
    const isValid = await formRef.value.validate()

    if (isValid) {
      // 验证通过，获取表单数据
      const formValues = formRef.value.model || {}
      // 添加用户
      const newUser: User = {
        ...formValues,
        id: `user-${Date.now()}`
      }
      mockDatabase.value.unshift(newUser)
      ElMessage.success('用户添加成功！')

      formDrawerVisible.value = false
      // 新增用户后重置到第一页，确保新数据显示在表格上
      currentPage.value = 1
      refreshTableData()
    }
  } catch (error) {
    console.error('表单验证失败:', error)
    ElMessage.error('操作失败，请重试！')
  } finally {
    submitting.value = false
  }
}

// 删除用户
const handleDelete = (row: User) => {
  ElMessageBox.confirm('确定要删除该用户吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      mockDatabase.value = mockDatabase.value.filter(item => item.id !== row.id)
      refreshTableData()
      ElMessage.success('删除成功！')
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

// =============================================================================
// 初始化
// =============================================================================

// 初始化表格数据
refreshTableData()
</script>

<style scoped>
.card-header {
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  display: block;
  margin-bottom: 12px;
}

.description {
  margin-top: 12px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}

.description p {
  margin: 4px 0;
  color: #606266;
}

.demo-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
}

.search-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

:deep(.el-drawer__body) {
  padding: 20px;
}
</style>
