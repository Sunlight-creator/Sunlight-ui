<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { SunlightImages, SunlightTable } from 'sunlight-ui'

// 双向绑定的文件列表
const imageList = ref([])

// 上传接口
const uploadApi = async (formData: FormData) => {
  // 模拟上传接口，实际请替换为真实接口
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { fileUrl: URL.createObjectURL(formData.get('file')) }
}

// 事件触发状态跟踪
const eventStatus = reactive({
  uploadSuccess: false,
  uploadError: false,
  remove: false
})

// 图片上传组件配置对象（包含所有支持的属性）
const imageConfig = ref({
  // 基础属性
  api: uploadApi,
  limit: 5,
  multiple: true,
  fileSize: 2,
  fileType: ['image/jpeg', 'image/png', 'image/gif'],
  width: '150px',
  height: '150px',
  // 自定义样式
  customClass: 'my-images',
  customStyle: { borderColor: '#409eff' },
  // 额外配置
  config: {
    name: 'image-uploader',
    accept: 'image/*'
  }
})

// 处理所有事件
const handleUploadSuccess = (response: any, file: any) => {
  console.log('上传成功:', response, file)
  eventStatus.uploadSuccess = true
}

const handleUploadError = (error: any, file: any) => {
  console.error('上传失败:', error, file)
  eventStatus.uploadError = true
}

const handleRemove = (file: any) => {
  console.log('删除文件:', file)
  eventStatus.remove = true
}

// 转换事件状态为表格数据格式
const eventStatusList = computed(() => {
  return Object.entries(eventStatus).map(([event, status]) => ({
    event,
    status
  }))
})

// 组件属性数据
const imageProps = [
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
    description: '最大上传数量',
    used: '✔'
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: '是否支持多选',
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
  },
  {
    name: 'item',
    type: 'object',
    default: '{}',
    description: '图片上传组件配置对象，包含样式、事件、属性等详细配置',
    used: '✔'
  }
]

// item 配置对象属性
const itemProps = [
  { name: 'api', type: 'function', default: '-', description: '上传接口函数', used: '✔' },
  { name: 'limit', type: 'number', default: '-', description: '最大上传数量', used: '✔' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否支持多选', used: '✔' },
  { name: 'fileSize', type: 'number', default: '-', description: '文件大小限制，单位MB', used: '✔' },
  { name: 'fileType', type: 'array', default: '[]', description: '允许的文件类型数组', used: '✔' },
  { name: 'width', type: 'string', default: '-', description: '图片预览宽度', used: '✔' },
  { name: 'height', type: 'string', default: '-', description: '图片预览高度', used: '✔' },
  { name: 'customClass', type: 'string', default: '-', description: '自定义样式类', used: '✔' },
  { name: 'customStyle', type: 'object', default: '-', description: '自定义内联样式', used: '✔' },
  { name: 'config', type: 'object', default: '{}', description: '额外属性配置，支持传入任意属性', used: '✔' }
]

// 事件说明数据
const imageEvents = [
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
        <span class="title">SunlightImages 使用案例</span>
      </div>
    </template>

    <!-- 图片上传组件使用示例 -->
    <div class="images-box">
      <el-row :gutter="20">
        <el-col :span="12">
          <SunlightImages
            v-model:file-list="imageList"
            :api="uploadApi"
            :limit="imageConfig.limit"
            :multiple="imageConfig.multiple"
            :file-size="imageConfig.fileSize"
            :file-type="imageConfig.fileType"
            :width="imageConfig.width"
            :height="imageConfig.height"
            :item="imageConfig"
            @upload-success="handleUploadSuccess"
            @upload-error="handleUploadError"
            @remove="handleRemove"
          >
            <template #tip>
              <div>支持 jpg/png/gif 格式，最多上传 5 张，每张不超过 2MB</div>
            </template>
          </SunlightImages>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>

    <!-- 当前上传的文件列表展示 -->
    <div class="display-wrapper">
      <span class="label">当前文件列表：</span>
      <pre class="text-content" v-if="imageList.length">{{ JSON.stringify(imageList, null, 2) }}</pre>
      <p class="text-placeholder" v-else>暂无上传文件</p>
    </div>

    <!-- 组件属性文档 -->
    <el-divider>组件属性（Props）</el-divider>
    <SunlightTable :data="imageProps" :columns="propColumns">
      <template #used="{ row }">
        <span v-if="row.used === '✔'" class="used-check">✔</span>
        <span v-else>{{ row.used }}</span>
      </template>
    </SunlightTable>

    <el-divider>item 配置对象说明</el-divider>
    <SunlightTable :data="itemProps" :columns="propColumns">
      <template #used="{ row }">
        <span v-if="row.used === '✔'" class="used-check">✔</span>
        <span v-else>{{ row.used }}</span>
      </template>
    </SunlightTable>

    <!-- 事件说明 -->
    <el-divider>事件说明（Emits）</el-divider>
    <SunlightTable :data="imageEvents" :columns="eventColumns">
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

.images-box {
  margin-bottom: 60px;
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
</style>
