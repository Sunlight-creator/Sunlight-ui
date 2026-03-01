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
  { prop: 'status', label: '状态' },
  { prop: 'salary', label: '薪资' }
]

const rowClassNameFun = row => {
  if (row.status === '离职') {
    return 'warning-row'
  } else if (row.salary >= 10000) {
    return 'success-row'
  }
  return ''
}

const tableProps = {
  border: true,
  rowClassName: rowClassNameFun,
  rowStyle: ({ row }) => {
    if (row.status === '离职') {
      return { backgroundColor: '#fef0f0' }
    } else if (row.salary >= 10000) {
      return { backgroundColor: '#f0f9eb' }
    }
    return {}
  }
}

const allData = [
  { id: 1, name: '张三', age: 25, status: '在职', salary: 8000 },
  { id: 2, name: '李四', age: 30, status: '在职', salary: 12000 },
  { id: 3, name: '王五', age: 28, status: '离职', salary: 0 },
  { id: 4, name: '赵六', age: 32, status: '在职', salary: 15000 },
  { id: 5, name: '钱七', age: 26, status: '在职', salary: 7000 },
  { id: 6, name: '周八', age: 35, status: '在职', salary: 18000 },
  { id: 7, name: '吴九', age: 29, status: '离职', salary: 0 },
  { id: 8, name: '郑十', age: 27, status: '在职', salary: 9500 },
  { id: 9, name: '刘十一', age: 31, status: '在职', salary: 14000 },
  { id: 10, name: '陈十二', age: 24, status: '离职', salary: 0 }
]

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

<style>
.warning-row {
  color: #e6a23c;
  font-weight: bold;
}

.success-row {
  color: #67c23a;
}
</style>
