<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightSelect 监听事件示例</span>
    </div>

    <div class="input-wrapper">
      <SunlightSelect v-model="selected" :item="item" />
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightSelect } from 'sunlight-ui'
const selected = ref('')
const item = {
  placeholder: '请选择',
  options: [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ],
  disabled: true
}
</script>

<style scoped lang="scss"></style>
