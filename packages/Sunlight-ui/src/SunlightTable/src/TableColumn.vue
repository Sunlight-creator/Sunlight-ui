
<template>
  <!-- Element Plus 表格列组件 -->

<el-table-column
  v-if="props.column && !props.column.hide"
  :prop="props.column.prop"
  :label="props.column.label"
  :width="props.column.width"
  :min-width="props.column.minWidth"
  :fixed="props.column.fixed"
  :align="props.column.align"
  :header-align="props.column.headerAlign"
  :sortable="props.column.sortable"
  :sort-method="props.column.sortMethod"
  :filterable="props.column.filterable"
  :filters="props.column.filters"
  :filter-method="props.column.filterMethod"
>
  <template #default="scope">
    <template v-if="props.column.children && props.column.children.length">
      <TableColumn
        v-for="(child, idx) in props.column.children"
        :key="child.prop || `child-${idx}`"
        :column="child"
        :index="idx"
      >
        <template v-for="name in Object.keys($slots)" #[name]="childScope">
          <slot :name="name" v-bind="childScope" />
        </template>
      </TableColumn>
    </template>
    <!-- 自定义插槽优先：如果配置了 slotName 且父组件提供了插槽，使用自定义插槽 -->
    <template v-else-if="props.column.slotName && $slots[props.column.slotName]">
      <slot :name="props.column.slotName" v-bind="scope" />
    </template>
    <!-- 可编辑列：如果配置了 editable，自动渲染编辑组件 -->
    <template v-else-if="props.column.editable">
      <!-- 文本输入框 -->
      <el-input
        v-if="props.column.editType === 'input' || !props.column.editType"
        v-model="scope.row[props.column.prop]"
        size="small"
        v-bind="props.column.editProps || {}"
        style="width: 100%"
      />
      <!-- 数字输入框 -->
      <el-input-number
        v-else-if="props.column.editType === 'input-number'"
        v-model="scope.row[props.column.prop]"
        size="small"
        v-bind="props.column.editProps || {}"
        style="width: 100%"
      />
      <!-- 下拉选择器 -->
      <el-select
        v-else-if="props.column.editType === 'select'"
        v-model="scope.row[props.column.prop]"
        size="small"
        v-bind="props.column.editProps || {}"
        style="width: 100%"
      >
        <el-option
          v-for="option in props.column.editOptions || []"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          :disabled="option.disabled"
        />
      </el-select>
      <!-- 日期选择器 -->
      <el-date-picker
        v-else-if="props.column.editType === 'date-picker'"
        v-model="scope.row[props.column.prop]"
        size="small"
        v-bind="props.column.editProps || { type: 'date', format: 'YYYY-MM-DD', valueFormat: 'YYYY-MM-DD' }"
        style="width: 100%"
      />
      <!-- 多行文本输入框 -->
      <el-input
        v-else-if="props.column.editType === 'textarea'"
        v-model="scope.row[props.column.prop]"
        type="textarea"
        size="small"
        v-bind="props.column.editProps || {}"
        style="width: 100%"
      />
    </template>
    <!-- 默认显示：普通文本 -->
    <template v-else>
      {{ scope.row[props.column.prop] }}
    </template>
  </template>
</el-table-column>

  
</template>

<script lang="ts" setup>
import { useSlots } from 'vue'
import TableColumn from './TableColumn.vue'
import type { TableColumnProps } from './types/index'

const props = defineProps<TableColumnProps>()
const $slots = useSlots()
</script>

<style scoped>
  /* <el-table-column
    v-if="column && !column.hide"
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :align="column.align"
    :header-align="column.headerAlign"
    :sortable="column.sortable"
    :sort-method="column.sortMethod"
    :filterable="column.filterable"
    :filters="column.filters"
    :filter-method="column.filterMethod"
  >
    <!-- el-table-column 的 #default 插槽：用于自定义单元格内容 -->
    <template #default="scope">
      <!-- 多级表头：如果当前列有子列，递归渲染子列 -->
      <template v-if="column.children && column.children.length">
        <!-- 遍历子列，递归渲染 TableColumn 组件 -->
        <TableColumn
          v-for="(child, idx) in column.children"
          :key="child.prop || `child-${idx}`"
          :column="child"
          :index="idx"
        >
          <!-- 递归传递所有插槽：确保子列也能使用自定义插槽 -->
          <template v-for="(_, name) in $slots" #[name]="childScope">
            <slot :name="name" v-bind="childScope" />
          </template>
        </TableColumn>
      </template>
      <!-- 自定义插槽列：如果当前列配置了 slotName 且父组件提供了对应的插槽，使用自定义插槽渲染 -->
      <template v-else-if="column.slotName && $slots[column.slotName]">
        <!-- 调用父组件传递的自定义插槽，并传递 scope 数据（包含 row、column、$index 等） -->
        <slot :name="column.slotName" v-bind="scope" />
      </template>
      <!-- 默认显示：如果既不是多级表头也没有自定义插槽，则显示 prop 对应的数据值 -->
      <template v-else>
        <!-- 显示行数据中对应 prop 的值 -->
        {{ scope.row[column.prop] }}
      </template>
    </template>
  </el-table-column> */
</style>

