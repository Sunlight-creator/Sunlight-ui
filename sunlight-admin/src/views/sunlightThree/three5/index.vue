<template>
  <div class="sunlight-three-five-page">
    <div class="content-wrapper">
      <h2 class="page-title">SunlightThree 异步加载示例</h2>

      <!-- 基本异步加载示例 -->
      <div class="example-section">
        <h3>基本异步加载</h3>
        <p class="example-description">当数据量大时，按需加载子节点数据，提高性能。</p>
        <SunlightThree :data="[]" title="异步加载树形结构" lazy :load="loadNode" @change="handleChange" />
      </div>

      <el-divider />

      <!-- 自定义主题的异步加载 -->
      <div class="example-section">
        <h3>自定义主题的异步加载</h3>
        <p class="example-description">结合自定义主题和异步加载功能，展示个性化样式。</p>
        <SunlightThree
          :data="[]"
          title="蓝色主题异步加载"
          lazy
          :load="loadNode"
          :wrapperStyle="{
            selectedBgColor: '#667eea',
            selectedTextColor: '#ffffff',
            borderRadius: '8px',
            borderColor: '#e0e0e0'
          }"
          @change="handleChange"
        />
      </div>

      <el-divider />

      <!-- 多选模式的异步加载 -->
      <div class="example-section">
        <h3>多选模式的异步加载</h3>
        <p class="example-description">在多选场景下使用异步加载功能。</p>
        <SunlightThree
          :data="[]"
          title="多选异步加载树形结构"
          multiple
          lazy
          :load="loadNode"
          @change="handleMultipleChange"
        />
      </div>

      <el-divider />

      <!-- 带搜索过滤的异步加载 -->
      <div class="example-section">
        <h3>带搜索过滤的异步加载</h3>
        <p class="example-description">结合搜索过滤和异步加载功能，实现更强大的树形组件。</p>
        <SunlightThree :data="[]" title="搜索异步加载树形结构" lazy :load="loadNode" @change="handleChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SunlightThree, SunlightTable } from 'sunlight-ui'

// 异步加载方法
const loadNode = (node: any, resolve: (data: any[]) => void) => {
  // 模拟网络请求延迟
  setTimeout(() => {
    // 根节点加载一级数据
    if (node.level === 0) {
      return resolve([
        {
          id: '1',
          label: '父节点1',
          hasChildren: true
        },
        {
          id: '2',
          label: '父节点2',
          hasChildren: true
        },
        {
          id: '3',
          label: '父节点3',
          hasChildren: true
        },
        {
          id: '4',
          label: '父节点4',
          hasChildren: true
        }
      ])
    }

    // 一级节点加载二级数据
    if (node.level === 1) {
      const childCount = 3
      const children = []
      for (let i = 1; i <= childCount; i++) {
        children.push({
          id: `${node.data.id}-${i}`,
          label: `子节点${node.data.id}-${i}`,
          hasChildren: true
        })
      }
      return resolve(children)
    }

    // 二级节点加载三级数据
    if (node.level === 2) {
      const childCount = 2
      const children = []
      for (let i = 1; i <= childCount; i++) {
        children.push({
          id: `${node.data.id}-${i}`,
          label: `孙节点${node.data.id}-${i}`,
          hasChildren: false
        })
      }
      return resolve(children)
    }

    // 默认返回空数组
    resolve([])
  }, 500)
}

// 单选变更事件
const handleChange = (value: any) => {
  console.log('选中的值:', value)
}

// 多选变更事件
const handleMultipleChange = (value: any[]) => {
  console.log('多选选中的值:', value)
}
</script>

<style scoped lang="scss">
.sunlight-three-five-page {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f7fa;
  overflow-y: auto;
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.page-title {
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.example-section {
  margin-bottom: 32px;
}

.example-section h3 {
  margin-bottom: 12px;
  font-size: 18px;
  color: #333;
}

.example-description {
  margin-bottom: 16px;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

:deep(.sunlight-three-wrapper) {
  margin-bottom: 16px;
}
</style>
