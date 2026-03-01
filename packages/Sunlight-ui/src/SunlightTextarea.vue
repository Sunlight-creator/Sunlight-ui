<!-- 
SunlightTextarea 组件 - 多行文本输入框组件
基于 Element Plus 的 ElInput 组件封装，支持自定义样式和事件
功能：
1. 支持 v-model 双向绑定
2. 支持自定义边框颜色、圆角等样式
3. 支持禁用、只读、清空等功能
4. 支持字数限制和显示
5. 支持前缀/后缀图标
6. 支持各种事件监听
-->
<script setup lang="ts">
import { h, getCurrentInstance, ref, watch, computed } from 'vue'
import { ElInput } from 'element-plus'
import type { InputInstance } from 'element-plus'

// 定义组件属性
const props = defineProps({
  /**
   * 绑定值
   */
  modelValue: {
    type: [String, Number],
    default: '',
  },
  /**
   * 配置项
   */
  item: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 主题样式：default、primary、success、warning、danger、rounded
   */
  theme: {
    type: String,
    default: 'default',
  },
})

// 定义组件事件
const emit = defineEmits([
  'update:modelValue', // 绑定值更新事件
  'input', // 输入事件
  'change', // 内容变化事件
  'focus', // 获得焦点事件
  'blur', // 失去焦点事件
  'clear', // 清空事件
  'keydown', // 按键按下事件
])

// 内部值引用，用于双向绑定
const innerValue = ref(props.modelValue)

// 监听外部 modelValue 变化，同步到内部值
watch(() => props.modelValue, (val) => {
  if (val !== innerValue.value) innerValue.value = val
})

// 监听内部值变化，同步到外部 modelValue
watch(innerValue, (val) => {
  if (val !== props.modelValue) emit('update:modelValue', val)
})

// 计算是否禁用状态
const allDisabled = computed(() => props.item?.disabled ?? false)

// 计算是否只读状态
const allReadonly = computed(() => props.item?.readonly ?? false)

// 计算文本框类名，包含主题和自定义类
const textareaClass = computed(() => {
  return [
    `sunlight-textarea--${props.theme}`,
    props.item?.customClass
  ].filter(Boolean)
})

// 获取当前实例
const vm = getCurrentInstance()

// 输入框引用
const inputRef = ref<InputInstance>()

// 暴露内部组件实例
function changeRef(exposed: InputInstance) {
  inputRef.value = exposed
  vm!.exposed = exposed
}

// 事件发射函数
function emitEvent(eventName: "clear" | "input" | "update:modelValue" | "change" | "focus" | "blur" | "keydown", payload: any) {
  emit(eventName, payload)
  if (eventName === 'input') {
    innerValue.value = payload
  }
}

// 暴露组件方法和属性
defineExpose({
  inputRef,
})
</script>

<template>
  <div 
    :class="textareaClass"
    class="sunlight-textarea-wrapper"
    :style="[
      item?.customStyle,
      // 始终设置 CSS 变量，确保有默认值
      {
        // 如果传递了 borderColor，使用传递的值；否则使用默认的深灰色（更明显）
        '--input-wrapper-border-color': item?.wrapperStyle?.borderColor ?? 'var(--sunlight-input-border, #c0c4cc)',
        // 如果传递了 borderRadius，使用传递的值；否则使用默认的 4px 圆角
        '--input-wrapper-border-radius': item?.wrapperStyle?.borderRadius ?? '4px',
        '--input-wrapper-bg-color': item?.wrapperStyle?.backgroundColor,
        '--input-wrapper-box-shadow': item?.wrapperStyle?.boxShadow,
        // 聚焦状态：如果传递了 focusBorderColor，使用传递的值；否则使用默认的蓝色
        '--input-wrapper-focus-border-color': item?.wrapperStyle?.focusBorderColor ?? 'var(--sunlight-input-focus-border, #409eff)',
        '--input-wrapper-focus-box-shadow': item?.wrapperStyle?.focusBoxShadow ?? 'var(--sunlight-input-focus-shadow)'
      }
    ]"
  >
    <component
      :is="h(ElInput, {
        ...$attrs,
        ref: changeRef,
        modelValue: innerValue,
        disabled: allDisabled,
        readonly: allReadonly,
        clearable: props.item?.clearable !== false,
        maxlength: props.item?.maxlength,
        'show-word-limit': props.item?.showWordLimit !== false,
        'prefix-icon': props.item?.prefixIcon,
        'suffix-icon': props.item?.suffixIcon,
        placeholder: props.item?.placeholder,
        size: props.item?.size,
        autofocus: props.item?.autofocus,
        rows: props.item?.type === 'textarea' ? props.item?.rows ?? 3 : undefined,
        type: props.item?.type || 'textarea',
        ...props.item?.config,
        onInput: (val: any) => emitEvent('input', val),
        onChange: (val: any) => emitEvent('change', val),
        onFocus: (e: Event) => emit('focus', e),
        onBlur: (e: Event) => emit('blur', e),
        onClear: (e: Event) => emit('clear', e),
        onKeydown: (e: KeyboardEvent) => emit('keydown', e),
      }, $slots)"
    />
  </div>
</template>

<style scoped>
/* 外层容器样式 - 确保宽度固定，防止清除图标出现时宽度变化 */
.sunlight-textarea-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.sunlight-textarea-wrapper :deep(.el-input) {
  width: 100%;
}

.sunlight-textarea-wrapper :deep(.el-textarea__inner) {
  width: 100%;
  box-sizing: border-box;
}

/* 默认主题样式 - 确保没有自定义颜色时也有默认边框色 */
.sunlight-textarea--default :deep(.el-textarea__inner) {
  border-color: var(--input-wrapper-border-color)    ;
}

/* 其他主题样式定义 */
.sunlight-textarea--primary :deep(.el-textarea__inner) {
  border-color: var(--input-wrapper-border-color, #409eff)    ;
}

.sunlight-textarea--success :deep(.el-textarea__inner) {
  border-color: var(--input-wrapper-border-color, #67c23a)    ;
}

.sunlight-textarea--warning :deep(.el-textarea__inner) {
  border-color: var(--input-wrapper-border-color, #e6a23c)    ;
}

.sunlight-textarea--danger :deep(.el-textarea__inner) {
  border-color: var(--input-wrapper-border-color, #f56c6c)    ;
}

.sunlight-textarea--rounded :deep(.el-textarea__inner) {
  border-radius: var(--input-wrapper-border-radius, 20px)    ;
}

/* 聚焦状态样式 */
.sunlight-textarea--default :deep(.el-textarea__inner.is-focus) {
  border-color: var(--input-wrapper-focus-border-color)    ;
  box-shadow: var(--input-wrapper-focus-box-shadow, 0 0 0 3px rgba(220, 223, 230, 0.3))    ;
}

.sunlight-textarea--primary :deep(.el-textarea__inner.is-focus) {
  border-color: var(--input-wrapper-focus-border-color, #409eff)    ;
  box-shadow: var(--input-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.25))    ;
}

.sunlight-textarea--success :deep(.el-textarea__inner.is-focus) {
  border-color: var(--input-wrapper-focus-border-color, #67c23a)    ;
  box-shadow: var(--input-wrapper-focus-box-shadow, 0 0 0 3px rgba(103, 194, 58, 0.25))    ;
}

.sunlight-textarea--warning :deep(.el-textarea__inner.is-focus) {
  border-color: var(--input-wrapper-focus-border-color, #e6a23c)    ;
  box-shadow: var(--input-wrapper-focus-box-shadow, 0 0 0 3px rgba(230, 162, 60, 0.25))    ;
}

.sunlight-textarea--danger :deep(.el-textarea__inner.is-focus) {
  border-color: var(--input-wrapper-focus-border-color, #f56c6c)    ;
  box-shadow: var(--input-wrapper-focus-box-shadow, 0 0 0 3px rgba(245, 108, 108, 0.25))    ;
}

/* 支持通过wrapperStyle直接设置.el-textarea__inner的样式 */
:deep(.el-textarea__inner) {
  /* 使用 CSS 变量，确保默认有边框颜色 */
  border-color: var(--input-wrapper-border-color)    ;
  /* 默认 4px 圆角，如果传递了自定义值则使用自定义值 */
  border-radius: var(--input-wrapper-border-radius)    ;
  background-color: var(--input-wrapper-bg-color, inherit)    ;
  box-shadow: var(--input-wrapper-box-shadow, inherit)    ;
  /* 确保边框始终显示，默认边框更粗一些 */
  border-width: 1.5px    ;
  border-style: solid    ;
  /* 防止鼠标经过时放大 */
  transform: scale(1);
  transition: transform 0s;
}

:deep(.el-textarea__inner:hover) {
  /* 明确设置hover状态下不放大 */
  transform: scale(1)    ;
  /* hover 状态使用默认边框颜色或自定义颜色 */
  border-color: var(--input-wrapper-border-color)    ;
}

:deep(.el-textarea__inner.is-focus) {
    /* 聚焦状态使用 focusBorderColor 或默认蓝色，阴影更大一些 */
    border-color: var(--input-wrapper-focus-border-color)    ;
    box-shadow: var(--input-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.15))    ;
    /* 确保聚焦时也不放大 */
    transform: scale(1);
  }

  /* 禁用状态样式 */
  :deep(.is-disabled) {
    /* 禁用状态使用默认的禁用颜色 */
    border-color: var(--input-wrapper-disabled-border-color)    ;
    background-color: var(--input-wrapper-disabled-bg-color)    ;
    color: var(--input-wrapper-disabled-color)    ;
  }

  /* 禁用状态下不响应 hover 和 focus 事件 */
  :deep(.el-textarea__inner.is-disabled:hover) {
    border-color: var(--input-wrapper-disabled-border-color)    ;
    background-color: var(--input-wrapper-disabled-bg-color)    ;
    color: var(--input-wrapper-disabled-color)    ;
  }

  :deep(.el-textarea__inner.is-disabled.is-focus) {
    border-color: var(--input-wrapper-disabled-border-color)    ;
    background-color: var(--input-wrapper-disabled-bg-color)    ;
    color: var(--input-wrapper-disabled-color)    ;
    box-shadow: none    ;
  }
</style>
