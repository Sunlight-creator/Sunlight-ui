<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightTextarea 禁用状态</span>
    </div>
    <div class="input-wrapper">
      <SunlightTextarea
        v-model="value"
        :item="{
          label: '备注',
          disabled: true
        }"
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightTextarea } from 'sunlight-ui'
const value = ref('')
</script>
<style scoped lang="scss"></style>
