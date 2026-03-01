<template>
  <el-card shadow="hover">
    <div class="card-header">
      <span class="title">SunlightForm 案例5 - 图片上传表单</span>
    </div>

    <!-- 图片上传表单：使用 images 类型 -->
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

// 模拟上传 API：类似于 fetchCityOptions，创建一个异步函数返回假数据
async function mockUploadApi(file) {
  return new Promise(resolve => {
    setTimeout(() => {
      // 模拟上传成功，返回图片 URL
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
  avatar: [],
  photos: [],
  gallery: []
})

// 表单配置
const formOptions = {
  labelWidth: '120px',
  size: 'default'
}

// 列配置：定义表单字段
const columns = [
  {
    prop: 'avatar',
    label: '头像',
    type: 'images',
    span: 24,
    api: mockUploadApi,
    limit: 5,
    multiple: false,
    drag: true,
    height: '150px',
    width: '150px'
  },
  {
    prop: 'photos',
    label: '照片',
    type: 'images',
    span: 24,
    api: mockUploadApi,
    limit: 5,
    multiple: true,
    drag: true,
    height: '120px',
    width: '120px'
  },
  {
    prop: 'gallery',
    label: '相册',
    type: 'images',
    span: 24,
    api: mockUploadApi,
    limit: 10,
    multiple: true,
    drag: true,
    height: '100px',
    width: '100px'
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
    avatar: [],
    photos: [],
    gallery: []
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
