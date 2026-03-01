<!-- 
  Pagination 分页组件
  基于 Element Plus 的 el-pagination 封装，提供更便捷的分页功能
-->
<template>
  <!-- 分页容器：根据 hidden 属性控制显示/隐藏 -->
  <div :class="{ 'hidden': hidden }" class="pagination-container">
    <!-- Element Plus 分页组件 -->
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
// 导入 Vue 3 的 computed API，用于创建计算属性
import { computed } from 'vue'

/**
 * 组件 Props 接口定义
 */
interface Props {
  total: number              // 总条数（必需）
  page?: number              // 当前页码，默认 1
  limit?: number             // 每页条数，默认 20
  pageSizes?: number[]       // 每页条数选项数组，默认 [10, 20, 30, 50]
  pagerCount?: number        // 页码按钮数量，移动端默认 5，PC 端默认 7
  layout?: string            // 分页布局，默认 'total, sizes, prev, pager, next, jumper'
  background?: boolean       // 是否使用背景色，默认 true
  autoScroll?: boolean       // 是否自动滚动到顶部，默认 false
  hidden?: boolean           // 是否隐藏分页，默认 false
}

// 使用 withDefaults 定义 props 的默认值
const props = withDefaults(defineProps<Props>(), {
  page: 1,                                                                   // 默认页码为 1
  limit: 20,                                                                 // 默认每页 20 条
  pageSizes: () => [10, 20, 30, 50],                                        // 默认每页条数选项
  pagerCount: () => (typeof document !== 'undefined' && document.body.clientWidth < 992 ? 5 : 7), // 根据屏幕宽度设置页码按钮数量
  layout: 'total, sizes, prev, pager, next, jumper',                        // 默认布局：总数、每页条数、上一页、页码、下一页、跳转
  background: true,                                                          // 默认使用背景色
  autoScroll: false,                                                        // 默认不自动滚动
  hidden: false                                                              // 默认显示
})

// 定义组件可以触发的事件及其参数类型
const emit = defineEmits<{
  'update:page': [page: number]                                             // 页码更新事件，支持 v-model:page
  'update:limit': [limit: number]                                           // 每页条数更新事件，支持 v-model:limit
  'pagination': [data: { page: number; limit: number }]                     // 分页变化事件，包含 page 和 limit
}>()

/**
 * 当前页码的计算属性
 * 使用 computed 实现双向绑定，get 返回 props.page，set 触发 update:page 事件
 */
const currentPage = computed({
  get() {
    return props.page  // 获取当前页码
  },
  set(val) {
    emit('update:page', val)  // 更新页码时触发事件
  }
})

/**
 * 每页条数的计算属性
 * 使用 computed 实现双向绑定，get 返回 props.limit，set 触发 update:limit 事件
 */
const pageSize = computed({
  get() {
    return props.limit  // 获取每页条数
  },
  set(val) {
    emit('update:limit', val)  // 更新每页条数时触发事件
  }
})

/**
 * 平滑滚动到指定位置
 * @param top - 目标滚动位置（距离顶部的像素）
 * @param duration - 滚动动画持续时间（毫秒）
 */
function scrollTo(top: number, duration: number) {
  // 如果未启用自动滚动，直接返回
  if (!props.autoScroll) return
  
  // 获取当前滚动位置
  const start = window.pageYOffset || document.documentElement.scrollTop
  // 记录开始时间
  const startTime = Date.now()
  
  /**
   * 动画函数：使用 requestAnimationFrame 实现平滑滚动
   */
  function animate() {
    // 获取当前时间
    const now = Date.now()
    // 计算已过去的时间
    const elapsed = now - startTime
    // 计算动画进度（0 到 1 之间）
    const progress = Math.min(elapsed / duration, 1)
    
    // 计算当前应该滚动到的位置（线性插值）
    window.scrollTo(0, start + (top - start) * progress)
    
    // 如果动画未完成，继续下一帧
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  // 开始动画
  requestAnimationFrame(animate)
}

/**
 * 处理每页条数变化
 * @param val - 新的每页条数
 */
function handleSizeChange(val: number) {
  // 如果当前页码 * 新每页条数 > 总条数，说明当前页超出范围，重置为第一页
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  // 触发 pagination 事件，传递当前页码和新每页条数
  emit('pagination', { page: currentPage.value, limit: val })
  // 如果启用自动滚动，滚动到顶部
  if (props.autoScroll) {
    scrollTo(0, 800)  // 800ms 内滚动到顶部
  }
}

/**
 * 处理当前页码变化
 * @param val - 新的页码
 */
function handleCurrentChange(val: number) {
  // 触发 pagination 事件，传递新页码和当前每页条数
  emit('pagination', { page: val, limit: pageSize.value })
  // 如果启用自动滚动，滚动到顶部
  if (props.autoScroll) {
    scrollTo(0, 800)  // 800ms 内滚动到顶部
  }
}
</script>

<style scoped>
/* 分页容器样式 */
.pagination-container {
  background: #fff;        /* 白色背景 */
  padding: 9px 16px;      /* 上下 32px，左右 16px 的内边距 */
}

/* 隐藏状态：当 hidden 为 true 时应用此样式 */
.pagination-container.hidden {
  display: none;           /* 完全隐藏 */
}
</style>
