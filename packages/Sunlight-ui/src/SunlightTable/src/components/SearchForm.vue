<template>
  <div v-if="visibleColumns.length > 0" class="sunlight-search-form">
    <el-form
      ref="formRef"
      :model="props.searchParam"
      v-bind="formOptions"
    >
      <el-row :gutter="20">
        <!-- 查询字段 -->
        <el-col
          v-for="col in displayColumns"
          :key="col.prop"
          :span="col.span || 6"
        >
          <el-form-item :label="col.label" :prop="col.prop">
            <component
              :is="getComponent(col.type || 'input')"
              :model-value="props.searchParam[col.prop]"
              :item="getItemConfigWithOptions(col)"
              @update:model-value="handleFieldUpdate(col.prop, $event)"
            />
          </el-form-item>
        </el-col>
        
        <!-- 操作按钮 -->
        <el-col :span="operationSpan" class="search-operation-col">
          <el-form-item label-width="0">
            <div class="search-operation">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
              <el-button
                v-if="shouldShowCollapseButton"
                type="primary"
                link
                @click="toggleCollapse"
              >
                {{ collapsed ? '展开' : '收起' }}
                <el-icon class="el-icon--right">
                  <component :is="collapsed ? ArrowDown : ArrowUp" />
                </el-icon>
              </el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive, onMounted } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import SunlightInput from '../../../SunlightInput.vue'
import SunlightTextarea from '../../../SunlightTextarea.vue'
import SunlightSelect from '../../../SunlightSelect.vue'
import SunlightCascader from '../../../SunlightCascader.vue'
import SunlightRadio from '../../../SunlightRadio.vue'
import SunlightCheckbox from '../../../SunlightCheckbox.vue'
import SunlightDatePicker from '../../../SunlightDatePicker.vue'
import type { SearchColumn } from '../types/index'

interface Props {
  columns: SearchColumn[]
  searchParam: Record<string, any>
  themeStyle?: {
    borderColor?: string
    focusBorderColor?: string
    focusBoxShadow?: string
  }
  formOptions?: {
    labelWidth?: string
    size?: 'large' | 'default' | 'small'
    inline?: boolean
    disabled?: boolean
  }
  visibleColumns?: string[] // 可见的查询字段 prop 数组
  collapsed?: boolean // 是否默认收起
  showCollapseButton?: boolean // 是否显示收起/展开按钮
  collapseThreshold?: number // 超过多少个字段显示收起/展开按钮
}

const props = withDefaults(defineProps<Props>(), {
  themeStyle: () => ({
    borderColor: '#dcdfe6',
    focusBorderColor: '#409eff',
    focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)'
  }),
  formOptions: () => ({
    labelWidth: '100px',
    size: 'default',
    inline: false,
    disabled: false
  }),
  visibleColumns: () => [],
  collapsed: false,
  showCollapseButton: undefined, // 如果未设置，根据字段数量自动决定
  collapseThreshold: 4
})

const emit = defineEmits<{
  'update:searchParam': [searchParam: Record<string, any>]
  'update:visibleColumns': [visibleColumns: string[]]
  'update:collapsed': [collapsed: boolean]
  search: [searchParam: Record<string, any>]
  reset: []
}>()

const collapsed = ref(props.collapsed)
const formRef = ref()

// 异步选项缓存
const asyncOptionsCache = reactive<Record<string, any[]>>({})

// 加载异步选项
async function loadAsyncOptions(col: SearchColumn) {
  if (typeof col.options === 'function') {
    try {
      const data = await col.options()
      asyncOptionsCache[col.prop] = Array.isArray(data) ? data : []
    } catch (error) {
      console.error(`Failed to load options for ${col.prop}:`, error)
      asyncOptionsCache[col.prop] = []
    }
  }
}

// 获取选项数据
function getOptions(col: SearchColumn) {
  if (typeof col.options === 'function') {
    return asyncOptionsCache[col.prop] || []
  }
  return col.options || []
}

// 处理字段更新
function handleFieldUpdate(prop: string, value: any) {
  const newParam = { ...props.searchParam, [prop]: value }
  emit('update:searchParam', newParam)
}

// 组件挂载时加载异步选项
onMounted(() => {
  props.columns.forEach(col => {
    if (typeof col.options === 'function') {
      loadAsyncOptions(col)
    }
  })
})

// 监听 columns 变化，加载新的异步选项
watch(
  () => props.columns,
  (newColumns) => {
    newColumns.forEach(col => {
      if (typeof col.options === 'function' && !asyncOptionsCache[col.prop]) {
        loadAsyncOptions(col)
      }
    })
  },
  { deep: true }
)

// 如果没有传入 visibleColumns，默认显示所有字段
const visibleColumnsList = computed(() => {
  if (props.visibleColumns.length > 0) {
    return props.visibleColumns
  }
  return props.columns.map(col => col.prop)
})

// 计算可见的查询列
const visibleColumns = computed(() => {
  return props.columns.filter(col => visibleColumnsList.value.includes(col.prop))
})

// 计算是否显示收起/展开按钮
const shouldShowCollapseButton = computed(() => {
  if (props.showCollapseButton !== undefined) {
    return props.showCollapseButton
  }
  return props.columns.length > props.collapseThreshold
})

// 计算当前显示的列（根据收起状态）
// 依赖 asyncOptionsCache 确保当异步选项加载完成后重新计算
const displayColumns = computed(() => {
  // 访问 asyncOptionsCache 以确保响应式依赖
  Object.keys(asyncOptionsCache)
  
  const cols = collapsed.value
    ? visibleColumns.value.slice(0, props.collapseThreshold)
    : visibleColumns.value

  return cols.map(col => {
    // 保留原始 SearchColumn 的引用，以便 getOptions 能正确获取异步选项
    const baseCol: any = {
      ...col, // 保留原始列的所有属性
      span: col.span || 6, // 默认每行 4 个字段（24/6=4）
      clearable: col.clearable !== false,
      config: col.config || {},
      disabled: col.disabled || false,
      // 应用主题样式
      wrapperStyle: col.wrapperStyle || props.themeStyle
    }
    
    return baseCol
  })
})

// 计算当前行已使用的 span 总和
const usedSpan = computed(() => {
  return displayColumns.value.reduce((sum, col) => sum + (col.span || 6), 0)
})

// 计算操作按钮的 span：如果当前行剩余空间不足，则使用 24（单独一行），否则使用剩余空间
const operationSpan = computed(() => {
  const remaining = 24 - (usedSpan.value % 24)
  // 如果剩余空间 >= 6，则在同一行；否则单独一行
  return remaining >= 6 ? remaining : 24
})

// 获取组件
function getComponent(type: string) {
  const componentMap: Record<string, any> = {
    input: SunlightInput,
    textarea: SunlightTextarea,
    select: SunlightSelect,
    cascader: SunlightCascader,
    radio: SunlightRadio,
    checkbox: SunlightCheckbox,
    'date-picker': SunlightDatePicker,
    'datetime-picker': SunlightDatePicker
  }
  return componentMap[type] || SunlightInput
}

// 获取字段配置（带响应式选项）
function getItemConfigWithOptions(col: any) {
  const baseConfig: any = {
    label: col.label,
    placeholder: col.placeholder,
    clearable: col.clearable !== false,
    disabled: col.disabled || false,
    wrapperStyle: col.wrapperStyle || props.themeStyle,
    config: col.config || {},
    ...col.attrs
  }

  switch (col.type) {
    case 'input':
      return {
        ...baseConfig,
        type: 'text'
      }

    case 'textarea':
      return {
        ...baseConfig,
        config: {
          rows: 3,
          ...baseConfig.config
        }
      }

    case 'select':
      return {
        ...baseConfig,
        options: getOptions(col),
        setValue: col.setValue || 'value',
        setLabel: col.setLabel || 'label',
        config: {
          filterable: false,
          multiple: col.multiple || false,
          ...baseConfig.config
        }
      }

    case 'cascader':
      return {
        ...baseConfig,
        options: getOptions(col),
        config: {
          filterable: false,
          multiple: col.multiple || false,
          ...baseConfig.config
        }
      }

    case 'radio':
      return {
        ...baseConfig,
        options: getOptions(col),
        isGroup: true
      }

    case 'checkbox':
      return {
        ...baseConfig,
        options: getOptions(col),
        isGroup: true
      }

    case 'date-picker':
    case 'datetime-picker':
      return {
        ...baseConfig,
        type: col.type === 'datetime-picker' ? 'datetime' : 'date',
        valueFormat: col.type === 'datetime-picker' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
      }

    default:
      return baseConfig
  }
}


// 处理搜索
function handleSearch() {
  emit('search', { ...props.searchParam })
}

// 处理重置
function handleReset() {
  // 重置所有字段
  const resetData: Record<string, any> = {}
  props.columns.forEach(col => {
    const isMultiple = col.type === 'select' && (col.multiple || col.config?.multiple)
    if (isMultiple) {
      resetData[col.prop] = []
    } else if (col.type === 'input' || col.type === 'textarea') {
      resetData[col.prop] = ''
    } else {
      resetData[col.prop] = null
    }
  })
  emit('update:searchParam', resetData)
  emit('reset')
}

// 切换收起/展开状态
function toggleCollapse() {
  collapsed.value = !collapsed.value
  emit('update:collapsed', collapsed.value)
}

// 监听 props.collapsed 变化
watch(
  () => props.collapsed,
  (val) => {
    collapsed.value = val
  }
)
</script>

<style scoped>
.sunlight-search-form {
  margin-bottom: 16px;
}

.search-operation-col :deep(.el-form-item) {
  margin-bottom: 0;
}

.search-operation-col :deep(.el-form-item__content) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0 !important;
  justify-content: flex-end;
}

.search-operation {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
</style>

