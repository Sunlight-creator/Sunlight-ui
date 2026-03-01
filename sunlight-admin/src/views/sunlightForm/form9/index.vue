<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例9 - 表单提交和重置</span>
    </div>

    <!-- 表单提交和重置：使用表单组件的 submit 和 reset 方法 -->
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
        <el-button @click="handleValidate">验证表单</el-button>
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
  description: ''
})

// 表单配置
const formOptions = {
  labelWidth: '120px',
  size: 'default'
}

// 验证规则
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
}

// 列配置
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
    prop: 'description',
    label: '描述',
    type: 'textarea',
    span: 24,
    placeholder: '请输入描述信息',
    rows: 3
  }
]

// 提交表单：调用表单组件的 submit 方法
const handleSubmit = () => {
  formRef.value?.submit()
}

// 表单提交成功回调（验证通过后触发）
const handleFormSubmit = data => {
  console.log('表单验证通过，提交数据：', data)
  ElMessage.success('表单提交成功！')
  // 这里可以调用 API 提交数据
  // await submitForm(data)
}

// 重置表单：调用表单组件的 reset 方法
const handleReset = () => {
  formRef.value?.reset()
  ElMessage.info('表单已重置')
}

// 验证表单：手动验证表单
const handleValidate = () => {
  formRef.value?.proFormRef?.validate(valid => {
    if (valid) {
      ElMessage.success('表单验证通过')
    } else {
      ElMessage.warning('表单验证失败，请检查输入')
    }
  })
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
