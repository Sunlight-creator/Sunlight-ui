<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightThree 自定义节点内容</span>
    </div>

    <SunlightThree :data="treeData" :defaultValue="selected" @change="handleChange" title="自定义节点示例">
      <template #default="{ row }">
        <span style="color: #fbc119; font-weight: bold"> {{ row.node.label }} (ID: {{ row.node.id }}) </span>
      </template>
    </SunlightThree>

    <p>当前选中ID：{{ selected }}</p>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightThree } from 'sunlight-ui'
const treeData = [
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
    children: [{ id: '2-1', label: '二级 2-1' }]
  }
]

const selected = ref('1-2')

function handleChange(val) {
  selected.value = val
}
</script>

<style scoped>
.box-card {
  width: 450px;
  margin: 20px auto;
}
</style>
