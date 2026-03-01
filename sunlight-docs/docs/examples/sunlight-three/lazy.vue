<script setup lang="ts">
import { ref } from "vue";
import { SunlightThree } from "sunlight-ui";

// 异步加载示例数据
const selectedValue = ref("");
const treeData = ref([]);

// 模拟异步加载方法
const loadNode = (node: any, resolve: (data: any[]) => void) => {
  // 根节点，加载一级数据
  if (node.level === 0) {
    return resolve([
      { id: "1", label: "一级节点 1", hasChildren: true },
      { id: "2", label: "一级节点 2", hasChildren: true }
    ]);
  }
  // 一级节点，加载二级数据
  if (node.level === 1) {
    setTimeout(() => {
      resolve([
        { id: `${node.data.id}-1`, label: `二级节点 ${node.data.id}-1`, hasChildren: true },
        { id: `${node.data.id}-2`, label: `二级节点 ${node.data.id}-2` }
      ]);
    }, 500);
    return;
  }
  // 二级节点，加载三级数据
  if (node.level === 2) {
    setTimeout(() => {
      resolve([
        { id: `${node.data.id}-1`, label: `三级节点 ${node.data.id}-1` },
        { id: `${node.data.id}-2`, label: `三级节点 ${node.data.id}-2` }
      ]);
    }, 500);
    return;
  }
  resolve([]);
};

const handleChange = (value: string) => {
  console.log('选中值:', value);
  selectedValue.value = value;
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <p style="margin-bottom: 10px; font-weight: bold;">异步加载模式（lazy: true）</p>
      <SunlightThree 
        :data="treeData"
        title="异步加载树形结构"
        lazy
        :load="loadNode"
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
