<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightTable 案例13 - 列对齐方式</span>
    </div>

    <!-- 列对齐方式：在列配置中设置 align 和 headerAlign 属性 -->
    <SunlightTable :data="tableData" :columns="columns" :table-props="{ border: true }" />
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
        { id: 1, name: '张三', age: 25, salary: 8000, city: '北京' },
        { id: 2, name: '李四', age: 30, salary: 12000, city: '上海' },
        { id: 3, name: '王五', age: 28, salary: 9500, city: '广州' },
        { id: 4, name: '赵六', age: 32, salary: 15000, city: '深圳' },
        { id: 5, name: '钱七', age: 26, salary: 7000, city: '杭州' }
      ])
    }, 300)
  })
}

// 表格数据
const tableData = ref([])

// 列配置：使用 align 控制列内容对齐，headerAlign 控制表头对齐
const columns = [
  {
    prop: 'id',
    label: 'ID',
    width: 100,
    align: 'left', // 左对齐
    headerAlign: 'left' // 表头左对齐
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120,
    align: 'center', // 居中对齐
    headerAlign: 'center' // 表头居中对齐
  },
  {
    prop: 'age',
    label: '年龄',
    width: 100,
    align: 'right', // 右对齐
    headerAlign: 'right' // 表头右对齐
  },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    align: 'right', // 数字通常右对齐
    headerAlign: 'center' // 表头可以居中对齐
  },
  {
    prop: 'city',
    label: '城市',
    width: 120,
    align: 'left', // 文本左对齐
    headerAlign: 'left' // 表头左对齐
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
