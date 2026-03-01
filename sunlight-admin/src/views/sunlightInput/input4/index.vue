<template>
  <el-card class="box-card" shadow="hover">
    <!-- 卡片头部 -->
    <template #header>
      <div class="card-header">
        <span class="title">SunlightInput 多行文本框示例及属性文档</span>
      </div>
    </template>

    <!-- 多行文本框使用示例 -->
    <div class="input-box">
      <SunlightInput v-model="content" :item="textareaItem" />
    </div>

    <!-- 当前文本内容展示 -->
    <div class="display-wrapper">
      <span class="label">文本内容：</span>
      <p class="text-content" v-if="content">{{ content }}</p>
      <p class="text-placeholder" v-else>暂无内容</p>
    </div>

    <!-- 组件属性文档 -->
    <el-divider>组件属性（Props）</el-divider>
    <SunlightTable :data="inputProps" :columns="propColumns">
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
    <SunlightTable :data="inputEvents" :columns="eventColumns">
      <template #used="{ row }">
        <span v-if="row.used === '✔'" class="used-check">✔</span>
        <span v-else>{{ row.used }}</span>
      </template>
    </SunlightTable>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightInput, SunlightTable } from 'sunlight-ui'

// 绑定多行文本框的内容
const content = ref('')

// 多行文本框配置对象
const textareaItem = {
  clearable: true,
  placeholder: '请输入内容',
  type: 'textarea', // 明确指定多行文本框类型
  rows: 4, // 默认显示4行高度
  maxlength: 200,
  wrapperStyle: {
    borderColor: '#c0c4cc',
    borderRadius: '4px'
  }
}

// 组件属性数据
const inputProps = [
  {
    name: 'modelValue',
    type: 'string | number',
    default: "''",
    description: '绑定的输入值，支持 v-model 双向绑定',
    used: '✔'
  },
  {
    name: 'item',
    type: 'object',
    default: '{}',
    description: '输入框配置对象，包含样式、事件、属性等详细配置',
    used: '✔'
  },
  {
    name: 'componentName',
    type: 'string | object',
    default: "'el-input'",
    description: '动态渲染的组件名或组件对象，默认使用 Element Plus 的 el-input',
    used: ''
  }
]

// item 配置对象属性
const itemProps = [
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用输入框', used: '' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读', used: '' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮', used: '✔' },
  { name: 'maxlength', type: 'number', default: '-', description: '最大输入长度', used: '✔' },
  { name: 'showWordLimit', type: 'boolean', default: 'false', description: '是否显示字数统计', used: '' },
  { name: 'prefixIcon', type: 'string', default: '-', description: '输入框前缀图标', used: '' },
  { name: 'suffixIcon', type: 'string', default: '-', description: '输入框后缀图标', used: '' },
  { name: 'placeholder', type: 'string', default: '-', description: '输入框占位符', used: '✔' },
  { name: 'size', type: 'string', default: '-', description: '输入框尺寸，如 medium、small', used: '' },
  { name: 'autofocus', type: 'boolean', default: 'false', description: '是否自动聚焦', used: '' },
  {
    name: 'rows',
    type: 'number',
    default: '-',
    description: '多行文本框行数，仅当 type 为 textarea 时生效',
    used: '✔'
  },
  {
    name: 'type',
    type: 'string',
    default: "'text'",
    description: '输入框类型，如 text、password、textarea',
    used: '✔'
  },
  { name: 'customClass', type: 'string', default: '-', description: '自定义样式类', used: '' },
  { name: 'customStyle', type: 'object', default: '-', description: '自定义内联样式', used: '' },
  { name: 'config', type: 'object', default: '{}', description: '额外属性配置，支持传入任意属性', used: '' },
  { name: 'eventFunction', type: 'object', default: '{}', description: '额外事件绑定，支持传入自定义事件', used: '' },
  { name: 'slotNames', type: 'string[]', default: '[]', description: '需要渲染的具名插槽名称数组', used: '' }
]

// 事件说明数据
const inputEvents = [
  { name: 'update:modelValue', description: '绑定值更新事件，支持 v-model', params: '新的输入值', used: '✔' },
  { name: 'input', description: '输入事件，实时触发', params: '新的输入值', used: '' },
  { name: 'change', description: '输入值改变事件', params: '新的输入值', used: '' },
  { name: 'focus', description: '输入框获得焦点事件', params: '原生事件对象', used: '' },
  { name: 'blur', description: '输入框失去焦点事件', params: '原生事件对象', used: '' },
  { name: 'clear', description: '点击清除按钮事件', params: '原生事件对象', used: '' },
  { name: 'keydown', description: '键盘按下事件', params: '原生事件对象', used: '' }
]

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
</script>

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
.input-box {
  margin-bottom: 60px;
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

.input-wrapper {
  margin: 28px 0 36px;
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
  align-items: center;
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
}

.text-content {
  font-size: 20px;
  color: #2c3e50;
  font-weight: 600;
  max-width: 80%;
  word-break: break-word;
  line-height: 1.4;
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
