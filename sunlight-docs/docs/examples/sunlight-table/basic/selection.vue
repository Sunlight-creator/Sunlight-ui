<template>
  <div>
    <SunlightTable
      :data="tableData"
      :columns="columns"
      :show-selection="true"
      v-model:selected-row-keys="selectedRowKeys"
      @selection-change="handleSelectionChange"
    />
    <div class="selected-info" style="margin-top: 16px;">
      选中的行: {{ selectedRowKeys.join(', ') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightTable } from 'sunlight-ui';
import { ElMessage } from 'element-plus';

// 表格数据
const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, address: '深圳市南山区' },
  { id: 5, name: '孙七', age: 22, address: '杭州市西湖区' },
]);

// 列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80, align: 'center' },
  { prop: 'address', label: '地址' },
];

// 选中行的 key 数组
const selectedRowKeys = ref<(string | number)[]>([1, 3]);

// 选择变化处理
function handleSelectionChange(selection: any[]) {
  ElMessage({
    message: `选中了 ${selection.length} 行数据`,
    type: 'success',
  });
  // 更新选中的行 keys
  selectedRowKeys.value = selection.map(item => item.id);
}
</script>
