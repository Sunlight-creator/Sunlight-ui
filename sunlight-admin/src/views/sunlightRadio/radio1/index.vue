<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { SunlightRadio, SunlightTable } from 'sunlight-ui'
// 双向绑定的值
const radioValue = ref('option1')

// 事件触发状态跟踪
const eventStatus = reactive({
  change: false
})

// 单选按钮配置对象（包含所有支持的属性）
const radioConfig = ref({
  // 基础属性
  disabled: false,
  isGroup: true, // 是否作为单选按钮组
  // 选项配置
  options: [
    { value: 'option1', label: '选项1', disabled: false },
    { value: 'option2', label: '选项2', disabled: false },
    { value: 'option3', label: '选项3', disabled: true }
  ],
  // 自定义样式
  customStyle: {
    width: '100%'
  },
  wrapperStyle: {
    borderColor: '#67c23a', // 自定义绿色边框
    borderRadius: '4px', // 默认 4px 圆角
    padding: '10px', // 内边距
    backgroundColor: '#f5f7fa' // 背景色
  },
  // 额外配置（传递给el-radio-group）
  config: {
    size: 'default' // 'large', 'default', 'small'
  },
  // 选项配置（传递给每个el-radio）
  optionConfig: {
    border: true
  },
  // 事件函数
  eventFunction: {
    focus: () => console.log('聚焦事件'),
    blur: () => console.log('失焦事件')
  },
  // 插槽名称
  slotNames: []
})

// 处理所有事件
const handleChange = (val: any) => {
  console.log('change事件:', val)
  eventStatus.change = true
}

// 转换事件状态为表格数据格式
const eventStatusList = computed(() => {
  return Object.entries(eventStatus).map(([event, status]) => ({
    event,
    status
  }))
})

// 组件属性数据
const radioProps = [
  {
    name: 'modelValue',
    type: 'string | number | Boolean',
    default: 'null',
    description: '绑定的单选值，支持 v-model 双向绑定',
    used: '✔'
  },
  {
    name: 'item',
    type: 'object',
    default: '{}',
    description: '单选按钮配置对象，包含样式、事件、属性等详细配置',
    used: '✔'
  }
]

// item 配置对象属性
const itemProps = [
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用单选按钮', used: '' },
  { name: 'isGroup', type: 'boolean', default: 'true', description: '是否作为单选按钮组', used: '✔' },
  {
    name: 'options',
    type: 'array | function',
    default: '[]',
    description: '选项列表，可以是数组或返回数组的函数',
    used: '✔'
  },
  { name: 'customStyle', type: 'object', default: '-', description: '自定义样式', used: '✔' },
  {
    name: 'wrapperStyle',
    type: 'object',
    default: '-',
    description: '包装器样式，支持 borderColor、borderRadius、backgroundColor 等',
    used: '✔'
  },
  { name: 'config', type: 'object', default: '{}', description: '额外配置，传递给 el-radio-group', used: '✔' },
  { name: 'optionConfig', type: 'object', default: '{}', description: '选项配置，传递给每个 el-radio', used: '✔' },
  { name: 'eventFunction', type: 'object', default: '{}', description: '事件函数配置', used: '✔' },
  { name: 'slotNames', type: 'array', default: '[]', description: '插槽名称配置', used: '' }
]

// 事件说明数据
const radioEvents = [
  { name: 'update:modelValue', description: '绑定值更新事件，支持 v-model', params: '新的单选值', used: '✔' },
  { name: 'change', description: '单选值改变事件', params: '新的单选值', used: '✔' }
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

<template>
  <el-card class="box-card" shadow="hover">
    <!-- 卡片头部 -->
    <template #header>
      <div class="card-header">
        <span class="title">SunlightRadio 完整功能演示</span>
      </div>
    </template>

    <!-- 单选按钮使用示例 -->
    <div class="radio-box">
      <el-row :gutter="20">
        <el-col :span="12">
          <SunlightRadio v-model="radioValue" :item="radioConfig" @change="handleChange"> </SunlightRadio>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>

    <!-- 当前选择内容展示 -->
    <div class="display-wrapper">
      <span class="label">当前选择值：</span>
      <p class="text-content">{{ radioValue }}</p>
    </div>

    <div class="display-wrapper">
      <span class="label">操作：</span>
      <el-button @click="radioValue = 'option2'"> 设置为选项2 </el-button>
    </div>

    <!-- 组件属性文档 -->
    <el-divider>组件属性（Props）</el-divider>
    <SunlightTable :data="radioProps" :columns="propColumns">
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
    <SunlightTable :data="radioEvents" :columns="eventColumns">
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

.radio-box {
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
