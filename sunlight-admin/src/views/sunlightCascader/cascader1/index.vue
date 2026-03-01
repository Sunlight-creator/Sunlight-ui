<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { SunlightCascader, SunlightTable } from 'sunlight-ui'
// 双向绑定的值
const cascaderValue = ref(['zhejiang', 'hangzhou', 'xihu']) // 默认选中"浙江-杭州-西湖"

// 事件触发状态跟踪
const eventStatus = reactive({
  change: false,
  clear: false,
  focus: false,
  blur: false,
  visibleChange: false
})

// 级联选择器配置对象（包含所有支持的属性）
const cascaderConfig = ref({
  // 基础属性
  disabled: true,
  clearable: true,
  filterable: true,
  multiple: false, // 是否多选
  showAllLevels: true, // 是否显示所有级别标签
  collapseTags: false, // 是否折叠多选标签
  separator: '/', // 选项分隔符
  placeholder: '请选择地区...',
  size: 'default', // 'large' | 'default' | 'small'

  // 自定义样式
  wrapperStyle: {
    borderColor: '#67c23a', // 自定义绿色边框
    borderRadius: '4px',
    focusBorderColor: '#409eff', // 聚焦时蓝色边框
    focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)'
  },

  // 选项数据
  options: [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [{ value: 'xihu', label: '西湖' }]
        },
        {
          value: 'ningbo',
          label: '宁波',
          children: [
            { value: 'haishu', label: '海曙' },
            { value: 'jiangdong', label: '江东' },
            { value: 'jiangbei', label: '江北' }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'nanjing',
          label: '南京',
          children: [
            { value: 'xuanwu', label: '玄武' },
            { value: 'jianye', label: '建邺' },
            { value: 'qinhuai', label: '秦淮' }
          ]
        },
        {
          value: 'suzhou',
          label: '苏州',
          children: [
            { value: 'gusu', label: '姑苏' },
            { value: 'huqiu', label: '虎丘' },
            { value: 'wuzhong', label: '吴中' }
          ]
        }
      ]
    }
  ],

  // 额外配置（通过v-bind="item?.config"传递）
  config: {
    name: 'region-cascader',
    tabindex: 1
  }
})

// 处理所有事件
const handleChange = (val: any) => {
  console.log('change事件:', val)
  eventStatus.change = true
}

const handleClear = (e: Event) => {
  console.log('clear事件:', e)
  alert('级联选择器已清空！')
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

const handleVisibleChange = (visible: boolean) => {
  console.log('visible-change事件:', visible)
  eventStatus.visibleChange = true
}

// 转换事件状态为表格数据格式
const eventStatusList = computed(() => {
  return Object.entries(eventStatus).map(([event, status]) => ({
    event,
    status
  }))
})

// 组件属性数据
const cascaderProps = [
  {
    name: 'modelValue',
    type: 'string | number | array | object | null',
    default: 'null',
    description: '绑定的选中值，支持 v-model 双向绑定',
    used: '✔'
  },
  {
    name: 'item',
    type: 'object',
    default: '{}',
    description: '级联选择器配置对象，包含样式、事件、属性等详细配置',
    used: '✔'
  }
]

// item 配置对象属性
const itemProps = [
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用级联选择器', used: '' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮', used: '✔' },
  { name: 'filterable', type: 'boolean', default: 'false', description: '是否可搜索', used: '✔' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否多选', used: '' },
  { name: 'showAllLevels', type: 'boolean', default: 'true', description: '是否显示所有级别标签', used: '✔' },
  { name: 'collapseTags', type: 'boolean', default: 'false', description: '是否折叠多选标签', used: '' },
  { name: 'separator', type: 'string', default: "'/'", description: '选项分隔符', used: '✔' },
  { name: 'placeholder', type: 'string', default: '-', description: '级联选择器占位符', used: '✔' },
  { name: 'size', type: 'string', default: "'default'", description: '级联选择器尺寸，如 large、small', used: '' },
  { name: 'options', type: 'array', default: '[]', description: '级联选择器选项数据', used: '✔' },
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
const cascaderEvents = [
  { name: 'update:modelValue', description: '绑定值更新事件，支持 v-model', params: '新的选中值', used: '✔' },
  { name: 'change', description: '选中值改变事件', params: '选中的值', used: '✔' },
  { name: 'clear', description: '点击清除按钮事件', params: '原生事件对象', used: '✔' },
  { name: 'focus', description: '级联选择器获得焦点事件', params: '原生事件对象', used: '✔' },
  { name: 'blur', description: '级联选择器失去焦点事件', params: '原生事件对象', used: '✔' },
  { name: 'visible-change', description: '下拉面板显示/隐藏事件', params: '显示状态（true/false）', used: '✔' }
]

// 表格列配置 - 属性表格
const propColumns = [
  { prop: 'name', label: '属性名', width: 150 },
  { prop: 'type', label: '类型', width: 220 },
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
        <span class="title">SunlightCascader 完整功能演示</span>
      </div>
    </template>

    <!-- 级联选择器使用示例 -->
    <div class="cascader-box">
      <el-row :gutter="20">
        <el-col :span="12">
          <SunlightCascader
            v-model="cascaderValue"
            :item="cascaderConfig"
            @change="handleChange"
            @clear="handleClear"
            @focus="handleFocus"
            @blur="handleBlur"
            @visible-change="handleVisibleChange"
          >
          </SunlightCascader>
        </el-col>
      </el-row>
    </div>

    <!-- 当前选中内容展示 -->
    <div class="display-wrapper">
      <span class="label">当前选中值：</span>
      <p class="text-content" v-if="cascaderValue">
        {{ Array.isArray(cascaderValue) ? cascaderValue.join(' / ') : cascaderValue }}
      </p>
      <p class="text-placeholder" v-else>暂无选中内容</p>
    </div>

    <div class="display-wrapper">
      <span class="label">操作：</span>
      <el-button @click="cascaderValue = ['jiangsu', 'suzhou', 'gusu']"> 修改值为"江苏-苏州-姑苏" </el-button>
      <el-button @click="cascaderValue = null"> 清空选中值 </el-button>
    </div>

    <!-- 组件属性文档 -->
    <el-divider>组件属性（Props）</el-divider>
    <SunlightTable :data="cascaderProps" :columns="propColumns">
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
    <SunlightTable :data="cascaderEvents" :columns="eventColumns">
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

.cascader-box {
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
  vertical-align: middle;
  margin: 0;
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
