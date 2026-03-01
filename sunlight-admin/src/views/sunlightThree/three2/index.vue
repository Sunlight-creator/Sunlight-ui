<script setup lang="ts">
import { ref, reactive } from 'vue'
import { SunlightThree, SunlightTable } from 'sunlight-ui'

// 树形数据
const treeData = ref([
  {
    id: '1',
    label: '一级 1',
    children: [
      { id: '1-1', label: '二级 1-1', children: [{ id: '1-1-1', label: '三级 1-1-1' }] },
      { id: '1-2', label: '二级 1-2' }
    ]
  },
  {
    id: '2',
    label: '一级 2',
    children: [
      { id: '2-1', label: '二级 2-1' },
      { id: '2-2', label: '二级 2-2' }
    ]
  },
  {
    id: '3',
    label: '一级 3'
  }
])

// 双向绑定的值
const selectedValue = ref(['1-1', '2-1'])

// 事件触发状态跟踪
const eventStatus = reactive({
  change: false
})

// 组件配置对象（包含所有支持的属性）
const threeConfig = ref({
  // 基础属性
  id: 'id',
  label: 'label',
  multiple: true,
  defaultValue: ['1-1', '2-1'],

  // 自定义样式
  wrapperStyle: {
    borderRadius: '8px',
    borderColor: '#c0c4cc',
    backgroundColor: '#f5f7fa',
    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    selectedBgColor: '#67c23a',
    selectedTextColor: '#ffffff'
  }
})

// 处理事件
const handleChange = (val: any) => {
  console.log('change事件:', val)
  selectedValue.value = val
  eventStatus.change = true
}

// 组件属性数据
const threeProps = [
  {
    name: 'data',
    type: 'Array',
    default: '[]',
    description: '树形结构数据，必传',
    used: '✔'
  },
  {
    name: 'title',
    type: 'string',
    default: 'undefined',
    description: '组件标题',
    used: '✔'
  },
  {
    name: 'id',
    type: 'string',
    default: 'id',
    description: '树形节点唯一标识字段名',
    used: '✔'
  },
  {
    name: 'label',
    type: 'string',
    default: 'label',
    description: '树形节点显示文本字段名',
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
    name: 'defaultValue',
    type: 'string | string[]',
    default: 'undefined',
    description: '默认选中值，单选传字符串，多选传数组',
    used: '✔'
  },
  {
    name: 'wrapperStyle',
    type: 'object',
    default: '{}',
    description: '组件容器样式配置对象',
    used: '✔'
  }
]

// wrapperStyle 配置对象属性
const wrapperStyleProps = [
  { name: 'borderColor', type: 'string', default: '#c0c4cc', description: '边框颜色', used: '✔' },
  { name: 'borderRadius', type: 'string', default: '4px', description: '边框圆角', used: '✔' },
  { name: 'backgroundColor', type: 'string', default: 'undefined', description: '背景颜色', used: '✔' },
  { name: 'boxShadow', type: 'string', default: 'undefined', description: '阴影效果', used: '✔' },
  { name: 'focusBoxShadow', type: 'string', default: 'undefined', description: '聚焦时阴影效果', used: '' },
  { name: 'selectedBgColor', type: 'string', default: '#409eff', description: '选中节点背景颜色', used: '✔' },
  { name: 'selectedTextColor', type: 'string', default: '#ffffff', description: '选中节点文本颜色', used: '✔' }
]

// 事件说明数据
const threeEvents = [{ name: 'change', description: '节点选择变化时触发', params: '选中的节点ID或ID数组', used: '✔' }]

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
        <span class="title">SunlightThree 完整功能演示</span>
      </div>
    </template>

    <!-- 树形组件使用示例 -->
    <div class="three-box">
      <el-row :gutter="20">
        <el-col :span="12">
          <SunlightThree
            v-model="selectedValue"
            :data="treeData"
            :title="'完整功能树形结构'"
            :id="threeConfig.id"
            :label="threeConfig.label"
            :multiple="threeConfig.multiple"
            :default-value="threeConfig.defaultValue"
            :wrapper-style="threeConfig.wrapperStyle"
            @change="handleChange"
          >
          </SunlightThree>
        </el-col>
        <el-col :span="12">
          <div class="result-box">
            <h4>选择结果</h4>
            <p class="result-content">{{ selectedValue.length > 0 ? selectedValue.join(', ') : '暂无选择' }}</p>
            <h4>事件状态</h4>
            <div class="event-status">
              <div class="event-item">
                <span class="event-name">change:</span>
                <span class="event-result">{{ eventStatus.change ? '已触发' : '未触发' }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 组件属性文档 -->
    <el-divider>组件属性（Props）</el-divider>
    <SunlightTable :data="threeProps" :columns="propColumns" border style="width: 100%">
      <template #used="{ row }">
        <span v-if="row.used === '✔'" class="used-check">✔</span>
        <span v-else>{{ row.used }}</span>
      </template>
    </SunlightTable>

    <el-divider>wrapperStyle 配置对象说明</el-divider>
    <SunlightTable :data="wrapperStyleProps" :columns="propColumns" border style="width: 100%">
      <template #used="{ row }">
        <span v-if="row.used === '✔'" class="used-check">✔</span>
        <span v-else>{{ row.used }}</span>
      </template>
    </SunlightTable>

    <!-- 事件说明 -->
    <el-divider>事件说明（Emits）</el-divider>
    <SunlightTable :data="threeEvents" :columns="eventColumns" border style="width: 100%">
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

.three-box {
  margin-bottom: 60px;
}

.result-box {
  padding: 24px;
  background-color: #f5f7fa;
  border-radius: 12px;
  height: 100%;
}

.result-box h4 {
  color: #409eff;
  margin-bottom: 12px;
}

.result-content {
  background-color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  min-height: 40px;
  line-height: 24px;
  margin-bottom: 24px;
}

.event-status {
  background-color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.event-item {
  display: flex;
  margin-bottom: 8px;
}

.event-name {
  font-weight: bold;
  margin-right: 12px;
  min-width: 80px;
}

.event-result {
  color: #67c23a;
}

.used-check {
  color: #67c23a;
  font-weight: bold;
}
</style>
