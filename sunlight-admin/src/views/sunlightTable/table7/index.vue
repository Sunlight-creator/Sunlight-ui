<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightTable 案例7 - 自定义插槽渲染</span>
    </div>

    <!-- 自定义插槽渲染：在列配置中设置 slotName，然后使用对应的插槽自定义渲染内容 -->
    <SunlightTable :data="tableData" :columns="columns">
      <!-- 自定义状态列：使用 slotName 对应的插槽 -->
      <template #status="{ row }">
        <el-tag :type="row.status === '在职' ? 'success' : 'danger'">
          {{ row.status }}
        </el-tag>
      </template>

      <!-- 自定义操作列：添加操作按钮 -->
      <template #action="{ row }">
        <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </SunlightTable>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightTable } from 'sunlight-ui'
import { ElMessage } from 'element-plus'

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

// 列配置：使用 slotName 指定插槽名称
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'status', label: '状态', width: 100, slotName: 'status' },
  { prop: 'action', label: '操作', width: 180, slotName: 'action' }
]

// 编辑操作
const handleEdit = row => {
  ElMessage.success(`编辑用户：${row.name}`)
  console.log('编辑行数据：', row)
}

// 删除操作
const handleDelete = row => {
  ElMessage.warning(`删除用户：${row.name}`)
  console.log('删除行数据：', row)
}

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
