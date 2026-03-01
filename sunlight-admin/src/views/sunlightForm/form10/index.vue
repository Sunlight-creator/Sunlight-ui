<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例10 - 表单禁用状态</span>
    </div>

    <!-- 表单禁用状态：通过 formOptions.disabled 或字段的 disabled 属性控制 -->
    <div class="controls">
      <el-button @click="toggleDisabled">
        {{ isDisabled ? '启用表单' : '禁用表单' }}
      </el-button>
    </div>

    <SunlightForm v-model="formData" :columns="columns" :form-options="formOptions">
      <template #operation>
        <el-button type="primary" @click="handleSubmit" :disabled="isDisabled">提交</el-button>
        <el-button @click="handleReset" :disabled="isDisabled">重置</el-button>
      </template>
    </SunlightForm>

    <div class="result">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SunlightForm } from 'sunlight-ui'
import { ElMessage } from 'element-plus'

// 禁用状态
const isDisabled = ref(false)

// 表单数据
const formData = ref({
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  city: 'beijing',
  department: 'tech',
  description: '这是一段描述信息'
})

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

// 表单配置：动态设置 disabled 状态
const formOptions = computed(() => ({
  labelWidth: '120px',
  size: 'default',
  disabled: isDisabled.value // 控制整个表单的禁用状态
}))

// 列配置：部分字段可以单独设置 disabled
const columns = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    placeholder: '请输入姓名',
    clearable: true
    // disabled 可以通过 formOptions.disabled 统一控制，也可以单独设置
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    placeholder: '请输入邮箱',
    clearable: true
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    span: 12,
    placeholder: '请输入手机号',
    clearable: true,
    disabled: true // 单独设置此字段为禁用状态
  },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    span: 12,
    placeholder: '请选择城市',
    options: fetchCityOptions,
    clearable: true
  },
  {
    prop: 'department',
    label: '部门',
    type: 'select',
    span: 12,
    placeholder: '请选择部门',
    options: fetchDepartmentOptions,
    clearable: true
  },
  {
    prop: 'description',
    label: '描述',
    type: 'textarea',
    span: 24,
    placeholder: '请输入描述信息',
    rows: 3
  }
]

// 切换禁用状态
const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value
  ElMessage.info(isDisabled.value ? '表单已禁用' : '表单已启用')
}

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
.controls {
  margin-bottom: 20px;
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
