<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightSelect 基础多选示例</span>
    </div>

    <div class="section">
      <div class="section-title">默认多选模式</div>
      <div class="input-wrapper">
        <SunlightSelect v-model="selected1" :item="item1" @change="handleChange" />
      </div>
    </div>

    <div class="section">
      <div class="section-title">折叠标签模式</div>
      <div class="input-wrapper">
        <SunlightSelect v-model="selected2" :item="item2" />
      </div>
    </div>

    <div class="section">
      <div class="section-title">限制选择数量</div>
      <div class="input-wrapper">
        <SunlightSelect v-model="selected3" :item="item3" />
        <div class="limit-hint">已选择 {{ selected3.length }}/{{ maxLimit }} 项</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">禁用某些选项</div>
      <div class="input-wrapper">
        <SunlightSelect v-model="selected4" :item="item4" />
      </div>
    </div>

    <div class="info-box">
      <div class="info-title">功能说明：</div>
      <ul class="info-list">
        <li>1. 通过 <code>config: { multiple: true }</code> 启用多选模式</li>
        <li>2. 使用 <code>collapseTags: true</code> 启用标签折叠</li>
        <li>3. 支持 <code>multipleLimit</code> 限制最大选择数量</li>
        <li>4. 通过 <code>option.disabled</code> 禁用特定选项</li>
        <li>5. 选中值为数组类型，可通过 <code>@change</code> 事件获取</li>
      </ul>
    </div>

    <div class="result-box">
      <div class="result-title">当前选中值：</div>
      <div class="result-content">
        <pre>{{
          JSON.stringify(
            {
              selected1: selected1,
              selected2: selected2,
              selected3: selected3,
              selected4: selected4
            },
            null,
            2
          )
        }}</pre>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SunlightSelect } from 'sunlight-ui'

// 默认多选示例
const selected1 = ref([])
const item1 = {
  placeholder: '请选择多个水果（默认模式）',
  options: [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' },
    { label: '葡萄', value: 'grape' },
    { label: '草莓', value: 'strawberry' }
  ],
  clearable: true,
  config: {
    multiple: true, // 启用多选
    clearable: true
  }
}

// 折叠标签示例
const selected2 = ref([])
const item2 = {
  placeholder: '请选择多个水果（折叠标签）',
  options: [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' },
    { label: '葡萄', value: 'grape' },
    { label: '草莓', value: 'strawberry' }
  ],
  clearable: true,
  config: {
    multiple: true,
    clearable: true,
    collapseTags: true, // 启用标签折叠
    collapseTagsTooltip: true // 折叠时显示tooltip
  }
}

// 限制选择数量示例
const maxLimit = 3
const selected3 = ref([])
const item3 = {
  placeholder: '请选择最多3个水果',
  options: [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' },
    { label: '葡萄', value: 'grape' },
    { label: '草莓', value: 'strawberry' }
  ],
  clearable: true,
  config: {
    multiple: true,
    clearable: true,
    multipleLimit: maxLimit // 限制最大选择数量
  }
}

// 禁用某些选项示例
const selected4 = ref([])
const item4 = {
  placeholder: '请选择水果（部分禁用）',
  options: [
    { label: '苹果', value: 'apple', disabled: true }, // 禁用此选项
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' },
    { label: '葡萄', value: 'grape', disabled: true }, // 禁用此选项
    { label: '草莓', value: 'strawberry' }
  ],
  clearable: true,
  config: {
    multiple: true,
    clearable: true
  }
}

// 处理选择变化事件
const handleChange = val => {
  console.log('选择变化:', val)
  // val 是一个数组，包含所有选中的 value
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

.limit-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
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

.result-box {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.result-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.result-content {
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

.result-content pre {
  margin: 0;
  font-size: 13px;
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
