<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例13 - 综合案例（完整功能）</span>
    </div>

    <!-- 综合案例：包含所有功能，表单验证、提交、重置、布局等 -->
    <SunlightForm
      ref="formRef"
      v-model="formData"
      :columns="columns"
      :form-options="formOptions"
      :rules="rules"
      @submit="handleFormSubmit"
    >
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button @click="handleFillData">填充数据</el-button>
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

// 表单引用
const formRef = ref(null)

// 表单数据
const formData = ref({
  name: '',
  email: '',
  phone: '',
  age: null,
  city: null,
  department: null,
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
  size: 'default',
  inline: false,
  disabled: false,
  labelSuffix: '：'
}

// 验证规则
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 1, max: 120, message: '年龄必须在 1 到 120 之间', trigger: 'blur' }
  ],
  city: [{ required: true, message: '请选择城市', trigger: 'change' }],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  hobby: [
    { required: true, message: '请至少选择一个爱好', trigger: 'change' },
    { type: 'array', min: 1, message: '请至少选择一个爱好', trigger: 'change' }
  ],
  birthday: [{ required: true, message: '请选择生日', trigger: 'change' }]
}

// 模拟数据：类似于 fetchCityOptions，创建一个异步函数返回假数据
async function fetchCityOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'beijing', label: '北京' },
        { value: 'shanghai', label: '上海' },
        { value: 'guangzhou', label: '广州' },
        { value: 'shenzhen', label: '深圳' }
      ])
    }, 300)
  })
}

async function fetchDepartmentOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'tech', label: '技术部' },
        { value: 'product', label: '产品部' },
        { value: 'operation', label: '运营部' },
        { value: 'market', label: '市场部' }
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
        { value: 'sports', label: '运动' },
        { value: 'travel', label: '旅行' },
        { value: 'movie', label: '电影' }
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

// 列配置：综合使用各种类型的表单控件
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
    prop: 'age',
    label: '年龄',
    type: 'input',
    span: 8,
    placeholder: '请输入年龄',
    inputType: 'number',
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
    prop: 'department',
    label: '部门',
    type: 'select',
    span: 8,
    placeholder: '请选择部门',
    options: fetchDepartmentOptions,
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
    span: 16,
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
    span: 8,
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
  formRef.value?.validate()
}

// 表单提交成功回调
const handleFormSubmit = data => {
  console.log('表单验证通过，提交数据：', data)
  ElMessage.success('表单提交成功！')
}

// 重置表单
const handleReset = () => {
  formRef.value?.reset()
  ElMessage.info('表单已重置')
}

// 填充数据：用于测试
const handleFillData = () => {
  formData.value = {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    age: 25,
    city: 'beijing',
    department: 'tech',
    gender: 'male',
    hobby: ['reading', 'music'],
    birthday: '1998-01-01',
    createTime: '2024-01-01 10:00:00',
    avatar: [],
    description: '这是一段描述信息'
  }
  ElMessage.success('数据已填充')
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
