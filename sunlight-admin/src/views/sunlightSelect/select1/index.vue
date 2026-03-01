<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { SunlightSelect, SunlightTable } from 'sunlight-ui'

// 双向绑定的值
const selectValue = ref('')

// 事件触发状态跟踪
const eventStatus = reactive({
  change: false,
  clear: false,
  focus: false,
  blur: false,
  'visible-change': false
})

// 选择框配置对象（包含所有支持的属性）
const selectConfig = ref({
  // 基础属性
  disabled: false,
  clearable: true,
  placeholder: '请选择内容...',
  size: 'default', // 'large' | 'default' | 'small'

  // 选项数据
  options: [
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' },
    { label: '选项四', value: 'option4' },
    { label: '选项五', value: 'option5' }
  ],

  // 自定义标签和值的键名
  setLabel: 'label',
  setValue: 'value',

  // 自定义样式
  customClass: 'my-select',
  wrapperStyle: {
    borderColor: '#c0c4cc', // 默认边框颜色（深灰色）
    borderRadius: '4px', // 默认 4px 圆角
    focusBorderColor: '#67c23a', // 聚焦时绿色边框
    focusBoxShadow: '0 0 0 3px rgba(103,194,58,0.25)' // 聚焦时绿色阴影
  },

  // 额外配置
  config: {
    name: 'test-select'
  }
})

// 处理所有事件
const handleChange = (val: string) => {
  console.log('change事件:', val)
  eventStatus.change = true
}

const handleClear = (e: Event) => {
  console.log('clear事件:', e)
  eventStatus.clear = true
}

const handleFocus = (e: Event) => {
  console.log('focus事件:', e)
  eventStatus.focus = true
}

const handleBlur = (e: Event) => {
  console.log('blur事件:', e)
  eventStatus.blur = true
}

const handleVisibleChange = (val: boolean) => {
  console.log('visible-change事件:', val)
  eventStatus['visible-change'] = true
}

// 转换事件状态为表格数据格式
const eventStatusList = computed(() => {
  return Object.entries(eventStatus).map(([event, status]) => ({
    event,
    status
  }))
})

// 组件属性数据
const selectProps = [
  {
    name: 'modelValue',
    type: 'string | number | Array',
    default: 'null',
    description: '绑定的选择值，支持 v-model 双向绑定',
    used: '✔'
  },
  {
    name: 'item',
    type: 'object',
    default: '{}',
    description: '选择框配置对象，包含样式、事件、属性等详细配置',
    used: '✔'
  }
]

// item 配置对象属性
const itemProps = [
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用选择框', used: '' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮', used: '✔' },
  { name: 'placeholder', type: 'string', default: '-', description: '选择框占位符', used: '✔' },
  { name: 'size', type: 'string', default: '-', description: '选择框尺寸', used: '' },
  { name: 'options', type: 'Array', default: '[]', description: '选择项数据', used: '✔' },
  { name: 'setLabel', type: 'string', default: 'label', description: '选项标签的键名', used: '✔' },
  { name: 'setValue', type: 'string', default: 'value', description: '选项值的键名', used: '✔' },
  { name: 'customClass', type: 'string', default: '-', description: '自定义样式类', used: '✔' },
  { name: 'customStyle', type: 'object', default: '-', description: '自定义内联样式', used: '✔' },
  { name: 'wrapperStyle', type: 'object', default: '-', description: '边框和样式配置对象', used: '✔' },
  { name: 'config', type: 'object', default: '{}', description: '额外属性配置', used: '✔' }
]

// 事件说明数据
const selectEvents = [
  { name: 'update:modelValue', description: '绑定值更新事件，支持 v-model', params: '新的选择值', used: '✔' },
  { name: 'change', description: '选择值改变事件', params: '新的选择值', used: '✔' },
  { name: 'clear', description: '点击清除按钮事件', params: '原生事件对象', used: '✔' },
  { name: 'focus', description: '选择框获得焦点事件', params: '原生事件对象', used: '✔' },
  { name: 'blur', description: '选择框失去焦点事件', params: '原生事件对象', used: '✔' },
  { name: 'visible-change', description: '下拉框显示/隐藏事件', params: '显示状态(true/false)', used: '✔' }
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
        <span class="title">SunlightSelect 完整功能演示</span>
      </div>
    </template>

    <!-- 选择框使用示例 -->
    <div class="input-box">
      <el-row :gutter="20">
        <el-col :span="12">
          <SunlightSelect
            v-model="selectValue"
            :item="selectConfig"
            @change="handleChange"
            @clear="handleClear"
            @focus="handleFocus"
            @blur="handleBlur"
            @visible-change="handleVisibleChange"
          >
          </SunlightSelect>
        </el-col>
      </el-row>
    </div>

    <!-- 当前选择内容展示 -->
    <div class="display-wrapper">
      <span class="label">当前选择值：</span>
      <p class="text-content" v-if="selectValue">{{ selectValue }}</p>
      <p class="text-placeholder" v-else>暂无选择内容</p>
    </div>

    <div class="display-wrapper">
      <span class="label">操作：</span>
      <el-button @click="selectValue = 'option3'"> 选择"选项三" </el-button>
    </div>

    <!-- 组件属性文档 -->
    <el-divider>组件属性（Props）</el-divider>
    <SunlightTable :data="selectProps" :columns="propColumns">
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
    <SunlightTable :data="selectEvents" :columns="eventColumns">
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

.input-box {
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
