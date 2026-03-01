<template>
  <SunlightTable
    :data="tableData"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightTable } from 'sunlight-ui';

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
</script>
