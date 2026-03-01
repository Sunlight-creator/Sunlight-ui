<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
// import { SunlightInput, SunlightTable } from 'sunlight-ui'
// 双向绑定的值
const inputValue = ref('初始值')

// 事件触发状态跟踪
const eventStatus = reactive({
  input: false,
  change: false,
  focus: false,
  blur: false,
  clear: false,
  keydown: false
})

// 输入框配置对象（包含所有支持的属性）
const inputConfig = ref({
  // 基础属性
  disabled: true,
  readonly: false,
  clearable: true,
  maxlength: 20,
  showWordLimit: true,
  prefixIcon: 'Search',
  suffixIcon: 'Calendar',
  placeholder: '请输入搜索内容...',
  size: 'default', // 'large' | 'default' | 'small'
  autofocus: true,
  type: 'text', // 可改为 'textarea'、'password' 等
  // 自定义样式
  customClass: 'my-input',
  wrapperStyle: {
    borderColor: '#c0c4cc', // 默认边框颜色（深灰色）
    borderRadius: '4px', // 默认 4px 圆角
    focusBorderColor: '#67c23a', // 聚焦时绿色边框
    focusBoxShadow: '0 0 0 3px rgba(103,194,58,0.25)' // 聚焦时绿色阴影
  },

  // 额外配置（通过...item.config传递）
  config: {
    name: 'search-input',
    tabindex: 1
  }
})

// 处理所有事件
const handleInput = (val: string) => {
  console.log('input事件:', val)
  eventStatus.input = true
}

const handleChange = (val: string) => {
  console.log('change事件:', val)
  eventStatus.change = true
}

const handleFocus = (e: Event) => {
  console.log('focus事件:', e)

  eventStatus.focus = true
}

const handleBlur = (e: Event) => {
  console.log('blur事件:', e)
  eventStatus.blur = true
}

const handleClear = (e: Event) => {
  console.log('clear事件:', e)
  alert('输入框已清空！')
  eventStatus.clear = true
}

const handleKeydown = (e: KeyboardEvent) => {
  console.log('keydown事件:', e.key)
  if (e.key === 'Enter') {
    alert('按下了回车键')
  }
  eventStatus.keydown = true
}

// 通过ref调用组件方法
const smartInputRef = ref()
const focusInput = () => {
  smartInputRef.value?.focus()
}

// 转换事件状态为表格数据格式
const eventStatusList = computed(() => {
  return Object.entries(eventStatus).map(([event, status]) => ({
    event,
    status
  }))
})

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
  }
]

// item 配置对象属性
const itemProps = [
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用输入框', used: '' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读', used: '' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮', used: '✔' },
  { name: 'maxlength', type: 'number', default: '-', description: '最大输入长度', used: '✔' },
  { name: 'showWordLimit', type: 'boolean', default: 'false', description: '是否显示字数统计', used: '✔' },
  { name: 'prefixIcon', type: 'string', default: '-', description: '输入框前缀图标', used: '✔' },
  { name: 'suffixIcon', type: 'string', default: '-', description: '输入框后缀图标', used: '✔' },
  { name: 'placeholder', type: 'string', default: '-', description: '输入框占位符', used: '✔' },
  { name: 'size', type: 'string', default: '-', description: '输入框尺寸，如 medium、small', used: '' },
  { name: 'autofocus', type: 'boolean', default: 'false', description: '是否自动聚焦', used: '✔' },
  { name: 'rows', type: 'number', default: '-', description: '多行文本框行数，仅当 type 为 textarea 时生效', used: '' },
  { name: 'type', type: 'string', default: "'text'", description: '输入框类型，如 text、password、textarea', used: '' },
  { name: 'customClass', type: 'string', default: '-', description: '自定义样式类', used: '✔' },
  { name: 'customStyle', type: 'object', default: '-', description: '自定义内联样式', used: '✔' },
  {
    name: 'wrapperStyle',
    type: 'object',
    default: '-',
    description: '边框和样式配置对象，支持 borderColor、borderRadius、focusBorderColor 等',
    used: '✔'
  },
  { name: 'config', type: 'object', default: '{}', description: '额外属性配置，支持传入任意属性', used: '✔' }
]

// 事件说明数据
const inputEvents = [
  { name: 'update:modelValue', description: '绑定值更新事件，支持 v-model', params: '新的输入值', used: '✔' },
  { name: 'input', description: '输入事件，实时触发', params: '新的输入值', used: '✔' },
  { name: 'change', description: '输入值改变事件', params: '新的输入值', used: '✔' },
  { name: 'focus', description: '输入框获得焦点事件', params: '原生事件对象', used: '✔' },
  { name: 'blur', description: '输入框失去焦点事件', params: '原生事件对象', used: '✔' },
  { name: 'clear', description: '点击清除按钮事件', params: '原生事件对象', used: '✔' },
  { name: 'keydown', description: '键盘按下事件', params: '原生事件对象', used: '✔' }
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
        <span class="title">SunlightInput 完整功能演示</span>
      </div>
    </template>

    <!-- 输入框使用示例 -->
    <div class="input-box">
      <el-row :gutter="20">
        <el-col :span="12">
          <SunlightInput
            ref="smartInputRef"
            v-model="inputValue"
            :item="inputConfig"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @clear="handleClear"
            @keydown="handleKeydown"
            theme="success"
          >
          </SunlightInput
        ></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>

    <!-- 当前输入内容展示 -->
    <div class="display-wrapper">
      <span class="label">当前输入值：</span>
      <p class="text-content" v-if="inputValue">{{ inputValue }}</p>
      <p class="text-placeholder" v-else>暂无输入内容</p>
    </div>

    <div class="display-wrapper">
      <span class="label">操作：</span>
      <el-button @click="inputValue = '程序设置的值'"> 修改值为"程序设置的值" </el-button>
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
