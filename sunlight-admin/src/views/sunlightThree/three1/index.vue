<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { SunlightThree, SunlightTable } from 'sunlight-ui'

// 基础树形数据
const basicTreeData = ref([
  {
    id: '1',
    label: '一级菜单1',
    children: [
      {
        id: '1-1',
        label: '二级菜单1-1',
        children: [
          { id: '1-1-1', label: '三级菜单1-1-1' },
          { id: '1-1-2', label: '三级菜单1-1-2' },
          { id: '1-1-3', label: '三级菜单1-1-3' }
        ]
      },
      {
        id: '1-2',
        label: '二级菜单1-2',
        children: [
          { id: '1-2-1', label: '三级菜单1-2-1' },
          { id: '1-2-2', label: '三级菜单1-2-2' }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '一级菜单2',
    children: [
      { id: '2-1', label: '二级菜单2-1' },
      { id: '2-2', label: '二级菜单2-2' }
    ]
  },
  {
    id: '3',
    label: '一级菜单3',
    children: [
      {
        id: '3-1',
        label: '二级菜单3-1',
        children: [
          { id: '3-1-1', label: '三级菜单3-1-1' },
          { id: '3-1-2', label: '三级菜单3-1-2' },
          { id: '3-1-3', label: '三级菜单3-1-3' },
          { id: '3-1-4', label: '三级菜单3-1-4' }
        ]
      }
    ]
  }
])

// 动态树形数据
const dynamicTreeData = ref([])

// 模拟动态加载数据
const loadDynamicData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 'dynamic-1',
          label: '动态一级菜单1',
          children: [
            { id: 'dynamic-1-1', label: '动态二级菜单1-1' },
            { id: 'dynamic-1-2', label: '动态二级菜单1-2' }
          ]
        },
        {
          id: 'dynamic-2',
          label: '动态一级菜单2',
          children: [
            { id: 'dynamic-2-1', label: '动态二级菜单2-1' },
            { id: 'dynamic-2-2', label: '动态二级菜单2-2' },
            { id: 'dynamic-2-3', label: '动态二级菜单2-3' }
          ]
        }
      ])
    }, 1500)
  })
}

// 初始化动态数据
loadDynamicData().then(data => {
  dynamicTreeData.value = data as any[]
})

// 选中值
const singleSelectedValue = ref('1-1-1')
const multipleSelectedValue = ref(['1-1-1', '1-2-1', '2-1'])

// 主题示例选中值
const defaultThemeValue = ref('1-1-1')
const greenThemeValue = ref('1-1-1')
const blueThemeValue = ref('1-1-1')
const orangeThemeValue = ref('1-1-1')
const redThemeValue = ref('1-1-1')
const roundedThemeValue = ref('1-1-1')

// 事件触发状态跟踪
const eventStatus = reactive({
  change: false
})

// 处理change事件
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
const threeProps = [
  {
    name: 'data',
    type: 'Array<object>',
    default: '[]',
    description: '树形数据，数组格式，节点对象需包含唯一标识和显示文本字段',
    used: '✔'
  },
  {
    name: 'title',
    type: 'string',
    default: '-',
    description: '组件标题，显示在顶部',
    used: '✔'
  },
  {
    name: 'id',
    type: 'string',
    default: '"id"',
    description: '节点唯一标识字段名',
    used: '-' // 使用默认值
  },
  {
    name: 'label',
    type: 'string',
    default: '"label"',
    description: '节点显示文本字段名',
    used: '-' // 使用默认值
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: '是否启用多选模式',
    used: '✔'
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    default: '-',
    description: '默认选中节点，单选时为字符串，多选时为字符串数组',
    used: '✔'
  },
  {
    name: 'wrapperStyle',
    type: 'object',
    default: '{}',
    description: '自定义主题样式配置',
    used: '✔'
  }
]

// 事件说明数据
const threeEvents = [
  {
    name: 'change',
    description: '选中节点变化时触发',
    params: '单选：选中节点 id，多选：选中节点 id 数组',
    used: '✔'
  }
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

// wrapperStyle 配置说明
const wrapperStyleDoc = `wrapperStyle 配置对象说明：

{
  borderColor: '#c0c4cc',        // 默认边框颜色（默认：深灰色）
  borderRadius: '4px',           // 边框圆角（默认：4px）
  backgroundColor: '#ffffff',     // 背景颜色（可选）
  boxShadow: 'none',              // 阴影（可选）
  focusBorderColor: '#409eff',    // 聚焦时边框颜色（默认：蓝色）
  focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.15)',  // 聚焦时阴影（默认：3px蓝色阴影）
  selectedBgColor: '#409eff',     // 选中节点背景颜色（默认：蓝色）
  selectedTextColor: '#ffffff'    // 选中节点文本颜色（默认：白色）
}

使用示例：
:item="{
  wrapperStyle: {
    selectedBgColor: '#67c23a',      // 绿色选中背景
    selectedTextColor: '#ffffff',    // 白色选中文本
    borderRadius: '8px'              // 8px 圆角
  }
}"`
</script>

<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightThree 自定义颜色样式示例</span>
    </div>

    <el-divider>默认样式（深灰色边框）</el-divider>
    <div class="three-box">
      <SunlightThree
        :data="basicTreeData"
        title="基础树形结构"
        :defaultValue="defaultThemeValue"
        @change="handleChange"
      />
    </div>

    <el-divider>绿色主题</el-divider>
    <div class="three-box">
      <SunlightThree
        :data="basicTreeData"
        title="绿色主题树形结构"
        :defaultValue="greenThemeValue"
        :wrapperStyle="{
          selectedBgColor: '#67c23a',
          selectedTextColor: '#ffffff'
        }"
        @change="handleChange"
      />
    </div>

    <el-divider>蓝色主题</el-divider>
    <div class="three-box">
      <SunlightThree
        :data="basicTreeData"
        title="蓝色主题树形结构"
        :defaultValue="blueThemeValue"
        :wrapperStyle="{
          selectedBgColor: '#409eff',
          selectedTextColor: '#ffffff'
        }"
        @change="handleChange"
      />
    </div>

    <el-divider>橙色主题</el-divider>
    <div class="three-box">
      <SunlightThree
        :data="basicTreeData"
        title="橙色主题树形结构"
        :defaultValue="orangeThemeValue"
        :wrapperStyle="{
          selectedBgColor: '#e6a23c',
          selectedTextColor: '#ffffff'
        }"
        @change="handleChange"
      />
    </div>

    <el-divider>红色主题</el-divider>
    <div class="three-box">
      <SunlightThree
        :data="basicTreeData"
        title="红色主题树形结构"
        :defaultValue="redThemeValue"
        :wrapperStyle="{
          selectedBgColor: '#f56c6c',
          selectedTextColor: '#ffffff'
        }"
        @change="handleChange"
      />
    </div>

    <el-divider>自定义圆角</el-divider>
    <div class="three-box">
      <SunlightThree
        :data="basicTreeData"
        title="自定义圆角树形结构"
        :defaultValue="roundedThemeValue"
        :wrapperStyle="{
          borderRadius: '12px',
          selectedBgColor: '#67c23a',
          selectedTextColor: '#ffffff'
        }"
        @change="handleChange"
      />
    </div>

    <el-divider>wrapperStyle 配置说明</el-divider>
    <div class="config-doc">
      <pre>{{ wrapperStyleDoc }}</pre>
    </div>
  </el-card>
</template>

<style scoped>
.box-card {
  margin: 20px;
}

.card-header {
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.three-box {
  margin: 20px 0;
}

.config-doc {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.config-doc pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
}
</style>
