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
        :total="total"
        @refresh="handleRefresh"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { SunlightTable } from 'sunlight-ui'

const toolbarConfig = reactive({
  showDensity: true,
  showColumnConfig: true,
  showRefresh: true,
  customButtons: [
    {
      key: 'add',
      label: '新增',
      icon: 'Plus',
      type: 'primary',
      position: 'left'
    },
    {
      key: 'batch-delete',
      label: '批量删除',
      icon: 'Delete',
      type: 'danger',
      position: 'left'
    }
  ]
})

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(50)

const columns = [
  {
    label: '基本信息',
    children: [
      { prop: 'id', label: 'ID', width: 70 },
      { prop: 'name', label: '姓名', width: 90 },
      { prop: 'gender', label: '性别', width: 70 },
      { prop: 'age', label: '年龄', width: 70 },
      { prop: 'phone', label: '手机号', width: 140 }
    ]
  },
  {
    label: '联系信息',
    children: [
      { prop: 'email', label: '邮箱', width: 200 },
      { prop: 'city', label: '城市', width: 100 },
      { prop: 'address', label: '详细地址', width: 250 }
    ]
  },
  {
    label: '工作信息',
    children: [
      { prop: 'department', label: '部门', width: 100 },
      { prop: 'position', label: '职位', width: 100 },
      { prop: 'level', label: '职级', width: 100 },
      { prop: 'team', label: '团队', width: 100 }
    ]
  },
  {
    label: '薪资信息',
    children: [
      { prop: 'salary', label: '基本薪资', width: 120 },
      { prop: 'bonus', label: '绩效奖金', width: 120 },
      { prop: 'totalSalary', label: '总薪资', width: 120 }
    ]
  },
  {
    label: '入职信息',
    children: [
      { prop: 'entryType', label: '入职类型', width: 100 },
      { prop: 'probation', label: '试用期', width: 100 },
      { prop: 'joinDate', label: '入职日期', width: 120 }
    ]
  },
  {
    label: '状态信息',
    children: [
      { prop: 'status', label: '在职状态', width: 100 },
      { prop: 'manager', label: '直属上级', width: 100 }
    ]
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
const genders = ['男', '女']
const statuses = ['在职', '离职', '休假中', '试用期']
const entryTypes = ['社招', '校招', '内推', '外包']
const teams = ['前端组', '后端组', '移动端组', '测试组', '运维组', '数据组', 'AI组', '安全组']
const managers = ['张经理', '李经理', '王经理', '赵经理', '刘经理']
const levels = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7']

const allData = []
for (let i = 1; i <= 50; i++) {
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const name = names[Math.floor(Math.random() * names.length)]
  const salary = 8000 + Math.floor(Math.random() * 25000)
  const bonus = Math.floor(salary * 0.1 * Math.random() * 5)
  const year = 2020 + Math.floor(Math.random() * 5)
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')

  allData.push({
    id: i,
    name: `${surname}${name}`,
    gender: genders[Math.floor(Math.random() * genders.length)],
    age: 22 + Math.floor(Math.random() * 30),
    phone: `1${3 | 5 | 8}${Math.floor(Math.random() * 90000000 + 10000000)}`,
    email: `user${i}@example.com`,
    city: cities[Math.floor(Math.random() * cities.length)],
    address: `${cities[Math.floor(Math.random() * cities.length)]}某区某街道某号`,
    department: departments[Math.floor(Math.random() * departments.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    level: levels[Math.floor(Math.random() * levels.length)],
    team: teams[Math.floor(Math.random() * teams.length)],
    salary,
    bonus,
    totalSalary: salary + bonus,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    entryType: entryTypes[Math.floor(Math.random() * entryTypes.length)],
    probation: Math.random() > 0.5 ? '3个月' : '6个月',
    manager: managers[Math.floor(Math.random() * managers.length)],
    joinDate: `${year}-${month}-${day}`
  })
}

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

const loadData = async () => {
  const result = await fetchTableData(currentPage.value, pageSize.value)
  tableData.value = result.data
  total.value = result.total
}

const handleRefresh = () => {
  loadData()
}

watch([currentPage, pageSize], () => {
  loadData()
})

loadData()
</script>
