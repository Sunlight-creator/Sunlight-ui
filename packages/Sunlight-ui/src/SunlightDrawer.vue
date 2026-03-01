<!--
 * @component: SunlightDrawer
 * @description: 基于 Element Plus Drawer 封装的增强版抽屉组件
 * @features: 支持自定义宽度、灵活的底部按钮配置、内容区域滚动
 * @author: - 
 * @date: - 

-->

<template>
  <teleport to="body">
  <el-drawer
    ref="drawerRef"
    v-model="visible"
    :title="drawerTitle"
    :direction="drawerDirection"
    :size="isFullscreenMode ? '100%' : drawerSize"
    :close-on-click-modal="false"
    v-bind="$attrs"
    class="sunlight-drawer"
    :class="{ 'is-fullscreen': isFullscreenMode }"
  >
    <!-- 抽屉头部插槽 -->
    <template #header="headerScope">
      <slot name="header" v-bind="headerScope">
        <div class="drawer-header-container">
          <!-- 标题插槽 -->
          <slot name="header-title">
            <span class="drawer-title">{{ drawerTitle }}</span>
          </slot>

          <!-- 全屏切换图标插槽 -->
          <slot name="fullscreen-toggle" v-bind="{ isFullscreenMode, handleFullscreenToggle }">
            <el-icon
              v-if="showFullscreenToggle"
              @click="handleFullscreenToggle"
              :size="15"
              class="fullscreen-toggle-icon"
            >
              <!-- 根据全屏状态动态切换图标 -->
              <component :is="isFullscreenMode ? Aim : FullScreen" />
            </el-icon>
          </slot>
        </div>
      </slot>
    </template>

    <!-- 抽屉内容区域，带滚动条 -->
    <el-scrollbar :height="contentHeight" :max-height="maxContentHeight">
      <slot />
    </el-scrollbar>

    <!-- 底部按钮上方的插槽 -->
    <slot name="footer-top" />

    <!-- 抽屉底部按钮区域 -->
    <template v-if="withFooter" #footer>
      <div class="drawer-footer" :style="footerStyle">
        <slot name="footer" v-bind="{ handleConfirmClick, handleCancelClick }">
          <el-button @click="handleCancelClick">{{ cancelBtnText }}</el-button>
          <el-button type="primary" :loading="isConfirmLoading" @click="handleConfirmClick">{{ confirmBtnText }}</el-button>
        </slot>
      </div>
    </template>
  </el-drawer>
  </teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, computed } from 'vue'
import { ElDrawer, ElScrollbar, ElButton, ElIcon } from 'element-plus'
import { FullScreen, Aim } from '@element-plus/icons-vue'

// 组件属性定义
interface DrawerProps {
  drawerTitle?: string
  drawerDirection?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  drawerSize?: string | number
  isFullscreenMode?: boolean
  showFullscreenToggle?: boolean
  contentHeight?: number | string
  fullscreenHeightOffset?: number
  withFooter?: boolean
  footerButtonAlign?: 'left' | 'center' | 'right'
  isConfirmLoading?: boolean
  confirmBtnText?: string
  cancelBtnText?: string
}

// 组件事件定义
interface DrawerEmits {
  'update:visible': [value: boolean]
  'toggle-fullscreen': [value: boolean]
  'on-confirm': []
  'on-cancel': []
}

// 属性默认值
const props = withDefaults(defineProps<DrawerProps>(), {
  drawerTitle: '抽屉',
  drawerDirection: 'rtl',
  drawerSize: '30%',
  isFullscreenMode: false,
  showFullscreenToggle: true,
  contentHeight: 'calc(100vh - 150px)',
  fullscreenHeightOffset: 0,
  withFooter: true,
  footerButtonAlign: 'right',
  isConfirmLoading: false,
  confirmBtnText: '确认',
  cancelBtnText: '取消'
})

// 事件实例
const emit = defineEmits<DrawerEmits>()

// 抽屉显示状态（双向绑定）
const visible = defineModel<boolean>('visible', { default: false })

/**
 * 格式化单位：为数值添加单位
 * @param value - 数值或带单位的字符串
 * @returns 带单位的字符串
 */
const formatUnit = (value: number | string): string => {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return value as string
}

// 响应式数据
const drawerRef = ref<InstanceType<typeof ElDrawer>>()
const isFullscreenMode = ref(props.isFullscreenMode)
const contentHeight = ref(formatUnit(props.contentHeight))
const maxContentHeight = ref('')

/**
 * 计算属性：底部按钮对齐样式
 */
const footerStyle = computed(() => ({
  justifyContent: {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
  }[props.footerButtonAlign]
}))

/**
 * 处理全屏切换
 */
const handleFullscreenToggle = () => {
  isFullscreenMode.value = !isFullscreenMode.value
  emit('toggle-fullscreen', isFullscreenMode.value)
}

/**
 * 监听全屏状态变化，动态调整抽屉内容高度
 */
watch(
  isFullscreenMode,
  async (isFullscreen) => {
    await nextTick()
    if (isFullscreen) {
      // 全屏状态下，根据窗口高度计算抽屉内容高度
      const windowHeight = document.documentElement.offsetHeight
      const headerHeight = 47 // 头部高度
      const footerHeight = props.withFooter ? 52 : 0 // 底部高度
      const padding = 32 + 50 // 内边距
      
      contentHeight.value = `${windowHeight - headerHeight - footerHeight - padding - props.fullscreenHeightOffset}px`
    } else {
      // 非全屏状态下，使用自定义高度
      contentHeight.value = formatUnit(props.contentHeight)
    }
  },
  { immediate: true }
)

/**
 * 监听内容高度变化，更新响应式数据
 */
watch(
  () => props.contentHeight,
  (newHeight) => {
    if (!isFullscreenMode.value) {
      contentHeight.value = formatUnit(newHeight)
    }
  }
)

/**
 * 监听外部传入的全屏状态变化
 */
watch(
  () => props.isFullscreenMode,
  (newValue) => {
    isFullscreenMode.value = newValue
  }
)

/**
 * 处理确认按钮点击
 */
const handleConfirmClick = () => {
  emit('on-confirm')
}

/**
 * 处理取消按钮点击
 */
const handleCancelClick = () => {
  emit('on-cancel')
  hideDrawer()
}

/**
 * 显示抽屉
 */
const showDrawer = () => {
  visible.value = true
}

/**
 * 隐藏抽屉
 */
const hideDrawer = () => {
  visible.value = false
}

/**
 * 暴露组件方法给父组件
 */
defineExpose({
  drawerRef,
  showDrawer,
  hideDrawer,
  handleConfirmClick,
  handleCancelClick,
  handleFullscreenToggle
})
</script>

<style lang="scss" scoped>
:deep(.el-drawer__header) {
  padding: 0 20px 16px 20px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

:deep(.el-drawer__title) {
  font-size: 17px;
  font-weight: 500;
}

.drawer-header-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.drawer-title {
  flex: 1;
  font-size: 17px;
  font-weight: 500;
}

.fullscreen-toggle-icon {
  cursor: pointer;
  user-select: none;
  color: var(--el-color-info);
  margin-left: auto;
}

.drawer-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid var(--el-border-color-lighter);
  justify-content: flex-end;
}

:deep(.el-scrollbar__bar.is-horizontal) {
  height: 0;
  left: 0;
}

:deep(.el-drawer__body) {
  padding: 20px;
}

/* 全屏模式样式 */
:deep(.is-fullscreen .el-drawer) {
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  margin: 0 !important;
  border-radius: 0 !important;
}

:deep(.is-fullscreen .el-drawer__wrapper) {
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

:deep(.is-fullscreen .el-drawer__container) {
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 100%;
}

:deep(.is-fullscreen .el-drawer__body) {
  flex: 1;
  overflow: hidden;
}

</style>