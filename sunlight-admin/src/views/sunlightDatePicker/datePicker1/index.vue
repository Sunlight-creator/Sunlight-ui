<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { SunlightDatePicker, SunlightTable } from 'sunlight-ui'

// 双向绑定的值
const dateValue = ref('2024-01-01')

// 事件触发状态跟踪
const eventStatus = reactive({
  input: false,
  change: false,
  focus: false,
  blur: false,
  clear: false,
  keydown: false,
  'calendar-change': false,
  'visible-change': false
})

// 日期选择器配置对象（包含所有支持的属性）
const datePickerConfig = ref({
  // 基础属性
  disabled: false,
  readonly: false,
  clearable: true,
  placeholder: '请选择日期...',
  size: 'default', // 'large' | 'default' | 'small'
  autofocus: false,
  type: 'date', // 可改为 'datetime', 'daterange', 'month', 'year' 等
  valueFormat: 'YYYY-MM-DD',
  // 自定义样式
  customClass: 'my-date-picker',
  wrapperStyle: {
    borderColor: '#c0c4cc', // 默认边框颜色（深灰色）
    borderRadius: '4px', // 默认 4px 圆角
    focusBorderColor: '#409eff', // 聚焦时蓝色边框
    focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)' // 聚焦时蓝色阴影
  },

  // 额外配置（通过...item.config传递）
  config: {
    name: 'date-picker',
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
  eventStatus.clear = true
}

const handleKeydown = (e: KeyboardEvent) => {
  console.log('keydown事件:', e.key)
  eventStatus.keydown = true
}

const qqqqqqqq = (val: any) => {
  console.log('calendar-change事件:', val)
  eventStatus['calendar-change'] = true
}

const vbbbbb = (val: any) => {
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
const datePickerProps = [
  {
    name: 'modelValue',
    type: 'string | number | date | array',
    default: 'null',
    description: '绑定的值，支持 v-model 双向绑定',
    used: '✔'
  },
  {
    name: 'item',
    type: 'object',
    default: '{}',
    description: '日期选择器配置对象，包含所有支持的属性',
    used: '✔'
  }
]

// item 配置对象属性
const itemProps = [
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用日期选择器', used: '' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读', used: '' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮', used: '✔' },
  { name: 'placeholder', type: 'string', default: '-', description: '日期选择器占位符', used: '✔' },
  { name: 'size', type: 'string', default: '-', description: '日期选择器尺寸', used: '' },
  { name: 'autofocus', type: 'boolean', default: 'false', description: '是否自动聚焦', used: '' },
  {
    name: 'type',
    type: 'string',
    default: "'date'",
    description: '日期选择器类型，如 date、datetime、daterange 等',
    used: '✔'
  },
  { name: 'valueFormat', type: 'string', default: "'YYYY-MM-DD'", description: '值的格式', used: '✔' },
  { name: 'customClass', type: 'string', default: '-', description: '自定义样式类', used: '✔' },
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
const datePickerEvents = [
  { name: 'update:modelValue', description: '绑定值更新事件，支持 v-model', params: '新的日期值', used: '✔' },
  { name: 'input', description: '输入事件，实时触发', params: '新的日期值', used: '✔' },
  { name: 'change', description: '日期值改变事件', params: '新的日期值', used: '✔' },
  { name: 'focus', description: '日期选择器获得焦点事件', params: '原生事件对象', used: '✔' },
  { name: 'blur', description: '日期选择器失去焦点事件', params: '原生事件对象', used: '✔' },
  { name: 'clear', description: '点击清除按钮事件', params: '原生事件对象', used: '✔' },
  { name: 'keydown', description: '键盘按下事件', params: '原生事件对象', used: '✔' },
  { name: 'calendar-change', description: '日历面板日期变化事件', params: '当前日历面板显示的日期', used: '✔' },
  { name: 'visible-change', description: '弹出框显示/隐藏事件', params: '弹出框是否可见（布尔值）', used: '✔' }
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
        <span class="title">SunlightDatePicker 完整功能演示</span>
      </div>
    </template>

    <!-- 日期选择器使用示例 -->
    <div class="date-picker-box">
      <el-row :gutter="20">
        <el-col :span="6">
          <SunlightDatePicker
            ref="datePickerRef"
            v-model="dateValue"
            :item="datePickerConfig"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @clear="handleClear"
            @keydown="handleKeydown"
            @calendar-change="qqqqqqqq"
            @visible-change="vbbbbb"
          />
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>

    <!-- 当前日期展示 -->
    <div class="display-wrapper">
      <span class="label">当前选择值：</span>
      <p class="text-content" v-if="dateValue">{{ dateValue }}</p>
      <p class="text-placeholder" v-else>暂无选择内容</p>
    </div>

    <div class="display-wrapper">
      <span class="label">操作：</span>
      <el-button @click="dateValue = '2024-12-25'"> 修改值为"2024-12-25" </el-button>
    </div>

    <!-- 事件状态 -->
    <div class="event-section">
      <h3>事件状态</h3>
      <SunlightTable
        :data="eventStatusList"
        :columns="[
          { prop: 'event', label: '事件名称', width: '150px' },
          {
            prop: 'status',
            label: '触发状态',
            width: '150px',
            formatter: row =>
              row.status
                ? '<span style=\'color: #67c23a;\'>已触发</span>'
                : '<span style=\'color: #f56c6c;\'>未触发</span>'
          }
        ]"
      />
    </div>

    <!-- 组件属性文档 -->
    <el-divider>组件属性（Props）</el-divider>
    <SunlightTable :data="datePickerProps" :columns="propColumns">
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
    <SunlightTable :data="datePickerEvents" :columns="eventColumns">
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

.date-picker-box {
  margin-bottom: 60px;
}

.date-picker-wrapper {
  width: 300px;
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
  font-size: 18px;
  vertical-align: middle;
}

.text-placeholder {
  font-style: italic;
  color: #a0aec0;
  font-size: 18px;
  vertical-align: middle;
}

.event-section {
  margin-bottom: 48px;
  padding: 22px 32px;
  background-color: #f8f9fa;
  border-radius: 14px;
}

.event-section h3 {
  margin-bottom: 20px;
  color: #1f2d4a;
  font-size: 20px;
}

.used-check {
  color: #409eff;
  font-weight: 900;
  font-size: 18px;
  user-select: none;
}

.my-date-picker {
  /* 自定义类名样式 */
}
</style>
