<template>
  <div>
    <el-card>
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
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { SunlightTable } from 'sunlight-ui'

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const hideColumns = ref([])

const columns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'city', label: '城市' },
  { prop: 'department', label: '部门' },
  { prop: 'position', label: '职位' },
  { prop: 'salary', label: '薪资' },
  { prop: 'status', label: '状态' },
  { prop: 'phone', label: '手机号' },
  { prop: 'joinDate', label: '入职日期', width: 120 }
]

const tableProps = {
  border: true,
  showSummary: true,
  summaryMethod: ({ columns, data }) => {
    const sums = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计'
        return
      }
      if (
        column.property === 'name' ||
        column.property === 'age' ||
        column.property === 'city' ||
        column.property === 'department' ||
        column.property === 'position' ||
        column.property === 'status' ||
        column.property === 'phone' ||
        column.property === 'joinDate'
      ) {
        sums[index] = ''
        return
      }
      const values = data.map(item => Number(item[column.property]))
      if (!values.every(value => isNaN(value))) {
        const sum = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          }
          return prev
        }, 0)
        sums[index] = sum.toLocaleString()
      } else {
        sums[index] = ''
      }
    })
    return sums
  }
}

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

const allData = []
for (let i = 1; i <= 100; i++) {
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const name = names[Math.floor(Math.random() * names.length)]
  const dept = departments[Math.floor(Math.random() * departments.length)]

  allData.push({
    id: i,
    name: `${surname}${name}`,
    age: 22 + Math.floor(Math.random() * 30),
    city: cities[Math.floor(Math.random() * cities.length)],
    department: dept,
    position: positions[Math.floor(Math.random() * positions.length)],
    salary: 8000 + Math.floor(Math.random() * 25000),
    status: i % 10 === 0 ? '离职' : i % 8 === 0 ? '休假中' : i % 5 === 0 ? '试用期' : '在职',
    phone: `1${3 | 5 | 8}${Math.floor(Math.random() * 90000000 + 10000000)}`,
    joinDate: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(
      2,
      '0'
    )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
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

watch([currentPage, pageSize], () => {
  loadData()
})

loadData()
</script>
