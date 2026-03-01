<template>
  <div>
    <el-card>
      <SunlightTable
        :data="tableData"
        :columns="columns"
        :toolbar-config="toolbarConfig"
        :show-pagination="true"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        v-model:hide-columns="hideColumns"
        :total="total"
        :search-columns="searchColumns"
        v-model:search-param="searchParam"
        v-model:visible-search-columns="visibleSearchColumns"
        :search-collapsed="searchCollapsed"
        :search-theme-style="searchThemeStyle"
        @refresh="handleRefresh"
        @search="handleSearch"
        @reset="handleReset"
      >
        <template #isActive="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'" size="small">
            {{ row.isActive ? '已激活' : '未激活' }}
          </el-tag>
        </template>
        <template #tags="{ row }">
          <el-tag v-for="tag in row.tags" :key="tag" size="small" class="tag-item">
            {{ tag }}
          </el-tag>
        </template>
      </SunlightTable>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { SunlightTable } from 'sunlight-ui'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/store/modules/global'

const globalStore = useGlobalStore()
const { primary } = storeToRefs(globalStore)

const toolbarConfig = reactive({
  showDensity: true,
  showColumnConfig: true,
  showRefresh: true,
  showSearchConfig: true
})

const searchThemeStyle = computed(() => ({
  borderColor: primary.value,
  focusBorderColor: primary.value,
  focusBoxShadow: `0 0 0 3px ${primary.value}26`
}))

const visibleSearchColumns = ref([
  'name',
  'status',
  'department',
  'city',
  'dateRange',
  'salaryRange',
  'isActive',
  'position',
  'hireDate',
  'tags',
  'education'
])
const searchCollapsed = ref(false)

const searchParam = reactive({
  name: '',
  status: null,
  department: null,
  city: null,
  position: [],
  hireDate: null,
  dateRange: [],
  salaryRange: [],
  tags: [],
  education: null,
  isActive: null
})

async function fetchCityOptions() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    { label: '北京', value: '北京' },
    { label: '上海', value: '上海' },
    { label: '广州', value: '广州' },
    { label: '深圳', value: '深圳' },
    { label: '杭州', value: '杭州' },
    { label: '南京', value: '南京' },
    { label: '武汉', value: '武汉' },
    { label: '成都', value: '成都' },
    { label: '西安', value: '西安' },
    { label: '重庆', value: '重庆' }
  ]
}

const searchColumns = [
  {
    prop: 'name',
    label: '用户姓名',
    type: 'input',
    placeholder: '请输入姓名',
    span: 6,
    attrs: {
      prefixIcon: 'User',
      clearable: true
    }
  },
  {
    prop: 'status',
    label: '员工状态',
    type: 'select',
    placeholder: '请选择状态',
    span: 6,
    options: [
      { label: '在职', value: '在职' },
      { label: '离职', value: '离职' },
      { label: '休假中', value: '休假中' },
      { label: '试用期', value: '试用期' }
    ],
    clearable: true
  },
  {
    prop: 'department',
    label: '部门',
    type: 'select',
    placeholder: '请选择部门',
    span: 6,
    options: [
      { label: '在职', value: '在职' },
      { label: '离职', value: '离职' },
      { label: '休假中', value: '休假中' },
      { label: '试用期', value: '试用期' }
    ],
    clearable: true,
    disableToggle: true // 不可隐藏
  },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    placeholder: '请选择城市（异步加载）',
    span: 6,
    options: () => fetchCityOptions(),
    clearable: true
  },
  {
    prop: 'position',
    label: '职位',
    type: 'select',
    placeholder: '请选择职位',
    span: 6,
    multiple: true,
    options: [
      { label: '员工', value: '员工' },
      { label: '主管', value: '主管' },
      { label: '经理', value: '经理' },
      { label: '总监', value: '总监' },
      { label: '副总裁', value: '副总裁' },
      { label: '总经理', value: '总经理' }
    ],
    clearable: true
  },
  {
    prop: 'isActive',
    label: '账户状态',
    type: 'select',
    placeholder: '请选择账户状态',
    span: 6,
    multiple: true,
    options: [
      { label: '已激活', value: true },
      { label: '未激活', value: false }
    ]
  },
  {
    prop: 'hireDate',
    label: '入职日期',
    type: 'date-picker',
    placeholder: '请选择入职日期',
    span: 6,
    config: {
      type: 'date',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  }
  // {
  //   prop: 'dateRange',
  //   label: '日期范围',
  //   type: 'date-picker',
  //   placeholder: ['开始日期', '结束日期'],
  //   span: 6,
  //   config: {
  //     type: 'daterange',
  //     rangeSeparator: '至',
  //     startPlaceholder: '开始日期',
  //     endPlaceholder: '结束日期',
  //     format: 'YYYY-MM-DD',
  //     valueFormat: 'YYYY-MM-DD'
  //   }
  // },
]

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const hideColumns = ref([])

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  {
    prop: 'age',
    label: '年龄',
    width: 100,
    filterable: true,
    filters: [
      { text: '青年（<25岁）', value: 'young' },
      { text: '中年（25-35岁）', value: 'middle' },
      { text: '资深（>35岁）', value: 'senior' }
    ],
    filterMethod: (value, row) => {
      if (value === 'young') {
        return row.age < 25
      } else if (value === 'middle') {
        return row.age >= 25 && row.age <= 35
      } else if (value === 'senior') {
        return row.age > 35
      }
      return true
    }
  },
  {
    prop: 'city',
    label: '城市',
    width: 120,
    filterable: true,
    filters: [
      { text: '一线城市', value: 'tier1' },
      { text: '其他城市', value: 'other' }
    ],
    filterMethod: (value, row) => {
      const tier1Cities = ['北京', '上海', '深圳', '广州']
      if (value === 'tier1') {
        return tier1Cities.includes(row.city)
      } else {
        return !tier1Cities.includes(row.city)
      }
    }
  },
  {
    prop: 'department',
    label: '部门',
    width: 120,
    filterable: true,
    filters: [
      { text: '技术部', value: '技术部' },
      { text: '市场部', value: '市场部' },
      { text: '销售部', value: '销售部' },
      { text: '人事部', value: '人事部' },
      { text: '财务部', value: '财务部' }
    ],
    filterMethod: (value, row) => {
      return value.includes(row.department)
    }
  },
  { prop: 'position', label: '职位', width: 120 },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    filterable: true,
    filters: [
      { text: '高薪（≥15000）', value: 'high' },
      { text: '中薪（8000-15000）', value: 'medium' },
      { text: '低薪（<8000）', value: 'low' }
    ],
    filterMethod: (value, row) => {
      if (value === 'high') {
        return row.salary >= 15000
      } else if (value === 'medium') {
        return row.salary >= 8000 && row.salary < 15000
      } else if (value === 'low') {
        return row.salary < 8000
      }
      return true
    }
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    filterable: {
      filterMultiple: false
    },
    filters: [
      { text: '在职', value: '在职' },
      { text: '离职', value: '离职' },
      { text: '休假中', value: '休假中' },
      { text: '试用期', value: '试用期' }
    ]
  },
  { prop: 'hireDate', label: '入职日期', width: 120 },
  {
    prop: 'education',
    label: '学历',
    width: 80
  },
  {
    prop: 'isActive',
    label: '账户状态',
    width: 100,
    slotName: 'isActive'
  },
  {
    prop: 'tags',
    label: '技能标签',
    width: 200,
    slotName: 'tags'
  }
]

const surnames = [
  '张',
  '王',
  '李',
  '赵',
  '刘',
  '陈',
  '杨',
  '黄',
  '周',
  '吴',
  '徐',
  '孙',
  '马',
  '朱',
  '胡',
  '郭',
  '林',
  '何',
  '高',
  '罗'
]
const names = [
  '伟',
  '芳',
  '娜',
  '敏',
  '静',
  '丽',
  '强',
  '磊',
  '军',
  '洋',
  '勇',
  '艳',
  '杰',
  '娟',
  '涛',
  '霞',
  '明',
  '秀英',
  '华',
  '平'
]
const cities = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '南京',
  '武汉',
  '成都',
  '西安',
  '重庆',
  '苏州',
  '天津',
  '长沙',
  '郑州',
  '青岛'
]
const departments = ['技术部', '市场部', '销售部', '人事部', '财务部', '运营部', '产品部', '客服部']
const positions = ['员工', '主管', '经理', '总监', '副总裁', '总经理']
const educations = ['大专', '本科', '硕士', '博士']
const allSkills = ['JavaScript', 'TypeScript', 'Vue', 'React', 'Node.js', 'Python']

const allData = []
for (let i = 1; i <= 100; i++) {
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const name = names[Math.floor(Math.random() * names.length)]
  const dept = departments[Math.floor(Math.random() * departments.length)]
  const salary = 5000 + Math.floor(Math.random() * 20000)
  const age = 22 + Math.floor(Math.random() * 20)

  let status
  const statusRand = Math.random()
  if (statusRand < 0.6) {
    status = '在职'
  } else if (statusRand < 0.75) {
    status = '离职'
  } else if (statusRand < 0.85) {
    status = '休假中'
  } else {
    status = '试用期'
  }

  const hireYear = 2020 + Math.floor(Math.random() * 5)
  const hireMonth = 1 + Math.floor(Math.random() * 12)
  const hireDay = 1 + Math.floor(Math.random() * 28)
  const hireDate = `${hireYear}-${String(hireMonth).padStart(2, '0')}-${String(hireDay).padStart(2, '0')}`

  const skillCount = 1 + Math.floor(Math.random() * 4)
  const skills = []
  const shuffledSkills = [...allSkills].sort(() => Math.random() - 0.5)
  for (let j = 0; j < skillCount; j++) {
    skills.push(shuffledSkills[j])
  }

  allData.push({
    id: i,
    name: `${surname}${name}`,
    age,
    city: cities[Math.floor(Math.random() * cities.length)],
    department: dept,
    position: positions[Math.floor(Math.random() * positions.length)],
    salary,
    status,
    hireDate,
    tags: skills,
    education: educations[Math.floor(Math.random() * educations.length)],
    isActive: Math.random() > 0.2
  })
}

function fetchTableData(page = 1, pageSizeVal = 10, searchData = {}) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('fetchTableData - searchData:', searchData)
      console.log('fetchTableData - allData length:', allData.length)
      console.log('fetchTableData - allData[0]:', allData[0])

      let filteredData = [...allData]
      console.log('过滤前数量:', filteredData.length)

      if (searchData.name) {
        console.log('过滤 name:', searchData.name)
        filteredData = filteredData.filter(item => item.name.includes(searchData.name))
        console.log('过滤后数量:', filteredData.length)
      }
      if (searchData.status) {
        filteredData = filteredData.filter(item => item.status === searchData.status)
      }
      if (searchData.department) {
        filteredData = filteredData.filter(item => item.department === searchData.department)
      }
      if (searchData.city) {
        filteredData = filteredData.filter(item => item.city === searchData.city)
      }
      if (searchData.position && searchData.position.length > 0) {
        filteredData = filteredData.filter(item => searchData.position.includes(item.position))
      }
      if (searchData.hireDate) {
        filteredData = filteredData.filter(item => item.hireDate >= searchData.hireDate)
      }
      if (searchData.dateRange && searchData.dateRange.length === 2) {
        filteredData = filteredData.filter(
          item => item.hireDate >= searchData.dateRange[0] && item.hireDate <= searchData.dateRange[1]
        )
      }
      if (searchData.salaryRange && searchData.salaryRange.length > 0) {
        filteredData = filteredData.filter(item => {
          return searchData.salaryRange.some(range => {
            if (Array.isArray(range)) {
              return item.salary >= range[0] && item.salary < range[1]
            }
            return false
          })
        })
      }
      if (searchData.education) {
        filteredData = filteredData.filter(item => item.education === searchData.education)
      }
      if (searchData.isActive !== null && searchData.isActive !== undefined) {
        filteredData = filteredData.filter(item => item.isActive === searchData.isActive)
      }
      if (searchData.tags && searchData.tags.length > 0) {
        filteredData = filteredData.filter(item => searchData.tags.some(tag => item.tags.includes(tag)))
      }

      const start = (page - 1) * pageSizeVal
      const end = start + pageSizeVal
      resolve({
        data: filteredData.slice(start, end),
        total: filteredData.length
      })
    }, 300)
  })
}

const loadData = async () => {
  const result = await fetchTableData(currentPage.value, pageSize.value, searchParam)
  tableData.value = result.data
  total.value = result.total
}

const handleRefresh = () => {
  console
  loadData()
}

const handleSearch = searchData => {
  console.log('搜索参数:', searchData)
  currentPage.value = 1
  fetchTableData(currentPage.value, pageSize.value, searchData).then(result => {
    tableData.value = result.data
    total.value = result.total
  })
}

const handleReset = () => {
  console.log('重置搜索条件ces')
  Object.keys(searchParam).forEach(key => {
    if (Array.isArray(searchParam[key])) {
      searchParam[key] = []
    } else if (typeof searchParam[key] === 'string') {
      searchParam[key] = ''
    } else {
      searchParam[key] = null
    }
  })
  currentPage.value = 1
  fetchTableData(currentPage.value, pageSize.value, searchParam).then(result => {
    tableData.value = result.data
    total.value = result.total
  })
}

watch([currentPage, pageSize], () => {
  loadData()
})

loadData()
</script>
