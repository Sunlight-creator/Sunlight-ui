<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例14 - 自定义颜色样式表单</span>
    </div>

    <!-- 自定义颜色表单 -->
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
  city: '',
  region: '',
  date: null
})

// 表单配置
const formOptions = {
  labelWidth: '120px',
  size: 'default'
}

// 列配置：定义表单字段，每个字段使用不同的颜色主题
const columns = [
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    placeholder: '请输入姓名',
    clearable: true,
    wrapperStyle: {
      borderColor: '#c0c4cc', // 默认深灰色
      borderRadius: '4px',
      focusBorderColor: '#409eff' // 聚焦时蓝色
    }
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    placeholder: '请输入邮箱',
    inputType: 'email',
    clearable: true,
    wrapperStyle: {
      borderColor: '#67c23a', // 绿色边框
      borderRadius: '4px',
      focusBorderColor: '#67c23a',
      focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)'
    }
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    span: 12,
    placeholder: '请输入手机号',
    inputType: 'tel',
    clearable: true,
    wrapperStyle: {
      borderColor: '#e6a23c', // 橙色边框
      borderRadius: '4px',
      focusBorderColor: '#e6a23c',
      focusBoxShadow: '0 0 0 3px rgba(230, 162, 60, 0.25)'
    }
  },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    span: 12,
    placeholder: '请选择城市',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
      { label: '深圳', value: 'shenzhen' }
    ],
    clearable: true,
    wrapperStyle: {
      borderColor: '#409eff', // 蓝色边框
      borderRadius: '4px',
      focusBorderColor: '#409eff',
      focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)'
    }
  },
  {
    prop: 'region',
    label: '地区',
    type: 'cascader',
    span: 12,
    placeholder: '请选择地区',
    options: [
      {
        value: 'zhejiang',
        label: '浙江',
        children: [
          { value: 'hangzhou', label: '杭州' },
          { value: 'ningbo', label: '宁波' }
        ]
      },
      {
        value: 'jiangsu',
        label: '江苏',
        children: [
          { value: 'nanjing', label: '南京' },
          { value: 'suzhou', label: '苏州' }
        ]
      }
    ],
    clearable: true,
    wrapperStyle: {
      borderColor: '#f56c6c', // 红色边框
      borderRadius: '4px',
      focusBorderColor: '#f56c6c',
      focusBoxShadow: '0 0 0 3px rgba(245, 108, 108, 0.25)'
    }
  },
  {
    prop: 'date',
    label: '日期',
    type: 'date-picker',
    span: 12,
    placeholder: '请选择日期',
    config: {
      clearable: true
    },
    wrapperStyle: {
      borderColor: '#67c23a', // 绿色边框
      borderRadius: '8px', // 更大的圆角
      focusBorderColor: '#67c23a',
      focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)'
    }
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
    city: '',
    region: null,
    date: null
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
