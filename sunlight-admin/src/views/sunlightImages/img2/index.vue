<script setup lang="ts">
import { ref, reactive } from 'vue'
import { SunlightImage, SunlightTable } from 'sunlight-ui'
// 双向绑定的图片地址 - 单张头像
const avatarUrl = ref('')

// 模拟上传接口
const uploadApi = async (formData: FormData) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/', {
      method: 'POST',
      body: formData
    })

    // 模拟返回图片URL，实际项目中根据接口返回格式调整
    const data = await response.json()
    return {
      fileUrl: `https://picsum.photos/200/200?random=${data.id}`
    }
  } catch (error) {
    throw error
  }
}

// 事件触发状态跟踪
const eventStatus = reactive({
  uploadSuccess: false,
  uploadError: false,
  remove: false
})

// 头像上传组件配置对象
const avatarConfig = ref({
  // 基础属性 - 限制单张上传
  api: uploadApi,
  limit: 1,
  multiple: false,
  fileSize: 2,
  fileType: ['image/jpeg', 'image/png'],
  width: '200px',
  height: '200px',
  // 自定义样式
  customClass: 'avatar-uploader',
  customStyle: { borderColor: '#409eff' },
  // 额外配置
  config: {
    name: 'avatar-upload',
    accept: 'image/*'
  }
})

// 处理所有事件
const handleUploadSuccess = (response: any, file: any) => {
  console.log('头像上传成功:', response, file)
  eventStatus.uploadSuccess = true
}

const handleUploadError = (error: any, file: any) => {
  console.error('头像上传失败:', error, file)
  eventStatus.uploadError = true
}

const handleRemove = (file: any) => {
  console.log('删除头像:', file)
  eventStatus.remove = true
}

// 组件属性数据
const avatarProps = [
  {
    name: 'modelValue:file-list',
    type: 'array',
    default: '[]',
    description: '绑定的文件列表，支持 v-model 双向绑定',
    used: '✔'
  },
  {
    name: 'api',
    type: 'function',
    default: '-',
    description: '上传接口函数',
    used: '✔'
  },
  {
    name: 'limit',
    type: 'number',
    default: '-',
    description: '最大上传数量（设置为1实现单张上传）',
    used: '✔'
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: '是否支持多选（设置为false实现单张上传）',
    used: '✔'
  },
  {
    name: 'file-size',
    type: 'number',
    default: '-',
    description: '文件大小限制，单位MB',
    used: '✔'
  },
  {
    name: 'file-type',
    type: 'array',
    default: '[]',
    description: '允许的文件类型数组',
    used: '✔'
  },
  {
    name: 'width',
    type: 'string',
    default: '-',
    description: '图片预览宽度',
    used: '✔'
  },
  {
    name: 'height',
    type: 'string',
    default: '-',
    description: '图片预览高度',
    used: '✔'
  }
]

// 事件说明数据
const avatarEvents = [
  { name: 'upload-success', description: '上传成功事件', params: 'response, file', used: '✔' },
  { name: 'upload-error', description: '上传失败事件', params: 'error, file', used: '✔' },
  { name: 'remove', description: '删除文件事件', params: 'file', used: '✔' }
]

// 表格列配置 - 属性表格
const propColumns = [
  { prop: 'name', label: '属性名', width: 180 },
  { prop: 'type', label: '类型', width: 180 },
  { prop: 'default', label: '默认值', width: 120 },
  { prop: 'description', label: '说明' },
  { prop: 'used', label: '示例中使用', width: 100, slotName: 'used' }
]

// 表格列配置 - 事件表格
const eventColumns = [
  { prop: 'name', label: '事件名', width: 180 },
  { prop: 'description', label: '说明' },
  { prop: 'params', label: '触发参数' },
  { prop: 'used', label: '示例中使用', width: 100, slotName: 'used' }
]
</script>

<template>
  <el-card class="box-card" shadow="hover">
    <!-- 卡片头部 -->
    <template #header>
      <div class="card-header">
        <span class="title">SunlightImage 单张头像上传演示</span>
      </div>
    </template>

    <!-- 头像上传组件使用示例 -->
    <div class="">
      <el-row :gutter="20">
        <el-col :span="20">
          <SunlightImage
            v-model:imageUrl="avatarUrl"
            :api="uploadApi"
            :file-size="avatarConfig.fileSize"
            :file-type="avatarConfig.fileType"
            :width="avatarConfig.width"
            :height="avatarConfig.height"
            @upload-success="handleUploadSuccess"
            @upload-error="handleUploadError"
            @remove="handleRemove"
          >
            <template #tip>
              <div>支持 jpg/png 格式，不超过 2MB，仅支持单张上传</div>
              <div class="feature-tip">特点：上传后自动隐藏上传按钮，删除后重新显示</div>
            </template>
          </SunlightImage>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>

    <!-- 当前上传的头像信息展示 -->
    <div class="display-wrapper">
      <span class="label">当前头像信息：</span>
      <pre class="text-content" v-if="avatarUrl">{{ JSON.stringify({ imageUrl: avatarUrl }, null, 2) }}</pre>
      <p class="text-placeholder" v-else>暂无上传头像</p>
    </div>

    <!-- 功能说明 -->
    <div class="feature-description">
      <h3>功能特点：</h3>
      <ul>
        <li>限制只能上传一张图片作为头像</li>
        <li>上传成功后自动隐藏上传按钮，只显示已上传的头像</li>
        <li>点击删除头像后，上传按钮重新显示</li>
        <li>支持图片预览、上传状态反馈和删除功能</li>
      </ul>
    </div>

    <!-- 组件属性文档 -->
    <el-divider>组件属性（Props）</el-divider>
    <SunlightTable :data="avatarProps" :columns="propColumns">
      <template #used="{ row }">
        <span v-if="row.used === '✔'" class="used-check">✔</span>
        <span v-else>{{ row.used }}</span>
      </template>
    </SunlightTable>

    <!-- 事件说明 -->
    <el-divider>事件说明（Emits）</el-divider>
    <SunlightTable :data="avatarEvents" :columns="eventColumns">
      <template #used="{ row }">
        <span v-if="row.used === '✔'" class="used-check">✔</span>
        <span v-else>{{ row.used }}</span>
      </template>
    </SunlightTable>
  </el-card>
</template>

<style scoped>
.box-card {
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgb(64 158 255 / 0.15);
  padding: 32px 40px;
  transition: box-shadow 0.3s ease;
}

.box-card:hover {
  box-shadow: 0 16px 40px rgb(64 158 255 / 0.25);
}

.card-header {
  font-weight: 900;
  font-size: 28px;
  color: #1f2d4a;
  border-bottom: 4px solid #409eff;
  padding-bottom: 14px;
  margin-bottom: 36px;
  letter-spacing: 1.4px;
}

.avatar-box {
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
}

.display-wrapper {
  margin-bottom: 48px;
  padding: 22px 32px;
  background-color: #f5f8ff;
  border-radius: 14px;
  box-shadow: inset 0 0 14px rgb(64 158 255 / 0.12);
  user-select: text;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.label {
  font-weight: 700;
  font-size: 18px;
  color: #409eff;
  margin-right: 16px;
  vertical-align: middle;
  letter-spacing: 0.6px;
  white-space: nowrap;
  margin-bottom: 16px;
}

.text-content {
  font-size: 14px;
  color: #1f2d4a;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  max-height: 300px;
  overflow-y: auto;
  flex: 1;
  min-width: 300px;
}

.text-placeholder {
  font-style: italic;
  color: #a0aec0;
  font-size: 18px;
  vertical-align: middle;
}

.used-check {
  color: #409eff;
  font-weight: 900;
  font-size: 18px;
  user-select: none;
}

.feature-tip {
  color: #409eff;
  font-weight: 500;
  margin-top: 8px;
}

.feature-description {
  margin-bottom: 48px;
  padding: 24px;
  background-color: #f0f9eb;
  border-radius: 12px;
  border-left: 4px solid #67c23a;
}

.feature-description h3 {
  margin-top: 0;
  color: #67c23a;
  font-size: 20px;
}

.feature-description ul {
  margin: 0;
  padding-left: 24px;
  color: #303133;
}

.feature-description li {
  margin-bottom: 8px;
  line-height: 1.6;
}
</style>
