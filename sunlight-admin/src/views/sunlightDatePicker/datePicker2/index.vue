<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightDatePicker 范围选择示例</span>
    </div>

    <div class="input-wrapper" style="margin-top: 10px">
      <SunlightDatePicker v-model="value" :item="item" />
      <p>选中范围：{{ value }}</p>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightDatePicker } from 'sunlight-ui'

const value = ref([])
const item = {
  label: '日期范围',
  placeholder: '请选择日期范围',
  type: 'daterange',
  valueFormat: 'YYYY-MM-DD',
  config: {
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    unlinkPanels: true
  }
}
</script>
