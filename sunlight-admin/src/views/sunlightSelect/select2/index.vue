<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightSelect 自定义颜色样式示例</span>
    </div>

    <el-divider>默认样式（深灰色边框）</el-divider>
    <div class="input-wrapper">
      <SunlightSelect
        v-model="defaultValue"
        :item="{
          placeholder: '默认样式 - 深灰色边框',
          clearable: true,
          options: selectOptions
        }"
      />
    </div>

    <el-divider>绿色主题</el-divider>
    <div class="input-wrapper">
      <SunlightSelect
        v-model="greenValue"
        :item="{
          placeholder: '绿色主题',
          clearable: true,
          options: selectOptions,
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
      <SunlightSelect
        v-model="blueValue"
        :item="{
          placeholder: '蓝色主题',
          clearable: true,
          options: selectOptions,
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
      <SunlightSelect
        v-model="orangeValue"
        :item="{
          placeholder: '橙色主题',
          clearable: true,
          options: selectOptions,
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
      <SunlightSelect
        v-model="redValue"
        :item="{
          placeholder: '红色主题',
          clearable: true,
          options: selectOptions,
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
      <SunlightSelect
        v-model="roundedValue"
        :item="{
          placeholder: '自定义圆角 12px',
          clearable: true,
          options: selectOptions,
          wrapperStyle: {
            borderRadius: '12px',
            borderColor: '#67c23a',
            focusBorderColor: '#67c23a'
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

<script setup>
import { ref } from 'vue'
import { SunlightSelect } from 'sunlight-ui'

const defaultValue = ref('')
const greenValue = ref('')
const blueValue = ref('')
const orangeValue = ref('')
const redValue = ref('')
const roundedValue = ref('')

// 共用的选项数据
const selectOptions = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4' },
  { label: '选项五', value: 'option5' }
]

const wrapperStyleDoc = `wrapperStyle 配置对象说明：

{
  borderColor: '#c0c4cc',        // 默认边框颜色（默认：深灰色）
  borderRadius: '4px',           // 边框圆角（默认：4px）
  backgroundColor: '#ffffff',     // 背景颜色（可选）
  boxShadow: 'none',              // 阴影（可选）
  focusBorderColor: '#409eff',    // 聚焦时边框颜色（默认：蓝色）
  focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.15)'  // 聚焦时阴影（默认：3px蓝色阴影）
}

使用示例：
:item="{
  wrapperStyle: {
    borderColor: '#67c23a',      // 绿色边框
    focusBorderColor: '#67c23a', // 聚焦时也是绿色
    borderRadius: '8px'          // 8px 圆角
  }
}"
`
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

.config-doc {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.config-doc pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
}
</style>
