<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightDatePicker 自定义颜色样式示例</span>
    </div>

    <el-divider>默认样式（深灰色边框）</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="defaultValue"
        :item="{
          placeholder: '默认样式 - 深灰色边框',
          clearable: true,
          type: 'date'
        }"
      />
    </div>

    <el-divider>绿色主题</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="greenValue"
        :item="{
          placeholder: '绿色主题',
          clearable: true,
          type: 'date',
          wrapperStyle: {
            borderColor: '#67c23a',
            focusBorderColor: '#67c23a',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)'
          }
        }"
      />
    </div>

    <el-divider>蓝色主题</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="blueValue"
        :item="{
          placeholder: '蓝色主题',
          clearable: true,
          type: 'date',
          disabled: true,
          wrapperStyle: {
            borderColor: '#409eff',
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)'
          }
        }"
      />
    </div>

    <el-divider>橙色主题</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="orangeValue"
        :item="{
          placeholder: '橙色主题',
          clearable: true,
          type: 'date',
          wrapperStyle: {
            borderColor: '#e6a23c',
            focusBorderColor: '#e6a23c',
            focusBoxShadow: '0 0 0 3px rgba(230, 162, 60, 0.25)'
          }
        }"
      />
    </div>

    <el-divider>红色主题</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="redValue"
        :item="{
          placeholder: '红色主题',
          clearable: true,
          type: 'date',
          wrapperStyle: {
            borderColor: '#f56c6c',
            focusBorderColor: '#f56c6c',
            focusBoxShadow: '0 0 0 3px rgba(245, 108, 108, 0.25)'
          }
        }"
      />
    </div>

    <el-divider>自定义圆角</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="roundedValue"
        :item="{
          placeholder: '自定义圆角 12px',
          clearable: true,
          type: 'date',
          wrapperStyle: {
            borderRadius: '12px',
            borderColor: '#67c23a',
            focusBorderColor: '#67c23a'
          }
        }"
      />
    </div>

    <el-divider>日期时间选择器（绿色主题）</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="datetimeValue"
        :item="{
          placeholder: '选择日期时间',
          clearable: true,
          type: 'datetime',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          wrapperStyle: {
            borderColor: '#67c23a',
            focusBorderColor: '#67c23a'
          }
        }"
      />
    </div>

    <el-divider>日期范围选择器（蓝色主题）</el-divider>
    <div class="input-wrapper">
      <SunlightDatePicker
        v-model="daterangeValue"
        :item="{
          clearable: true,
          type: 'daterange',
          valueFormat: 'YYYY-MM-DD',
          wrapperStyle: {
            borderColor: '#409eff',
            focusBorderColor: '#409eff'
          },
          config: {
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            unlinkPanels: true
          }
        }"
      />
    </div>

    <el-divider>wrapperStyle 配置说明</el-divider>
    <div class="config-doc">
      <pre>{{ wrapperStyleDoc }}</pre>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SunlightDatePicker } from 'sunlight-ui'

// 双向绑定的值
const defaultValue = ref('')
const greenValue = ref('')
const blueValue = ref('')
const orangeValue = ref('')
const redValue = ref('')
const roundedValue = ref('')
const datetimeValue = ref('')
const daterangeValue = ref([])

// wrapperStyle 配置文档
const wrapperStyleDoc = computed(() => {
  return JSON.stringify(
    {
      borderColor: 'string', // 边框颜色
      borderRadius: 'string', // 边框圆角
      backgroundColor: 'string', // 背景色
      boxShadow: 'string', // 阴影
      focusBorderColor: 'string', // 聚焦时边框颜色
      focusBoxShadow: 'string' // 聚焦时阴影
    },
    null,
    2
  )
})
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
  margin-bottom: 20px;
  width: 300px;
}

.config-doc {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  color: #303133;
}
</style>
