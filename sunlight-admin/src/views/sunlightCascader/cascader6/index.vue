<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightCascader 自定义颜色样式示例</span>
    </div>

    <el-divider>默认样式</el-divider>
    <div class="input-wrapper">
      <SunlightCascader
        v-model="defaultValue"
        :item="{
          placeholder: '默认样式',
          options: options,
          clearable: true
        }"
      />
    </div>

    <el-divider>绿色主题</el-divider>
    <div class="input-wrapper">
      <SunlightCascader
        v-model="greenValue"
        :item="{
          placeholder: '绿色主题',
          options: options,
          clearable: true,
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
import { SunlightCascader } from 'sunlight-ui'

const defaultValue = ref(null)
const greenValue = ref(null)

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州' },
      { value: 'ningbo', label: '宁波' }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' }
    ]
  }
]
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
