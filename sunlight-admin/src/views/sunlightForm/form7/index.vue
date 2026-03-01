<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例7 - 表单布局</span>
    </div>

    <!-- 表单布局：使用 span 和 offset 控制列宽和偏移 -->
    <SunlightForm v-model="formData" :columns="columns" :form-options="formOptions">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>

    <div class="result">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightForm } from 'sunlight-ui'
import { ElMessage } from 'element-plus'

// 表单数据
const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: null,
  department: null,
  description: ''
})

// 表单配置
const formOptions = {
  labelWidth: '120px',
  size: 'default'
}

// 模拟数据：类似于 fetchCityOptions，创建一个异步函数返回假数据
async function fetchCityOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'beijing', label: '北京' },
        { value: 'shanghai', label: '上海' },
        { value: 'guangzhou', label: '广州' }
      ])
    }, 300)
  })
}

async function fetchDepartmentOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'tech', label: '技术部' },
        { value: 'product', label: '产品部' }
      ])
    }, 300)
  })
}

// 列配置：使用 span 控制列宽，offset 控制偏移
// span 最大为 24，表示占满整行
const columns = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 8, // 占 8/24，即 1/3 宽度
    placeholder: '请输入姓名',
    clearable: true
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 8, // 占 8/24，即 1/3 宽度
    placeholder: '请输入邮箱',
    clearable: true
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    span: 8, // 占 8/24，即 1/3 宽度
    placeholder: '请输入手机号',
    clearable: true
  },
  {
    prop: 'address',
    label: '地址',
    type: 'input',
    span: 12, // 占 12/24，即 1/2 宽度
    placeholder: '请输入地址',
    clearable: true
  },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    span: 12, // 占 12/24，即 1/2 宽度
    placeholder: '请选择城市',
    options: fetchCityOptions,
    clearable: true
  },
  {
    prop: 'department',
    label: '部门',
    type: 'select',
    span: 12, // 占 12/24，即 1/2 宽度
    offset: 0, // 不偏移
    placeholder: '请选择部门',
    options: fetchDepartmentOptions,
    clearable: true
  },
  {
    prop: 'description',
    label: '描述',
    type: 'textarea',
    span: 24, // 占满整行
    placeholder: '请输入描述信息',
    rows: 3
  }
]

// 提交表单
const handleSubmit = () => {
  console.log('提交表单数据：', formData.value)
  ElMessage.success('提交成功！')
}

// 重置表单
const handleReset = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: null,
    department: null,
    description: ''
  }
  ElMessage.info('表单已重置')
}
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
.result {
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.result h3 {
  margin-top: 0;
  margin-bottom: 10px;
}
.result pre {
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
