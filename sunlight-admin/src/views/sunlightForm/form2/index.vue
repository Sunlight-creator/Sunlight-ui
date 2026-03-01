<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例 - 常用表单配置</span>
      <div class="description">
        <p>✨ 展示常用表单配置：基础字段、表单验证、按钮对齐</p>
        <p>🎨 使用默认主题样式</p>
      </div>
    </div>

    <!-- 常用表单配置 -->
    <SunlightForm v-model="formData" :columns="columns" :form-options="formOptions">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="warning" @click="handleCancel">取消</el-button>
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

// 模拟异步数据
async function fetchDepartmentOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'tech', label: '技术部' },
        { value: 'product', label: '产品部' },
        { value: 'operation', label: '运营部' },
        { value: 'market', label: '市场部' },
        { value: 'sales', label: '销售部' },
        { value: 'hr', label: '人事部' }
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

// 模拟上传 API
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
  department: null,
  gender: null,
  position: '',
  description: '',
  avatar: [],
  agreeTerms: false
})

// 表单配置
const formOptions = {
  labelWidth: '100px',
  size: 'default',
  buttonAlign: 'right' // 按钮右对齐
}

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  agreeTerms: [{ required: true, message: '请同意条款', trigger: 'change' }]
}

// 列配置：常用表单字段
const columns = [
  // 基础信息
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    placeholder: '请输入姓名',
    clearable: true,
    rules: rules.name
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    placeholder: '请输入邮箱',
    inputType: 'email',
    clearable: true,
    rules: rules.email
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    span: 12,
    placeholder: '请输入手机号',
    inputType: 'tel',
    clearable: true,
    rules: rules.phone
  },
  {
    prop: 'department',
    label: '部门',
    type: 'select',
    span: 12,
    placeholder: '请选择部门',
    options: fetchDepartmentOptions,
    filterable: true,
    clearable: true,
    rules: rules.department
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'radio',
    span: 12,
    options: fetchGenderOptions,
    isGroup: true,
    rules: rules.gender
  },
  {
    prop: 'position',
    label: '职位',
    type: 'input',
    span: 12,
    placeholder: '请输入职位',
    clearable: true,
    rules: rules.position
  },
  // 详细信息
  {
    prop: 'description',
    label: '个人描述',
    type: 'textarea',
    span: 24,
    placeholder: '请输入个人描述',
    rows: 4,
    maxlength: 200,
    showWordLimit: true
  },
  {
    prop: 'avatar',
    label: '头像',
    type: 'images',
    span: 12,
    api: mockUploadApi,
    limit: 1,
    multiple: false,
    drag: true,
    height: '150px',
    width: '150px'
  },
  // 同意条款
  {
    prop: 'agreeTerms',
    label: '条款',
    type: 'checkbox',
    span: 24,
    options: [{ value: true, label: '我已阅读并同意用户协议和隐私政策' }],
    isGroup: true,
    rules: rules.agreeTerms
  }
]

// 提交表单
const handleSubmit = () => {
  // 可以通过 ref 获取表单实例，调用 submit 方法
  // formRef.submit()
  console.log('提交表单数据：', formData.value)
  ElMessage.success('提交成功！')
}

// 重置表单
const handleReset = () => {
  // 可以通过 ref 获取表单实例，调用 reset 方法
  // formRef.reset()
  console.log('重置表单')
  ElMessage.info('表单已重置')
}

// 取消操作
const handleCancel = () => {
  console.log('取消操作')
  ElMessage.warning('操作已取消')
}
</script>

<style scoped>
.card-header {
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  display: block;
}

.description {
  margin-top: 12px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}

.description p {
  margin: 4px 0;
  color: #606266;
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
