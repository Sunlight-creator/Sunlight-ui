<template>
  <div class="card content-box">
    <span class="text">复制指令🌞🌞🌞</span>
    <el-button type="primary" v-copy="textToCopy">复制指令按钮</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const textToCopy = ref('复制指令')
</script>

<style scoped>
.text {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
