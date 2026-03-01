<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightCheckbox 禁用状态 + 单个选项禁用</span>
    </div>

    <div class="input-wrapper">
      <SunlightCheckbox v-model="value" :item="item" />
    </div>

    <p>选中值：{{ value }}</p>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightCheckbox } from 'sunlight-ui'
const value = ref(['banana'])

const item = {
  options: [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉', disabled: true },
    { value: 'orange', label: '橙子' }
  ],
  disabled: false,
  config: {
    size: 'medium'
  }
}
</script>

<style scoped>
.box-card {
  width: 400px;
  margin: 20px auto;
}
.input-wrapper {
  margin: 20px 0;
}
</style>
