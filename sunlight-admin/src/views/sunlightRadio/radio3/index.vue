<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightRadio 自定义事件监听</span>
    </div>

    <div class="input-wrapper">
      <SunlightRadio v-model="value" :item="item" />
    </div>

    <p>选中值：{{ value }}</p>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightRadio } from 'sunlight-ui'
const value = ref('a')

function onChange(val) {
  console.log('选中值变化:', val)
}

const item = {
  options: [
    { value: 'a', label: '选项A' },
    { value: 'b', label: '选项B' }
  ],
  config: {
    size: 'large'
  },
  eventFunction: {
    change: onChange
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
