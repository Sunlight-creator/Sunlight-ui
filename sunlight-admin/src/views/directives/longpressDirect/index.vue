<template>
  <div class="card content-box">
    <span class="text">长按指令🌞🌞🌞</span>
    <el-button type="primary" v-longpress="debounceClick">长按指令按钮</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 长按触发的回调函数
function debounceClick(event: MouseEvent | TouchEvent) {
  alert('你长按了按钮！')
}
</script>

<style scoped>
.text {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
