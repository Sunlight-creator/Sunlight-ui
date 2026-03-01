<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightTable 案例19 - 表格尺寸和空数据</span>
    </div>

    <!-- 表格尺寸和空数据：通过 tableProps 设置 size 和 emptyText -->
    <div class="controls">
      <el-radio-group v-model="tableSize" @change="handleSizeChange">
        <el-radio-button label="large">大尺寸</el-radio-button>
        <el-radio-button label="default">默认</el-radio-button>
        <el-radio-button label="small">小尺寸</el-radio-button>
      </el-radio-group>
      <el-button @click="toggleData" style="margin-left: 20px">
        {{ hasData ? '清空数据' : '加载数据' }}
      </el-button>
    </div>

    <SunlightTable :data="tableData" :columns="columns" :table-props="tableProps" />
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SunlightTable } from 'sunlight-ui'

// 模拟数据：类似于 fetchCityOptions，创建一个异步函数返回假数据
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
// 表格尺寸
const tableSize = ref('default')
// 是否有数据
const hasData = ref(false)

// 列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'status', label: '状态', width: 100 }
]

// 表格属性配置：动态设置尺寸和空数据提示
const tableProps = computed(() => ({
  border: true,
  size: tableSize.value, // 表格尺寸：large、default、small
  emptyText: '暂无数据，请点击"加载数据"按钮加载数据' // 空数据时显示的文本
}))

// 切换尺寸
const handleSizeChange = () => {
  // 尺寸变化会自动更新
}

// 切换数据
const toggleData = async () => {
  if (hasData.value) {
    // 清空数据
    tableData.value = []
    hasData.value = false
  } else {
    // 加载数据
    const data = await fetchTableData()
    tableData.value = data
    hasData.value = true
  }
}

// 初始化加载数据
fetchTableData().then(data => {
  tableData.value = data
  hasData.value = true
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
.controls {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
</style>
