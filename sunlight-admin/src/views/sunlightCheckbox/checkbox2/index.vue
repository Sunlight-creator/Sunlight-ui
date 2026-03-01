<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { SunlightCheckbox, SunlightTable } from 'sunlight-ui'

// 双向绑定的值
const value = ref(['apple'])

// 事件触发状态跟踪
const eventStatus = reactive({
  change: false,
  focus: false,
  blur: false
})

// 复选框配置对象（包含所有支持的属性）
const checkboxConfig = ref({
  // 基础属性
  disabled: false,
  readonly: false,
  size: 'large', // 'large' | 'default' | 'small'
  // 选项配置
  options: [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' },
    { value: 'grape', label: '葡萄' }
  ],
  isGroup: true,
  // 自定义样式
  customClass: 'my-checkbox',
  wrapperStyle: {
    borderColor: '#c0c4cc', // 默认边框颜色（深灰色）
    borderRadius: '4px', // 默认 4px 圆角
    focusBorderColor: '#409eff', // 聚焦时蓝色边框
    focusBoxShadowColor: 'rgba(64, 158, 255, 0.25)'
  },
  // 额外配置
  config: {
    name: 'fruit-checkbox'
  }
})

// 处理所有事件
const handleChange = (val: string[]) => {
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

// 转换事件状态为表格数据格式
const eventStatusList = computed(() => {
  return Object.entries(eventStatus).map(([event, status]) => ({
    event,
    status
  }))
})

// 组件属性数据
const checkboxProps = [
  {
    name: 'modelValue',
    type: 'string[] | boolean',
    default: '[]',
    description: '绑定的选中值，支持 v-model 双向绑定，多选时为数组，单选时为布尔值',
    used: '✔'
  },
  {
    name: 'item',
    type: 'object',
    default: '{}',
    description: '复选框配置对象，包含样式、事件、属性等详细配置',
    used: '✔'
  }
]

// item 配置对象属性
const itemProps = [
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用复选框', used: '' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读', used: '' },
  {
    name: 'size',
    type: 'string',
    default: 'default',
    description: '复选框尺寸，可选值：large、default、small',
    used: '✔'
  },
  {
    name: 'options',
    type: 'array',
    default: '[]',
    description: '选项列表，每个选项包含 value 和 label 属性',
    used: '✔'
  },
  { name: 'isGroup', type: 'boolean', default: 'true', description: '是否为复选框组', used: '✔' },
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
const checkboxEvents = [
  { name: 'update:modelValue', description: '绑定值更新事件，支持 v-model', params: '新的选中值', used: '✔' },
  { name: 'change', description: '选中值改变事件', params: '新的选中值', used: '✔' },
  { name: 'focus', description: '复选框获得焦点事件', params: '原生事件对象', used: '✔' },
  { name: 'blur', description: '复选框失去焦点事件', params: '原生事件对象', used: '✔' }
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
        <span class="title">SunlightCheckbox 完整功能演示</span>
      </div>
    </template>

    <!-- 复选框使用示例 -->
    <div class="input-box">
      <el-row :gutter="20">
        <el-col :span="12">
          <SunlightCheckbox
            v-model="value"
            :item="checkboxConfig"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
          >
          </SunlightCheckbox>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>

    <!-- 当前选中内容展示 -->
    <div class="display-wrapper">
      <span class="label">当前选中值：</span>
      <p class="text-content" v-if="value && value.length > 0">{{ value.join(', ') }}</p>
      <p class="text-placeholder" v-else>暂无选中内容</p>
    </div>

    <div class="display-wrapper">
      <span class="label">操作：</span>
      <el-button @click="value = ['apple', 'banana']"> 修改值为["apple", "banana"] </el-button>
      <el-button @click="value = []"> 清空选中 </el-button>
    </div>

    <!-- 组件属性文档 -->
    <el-divider>组件属性（Props）</el-divider>
    <SunlightTable :data="checkboxProps" :columns="propColumns">
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
    <SunlightTable :data="checkboxEvents" :columns="eventColumns">
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

.text-content {
  font-size: 18px;
  color: #1f2d4a;
  margin: 0;
}

.text-placeholder {
  font-style: italic;
  color: #a0aec0;
  font-size: 18px;
  vertical-align: middle;
  margin: 0;
}

.used-check {
  color: #409eff;
  font-weight: 900;
  font-size: 18px;
  user-select: none;
}
</style>
