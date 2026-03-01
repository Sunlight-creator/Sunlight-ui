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
        <el-button type="primary" size="small" @click="handleEdit(scope.row)">
          <el-icon><Edit /></el-icon> 编辑
        </el-button>
        <el-button type="danger" size="small" @click="handleDelete(scope.row)">
          <el-icon><Delete /></el-icon> 删除
        </el-button>
      </template>
    </SunlightTable>

    <!-- 新增/编辑表单对话框 -->
    <SunlightDialog
      v-model:visible="formDialogVisible"
      :title="isEditMode ? '编辑用户' : '添加用户'"
      width="80%"
      :show-footer="true"
      :loading="submitting"
      @on-confirm="handleFormSubmit"
    >
      <SunlightForm ref="formRef" v-model="formData" :columns="formColumns" :form-options="formOptions" />
    </SunlightDialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { SunlightTable, SunlightForm, SunlightDialog } from 'sunlight-ui'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'

// 用户数据类型
interface User {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  gender: 'male' | 'female'
  status: boolean
  age: number
  address: string
  hireDate: string
  education: string
  salary: number
  married: boolean
}

// 生成随机用户数据
const generateRandomData = () => {
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
  const educations = ['大专', '本科', '硕士', '博士']
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安']

  const data = []
  for (let i = 1; i <= 50; i++) {
    const surname = surnames[Math.floor(Math.random() * surnames.length)]
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const name = surname + firstName
    const city = cities[Math.floor(Math.random() * cities.length)]

    // 生成随机日期（最近5年内）
    const end = new Date()
    const start = new Date(end.getFullYear() - 5, end.getMonth(), end.getDate())
    const hireDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

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
      status: Math.random() > 0.3,
      age: Math.floor(Math.random() * 40) + 20, // 20-60岁
      address: `${city}市${Math.floor(Math.random() * 1000)}号`,
      hireDate: hireDate.toISOString().split('T')[0], // YYYY-MM-DD格式
      education: educations[Math.floor(Math.random() * educations.length)],
      salary: Math.floor(Math.random() * 20000) + 5000, // 5000-25000元
      married: Math.random() > 0.5
    })
  }
  return data
}

// 原始数据（用于重置）
const allData = generateRandomData()

// 表格数据
const tableData = ref<User[]>([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

// 动态数据库（用于增删改）
const mockDatabase = ref<User[]>(JSON.parse(JSON.stringify(allData)))

// 组件引用
const tableRef = ref()
const formRef = ref()

// 对话框控制
const formDialogVisible = ref(false)
const submitting = ref(false)

// 编辑模式状态
const isEditMode = ref(false)
const currentEditRow = ref<User | null>(null)

// 表单数据
const formData = ref({
  id: '',
  name: '',
  email: '',
  phone: '',
  department: '',
  position: '',
  gender: 'male' as 'male' | 'female',
  status: true,
  age: 0,
  address: '',
  hireDate: '',
  education: '',
  salary: 0,
  married: false
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
    attrs: { clearable: true }
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    span: 6,
    attrs: { clearable: true, type: 'email' }
  }
]

// 表格列配置
const tableColumns = [
  { prop: 'name', label: '姓名', align: 'center' },
  { prop: 'email', label: '邮箱', align: 'center' },
  { prop: 'phone', label: '手机号', align: 'center' },
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
  { prop: 'position', label: '职位', align: 'center' },
  { prop: 'gender', label: '性别', slotName: 'gender', align: 'center' },
  { prop: 'status', label: '状态', slotName: 'status', align: 'center' },
  { label: '操作', slotName: 'operation', align: 'center' }
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
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字', trigger: 'blur' },
    { min: 18, max: 65, message: '年龄在 18 到 65 岁之间', trigger: 'blur' }
  ],
  education: [{ required: true, message: '请选择学历', trigger: 'change' }],
  hireDate: [{ required: true, message: '请选择入职日期', trigger: 'change' }],
  salary: [
    { required: true, message: '请输入薪资', trigger: 'blur' },
    { type: 'number', message: '薪资必须为数字', trigger: 'blur' },
    { min: 3000, max: 50000, message: '薪资在 3000 到 50000 元之间', trigger: 'blur' }
  ]
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

// 学历选项
const educationOptions = [
  { value: '大专', label: '大专' },
  { value: '本科', label: '本科' },
  { value: '硕士', label: '硕士' },
  { value: '博士', label: '博士' }
]

// 表单列配置
const formColumns = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 6,
    placeholder: '请输入姓名',
    clearable: true,
    rules: rules.name
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 6,
    placeholder: '请输入邮箱',
    inputType: 'email',
    clearable: true,
    rules: rules.email
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    span: 6,
    placeholder: '请输入手机号',
    inputType: 'tel',
    clearable: true,
    rules: rules.phone
  },
  {
    prop: 'department',
    label: '部门',
    type: 'select',
    span: 6,
    placeholder: '请选择部门',
    options: departmentOptions,
    clearable: true,
    rules: rules.department
  },
  {
    prop: 'position',
    label: '职位',
    type: 'input',
    span: 6,
    placeholder: '请输入职位',
    clearable: true,
    rules: rules.position
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'input',
    span: 6,
    placeholder: '请输入年龄',
    inputType: 'number',
    clearable: true,
    rules: rules.age
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'radio',
    span: 6,
    options: genderOptions,
    isGroup: true
  },
  {
    prop: 'status',
    label: '状态',
    type: 'radio',
    span: 6,
    options: [
      { value: true, label: '启用' },
      { value: false, label: '禁用' }
    ],
    isGroup: true
  },
  {
    prop: 'address',
    label: '地址',
    type: 'input',
    span: 6,
    placeholder: '请输入地址',
    clearable: true
  },
  {
    prop: 'hireDate',
    label: '入职日期',
    type: 'date-picker',
    span: 6,
    placeholder: '请选择入职日期',
    clearable: true,
    rules: rules.hireDate
  },
  {
    prop: 'education',
    label: '学历',
    type: 'select',
    span: 6,
    placeholder: '请选择学历',
    options: educationOptions,
    clearable: true,
    rules: rules.education
  },
  {
    prop: 'salary',
    label: '薪资',
    type: 'input',
    span: 6,
    placeholder: '请输入薪资',
    inputType: 'number',
    clearable: true,
    rules: rules.salary
  },
  {
    prop: 'married',
    label: '婚姻状况',
    type: 'radio',
    span: 6,
    options: [
      { value: true, label: '已婚' },
      { value: false, label: '未婚' }
    ],
    isGroup: true
  }
]

// 表单配置
const formOptions = { labelWidth: '100px', size: 'default' }

// 刷新表格数据
const refreshTableData = () => {
  let filteredData = [...mockDatabase.value]

  // 根据搜索条件过滤
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
const handleSearch = search => {
  // 处理重置事件：search为空对象表示重置
  if (Object.keys(search).length === 0) {
    // 清空搜索参数
    Object.keys(searchParam).forEach(key => {
      if (typeof searchParam[key] === 'string') {
        searchParam[key] = ''
      }
    })

    // 恢复原始数据
    mockDatabase.value = JSON.parse(JSON.stringify(allData))
  } else {
    // 正常搜索
    Object.assign(searchParam, search)
  }

  currentPage.value = 1
  refreshTableData()
}

// 分页变化处理
const handlePagination = data => {
  currentPage.value = data.page
  pageSize.value = data.limit
  refreshTableData()
}

// 自定义按钮点击
const handleCustomButtonClick = key => {
  if (key === 'add') {
    openAddForm()
  }
}

// 打开添加表单
const openAddForm = () => {
  // 设置为添加模式
  isEditMode.value = false
  currentEditRow.value = null

  const resetData = {
    id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    gender: 'male',
    status: true,
    age: 0,
    address: '',
    hireDate: '',
    education: '',
    salary: 0,
    married: false
  }

  // 正确更新ref对象的值
  Object.assign(formData.value, resetData)
  if (formRef.value) {
    Object.assign(formRef.value.model, resetData)
  }

  formDialogVisible.value = true
}

// 打开编辑表单
const handleEdit = row => {
  // 设置为编辑模式
  isEditMode.value = true
  currentEditRow.value = row

  // 预填充表单数据
  Object.assign(formData.value, { ...row })
  if (formRef.value) {
    Object.assign(formRef.value.model, { ...row })
  }

  formDialogVisible.value = true
}

// 表单提交
const handleFormSubmit = async () => {
  if (!formRef.value) return

  submitting.value = true

  try {
    // 执行表单验证
    const isValid = await formRef.value.validate()
    console.log('表单验证结果:', isValid)
    if (isValid) {
      // 验证通过，获取表单数据
      const formValues = formRef.value.model || {}

      if (isEditMode.value && currentEditRow.value) {
        // 编辑模式：更新现有用户
        const index = mockDatabase.value.findIndex(item => item.id === currentEditRow.value?.id)
        if (index !== -1) {
          mockDatabase.value[index] = {
            ...formValues,
            id: currentEditRow.value.id // 保持原有ID不变
          }
          ElMessage.success('用户编辑成功！')
        }
      } else {
        // 添加模式：添加新用户
        const newUser = {
          ...formValues,
          id: `user-${Date.now()}`
        }
        mockDatabase.value.unshift(newUser)
        ElMessage.success('用户添加成功！')
      }

      formDialogVisible.value = false
      currentPage.value = 1
      refreshTableData()
    }
  } catch (error) {
    // console.error('表单验证失败:', error)
    // ElMessage.error('操作失败，请重试！')
  } finally {
    submitting.value = false
  }
}

// 删除用户
const handleDelete = row => {
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

:deep(.el-dialog__body) {
  padding: 20px;
}
</style>
