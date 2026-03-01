<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightDatePicker 日期时间选择示例（含时分秒）</span>
    </div>

    <div class="input-wrapper" style="margin-top: 10px">
      <SunlightDatePicker v-model="value" :item="item" />
      <p>选中日期时间：{{ value }}</p>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightDatePicker } from 'sunlight-ui'

const value = ref(null)
const item = {
  label: '日期时间',
  placeholder: '请选择日期时间',
  type: 'datetime',
  valueFormat: 'YYYY-MM-DD HH:mm:ss',
  config: {
    clearable: true,
    editable: false
  }
}
</script>
