<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightTable 案例11 - 自定义过滤方法</span>
    </div>

    <!-- 自定义过滤方法：在列配置中设置 filterable: true 和 filterMethod 函数 -->
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
        { id: 1, name: '张三', age: 25, city: '北京', salary: 8000, status: '在职' },
        { id: 2, name: '李四', age: 30, city: '上海', salary: 12000, status: '在职' },
        { id: 3, name: '王五', age: 28, city: '广州', salary: 9500, status: '离职' },
        { id: 4, name: '赵六', age: 32, city: '深圳', salary: 15000, status: '在职' },
        { id: 5, name: '钱七', age: 26, city: '杭州', salary: 7000, status: '在职' },
        { id: 6, name: '孙八', age: 29, city: '北京', salary: 11000, status: '离职' },
        { id: 7, name: '周九', age: 27, city: '上海', salary: 13000, status: '在职' },
        { id: 8, name: '吴十', age: 31, city: '深圳', salary: 14000, status: '在职' }
      ])
    }, 300)
  })
}

// 表格数据
const tableData = ref([])

// 列配置：使用 filterable: true 和 filterMethod 实现自定义过滤
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  {
    prop: 'city',
    label: '城市',
    width: 120,
    filterable: true,
    filters: [
      { text: '一线城市', value: '一线' },
      { text: '其他城市', value: '其他' }
    ],
    // 自定义过滤方法：根据城市等级过滤（北京、上海、深圳、广州为一线城市）
    filterMethod: (value, row) => {
      const tierOneCities = ['北京', '上海', '深圳', '广州']
      if (value === '一线') {
        return tierOneCities.includes(row.city)
      } else {
        return !tierOneCities.includes(row.city)
      }
    }
  },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    filterable: true,
    filters: [
      { text: '高薪（>=10000）', value: 'high' },
      { text: '中薪（5000-10000）', value: 'medium' },
      { text: '低薪（<5000）', value: 'low' }
    ],
    // 自定义过滤方法：根据薪资范围过滤
    filterMethod: (value, row) => {
      if (value === 'high') {
        return row.salary >= 10000
      } else if (value === 'medium') {
        return row.salary >= 5000 && row.salary < 10000
      } else if (value === 'low') {
        return row.salary < 5000
      }
      return true
    }
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    filterable: true,
    filters: [
      { text: '在职', value: '在职' },
      { text: '离职', value: '离职' }
    ]
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
