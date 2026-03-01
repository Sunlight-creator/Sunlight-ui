<!-- 
  SunlighTable 主表格组件
  基于 Element Plus 的 el-table 封装，提供更便捷的配置方式和分页功能
-->

<template>
  <div>
    <!-- 搜索表单 -->
    <SearchForm
      v-if="searchColumns && searchColumns.length > 0"
      :columns="searchColumns"
      :search-param="searchParam"
      :theme-style="searchThemeStyle"
      :visible-columns="visibleSearchColumns"
      :collapsed="searchCollapsed"
      @update:search-param="handleSearchParamUpdate"
      @update:visible-columns="handleVisibleSearchColumnsUpdate"
      @update:collapsed="searchCollapsed = $event"
      @search="handleSearch"
      @reset="handleSearchReset"
    />
    
    <!-- 表格容器 -->
    <div class="sunligh-table-container">
      <!-- 表格头部 -->
      <div class="table-header" v-if="showToolbar">
        <!-- 自定义按钮（左侧） -->
        <div class="table-header-left" v-if="leftCustomButtons.length > 0">
          <el-button
            v-for="btn in leftCustomButtons"
            :key="btn.key"
            :size="btn.size || 'small'"
            :type="btn.type || 'default'"
            :icon="btn.icon"
            :disabled="btn.disabled"
            @click="handleCustomButtonClick(btn.key)"
          >
            {{ btn.label }}
          </el-button>
        </div>
        <!-- 表格工具栏（右侧） -->
        <TableToolbar
          :columns="columns"
          :hide-columns="hideColumns"
          :toolbar-config="toolbarConfig"
          :export-config="exportConfig"
          :search-columns="searchColumns"
          :visible-search-columns="visibleSearchColumns"
          @update:hideColumns="handleUpdateHideColumns"
          @update:visibleSearchColumns="handleVisibleSearchColumnsUpdate"
          @export="handleExport"
          @changeDensity="handleDensityChange"
          @openSettings="handleOpenSettings"
          @openDynamicColumns="handleOpenDynamicColumns"
          @refresh="handleRefresh"
        />
      </div>

      <!-- 表格和分页放在同一个盒子 -->
      <div class="table-box">
        <!-- Element Plus 表格组件 -->
 
        <el-table
          :data="data"
          v-bind="tableProps"
          v-on="listeners"
          :row-key="rowKey"
          ref="tableRef"
          :max-height="computedMaxHeight"
          :stripe="stripe"
          :border="border"
          :size="currentSize"
          :show-header="showHeader"
          :highlight-current-row="highlightCurrentRow"
          :empty-text="emptyText"
          :default-sort="defaultSort"
          :tooltip-effect="tooltipEffect"
          :span-method="spanMethod"
          :select-on-indeterminate="selectOnIndeterminate"
          :indent="indent"
          :tree-props="treeProps"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :cell-class-name="cellClassName"
          :cell-style="cellStyle"
          :header-row-class-name="headerRowClassName"
          :header-row-style="headerRowStyle"
          :header-cell-class-name="headerCellClassName"
          :header-cell-style="headerCellStyle"
          :summary-method="summaryMethod"
          :summary-rows="summaryRows"
          :lazy="lazy"
          :load="load"
          :show-summary="showSummary"
          :sort-by="sortBy"
          :sort-orders="sortOrders"
          :default-expand-all="defaultExpandAll"
          :expand-row-keys="expandRowKeys"
          :default-expanded-keys="defaultExpandedKeys"
          :filter-multiple="filterMultiple"
          :filtered-value="filteredValue"
          :filters="filters"
          :filter-method="filterMethod"
          :filter-placement="filterPlacement"
          @row-click="handleRowClick"
          @row-dblclick="handleRowDblclick"
        >
          <!-- 多选列：当 showSelection 为 true 时显示 -->
          <el-table-column
            v-if="showSelection"
            type="selection"
            width="55"
            :reserve-selection="true"
          />

          <!-- 动态渲染表格列 -->
          <TableColumn
            v-for="(column, index) in visibleColumns"
            :key="column.prop"
            :column="column"
            :index="index"
          >
            <!-- 传递所有插槽给 TableColumn：使用 v-for 遍历所有插槽，确保自定义插槽能正确传递 -->
            <template v-for="(_, name) in $slots" #[name]="slotData">
              <slot :name="name" v-bind="slotData" />
            </template>
          </TableColumn>
        </el-table>
      </div>


    </div>
     <!-- 分页组件：当 showPagination 为 true 时显示 -->
      <div class="table-pagination" v-if="showPagination">
        <Pagination
          :total="total || 0"
          :page="currentPage"
          :limit="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          @pagination="handlePagination"
        />
      </div>
  </div>
</template>

<script lang="ts" setup>
// 导入 Vue 3 的响应式 API
import { computed, ref, watch, useSlots, nextTick, onMounted, onUnmounted, } from "vue";
// 导入表格列组件
import TableColumn from "./TableColumn.vue";
// 导入分页组件
import Pagination from "./Pagination/index.vue";
// 头部按钮组件
import TableToolbar from "./TableToolbar/index.vue";
// 搜索表单组件
import SearchForm from "./components/SearchForm.vue";
// 导入类型定义
import type { SearchColumn } from "./types/index";

// 定义组件的 props，使用传统的 defineProps 方式确保能正确接收
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  showToolbar: {
    type: Boolean,
    default: true,
  },
  showPagination: {
    type: Boolean,
    default: false,
  },
  showSelection: {
    type: Boolean,
    default: false,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: undefined,
  },
  selectedRowKeys: {
    type: Array,
    default: undefined,
  },
  hideColumns: {
    type: Array,
    default: () => [],
  },
  tableListeners: {
    type: Object,
    default: undefined,
  },
  tableProps: {
    type: Object,
    default: undefined,
  },
  toolbarConfig: {
    type: Object,
    default: undefined,
  },
  exportConfig: {
    type: Object,
    default: undefined,
  },
  tableHeight: {
    type: [Number, String],
    default: undefined,
  },
  onRowClick: {
    type: Function,
    default: undefined,
  },
  onRowDblclick: {
    type: Function,
    default: undefined,
  },
  searchColumns: {
    type: Array,
    default: undefined,
  },
  searchParam: {
    type: Object,
    default: () => ({}),
  },
  searchThemeStyle: {
    type: Object,
    default: undefined,
  },
  visibleSearchColumns: {
    type: Array,
    default: () => [],
  },
  searchCollapsed: {
    type: Boolean,
    default: false,
  },
});
// 获取所有插槽，用于传递给子组件
const $slots = useSlots();

// 定义组件可以触发的事件及其参数类型
const emit = defineEmits<{
  "update:currentPage": [page: number]; // 当前页码变化事件
  "update:pageSize": [size: number]; // 每页条数变化事件
  "update:hideColumns": [hideColumns: (string | number)[]]; // 隐藏列变化事件
  "selection-change": [selection: any[]]; // 选中行变化事件
  "row-click": [row: any, column: any, event: Event]; // 行点击事件
  export: [columns?: string[]]; // 导出事件，可选参数为要导出的列
  "density-change": [density: string]; // 密度变化事件
  "open-settings": []; // 打开设置事件
  "open-dynamic-columns": []; // 打开动态列事件
  refresh: []; // 刷新事件
  "custom-button-click": [key: string]; // 自定义按钮点击事件
  pagination: [data: { page: number; limit: number }]; // 分页变化事件
  "row-dblclick": [row: any, column: any, event: Event]; // 行双击事件
  "update:searchParam": [searchParam: Record<string, any>]; // 搜索参数更新事件
  "update:visibleSearchColumns": [visibleSearchColumns: string[]]; // 可见搜索列更新事件
  search: [searchParam: Record<string, any>]; // 搜索事件
}>();

// 内部状态：表格密度
const tableDensity = ref("default");

// 计算属性：表格数据，如果 props.data 为空则返回空数组
const data = computed(() => props.data || []);

// 计算属性：可见的列配置，过滤掉隐藏的列和 hideColumns 中指定的列
const visibleColumns = computed(() => {
  // 如果列配置不存在，返回空数组
  if (!props.columns) return [];
  // 过滤列：排除 hide 为 true 的列，以及 hideColumns 数组中包含的列
  return props.columns.filter(
    (col: any) =>
      !col.hide && // 列本身不是隐藏状态
      (!props.hideColumns || !props.hideColumns.includes(col.prop)) // 不在隐藏列列表中
  );
});

// 响应式数据：当前页码，默认值为 props.currentPage 或 1
const currentPage = ref(props.currentPage || 1);
// 响应式数据：每页条数，默认值为 props.pageSize 或 10
const pageSize = ref(props.pageSize || 10);

// 搜索相关状态
const searchParam = ref(props.searchParam || {});

// 初始化 visibleSearchColumns：如果没有传入，默认显示所有字段
const getDefaultVisibleSearchColumns = () => {
  if (props.visibleSearchColumns && props.visibleSearchColumns.length > 0) {
    return [...props.visibleSearchColumns];
  }
  if (props.searchColumns && props.searchColumns.length > 0) {
    return (props.searchColumns as SearchColumn[]).map(col => col.prop);
  }
  return [];
};

const visibleSearchColumns = ref(getDefaultVisibleSearchColumns());
const searchCollapsed = ref(props.searchCollapsed || false);

// 计算属性：当前表格尺寸（结合密度和原始size）
const currentSize = computed(() => {
  if (tableDensity.value === "compact") return "small";
  if (tableDensity.value === "medium") return "default";
  return size.value;
});

// 监听 props.currentPage 的变化，同步到内部状态
watch(
  () => props.currentPage,
  (val) => {
    // 只有当值不为 undefined 时才更新，避免覆盖用户操作
    if (val !== undefined) currentPage.value = val;
  }
);

// 监听 props.pageSize 的变化，同步到内部状态
watch(
  () => props.pageSize,
  (val) => {
    // 只有当值不为 undefined 时才更新，避免覆盖用户操作
    if (val !== undefined) pageSize.value = val;
  }
);

// 监听 props.searchParam 的变化
watch(
  () => props.searchParam,
  (val) => {
    if (val) {
      searchParam.value = { ...val };
    }
  },
  { deep: true }
);

// 监听 props.visibleSearchColumns 的变化
watch(
  () => props.visibleSearchColumns,
  (val) => {
    if (val && val.length > 0) {
      visibleSearchColumns.value = [...val];
    } else if (props.searchColumns && props.searchColumns.length > 0) {
      // 如果没有传入 visibleSearchColumns，默认显示所有字段
      visibleSearchColumns.value = (props.searchColumns as SearchColumn[]).map(col => col.prop);
    }
  }
);

// 监听 props.searchCollapsed 的变化
watch(
  () => props.searchCollapsed,
  (val) => {
    searchCollapsed.value = val;
  }
);

/**
 * 处理分页组件的 pagination 事件
 * @param data - 包含 page 和 limit 的对象
 */
function handlePagination(data: { page: number; limit: number }) {
  currentPage.value = data.page;
  pageSize.value = data.limit;
  emit("update:currentPage", data.page);
  emit("update:pageSize", data.limit);
  emit("pagination", data);
}

/**
 * 处理隐藏列变化
 * @param hideColumns - 新的隐藏列数组
 */
function handleUpdateHideColumns(hideColumns: (string | number)[]) {
  emit("update:hideColumns", hideColumns);
}

/**
 * 处理导出
 * @param columns - 要导出的列（可选）
 */
function handleExport(columns?: string[]) {
  emit("export", columns);
}

/**
 * 处理密度变化
 * @param density - 新的密度
 */
function handleDensityChange(density: string) {
  tableDensity.value = density;
  emit("density-change", density);
}

/**
 * 处理打开设置
 */
function handleOpenSettings() {
  emit("open-settings");
}

/**
 * 处理打开动态列
 */
function handleOpenDynamicColumns() {
  emit("open-dynamic-columns");
}

/**
 * 处理刷新
 */
function handleRefresh() {
  emit("refresh");
}

/**
 * 处理搜索参数更新
 */
function handleSearchParamUpdate(value: Record<string, any>) {
  searchParam.value = value;
  emit("update:searchParam", value);
}

/**
 * 处理可见搜索列更新
 */
function handleVisibleSearchColumnsUpdate(value: string[]) {
  visibleSearchColumns.value = value;
  emit("update:visibleSearchColumns", value);
}

/**
 * 处理搜索
 */
function handleSearch(params: Record<string, any>) {
  emit("search", params);
}

/**
 * 处理搜索重置
 */
function handleSearchReset() {
  emit("search", {});
}

/**
 * 处理自定义按钮点击
 * @param key - 按钮的唯一标识
 */
function handleCustomButtonClick(key: string) {
  emit("custom-button-click", key);
}

/**
 * 处理行点击事件
 * @param row - 点击的行数据
 * @param column - 点击的列
 * @param event - 事件对象
 */
function handleRowClick(row: any, column: any, event: Event) {
  // 调用用户自定义的处理函数
  if (props.onRowClick) {
    props.onRowClick(row, column, event);
  }
  // 触发组件事件
  emit("row-click", row, column, event);
}

/**
 * 处理行双击事件
 * @param row - 双击的行数据
 * @param column - 双击的列
 * @param event - 事件对象
 */
function handleRowDblclick(row: any, column: any, event: Event) {
  // 调用用户自定义的处理函数
  if (props.onRowDblclick) {
    props.onRowDblclick(row, column, event);
  }
  // 触发组件事件
  emit("row-dblclick", row, column, event);
}

// 表格引用，用于控制选中状态
const tableRef = ref<any>(null);

// 响应式数据：表格容器高度（自动计算）
const autoTableHeight = ref<number | undefined>(undefined);

// 最终表格高度：如果用户传入了 tableHeight 则使用传入的值，否则使用自动计算的高度
const finalTableHeight = computed(() => {
  const result = props.tableHeight ?? autoTableHeight.value;
  return result;
});

// 计算表格的最大高度（减去底部预留空间）
const computedMaxHeight = computed(() => {
  if (finalTableHeight.value === undefined || finalTableHeight.value === null) {
    return undefined;
  }
  const maxHeight = Number(finalTableHeight.value);
  return maxHeight > 0 ? maxHeight : undefined;
});

// 处理窗口大小变化，更新表格高度
async function handleResize() {
  await nextTick();

  if (!tableRef.value?.$el) {
    // 如果表格元素还没有准备好，延迟重试
    setTimeout(() => {
      if (tableRef.value?.$el) {
        handleResize();
      }
    }, 100);
    return;
  }

  const container = tableRef.value.$el;
  const containerRect = container.getBoundingClientRect();
  
  // 如果元素还没有渲染完成（位置无效），延迟重试
  if (containerRect.width === 0 && containerRect.height === 0) {
    setTimeout(() => {
      handleResize();
    }, 100);
    return;
  }

  const windowHeight = window.innerHeight;
  const topOffset = containerRect.top;
  const bottomMargin = props.showPagination ? 120 : 80; // 如果有分页，需要更多底部空间
  
  // 计算可用高度，确保不会出现负值
  let availableHeight = windowHeight - topOffset - bottomMargin;
  
  // 如果计算出的高度不合理（小于最小值或为负值），使用一个合理的默认值
  // 最小高度设置为 200px，确保表格至少能显示
  const minHeight = 200;
  const newHeight = Math.max(availableHeight, minHeight);
  
  // 如果可用高度太小（小于最小值），说明可能是布局还没完成，使用一个更合理的默认值
  if (availableHeight < minHeight && containerRect.top > windowHeight) {
    // 如果容器在视窗外（可能是布局还未完成），使用窗口高度的一部分作为默认值
    autoTableHeight.value = Math.max(windowHeight * 0.6, minHeight);
    return;
  }

  autoTableHeight.value = newHeight;
}

// 监听窗口大小变化
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// 标志位：防止在程序设置选中状态时触发 watch 导致死循环
const isUpdatingSelection = ref(false);

// 计算属性：是否显示多选框
const showSelection = computed(() => props.showSelection ?? false);

// 生成行的唯一标识 key 的函数
const rowKeyFn = (row: any) => row.id || row.key || JSON.stringify(row);

// 同步选中状态的函数
const syncSelection = () => {
  if (!showSelection.value || !tableRef.value) return;

  const targetKeys = props.selectedRowKeys || [];
  const currentSelection = tableRef.value.store?.states?.selection?.value || [];

  isUpdatingSelection.value = true;
  nextTick(() => {
    try {
      data.value.forEach((row: any) => {
        const rowKey = rowKeyFn(row);
        const shouldBeSelected = targetKeys.includes(rowKey);
        const isCurrentlySelected = currentSelection.some(
          (selectedRow: any) => rowKeyFn(selectedRow) === rowKey
        );

        if (shouldBeSelected && !isCurrentlySelected) {
          tableRef.value.toggleRowSelection(row, true);
        } else if (!shouldBeSelected && isCurrentlySelected) {
          tableRef.value.toggleRowSelection(row, false);
        }
      });
    } finally {
      setTimeout(() => {
        isUpdatingSelection.value = false;
      }, 0);
    }
  });
};

// 监听 selectedRowKeys 变化，更新表格选中状态
watch(
  () => props.selectedRowKeys,
  () => {
    if (isUpdatingSelection.value) return;
    syncSelection();
  },
  { immediate: true, deep: true }
);

// 监听数据变化，重新设置选中状态
watch(
  () => data.value,
  () => {
    if (isUpdatingSelection.value) return;
    syncSelection();
  },
  { deep: true }
);

// 计算属性：表格事件监听器，如果 props.tableListeners 不存在则返回空对象
const listeners = computed(() => {
  const baseListeners = props.tableListeners || {};
  // 如果启用了多选，添加 selection-change 事件处理
  if (showSelection.value) {
    return {
      ...baseListeners,
      "selection-change": (selection: any[]) => {
        // 如果正在更新选中状态，不触发用户事件，避免死循环
        if (isUpdatingSelection.value) return;

        // 调用用户自定义的 selection-change 处理函数
        if (baseListeners["selection-change"]) {
          baseListeners["selection-change"](selection);
        }
        // 触发组件事件
        emit("selection-change", selection);
      },
    };
  }
  return baseListeners;
});

// 计算属性：表格属性配置，如果 props.tableProps 不存在则返回空对象
const tableProps = computed(() => props.tableProps || {});

// 自定义按钮（左侧）
const toolbarConfig = computed(() => props.toolbarConfig || {});
const customButtons = computed(() => toolbarConfig.value.customButtons || []);
interface CustomButton {
  key: string;
  label: string;
  type?: string;
  size?: string;
  icon?: any;
  disabled?: boolean;
  show?: boolean;
  position?: string;
}
const leftCustomButtons = computed(() => {
  return customButtons.value.filter(
    (btn: CustomButton) => btn.show !== false && btn.position === "left"
  );
});

/**
 * 生成行的唯一标识 key
 * @param row - 行数据对象
 * @returns 行的唯一标识，优先使用 id，其次使用 key，最后使用 JSON.stringify
 */
const rowKey = rowKeyFn;

// ========== 以下是从 tableProps 中提取的 Element Plus Table 属性，使用计算属性提供默认值 ==========

// 是否显示斑马纹，默认 false
const stripe = computed(() => tableProps.value.stripe ?? false);
// 是否显示边框，默认 false
const border = computed(() => tableProps.value.border ?? false);
// 表格尺寸，默认 "default"（可选：'large' | 'default' | 'small'）
const size = computed(() => tableProps.value.size ?? "default");
// 是否显示表头，默认 true
const showHeader = computed(() => tableProps.value.showHeader ?? true);
// 是否高亮当前行，默认 false
const highlightCurrentRow = computed(
  () => tableProps.value.highlightCurrentRow ?? false
);
// 空数据时显示的文本，默认 "暂无数据"
const emptyText = computed(() => tableProps.value.emptyText ?? "暂无数据");
// 默认排序规则，默认空对象
const defaultSort = computed(() => tableProps.value.defaultSort ?? {});
// 提示框效果，默认 "dark"（可选：'dark' | 'light'）
const tooltipEffect = computed(() => tableProps.value.tooltipEffect ?? "dark");
// 单元格合并方法，可能为 undefined
const spanMethod = computed(() => tableProps.value.spanMethod);
// 当只有部分行被选中时，点击表头的多选框时的行为，默认 false
const selectOnIndeterminate = computed(
  () => tableProps.value.selectOnIndeterminate ?? false
);
// 树形表格的缩进，默认 16 像素
const indent = computed(() => tableProps.value.indent ?? 16);
// 树形表格的属性配置，默认空对象
const treeProps = computed(() => tableProps.value.treeProps ?? {});
// 行的 className，默认空字符串
const rowClassName = computed(() => tableProps.value.rowClassName ?? "");
// 行的 style，默认空字符串
const rowStyle = computed(() => tableProps.value.rowStyle ?? "");
// 单元格的 className，默认空字符串
const cellClassName = computed(() => tableProps.value.cellClassName ?? "");
// 单元格的 style，默认空字符串
const cellStyle = computed(() => tableProps.value.cellStyle ?? "");
// 表头行的 className，默认空字符串
const headerRowClassName = computed(
  () => tableProps.value.headerRowClassName ?? ""
);
// 表头行的 style，默认空字符串
const headerRowStyle = computed(() => tableProps.value.headerRowStyle ?? "");
// 表头单元格的 className，默认空字符串
const headerCellClassName = computed(
  () => tableProps.value.headerCellClassName ?? ""
);
// 表头单元格的 style，默认空字符串
const headerCellStyle = computed(() => tableProps.value?.headerCellStyle ?? "");
// 合计行计算方法，可能为 undefined
const summaryMethod = computed(() => tableProps.value.summaryMethod);
// 合计行数量，默认 1
const summaryRows = computed(() => tableProps.value.summaryRows ?? 1);
// 是否懒加载，默认 false
const lazy = computed(() => tableProps.value.lazy ?? false);
// 懒加载的加载函数，可能为 undefined
const load = computed(() => tableProps.value.load);
// 是否显示合计行，默认 false
const showSummary = computed(() => tableProps.value.showSummary ?? false);
// 排序字段，默认空字符串
const sortBy = computed(() => tableProps.value.sortBy ?? "");
// 排序顺序数组，默认 [null, "ascending", "descending"]
const sortOrders = computed(
  () => tableProps.value.sortOrders ?? [null, "ascending", "descending"]
);
// 是否默认展开所有行，默认 false
const defaultExpandAll = computed(
  () => tableProps.value.defaultExpandAll ?? false
);
// 展开行的 key 数组，默认空数组
const expandRowKeys = computed(() => tableProps.value.expandRowKeys ?? []);
// 默认展开的行的 key 数组，默认空数组
const defaultExpandedKeys = computed(
  () => tableProps.value.defaultExpandedKeys ?? []
);
// 是否多选过滤，默认 true
const filterMultiple = computed(() => tableProps.value.filterMultiple ?? true);
// 过滤后的值，默认空对象
const filteredValue = computed(() => tableProps.value.filteredValue ?? {});
// 过滤条件，默认空对象
const filters = computed(() => tableProps.value.filters ?? {});
// 过滤方法，可能为 undefined
const filterMethod = computed(() => tableProps.value.filterMethod);
// 过滤框的弹出位置，默认 "bottom-end"
const filterPlacement = computed(
  () => tableProps.value.filterPlacement ?? "bottom-end"
);

// 暴露表格实例方法给父组件
defineExpose({
  tableRef,
  clearSelection: () => tableRef.value?.clearSelection(),
  toggleRowSelection: (row: any, selected?: boolean) =>
    tableRef.value?.toggleRowSelection(row, selected),
  toggleAllSelection: () => tableRef.value?.toggleAllSelection(),
  setCurrentRow: (row: any) => tableRef.value?.setCurrentRow(row),
  clearSort: () => tableRef.value?.clearSort(),
  clearFilter: (columnKey?: string) => tableRef.value?.clearFilter(columnKey),
  doLayout: () => tableRef.value?.doLayout(),
  sort: (prop: string, order: string) => tableRef.value?.sort(prop, order),
});

console.log(props, "接收");
</script>

<style scoped>
.sunligh-table-container {
  width: 100%;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.table-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.table-box {
  display: flex;
  flex-direction: column;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.table-pagination {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  background: transparent;
}
</style>
