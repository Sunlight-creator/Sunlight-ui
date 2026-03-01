<script setup lang="ts">
import { ref } from "vue";
import { SunlightThree } from "sunlight-ui";

// 基础用法示例数据
const selectedValue = ref("1-1");
const treeData = ref([
  {
    id: '1',
    label: '一级 1',
    children: [
      { id: '1-1', label: '二级 1-1' },
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
  }
]);

const handleChange = (value: string) => {
  console.log('选中值:', value);
  selectedValue.value = value;
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SunlightThree 
        :data="treeData"
        title="树形选择器"
        :defaultValue="selectedValue"
        @change="handleChange"
        :wrapperStyle="{
          borderColor: '#c0c4cc',
          focusBorderColor: '#409eff'
        }"
      />
    </div>
    <div style="margin-top: 20px;">
      <p>当前选择值：{{ selectedValue || '暂无选择' }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
