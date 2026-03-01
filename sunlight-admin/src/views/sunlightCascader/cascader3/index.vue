<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightCascader 自定义颜色样式示例</span>
    </div>

    <el-divider>默认样式（深灰色边框）</el-divider>
    <div class="input-wrapper">
      <SunlightCascader
        v-model="defaultValue"
        :item="{
          placeholder: '默认样式 - 深灰色边框',
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

    <el-divider>蓝色主题</el-divider>
    <div class="input-wrapper">
      <SunlightCascader
        v-model="blueValue"
        :item="{
          placeholder: '蓝色主题',
          options: options,
          clearable: true,
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
      <SunlightCascader
        v-model="orangeValue"
        :item="{
          placeholder: '橙色主题',
          options: options,
          clearable: true,
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
      <SunlightCascader
        v-model="redValue"
        :item="{
          placeholder: '红色主题',
          options: options,
          clearable: true,
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
      <SunlightCascader
        v-model="roundedValue"
        :item="{
          placeholder: '自定义圆角 12px',
          options: options,
          clearable: true,
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

    <div class="selected-values">
      <h4>选中值：</h4>
      <p>默认：{{ defaultValue || '未选择' }}</p>
      <p>绿色：{{ greenValue || '未选择' }}</p>
      <p>蓝色：{{ blueValue || '未选择' }}</p>
      <p>橙色：{{ orangeValue || '未选择' }}</p>
      <p>红色：{{ redValue || '未选择' }}</p>
      <p>圆角：{{ roundedValue || '未选择' }}</p>
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SunlightCascader } from 'sunlight-ui'

// 城市数据模拟
async function fetchCityOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
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
      ])
    }, 500)
  })
}

// 响应式数据
const defaultValue = ref(null)
const greenValue = ref(null)
const blueValue = ref(null)
const orangeValue = ref(null)
const redValue = ref(null)
const roundedValue = ref(null)
const options = ref([])

// wrapperStyle 配置文档
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
}"`

// 加载城市数据
onMounted(async () => {
  options.value = await fetchCityOptions()
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
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.selected-values h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
}

.selected-values p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
