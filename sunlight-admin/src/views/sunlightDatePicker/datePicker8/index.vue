<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightDatePicker 自定义颜色样式示例</span>
    </div>

    <el-divider>默认样式</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="defaultValue"
        :item="{
          placeholder: '默认样式',
          type: 'date',
          config: { clearable: true }
        }"
      />
    </div>

    <el-divider>绿色主题</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="greenValue"
        :item="{
          placeholder: '绿色主题',
          type: 'date',
          config: { clearable: true },
          wrapperStyle: {
            borderColor: '#67c23a',
            focusBorderColor: '#67c23a',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)'
          }
        }"
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightDatePicker } from 'sunlight-ui'

const defaultValue = ref(null)
const greenValue = ref(null)
</script>

<style scoped>
.box-card {
  margin: 20px;
}

.card-header {
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.input-wrapper {
  margin: 20px 0;
}
</style>
