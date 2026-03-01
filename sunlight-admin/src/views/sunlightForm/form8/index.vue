<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例8 - 异步选项</span>
    </div>

    <!-- 异步选项：options 为函数，动态加载选项数据 -->
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

// 模拟数据：类似于 fetchCityOptions，创建异步函数返回假数据
async function fetchProvinceOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'beijing', label: '北京' },
        { value: 'shanghai', label: '上海' },
        { value: 'guangdong', label: '广东' },
        { value: 'zhejiang', label: '浙江' }
      ])
    }, 500)
  })
}

async function fetchCityOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'beijing', label: '北京' },
        { value: 'shanghai', label: '上海' },
        { value: 'guangzhou', label: '广州' },
        { value: 'shenzhen', label: '深圳' },
        { value: 'hangzhou', label: '杭州' }
      ])
    }, 600)
  })
}

async function fetchRoleOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: 'admin', label: '管理员' },
        { value: 'user', label: '普通用户' },
        { value: 'guest', label: '访客' }
      ])
    }, 400)
  })
}

async function fetchCascaderOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          value: 'beijing',
          label: '北京',
          children: [
            { value: 'chaoyang', label: '朝阳区' },
            { value: 'haidian', label: '海淀区' }
          ]
        },
        {
          value: 'shanghai',
          label: '上海',
          children: [
            { value: 'huangpu', label: '黄浦区' },
            { value: 'pudong', label: '浦东新区' }
          ]
        }
      ])
    }, 700)
  })
}

// 表单数据
const formData = ref({
  province: null,
  city: null,
  role: null,
  region: null
})

// 表单配置
const formOptions = {
  labelWidth: '120px',
  size: 'default'
}

// 列配置：options 使用函数，实现异步加载
const columns = [
  {
    prop: 'province',
    label: '省份',
    type: 'select',
    span: 12,
    placeholder: '请选择省份（异步加载）',
    options: fetchProvinceOptions, // 异步函数
    filterable: true,
    clearable: true
  },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    span: 12,
    placeholder: '请选择城市（异步加载）',
    options: fetchCityOptions, // 异步函数
    filterable: true,
    clearable: true
  },
  {
    prop: 'role',
    label: '角色',
    type: 'select',
    span: 12,
    placeholder: '请选择角色（异步加载）',
    options: fetchRoleOptions, // 异步函数
    filterable: true,
    clearable: true
  },
  {
    prop: 'region',
    label: '地区',
    type: 'cascader',
    span: 12,
    placeholder: '请选择地区（异步加载）',
    options: fetchCascaderOptions, // 异步函数
    filterable: true,
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
    province: null,
    city: null,
    role: null,
    region: null
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
