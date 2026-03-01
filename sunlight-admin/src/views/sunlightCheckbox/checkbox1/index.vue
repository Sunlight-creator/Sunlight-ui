<script setup lang="ts">
import { ref } from 'vue'
import { SunlightCheckbox } from 'sunlight-ui'

// 选项数据
const options = [
  { label: '选项1', value: 'option1', disabled: false },
  { label: '选项2', value: 'option2', disabled: false },
  { label: '选项3', value: 'option3', disabled: true },
  { label: '选项4', value: 'option4', disabled: false },
  { label: '选项5', value: 'option5', disabled: false }
]

// 响应式数据
const defaultValue = ref(['option1', 'option2'])
const greenValue = ref(['option2', 'option3'])
const blueValue = ref(['option1', 'option4'])
const orangeValue = ref(['option2', 'option5'])
const redValue = ref(['option1', 'option3'])
const roundedValue = ref(['option3', 'option4'])

// wrapperStyle 配置文档
const wrapperStyleDoc = `wrapperStyle 配置对象说明：

{
  borderColor: '#c0c4cc',        // 默认边框颜色（默认：深灰色）
  borderRadius: '4px',           // 边框圆角（默认：4px）
  backgroundColor: '#ffffff',     // 背景颜色（可选）
  boxShadow: 'none',              // 阴影（可选）
  focusBorderColor: '#409eff',    // 聚焦时边框颜色（默认：蓝色）
  focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.15)',  // 聚焦时阴影（默认：3px蓝色阴影）
  focusBoxShadowColor: 'rgba(64, 158, 255, 0.1)'  // 聚焦时内阴影颜色（默认：蓝色半透明）
}

使用示例：
:item="{
  wrapperStyle: {
    borderColor: '#67c23a',      // 绿色边框
    focusBorderColor: '#67c23a', // 聚焦时也是绿色
    focusBoxShadowColor: 'rgba(103, 194, 58, 0.1)', // 聚焦时绿色阴影
    borderRadius: '8px'          // 8px 圆角
  }
}"
`
</script>

<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightCheckbox 自定义颜色样式示例</span>
    </div>

    <el-divider>默认样式</el-divider>
    <div class="input-wrapper">
      <SunlightCheckbox
        v-model="defaultValue"
        :item="{
          options: options,
          isGroup: true
        }"
      />
    </div>

    <el-divider>绿色主题</el-divider>
    <div class="input-wrapper">
      <SunlightCheckbox
        v-model="greenValue"
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            borderColor: '#67c23a',
            focusBorderColor: '#67c23a',
            focusBoxShadowColor: 'rgba(103, 194, 58, 0.1)'
          }
        }"
      />
    </div>

    <el-divider>蓝色主题</el-divider>
    <div class="input-wrapper">
      <SunlightCheckbox
        v-model="blueValue"
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            borderColor: '#409eff',
            focusBorderColor: '#409eff',
            focusBoxShadowColor: 'rgba(64, 158, 255, 0.1)'
          }
        }"
      />
    </div>

    <el-divider>橙色主题</el-divider>
    <div class="input-wrapper">
      <SunlightCheckbox
        v-model="orangeValue"
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            borderColor: '#e6a23c',
            focusBorderColor: '#e6a23c',
            focusBoxShadowColor: 'rgba(230, 162, 60, 0.1)'
          }
        }"
      />
    </div>

    <el-divider>红色主题</el-divider>
    <div class="input-wrapper">
      <SunlightCheckbox
        v-model="redValue"
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            borderColor: '#f56c6c',
            focusBorderColor: '#f56c6c',
            focusBoxShadowColor: 'rgba(245, 108, 108, 0.1)'
          }
        }"
      />
    </div>

    <el-divider>自定义圆角</el-divider>
    <div class="input-wrapper">
      <SunlightCheckbox
        v-model="roundedValue"
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            borderColor: '#67c23a',
            focusBorderColor: '#67c23a',
            focusBoxShadowColor: 'rgba(103, 194, 58, 0.1)',
            borderRadius: '8px'
          }
        }"
      />
    </div>

    <el-divider>wrapperStyle 配置说明</el-divider>
    <div class="config-doc">
      <pre>{{ wrapperStyleDoc }}</pre>
    </div>

    <div class="selected-values">
      <h4>选中值：</h4>
      <p>默认：{{ defaultValue.length > 0 ? defaultValue.join(', ') : '未选择' }}</p>
      <p>绿色：{{ greenValue.length > 0 ? greenValue.join(', ') : '未选择' }}</p>
      <p>蓝色：{{ blueValue.length > 0 ? blueValue.join(', ') : '未选择' }}</p>
      <p>橙色：{{ orangeValue.length > 0 ? orangeValue.join(', ') : '未选择' }}</p>
      <p>红色：{{ redValue.length > 0 ? redValue.join(', ') : '未选择' }}</p>
      <p>圆角：{{ roundedValue.length > 0 ? roundedValue.join(', ') : '未选择' }}</p>
    </div>
  </el-card>
</template>

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

.selected-values {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f8ff;
  border-radius: 4px;
}

.selected-values h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
}

.selected-values p {
  margin: 5px 0;
}
</style>
