<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例6 - 表单验证</span>
    </div>

    <!-- 表单验证：使用 rules 配置验证规则 -->
    <SunlightForm
      ref="formRef"
      v-model="formData"
      :columns="columns"
      :form-options="formOptions"
      :rules="rules"
      @submit="handleSubmit"
    >
      <template #operation>
        <el-button type="primary" @click="handleFormSubmit">提交</el-button>
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

// 表单引用
const formRef = ref(null)

// 表单数据
const formData = ref({
  name: '',
  email: '',
  phone: '',
  age: null,
  password: '',
  confirmPassword: ''
})

// 表单配置
const formOptions = {
  labelWidth: '120px',
  size: 'default'
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
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 列配置：定义表单字段
const columns = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    placeholder: '请输入姓名',
    clearable: true
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    placeholder: '请输入邮箱',
    inputType: 'email',
    clearable: true
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    span: 12,
    placeholder: '请输入手机号',
    inputType: 'tel',
    clearable: true
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'input',
    span: 12,
    placeholder: '请输入年龄',
    inputType: 'number',
    clearable: true
  },
  {
    prop: 'password',
    label: '密码',
    type: 'input',
    span: 12,
    placeholder: '请输入密码',
    inputType: 'password',
    clearable: true
  },
  {
    prop: 'confirmPassword',
    label: '确认密码',
    type: 'input',
    span: 12,
    placeholder: '请再次输入密码',
    inputType: 'password',
    clearable: true
  }
]

// 提交表单（通过表单组件的 submit 方法）
const handleFormSubmit = () => {
  formRef.value?.submit()
}

// 表单提交成功回调
const handleSubmit = data => {
  console.log('表单验证通过，提交数据：', data)
  ElMessage.success('表单验证通过，提交成功！')
}

// 重置表单
const handleReset = () => {
  formRef.value?.reset()
  formData.value = {
    name: '',
    email: '',
    phone: '',
    age: null,
    password: '',
    confirmPassword: ''
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
