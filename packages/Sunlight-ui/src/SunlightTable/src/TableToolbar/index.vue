<template>
  <div class="table-toolbar">
    <template v-for="item in toolbarItems">
      <div class="toolbar-item" v-if="item.visible" :key="item.key">
        <el-dropdown
          v-if="item.type === 'density'"
          trigger="click"
          @command="item.onCommand"
          :teleported="false"
        >
          <el-button size="small" class="toolbar-btn" :icon="item.icon">
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="opt in item.options"
                :key="opt.value"
                :command="opt.value"
                :class="{ active: density === opt.value }"
              >
                {{ opt.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button
          v-else-if="item.type === 'columnConfig'"
          size="small"
          class="toolbar-btn"
          :icon="item.icon"
          @click="showColumnConfigDrawer = true"
        />

        <el-button
          v-else
          size="small"
          class="toolbar-btn"
          :icon="item.icon"
          @click="item.onClick"
        />
      </div>
    </template>

    <el-drawer
      v-model="showColumnConfigDrawer"
      title="列展示设置"
      size="360px"
      :close-on-click-modal="false"
      destroy-on-close
      :z-index="9999"
      append-to-body
    >
      <div class="column-drawer-content">
        <div class="column-item" v-for="col in allColumns" :key="col.prop">
          <span class="column-label">{{ col.label }}</span>
          <el-switch
            v-model="columnVisibility[col.prop]"
            :disabled="col.disableToggle"
            active-text="显示"
            inactive-text="隐藏"
          />
        </div>
      </div>
      <template #footer>
        <el-button @click="resetColumnConfig">恢复默认</el-button>
        <el-button type="primary" @click="saveColumnConfig">保存</el-button>
      </template>
    </el-drawer>

    <el-drawer
      v-if="searchColumns && searchColumns.length > 0"
      v-model="showSearchConfigDrawer"
      title="查询条件设置"
      size="360px"
      :close-on-click-modal="false"
      destroy-on-close
      :z-index="9999"
      append-to-body
    >
      <div class="column-drawer-content">
        <div class="column-item" v-for="col in searchColumns" :key="col.prop">
          <span class="column-label">{{ col.label }}</span>
          <el-switch
            v-model="searchColumnVisibility[col.prop]"
            :disabled="col.disableToggle"
            active-text="显示"
            inactive-text="隐藏"
          />
        </div>
      </div>
      <template #footer>
        <el-button @click="resetSearchConfig">恢复默认</el-button>
        <el-button type="primary" @click="saveSearchConfig">保存</el-button>
      </template>
    </el-drawer>

    <el-dialog
      :visible="showExportDialog"
      @update:visible="showExportDialog = $event"
      title="选择导出列"
      width="500px"
      :close-on-click-modal="false"
    >
      <div class="export-column-content">
        <el-checkbox-group v-model="selectedExportColumns">
          <el-checkbox
            v-for="col in exportableColumns"
            :key="col.prop"
            :label="col.prop"
          >
            {{ col.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <template #footer>
        <el-button @click="showExportDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmExport">确认导出</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { SetUp, Download, Setting, Refresh, Search } from '@element-plus/icons-vue'
import type { ToolbarConfig, ExportColumnConfig, TableItem, SearchColumn } from '../types/index'

interface Props {
  columns?: TableItem[]
  hideColumns?: (string | number)[]
  toolbarConfig?: ToolbarConfig
  exportConfig?: ExportColumnConfig
  searchColumns?: SearchColumn[]
  visibleSearchColumns?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  hideColumns: () => [],
  searchColumns: () => [],
  visibleSearchColumns: () => []
})

const emit = defineEmits<{
  'update:hideColumns': [hideColumns: (string | number)[]]
  'update:visibleSearchColumns': [visibleSearchColumns: string[]]
  'export': [columns?: string[]]
  'changeDensity': [density: string]
  'openSettings': []
  'openDynamicColumns': []
  'refresh': []
}>()

const toolbarConfig = computed(() => props.toolbarConfig || {})
const exportConfig = computed(() => props.exportConfig || {})

const density = ref('default')
const showColumnConfigDrawer = ref(false)
const showSearchConfigDrawer = ref(false)
const showExportDialog = ref(false)
const selectedExportColumns = ref<string[]>([])

const searchColumnVisibility = reactive<Record<string, boolean>>({})

const columnVisibility = reactive<Record<string, boolean>>({})

const allColumns = computed(() => props.columns.map(col => ({
  ...col,
  disableToggle: (col as any).disableToggle || false,
})))

const exportableColumns = computed(() => {
  const { excludeColumns = [] } = exportConfig.value
  return props.columns.filter(col => {
    if (excludeColumns.includes(col.prop)) return false
    if (col.hide) return false
    if (props.hideColumns.includes(col.prop)) return false
    return true
  })
})

const toolbarItems = computed(() => [
  {
    key: 'density',
    type: 'density',
    icon: SetUp,
    visible: toolbarConfig.value.showDensity,
    options: [
      { value: 'default', label: '默认' },
      { value: 'medium', label: '中等' },
      { value: 'compact', label: '紧凑' }
    ],
    onCommand: (command: string) => {
      density.value = command
      emit('changeDensity', command)
    }
  },
  {
    key: 'export',
    type: 'button',
    icon: Download,
    visible: toolbarConfig.value.showExport,
    onClick: () => handleExportClick()
  },
  {
    key: 'columnConfig',
    type: 'columnConfig',
    icon: Setting,
    visible: toolbarConfig.value.showColumnConfig,
    onClick: () => {}
  },
  {
    key: 'searchConfig',
    type: 'button',
    icon: Search,
    visible: toolbarConfig.value.showSearchConfig !== false && props.searchColumns && props.searchColumns.length > 0,
    onClick: () => {
      showSearchConfigDrawer.value = true
    }
  },
  {
    key: 'refresh',
    type: 'button',
    icon: Refresh,
    visible: toolbarConfig.value.showRefresh,
    onClick: () => emit('refresh')
  }
])

watch(() => props.columns, () => {
  initColumnVisibility()
}, { immediate: true, deep: true })

watch(() => props.searchColumns, () => {
  initSearchColumnVisibility()
}, { immediate: true, deep: true })

watch(() => props.visibleSearchColumns, () => {
  initSearchColumnVisibility()
}, { immediate: true, deep: true })

function initColumnVisibility() {
  if (!props.columns) return
  props.columns.forEach(col => {
    columnVisibility[col.prop] = !props.hideColumns.includes(col.prop)
  })
}

function initSearchColumnVisibility() {
  if (!props.searchColumns || props.searchColumns.length === 0) return
  
  // 如果没有传入 visibleSearchColumns，默认显示所有字段
  const defaultVisible = props.visibleSearchColumns.length > 0
    ? props.visibleSearchColumns
    : props.searchColumns.map(col => col.prop)
  
  props.searchColumns.forEach(col => {
    searchColumnVisibility[col.prop] = defaultVisible.includes(col.prop)
  })
}

function resetColumnConfig() {
  props.columns.forEach(col => {
    columnVisibility[col.prop] = true
  })
}

function saveColumnConfig() {
  const newHide = props.columns
    .filter(col => !columnVisibility[col.prop])
    .map(col => col.prop)
  emit('update:hideColumns', newHide)
  showColumnConfigDrawer.value = false
}

function handleExportClick() {
  if (exportConfig.value.enableColumnSelection) {
    showExportDialog.value = true
  } else {
    confirmExport()
  }
}

function confirmExport() {
  const columnsToExport = exportConfig.value.enableColumnSelection
    ? selectedExportColumns.value
    : exportableColumns.value.map(col => col.prop)
  emit('export', columnsToExport)
  showExportDialog.value = false
}

function resetSearchConfig() {
  if (!props.searchColumns) return
  props.searchColumns.forEach(col => {
    searchColumnVisibility[col.prop] = true
  })
}

function saveSearchConfig() {
  if (!props.searchColumns) return
  const newVisible = props.searchColumns
    .filter(col => searchColumnVisibility[col.prop])
    .map(col => col.prop)
  emit('update:visibleSearchColumns', newVisible)
  showSearchConfigDrawer.value = false
}
</script>

<style scoped>
.table-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f7fa;
  border-radius: 4px;
}

.toolbar-item {
  position: relative;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  padding: 14px 10px;
  border-radius: 4px;
  transition: all 0.3s;
}

.toolbar-btn:hover {
  background-color: #ecf5ff;
  color: #409eff;
}

.el-dropdown-menu {
  margin-top: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-dropdown-menu__item {
  padding: 8px 20px;
  font-size: 13px;
}

.el-dropdown-menu__item.active {
  color: #409eff;
  background-color: #f5f7fa;
}

.column-drawer-content {
  padding: 8px 0;
}

.column-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.column-item:last-child {
  border-bottom: none;
}

.column-label {
  font-size: 14px;
  color: #606266;
}

.apply-btn {
  margin-top: 8px;
  width: 100%;
}

.export-column-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px 0;
}

.export-column-content .el-checkbox {
  display: block;
  margin-bottom: 12px;
  margin-left: 0;
}
</style>
