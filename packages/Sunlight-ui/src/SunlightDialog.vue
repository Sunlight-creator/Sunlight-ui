<!--
 * @component: SunlightDialog
 * @description: 基于 Element Plus Dialog 封装的增强版对话框组件
 * @features: 支持全屏切换、可拖拽、自定义高度、灵活的底部按钮配置
 * @author: - 
 * @date: - 

-->

<template>
      <teleport to="body">
  <el-dialog
    ref="dialogRef"
    v-model="visible"
    :title="dialogTitle"
    :fullscreen="isFullscreenMode"
    top="10vh"
    width="80%"
    draggable
    :close-on-click-modal="false"
    v-bind="$attrs"
    class="sunlight-dialog"
  >
    <!-- 对话框头部插槽 -->
    <template #header="headerScope">
      <slot name="header" v-bind="headerScope">
        <div class="dialog-header-container">
          <!-- 标题插槽 -->
          <slot name="header-title">
            <span class="dialog-title">{{ dialogTitle }}</span>
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

    <!-- 对话框内容区域，带滚动条 -->
    <el-scrollbar :height="contentHeight" :max-height="maxContentHeight">
      <slot />
    </el-scrollbar>

    <!-- 底部按钮上方的插槽 -->
    <slot name="footer-top" />

    <!-- 对话框底部按钮区域 -->
    <template v-if="withFooter" #footer>
      <div class="dialog-footer" :style="footerStyle">
        <slot name="footer" v-bind="{ handleConfirmClick, handleCancelClick }">
          <el-button @click="handleCancelClick">{{ cancelBtnText }}</el-button>
          <el-button type="primary" :loading="isConfirmLoading" @click="handleConfirmClick">{{ confirmBtnText }}</el-button>
        </slot>
      </div>
    </template>
  </el-dialog>
    </teleport>

</template>

<script setup lang="ts">
import { nextTick, ref, watch, computed } from 'vue'
import { ElDialog, ElScrollbar, ElButton, ElIcon } from 'element-plus'
import { FullScreen, Aim } from '@element-plus/icons-vue'

// 组件属性定义
interface DialogProps {
  dialogTitle?: string
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
interface DialogEmits {
  'update:visible': [value: boolean]
  'toggle-fullscreen': [value: boolean]
  'on-confirm': []
  'on-cancel': []
}

// 属性默认值
const props = withDefaults(defineProps<DialogProps>(), {
  dialogTitle: '对话框',
  isFullscreenMode: false,
  showFullscreenToggle: true,
  contentHeight: 400,
  fullscreenHeightOffset: 0,
  withFooter: true,
  footerButtonAlign: 'right',
  isConfirmLoading: false,
  confirmBtnText: '确认',
  cancelBtnText: '取消'
})

// 事件实例
const emit = defineEmits<DialogEmits>()

// 对话框显示状态（双向绑定）
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
const dialogRef = ref<InstanceType<typeof ElDialog>>()
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
 * 监听全屏状态变化，动态调整对话框高度
 */
watch(
  isFullscreenMode,
  async (isFullscreen) => {
    await nextTick()
    if (isFullscreen) {
      // 全屏状态下，根据窗口高度计算对话框内容高度
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
  hideDialog()
}

/**
 * 显示对话框
 */
const showDialog = () => {
  visible.value = true
}

/**
 * 隐藏对话框
 */
const hideDialog = () => {
  visible.value = false
}

/**
 * 暴露组件方法给父组件
 */
defineExpose({
  dialogRef,
  showDialog,
  hideDialog,
  handleConfirmClick,
  handleCancelClick,
  handleFullscreenToggle
})
</script>

<style lang="scss" scoped>

:deep(.el-dialog__title) {
  padding: 0px 20px;
   border-bottom: 1px solid var(--el-border-color-lighter);
   font-size: 17px;
   padding-bottom: 16px;
}

  .dialog-header-container {
    display: flex;
    align-items: center;
    width: 100%;
  }


  .fullscreen-toggle-icon {
    cursor: pointer;
    user-select: none;
    color: var(--el-color-info);
    margin-left: auto;
  }


  .dialog-title {
    flex: 1;
  }


  .dialog-footer {
    display: flex;
    align-items: center;
    gap: 10px;
  }

:deep(.el-scrollbar__bar.is-horizontal) {
    height: 0px;
    left: 0px;
}
</style>