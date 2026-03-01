<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightTable 案例10 - 自定义排序方法</span>
    </div>

    <!-- 自定义排序方法：在列配置中设置 sortable: 'custom' 和 sortMethod 函数 -->
    <SunlightTable :data="tableData" :columns="columns" />
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightTable } from 'sunlight-ui'

// 模拟数据：类似于 fetchCityOptions，创建一个异步函数返回假数据
async function fetchTableData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '张三', age: 25, salary: 8000, department: '技术部' },
        { id: 2, name: '李四', age: 30, salary: 12000, department: '产品部' },
        { id: 3, name: '王五', age: 28, salary: 9500, department: '技术部' },
        { id: 4, name: '赵六', age: 32, salary: 15000, department: '运营部' },
        { id: 5, name: '钱七', age: 26, salary: 7000, department: '技术部' },
        { id: 6, name: '孙八', age: 29, salary: 11000, department: '产品部' }
      ])
    }, 300)
  })
}

// 表格数据
const tableData = ref([])

// 列配置：使用 sortable: 'custom' 和 sortMethod 实现自定义排序
const columns = [
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120, sortable: true },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    sortable: 'custom',
    // 自定义排序方法：按照薪资从高到低或从低到高排序
    sortMethod: (a, b) => {
      return a.salary - b.salary
    }
  },
  {
    prop: 'department',
    label: '部门',
    width: 120,
    sortable: 'custom',
    // 自定义排序方法：按照部门名称的优先级排序（技术部 > 产品部 > 运营部）
    sortMethod: (a, b) => {
      const deptOrder = { 技术部: 1, 产品部: 2, 运营部: 3 }
      return deptOrder[a.department] - deptOrder[b.department]
    }
  }
]

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
</style>
