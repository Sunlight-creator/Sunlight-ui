<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightDatePicker 日期时间范围选择示例</span>
    </div>

    <div class="input-wrapper" style="margin-top: 10px">
      <SunlightDatePicker v-model="value" :item="item" />
      <p>选中日期时间范围：{{ value }}</p>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightDatePicker } from 'sunlight-ui'

const value = ref([])
const item = {
  label: '日期时间范围',
  placeholder: '请选择日期时间范围',
  type: 'datetimerange',
  valueFormat: 'YYYY-MM-DD HH:mm:ss',
  config: {
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    unlinkPanels: true
  }
}
</script>
