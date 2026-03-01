<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightInput 禁用</span>
    </div>

    <div class="input-wrapper">
      <SunlightInput
        v-model="value"
        :item="{
          prefixIcon: Search,
          suffixIcon: CircleClose,
          clearable: true,
          placeholder: '搜索内容',
          size: 'medium',
          disabled: true
        }"
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightInput } from 'sunlight-ui'
import { Search, CircleClose } from '@element-plus/icons-vue'
const value = ref('')
</script>

<style scoped lang="scss"></style>
