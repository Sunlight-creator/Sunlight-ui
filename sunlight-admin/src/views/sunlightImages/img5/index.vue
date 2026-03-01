<template>
  <div class="upload content-box">
    <!-- 多图上传 -->
    <div class="card img-box">
      <span class="text">SunlightImages 多图片上传组件（支持自定义样式） 🌟</span>
      <div class="upload-list">
        <SunlightImages
          v-model:file-list="fileList"
          :api="uploadApi"
          :drag="false"
          border-radius="50%"
          width="120px"
          height="120px"
        >
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>上传圆形图片</span>
          </template>
          <template #tip> 圆形组件，图片最大为 5M（禁止拖拽上传） </template>
        </SunlightImages>

        <SunlightImages
          v-model:file-list="fileList1"
          :api="uploadApi"
          width="250px"
          height="150px"
          border-radius="10px"
        >
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>上传长方形图片</span>
          </template>
          <template #tip> 长方形组件，图片最大为 5M（可拖拽上传） </template>
        </SunlightImages>

        <SunlightImages
          v-model:file-list="fileList2"
          :api="uploadApi"
          width="180px"
          height="180px"
          border-radius="0"
          :drag="false"
        >
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>上传方形图片</span>
          </template>
          <template #tip> 方形组件，图片最大为 5M（禁止拖拽上传） </template>
        </SunlightImages>
      </div>
    </div>

    <!-- 单图上传 -->
    <div class="card img-box">
      <span class="text">SunlightImage 单图片上传组件（支持自定义样式） 🌟</span>
      <div class="upload-list">
        <SunlightImage
          v-model:imageUrl="avatar1"
          :api="uploadApi"
          :file-size="3"
          width="150px"
          height="150px"
          border-radius="8px"
        >
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>上传标准头像</span>
          </template>
          <template #tip> 标准样式，头像最大为 3M </template>
        </SunlightImage>

        <SunlightImage
          v-model:imageUrl="avatar2"
          :api="uploadApi"
          :drag="false"
          border-radius="50%"
          width="120px"
          height="120px"
        >
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>上传圆形头像</span>
          </template>
          <template #tip> 圆形组件（禁止拖拽上传） </template>
        </SunlightImage>

        <SunlightImage v-model:imageUrl="avatar3" :api="uploadApi" width="300px" height="100px" border-radius="5px">
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>上传 Banner 图</span>
          </template>
          <template #tip> 宽横幅组件（可拖拽上传） </template>
        </SunlightImage>

        <SunlightImage v-model:imageUrl="avatar4" :api="uploadApi" disabled width="150px" height="150px">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>禁用状态</span>
          </template>
          <template #tip> 无图（禁用上传） </template>
        </SunlightImage>

        <SunlightImage
          v-model:imageUrl="avatar5"
          :api="uploadApi"
          disabled
          width="150px"
          height="150px"
          border-radius="20px"
        >
          <template #tip> 有图（禁用编辑、删除） </template>
        </SunlightImage>
      </div>
    </div>

    <!-- 表单使用 -->
    <div class="form-box">
      <div class="card">
        <el-alert
          title="图片上传组件在 form 表单中使用，支持自定义样式"
          type="success"
          effect="dark"
          :closable="false"
          class="mb20"
        />
        <el-form ref="ruleFormRef" label-width="120px" label-suffix=" :" :rules="rules" :model="fromModel">
          <el-form-item label="用户头像" prop="avatar">
            <SunlightImage
              v-model:imageUrl="fromModel.avatar"
              :api="uploadApi"
              width="135px"
              height="135px"
              border-radius="50%"
              :file-size="3"
            >
              <template #empty>
                <el-icon><Avatar /></el-icon>
                <span>请上传头像</span>
              </template>
              <template #tip> 圆形头像，大小不能超过 3M </template>
            </SunlightImage>
          </el-form-item>

          <el-form-item label="用户照片" prop="photo">
            <SunlightImages
              v-model:file-list="fromModel.photo"
              :api="uploadApi"
              :limit="3"
              height="120px"
              width="120px"
              border-radius="10px"
            >
              <template #empty>
                <el-icon><Picture /></el-icon>
                <span>请上传照片</span>
              </template>
              <template #tip> 最多上传 3 张照片 </template>
            </SunlightImages>
          </el-form-item>

          <el-form-item label="用户姓名" prop="username">
            <el-input v-model="fromModel.username" placeholder="请填写用户姓名" clearable></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="fromModel.email" placeholder="请填写邮箱" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button> 取消 </el-button>
            <el-button type="primary" @click="submit"> 确定 </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">
        <el-alert title="图片上传组件在禁用表单中使用" type="warning" effect="dark" :closable="false" class="mb20" />
        <el-form label-width="120px" label-suffix=" :" disabled :model="fromModel1">
          <el-form-item label="用户头像" prop="avatar">
            <SunlightImage
              v-model:imageUrl="fromModel1.avatar"
              :api="uploadApi"
              width="135px"
              height="135px"
              :file-size="3"
            >
              <template #empty>
                <el-icon><Avatar /></el-icon>
                <span>请上传头像</span>
              </template>
              <template #tip> 头像大小不能超过 3M </template>
            </SunlightImage>
          </el-form-item>

          <el-form-item label="用户照片" prop="photo">
            <SunlightImages
              v-model:file-list="fromModel1.photo"
              :api="uploadApi"
              height="120px"
              width="120px"
              border-radius="50%"
            >
              <template #empty>
                <el-icon><Picture /></el-icon>
                <span>请上传照片</span>
              </template>
              <template #tip> 照片大小不能超过 5M </template>
            </SunlightImages>
          </el-form-item>

          <el-form-item label="用户姓名" prop="username">
            <el-input v-model="fromModel1.username" placeholder="请填写用户姓名" clearable></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="fromModel1.email" placeholder="请填写邮箱" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button> 取消 </el-button>
            <el-button type="primary" @click="submit"> 确定 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 组件属性和事件说明 -->
    <div class="card">
      <span class="text">SunlightImage 组件属性（Props）说明 📚</span>
      <el-divider>配置项（单图上传组件）</el-divider>
      <SunlightTable :data="sunlightImageProps" :columns="propColumns">
        <template #used="{ row }">
          <span v-if="row.used === '✔'" class="used-check">✔</span>
          <span v-else>{{ row.used }}</span>
        </template>
      </SunlightTable>
    </div>

    <div class="card">
      <span class="text">SunlightImage 组件事件（Emits）说明 📚</span>
      <el-divider>事件列表（单图上传组件）</el-divider>
      <SunlightTable :data="sunlightImageEvents" :columns="eventColumns">
        <template #used="{ row }">
          <span v-if="row.used === '✔'" class="used-check">✔</span>
          <span v-else>{{ row.used }}</span>
        </template>
      </SunlightTable>
    </div>

    <div class="card">
      <span class="text">SunlightImages 组件属性（Props）说明 📚</span>
      <el-divider>配置项（多图上传组件）</el-divider>
      <SunlightTable :data="sunlightImagesProps" :columns="propColumns">
        <template #used="{ row }">
          <span v-if="row.used === '✔'" class="used-check">✔</span>
          <span v-else>{{ row.used }}</span>
        </template>
      </SunlightTable>
    </div>

    <div class="card">
      <span class="text">SunlightImages 组件事件（Emits）说明 📚</span>
      <el-divider>事件列表（多图上传组件）</el-divider>
      <SunlightTable :data="sunlightImagesEvents" :columns="eventColumns">
        <template #used="{ row }">
          <span v-if="row.used === '✔'" class="used-check">✔</span>
          <span v-else>{{ row.used }}</span>
        </template>
      </SunlightTable>
    </div>

    <div class="card">
      <span class="text">file-list 配置对象（Item）说明 📚</span>
      <el-divider>配置项</el-divider>
      <SunlightTable :data="itemConfigProps" :columns="propColumns">
        <template #used="{ row }">
          <span v-if="row.used === '✔'" class="used-check">✔</span>
          <span v-else>{{ row.used }}</span>
        </template>
      </SunlightTable>
    </div>
  </div>
</template>

<script setup lang="ts" name="customStyleUpload">
import { ref, reactive } from 'vue'
import { FormInstance } from 'element-plus'
import { SunlightImage, SunlightImages, SunlightTable } from 'sunlight-ui'
import { Picture, Avatar, Plus } from '@element-plus/icons-vue'

// 上传接口 - 使用指定接口 https://jsonplaceholder.typicode.com/posts/
const uploadApi = async (formData: FormData) => {
  try {
    // 使用指定的接口 https://jsonplaceholder.typicode.com/posts/
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/', {
      method: 'POST',
      body: formData
    })

    // 模拟返回图片URL，实际项目中根据接口返回格式调整
    const data = await response.json()
    return {
      fileUrl: `https://picsum.photos/300/300?random=${data.id}`
    }
  } catch (error) {
    throw error
  }
}

// 多图上传数据
const fileList = ref([{ name: '示例图片', url: 'https://picsum.photos/300/300?random=1' }])
const fileList1 = ref([])
const fileList2 = ref([])

// 单图上传数据
const avatar1 = ref('')
const avatar2 = ref('')
const avatar3 = ref('')
const avatar4 = ref('')
const avatar5 = ref('https://picsum.photos/300/300?random=5')

// 表单验证规则
const rules = reactive({
  avatar: [{ required: true, message: '请上传用户头像' }],
  photo: [{ required: true, message: '请上传用户照片' }],
  username: [{ required: true, message: '请填写用户姓名' }],
  email: [{ required: true, message: '请填写邮箱' }]
})

// 表单数据
const fromModel = ref({
  avatar: '',
  photo: [{ name: '示例照片', url: 'https://picsum.photos/300/300?random=10' }],
  username: '',
  email: ''
})

const fromModel1 = ref({
  avatar: '',
  photo: [{ name: '示例照片', url: 'https://picsum.photos/300/300?random=11' }],
  username: '',
  email: ''
})

const ruleFormRef = ref<FormInstance>()

// 表单提交
const submit = () => {
  ruleFormRef.value!.validate(valid => {
    console.log(valid)
  })
}

// 表格列配置 - 属性表格
const propColumns = [
  { prop: 'name', label: '属性名', width: 150 },
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

// SunlightImage Props 数据
const sunlightImageProps = [
  {
    name: 'imageUrl',
    type: 'string',
    default: '""',
    description: '双向绑定的图片URL值，使用示例：v-model:imageUrl="avatarUrl"',
    used: '✔'
  },
  {
    name: 'api',
    type: 'Function',
    default: '-',
    description: '上传图片的api方法，必须传入，使用示例：:api="uploadApi"',
    used: '✔'
  },
  { name: 'drag', type: 'boolean', default: 'true', description: '是否支持拖拽上传图片', used: '✔' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用上传组件', used: '✔' },
  { name: 'fileSize', type: 'number', default: '5', description: '图片大小限制，单位MB', used: '✔' },
  {
    name: 'fileType',
    type: 'array',
    default: '["image/jpeg", "image/png", "image/gif"]',
    description: '图片类型限制',
    used: ''
  },
  { name: 'height', type: 'string', default: '"150px"', description: '组件高度样式', used: '✔' },
  { name: 'width', type: 'string', default: '"150px"', description: '组件宽度样式', used: '✔' },
  { name: 'borderRadius', type: 'string', default: '"8px"', description: '组件边框圆角样式', used: '✔' }
]

// SunlightImage Events 数据
const sunlightImageEvents = [
  { name: 'update:imageUrl', description: '图片URL更新事件', params: '更新后的图片URL', used: '✔' },
  { name: 'upload-success', description: '图片上传成功事件', params: '响应数据, 上传的文件', used: '' },
  { name: 'upload-error', description: '图片上传失败事件', params: '错误信息, 上传的文件', used: '' }
]

// SunlightImages Props 数据
const sunlightImagesProps = [
  {
    name: 'fileList',
    type: 'array',
    default: '[]',
    description: '双向绑定的文件列表值，使用示例：v-model:file-list="fileList"',
    used: '✔'
  },
  {
    name: 'api',
    type: 'Function',
    default: '-',
    description: '上传图片的api方法，必须传入，使用示例：:api="uploadApi"',
    used: '✔'
  },
  { name: 'drag', type: 'boolean', default: 'true', description: '是否支持拖拽上传图片', used: '✔' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用上传组件', used: '' },
  { name: 'limit', type: 'number', default: '5', description: '最大图片上传数', used: '✔' },
  { name: 'multiple', type: 'boolean', default: 'true', description: '是否支持多选上传', used: '' },
  { name: 'fileSize', type: 'number', default: '5', description: '单个图片大小限制，单位MB', used: '' },
  {
    name: 'fileType',
    type: 'array',
    default: '["image/jpeg", "image/png", "image/gif"]',
    description: '图片类型限制',
    used: ''
  },
  { name: 'height', type: 'string', default: '"150px"', description: '组件高度样式', used: '✔' },
  { name: 'width', type: 'string', default: '"150px"', description: '组件宽度样式', used: '✔' },
  { name: 'borderRadius', type: 'string', default: '"8px"', description: '组件边框圆角样式', used: '✔' }
]

// SunlightImages Events 数据
const sunlightImagesEvents = [
  { name: 'update:fileList', description: '文件列表更新事件', params: '更新后的文件列表', used: '✔' },
  { name: 'upload-success', description: '图片上传成功事件', params: '响应数据, 上传的文件', used: '' },
  { name: 'upload-error', description: '图片上传失败事件', params: '错误信息, 上传的文件', used: '' },
  { name: 'remove', description: '图片删除事件', params: '被删除的文件', used: '' }
]

// Item 配置对象数据
const itemConfigProps = [
  { name: 'name', type: 'string', default: '""', description: '文件名，用于显示', used: '✔' },
  { name: 'url', type: 'string', default: '""', description: '图片URL地址，用于显示图片', used: '✔' },
  { name: 'uid', type: 'string', default: '-', description: '文件唯一标识，由组件自动生成', used: '' },
  {
    name: 'status',
    type: 'string',
    default: '"ready"',
    description: "文件状态，可选值：'success'、'error'、'uploading'、'ready'",
    used: ''
  }
]
</script>

<style scoped lang="scss">
.upload {
  height: auto;
  padding: 20px;

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
    margin-bottom: 30px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .text {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }

    .upload-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 30px;
      width: 100%;
      margin: 20px 0;
    }
  }

  .img-box {
    margin-bottom: 30px;
  }

  .form-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    width: 100%;

    .card {
      flex: 1;
      min-width: 450px;

      .el-form {
        width: 100%;
      }

      .mb20 {
        margin-bottom: 20px;
      }
    }
  }
}

.content-box {
  background-color: #f5f7fa;
  min-height: 100vh;
}
.used-check {
  color: #67c23a;
  font-weight: bold;
}

/* SunlightTable 样式调整 */
:deep(.sunlight-table) {
  width: 100%;
  margin-top: 10px;
}
</style>
