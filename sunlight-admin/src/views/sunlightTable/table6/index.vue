<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightTable 案例6 - 带边框和斑马纹的表格</span>
    </div>

    <!-- 带边框和斑马纹的表格：通过 tableProps 传递 stripe 和 border 属性 -->
    <SunlightTable :data="tableData" :columns="columns" :table-props="{ stripe: true, border: true }" />
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightTable } from 'sunlight-ui'

// 模拟数据
async function fetchTableData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '张三', age: 25, city: '北京', status: '在职' },
        { id: 2, name: '李四', age: 30, city: '上海', status: '在职' },
        { id: 3, name: '王五', age: 28, city: '广州', status: '离职' },
        { id: 4, name: '赵六', age: 32, city: '深圳', status: '在职' },
        { id: 5, name: '钱七', age: 26, city: '杭州', status: '在职' }
      ])
    }, 300)
  })
}

// 表格数据
const tableData = ref([])

// 列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'status', label: '状态', width: 100 }
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
