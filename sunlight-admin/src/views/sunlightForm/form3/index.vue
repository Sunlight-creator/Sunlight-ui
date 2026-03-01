<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例3 - 弹窗表单</span>
      <div class="description">
        <p>✨ 展示 SunlightForm 在弹窗中的使用方式</p>
        <p>🎯 包含单选和复选框表单</p>
      </div>
    </div>

    <!-- 打开弹窗按钮 -->
    <div class="demo-actions">
      <el-button type="primary" @click="openDialog">打开弹窗表单</el-button>
    </div>

    <!-- 将 SunlightForm 放入 SunlightDialog 中 -->
    <SunlightDialog
      v-model:visible="dialogVisible"
      dialogTitle="单选和复选框表单"
      :with-footer="true"
      :is-confirm-loading="submitting"
      @on-confirm="handleDialogConfirm"
      @on-cancel="handleDialogCancel"
      :content-height="'70vh'"
    >
      <!-- 单选和复选框表单：使用 radio 和 checkbox 类型 -->
      <SunlightForm ref="formRef" v-model="formData" :columns="columns" :form-options="formOptions">
        <!-- <template #operation>
          <el-button @click="handleReset">重置</el-button>
        </template> -->
      </SunlightForm>
    </SunlightDialog>

    <div class="result">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightForm, SunlightDialog } from 'sunlight-ui'
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

async function fetchSkillOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'vue', label: 'Vue.js' },
        { value: 'react', label: 'React' },
        { value: 'angular', label: 'Angular' },
        { value: 'node', label: 'Node.js' },
        { value: 'python', label: 'Python' }
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
  agreeTerms: false,
  hobby: [],
  skill: []
})

// 表单配置
const formOptions = {
  labelWidth: '100px',
  size: 'default'
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

// 表单引用
const formRef = ref()

// 弹窗控制
const dialogVisible = ref(false)

// 提交状态
const submitting = ref(false)

// 打开弹窗
const openDialog = () => {
  dialogVisible.value = true
}

// 列配置：定义表单字段（包含form2的所有字段）
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
  },
  // 单选和复选框表单
  {
    prop: 'hobby',
    label: '爱好',
    type: 'checkbox',
    span: 24,
    options: fetchHobbyOptions,
    isGroup: true
  },
  {
    prop: 'skill',
    label: '技能',
    type: 'checkbox',
    span: 24,
    options: fetchSkillOptions,
    isGroup: true
  }
]

// 弹窗确认处理
const handleDialogConfirm = () => {
  submitting.value = true

  // 模拟异步提交
  setTimeout(() => {
    console.log('提交表单数据：', formData.value)
    ElMessage.success('提交成功！')
    submitting.value = false
    dialogVisible.value = false
  }, 500)
}

// 弹窗取消处理
const handleDialogCancel = () => {
  console.log('取消表单')
  ElMessage.info('已取消')
}

// 重置表单
const handleReset = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    department: null,
    gender: null,
    position: '',
    description: '',
    avatar: [],
    agreeTerms: false,
    hobby: [],
    skill: []
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
  display: block;
  margin-bottom: 12px;
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
.demo-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
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
