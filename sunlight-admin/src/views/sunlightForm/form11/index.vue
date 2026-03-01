<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例11 - 混合表单（多种类型组合）</span>
    </div>

    <!-- 混合表单：包含多种类型的表单控件 -->
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

async function fetchGenderOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'male', label: '男' },
        { value: 'female', label: '女' }
      ])
    }, 300)
  })
}

async function fetchHobbyOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'reading', label: '阅读' },
        { value: 'music', label: '音乐' },
        { value: 'sports', label: '运动' }
      ])
    }, 300)
  })
}

async function mockUploadApi(file) {
  return new Promise(resolve => {
    setTimeout(() => {
      const url = URL.createObjectURL(file.raw || file)
      resolve({
        fileUrl: url,
        fileName: file.name || 'image.jpg'
      })
    }, 500)
  })
}

// 表单数据
const formData = ref({
  name: '',
  email: '',
  phone: '',
  city: null,
  gender: null,
  hobby: [],
  birthday: null,
  createTime: null,
  avatar: [],
  description: ''
})

// 表单配置
const formOptions = {
  labelWidth: '120px',
  size: 'default'
}

// 列配置：混合多种类型的表单控件
const columns = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 8,
    placeholder: '请输入姓名',
    clearable: true
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 8,
    placeholder: '请输入邮箱',
    inputType: 'email',
    clearable: true
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    span: 8,
    placeholder: '请输入手机号',
    inputType: 'tel',
    clearable: true
  },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    span: 8,
    placeholder: '请选择城市',
    options: fetchCityOptions,
    filterable: true,
    clearable: true
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'radio',
    span: 8,
    options: fetchGenderOptions,
    isGroup: true
  },
  {
    prop: 'hobby',
    label: '爱好',
    type: 'checkbox',
    span: 8,
    options: fetchHobbyOptions,
    isGroup: true
  },
  {
    prop: 'birthday',
    label: '生日',
    type: 'date-picker',
    span: 8,
    placeholder: '请选择生日',
    valueFormat: 'YYYY-MM-DD',
    clearable: true
  },
  {
    prop: 'createTime',
    label: '创建时间',
    type: 'datetime-picker',
    span: 8,
    placeholder: '请选择创建时间',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    clearable: true
  },
  {
    prop: 'avatar',
    label: '头像',
    type: 'images',
    span: 12,
    api: mockUploadApi,
    limit: 1,
    multiple: false,
    height: '120px',
    width: '120px'
  },
  {
    prop: 'description',
    label: '描述',
    type: 'textarea',
    span: 24,
    placeholder: '请输入描述信息',
    rows: 4,
    maxlength: 200,
    showWordLimit: true
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
    city: null,
    gender: null,
    hobby: [],
    birthday: null,
    createTime: null,
    avatar: [],
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
