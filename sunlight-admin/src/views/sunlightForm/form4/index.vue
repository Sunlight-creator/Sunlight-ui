<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例4 - 日期选择器表单</span>
    </div>

    <!-- 日期选择器表单：使用 date-picker 和 datetime-picker 类型 -->
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
  birthday: null,
  startDate: null,
  endDate: null,
  createTime: null,
  updateTime: null
})

// 表单配置
const formOptions = {
  labelWidth: '120px',
  size: 'default'
}

// 列配置：定义表单字段
const columns = [
  {
    prop: 'birthday',
    label: '生日',
    type: 'date-picker',
    span: 12,
    placeholder: '请选择生日',
    valueFormat: 'YYYY-MM-DD',
    clearable: true
  },
  {
    prop: 'startDate',
    label: '开始日期',
    type: 'date-picker',
    span: 12,
    placeholder: '请选择开始日期',
    valueFormat: 'YYYY-MM-DD',
    clearable: true
  },
  {
    prop: 'endDate',
    label: '结束日期',
    type: 'date-picker',
    span: 12,
    placeholder: '请选择结束日期',
    valueFormat: 'YYYY-MM-DD',
    clearable: true
  },
  {
    prop: 'createTime',
    label: '创建时间',
    type: 'datetime-picker',
    span: 12,
    placeholder: '请选择创建时间',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    clearable: true
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    type: 'datetime-picker',
    span: 12,
    placeholder: '请选择更新时间',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    clearable: true
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
    birthday: null,
    startDate: null,
    endDate: null,
    createTime: null,
    updateTime: null
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
