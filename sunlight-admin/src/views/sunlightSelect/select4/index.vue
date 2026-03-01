<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightSelect 自定义模板示例</span>
    </div>

    <div class="section">
      <div class="section-title">自定义前缀/后缀</div>
      <div class="input-wrapper">
        <SunlightSelect v-model="selected1" :item="item1">
          <!-- 自定义前缀插槽 -->
          <template #prefix>
            <el-icon class="el-input__icon">
              <Search />
            </el-icon>
          </template>
          <!-- 自定义后缀插槽 -->
          <template #suffix>
            <el-icon class="el-input__icon">
              <ArrowDown />
            </el-icon>
          </template>
        </SunlightSelect>
      </div>
    </div>

    <div class="section">
      <div class="section-title">自定义选项内容</div>
      <div class="input-wrapper">
        <SunlightSelect v-model="selected2" :item="item2">
          <!-- 自定义选项模板插槽 -->
          <template #option="{ option }">
            <div class="custom-option">
              <div class="option-icon" :style="{ backgroundColor: option.color }"></div>
              <div class="option-info">
                <div class="option-label">{{ option.label }}</div>
              </div>
              <div class="option-value">{{ option.value }}</div>
            </div>
          </template>
        </SunlightSelect>
      </div>
    </div>

    <div class="info-box">
      <div class="info-title">功能说明：</div>
      <ul class="info-list">
        <li>1. 使用 <code>#prefix</code> 和 <code>#suffix</code> 插槽自定义前后缀内容</li>
        <li>2. 使用 <code>#default</code> 插槽自定义选项显示内容</li>
        <li>3. 支持通过 <code>item.prefix</code> 和 <code>item.suffix</code> 设置简单文本</li>
        <li>4. 支持通过 <code>item.optionTemplate</code> 设置组件模板</li>
      </ul>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightSelect } from 'sunlight-ui'
import { Search, ArrowDown } from '@element-plus/icons-vue'

// 自定义前缀/后缀示例
const selected1 = ref(null)
const item1 = {
  placeholder: '请选择水果',
  options: [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' }
  ],
  clearable: true
}

// 自定义选项内容示例
const selected2 = ref(null)
const item2 = {
  placeholder: '请选择颜色',
  options: [
    { label: '红色', value: 'red', color: '#f56c6c', description: '热情活力' },
    { label: '绿色', value: 'green', color: '#67c23a', description: '清新自然' },
    { label: '蓝色', value: 'blue', color: '#409eff', description: '冷静理智' },
    { label: '黄色', value: 'yellow', color: '#e6a23c', description: '温暖明亮' },
    { label: '紫色', value: 'purple', color: '#909399', description: '神秘高贵' }
  ],
  clearable: true
}
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

.section {
  margin-bottom: 30px;
}

.section-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
}

.input-wrapper {
  margin: 10px 0;
}

/* 自定义选项样式 */
.custom-option {
  display: flex !important;
  align-items: center !important;
  flex-direction: row !important;
  padding: 8px 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
  flex-wrap: nowrap !important;
}

/* 修复颜色选项布局 - 确保图标和文字在同一行 */
.el-select-dropdown__item {
  display: flex !important;
  align-items: center !important;
  padding: 12px 100px !important;
  margin: 2px 4px !important;
  border-radius: 4px !important;
  height: auto !important;
}

.option-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.option-info {
  flex: 1;
}

.option-label {
  font-weight: 500;
  color: #303133;
}

.option-desc {
  font-size: 12px;
  color: #909399;
}

.option-value {
  font-size: 12px;
  color: #c0c4cc;
}

/* 自定义前缀后缀图标 */
.el-input__icon {
  color: #909399;
  font-size: 16px;
}

.info-box {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.info-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.info-list {
  margin: 0;
  padding-left: 20px;
}

.info-list li {
  margin-bottom: 5px;
  font-size: 14px;
  color: #606266;
}

code {
  background-color: #ecf5ff;
  color: #409eff;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
}
</style>
