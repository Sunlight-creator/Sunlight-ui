<template>
  <div>
    <el-card>
      <!-- 配置化行内编辑：通过 columns 配置 editable 属性即可实现编辑功能 -->
      <SunlightTable
        :data="tableData"
        :columns="columns"
        :table-props="{ border: true }"
        :show-pagination="true"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @update:current-page="currentPage = $event"
        @update:page-size="pageSize = $event"
      >
        <!-- 操作列：如果需要自定义操作按钮，可以保留插槽 -->
        <template #action="{ row }">
          <el-button type="primary" size="small" @click="handleSave(row)">保存</el-button>
          <el-button size="small" @click="handleReset(row)">重置</el-button>
        </template>
      </SunlightTable>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { SunlightTable } from 'sunlight-ui'
import { ElMessage } from 'element-plus'

// 模拟数据源
const departments = ['技术部', '产品部', '运营部', '市场部', '人事部', '财务部', '销售部', '客服部', '设计部', '测试部']
const managers = ['张总', '刘总', '陈总', '王总', '李总', '赵总', '孙总', '周总', '吴总', '郑总']
const cities = ['北京', '上海', '广州', '深圳', '杭州', '南京', '武汉', '成都', '西安', '重庆']
const statusOptions = ['active', 'inactive']
const types = ['研发', '运营', '销售', '管理', '支持']

// 生成所有数据（100条）
const allData = []
for (let i = 1; i <= 100; i++) {
  const deptIndex = Math.floor(Math.random() * departments.length)
  const managerIndex = Math.floor(Math.random() * managers.length)
  const cityIndex = Math.floor(Math.random() * cities.length)
  const typeIndex = Math.floor(Math.random() * types.length)

  allData.push({
    id: i,
    name: departments[deptIndex],
    manager: managers[managerIndex],
    employeeCount: 5 + Math.floor(Math.random() * 50),
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    createDate: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(
      2,
      '0'
    )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    city: cities[cityIndex],
    type: types[typeIndex],
    budget: 50000 + Math.floor(Math.random() * 500000),
    phone: `1${3 | 5 | 8}${Math.floor(Math.random() * 90000000 + 10000000)}`,
    email: `dept${i}@company.com`,
    address: `${cities[cityIndex]}市${
      ['朝阳区', '海淀区', '浦东新区', '天河区', '南山区'][Math.floor(Math.random() * 5)]
    }${['科技园', '商务区', '工业园', '创业园'][Math.floor(Math.random() * 4)]}`,
    description: `这是${departments[deptIndex]}的详细描述信息`
  })
}

// 表格数据
const tableData = ref([])
// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
// 保存原始数据，用于重置
const originalData = ref({})

// 列配置：通过 editable 属性配置可编辑列，无需编写插槽
// 优势：代码简洁，易于维护，支持多种编辑类型
const columns = [
  {
    prop: 'id',
    label: 'ID',
    width: 80
    // editable 未设置，默认为不可编辑（只读）
  },
  {
    prop: 'name',
    label: '部门名称',
    width: 150,
    editable: true, // ✅ 设置为可编辑
    editType: 'input', // 使用文本输入框
    editProps: {
      placeholder: '请输入部门名称',
      maxlength: 50
    }
  },
  {
    prop: 'manager',
    label: '负责人',
    width: 120,
    editable: true, // ✅ 设置为可编辑
    editType: 'input', // 使用文本输入框
    editProps: {
      placeholder: '请输入负责人'
    }
  },
  {
    prop: 'employeeCount',
    label: '人数',
    width: 100,
    editable: true, // ✅ 设置为可编辑
    editType: 'input-number', // 使用数字输入框
    editProps: {
      min: 0,
      max: 9999,
      precision: 0
    }
  },
  {
    prop: 'status',
    label: '状态',
    width: 120,
    editable: true, // ✅ 设置为可编辑
    editType: 'select', // 使用下拉选择器
    editOptions: [
      { label: '启用', value: 'active' },
      { label: '禁用', value: 'inactive' }
    ],
    editProps: {
      placeholder: '请选择状态'
    }
  },
  {
    prop: 'type',
    label: '类型',
    width: 120,
    editable: true, // ✅ 设置为可编辑
    editType: 'select', // 使用下拉选择器
    editOptions: [
      { label: '研发', value: '研发' },
      { label: '运营', value: '运营' },
      { label: '销售', value: '销售' },
      { label: '管理', value: '管理' },
      { label: '支持', value: '支持' }
    ],
    editProps: {
      placeholder: '请选择类型'
    }
  },
  {
    prop: 'city',
    label: '城市',
    width: 120,
    editable: true, // ✅ 设置为可编辑
    editType: 'select', // 使用下拉选择器
    editOptions: cities.map(city => ({ label: city, value: city })),
    editProps: {
      placeholder: '请选择城市'
    }
  },
  {
    prop: 'budget',
    label: '预算(元)',
    width: 150,
    editable: true, // ✅ 设置为可编辑
    editType: 'input-number', // 使用数字输入框
    editProps: {
      min: 0,
      max: 10000000,
      precision: 0,
      step: 1000
    }
  },
  {
    prop: 'createDate',
    label: '创建日期',
    width: 150,
    editable: true, // ✅ 设置为可编辑
    editType: 'date-picker', // 使用日期选择器
    editProps: {
      type: 'date',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请选择日期'
    }
  },
  {
    prop: 'phone',
    label: '联系电话',
    width: 150,
    editable: true, // ✅ 设置为可编辑
    editType: 'input', // 使用文本输入框
    editProps: {
      placeholder: '请输入联系电话',
      maxlength: 11
    }
  },
  {
    prop: 'email',
    label: '邮箱',
    width: 180,
    editable: true, // ✅ 设置为可编辑
    editType: 'input', // 使用文本输入框
    editProps: {
      placeholder: '请输入邮箱地址',
      type: 'email'
    }
  },
  {
    prop: 'address',
    label: '地址',
    width: 200,
    editable: true, // ✅ 设置为可编辑
    editType: 'textarea', // 使用多行文本输入框
    editProps: {
      placeholder: '请输入地址',
      rows: 2,
      maxlength: 200
    }
  },
  {
    prop: 'description',
    label: '描述',
    width: 200
    // 不可编辑，只读显示
  },
  {
    prop: 'action',
    label: '操作',
    width: 180,
    fixed: 'right',
    align: 'center',
    slotName: 'action' // 操作列使用自定义插槽
  }
]

// 模拟分页数据获取
function fetchTableData(page = 1, pageSizeVal = 10) {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * pageSizeVal
      const end = start + pageSizeVal
      resolve({
        data: allData.slice(start, end),
        total: allData.length
      })
    }, 300)
  })
}

// 加载数据
const loadData = async () => {
  const result = await fetchTableData(currentPage.value, pageSize.value)
  tableData.value = result.data
  total.value = result.total
  // 每次加载数据后，重新保存原始数据
  initOriginalData()
}

// 初始化时保存原始数据
const initOriginalData = () => {
  tableData.value.forEach(row => {
    originalData.value[row.id] = { ...row }
  })
}

// 保存操作
const handleSave = row => {
  // 验证数据
  if (!row.name || !row.name.trim()) {
    ElMessage.warning('部门名称不能为空')
    return
  }
  if (!row.manager || !row.manager.trim()) {
    ElMessage.warning('负责人不能为空')
    return
  }
  if (row.employeeCount < 0) {
    ElMessage.warning('人数不能为负数')
    return
  }
  if (row.budget < 0) {
    ElMessage.warning('预算不能为负数')
    return
  }

  // 这里可以调用 API 保存数据
  console.log('保存数据：', row)
  ElMessage.success('保存成功')

  // 更新原始数据
  originalData.value[row.id] = { ...row }
}

// 重置操作：恢复为原始数据
const handleReset = row => {
  if (originalData.value[row.id]) {
    Object.assign(row, originalData.value[row.id])
    ElMessage.info('已重置为原始数据')
  } else {
    ElMessage.warning('没有可重置的数据')
  }
}

// 监听分页变化
watch([currentPage, pageSize], () => {
  loadData()
})

// 初始化加载数据
loadData()
</script>
