<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例12 - 表单配置（formOptions）</span>
    </div>

    <!-- 表单配置：通过 formOptions 配置表单的样式和行为 -->
    <div class="controls">
      <el-radio-group v-model="formSize" @change="handleSizeChange">
        <el-radio-button label="large">大尺寸</el-radio-button>
        <el-radio-button label="default">默认</el-radio-button>
        <el-radio-button label="small">小尺寸</el-radio-button>
      </el-radio-group>
      <el-input-number v-model="labelWidth" :min="80" :max="200" :step="10" style="margin-left: 20px" />
      <span style="margin-left: 10px">标签宽度：{{ labelWidth }}px</span>
    </div>

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
import { ref, computed } from 'vue'
import { SunlightForm } from 'sunlight-ui'
import { ElMessage } from 'element-plus'

// 表单尺寸
const formSize = ref('default')
// 标签宽度
const labelWidth = ref(120)

// 表单数据
const formData = ref({
  name: '',
  email: '',
  phone: '',
  city: null,
  description: ''
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

// 表单配置：动态配置表单属性
const formOptions = computed(() => ({
  labelWidth: `${labelWidth.value}px`, // 标签宽度
  size: formSize.value, // 表单尺寸：large、default、small
  inline: false, // 是否行内表单
  disabled: false, // 是否禁用
  labelSuffix: '：' // 标签后缀
}))

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
    prop: 'city',
    label: '城市',
    type: 'select',
    span: 12,
    placeholder: '请选择城市',
    options: fetchCityOptions,
    filterable: true,
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

// 切换尺寸
const handleSizeChange = () => {
  ElMessage.info(`表单尺寸已切换为：${formSize.value}`)
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
  display: flex;
  align-items: center;
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
