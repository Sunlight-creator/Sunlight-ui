<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightDatePicker 年选择示例</span>
    </div>

    <div class="input-wrapper" style="margin-top: 10px">
      <SunlightDatePicker v-model="value" :item="item" />
      <p>选中年份：{{ value }}</p>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightDatePicker } from 'sunlight-ui'

const value = ref(null)
const item = {
  label: '年份',
  placeholder: '请选择年份',
  type: 'year',
  valueFormat: 'YYYY',
  config: {
    clearable: true
  }
}
</script>
