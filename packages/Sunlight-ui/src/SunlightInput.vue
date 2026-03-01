<script setup lang="ts">
import { h, getCurrentInstance, ref, watch, computed } from 'vue'
import { ElInput } from 'element-plus'
import type { InputInstance } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  item: {
    type: Object,
    default: () => ({}),
  },
  // 主题样式：default、primary、success、warning、danger、rounded
  theme: {
    type: String,
    default: 'default',
  },
})

const emit = defineEmits([
  'update:modelValue',
  'input',
  'change',
  'focus',
  'blur',
  'clear',
  'keydown',
])

const innerValue = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  if (val !== innerValue.value) innerValue.value = val
})
watch(innerValue, (val) => {
  if (val !== props.modelValue) emit('update:modelValue', val)
})

const allDisabled = computed(() => props.item?.disabled ?? false)
const allReadonly = computed(() => props.item?.readonly ?? false)

// 计算输入框类名，包含主题和自定义类
const inputClass = computed(() => {
  return [
    `sunlight-input--${props.theme}`,
    props.item?.customClass
  ].filter(Boolean)
})

const vm = getCurrentInstance()
const inputRef = ref<InputInstance>()

function changeRef(exposed: InputInstance) {
  inputRef.value = exposed
  vm!.exposed = exposed
}

function emitEvent(eventName: 'input' | 'change' | 'focus' | 'blur' | 'clear' | 'keydown', payload: any) {
  emit(eventName, payload)
  if (eventName === 'input') {
    innerValue.value = payload
  }
}

defineExpose(inputRef.value as InputInstance)
</script>

<template>
  <div 
    :class="inputClass"
    class="sunlight-input-wrapper"
    :style="[
      item?.customStyle,
      {
        '--select-wrapper-border-color': item?.wrapperStyle?.borderColor ?? 'var(--sunlight-input-border, #c0c4cc)',
        '--select-wrapper-border-radius': item?.wrapperStyle?.borderRadius ?? '4px',
        '--select-wrapper-bg-color': item?.wrapperStyle?.backgroundColor,
        '--select-wrapper-box-shadow': item?.wrapperStyle?.boxShadow,
        '--select-wrapper-focus-border-color': item?.wrapperStyle?.focusBorderColor ?? 'var(--sunlight-input-focus-border, #409eff)',
        '--select-wrapper-focus-box-shadow': item?.wrapperStyle?.focusBoxShadow ?? 'var(--sunlight-input-focus-shadow)'
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
        clearable: item?.clearable,
        maxlength: item?.maxlength,
        showWordLimit: item?.showWordLimit,
        prefixIcon: item?.prefixIcon,
        suffixIcon: item?.suffixIcon,
        placeholder: item?.placeholder,
        size: item?.size,
        autofocus: item?.autofocus,
        rows: item?.type === 'textarea' ? item?.rows : undefined,
        type: item?.type,
        ...item?.config,
        onInput: (val: string | number | undefined) => emitEvent('input', val),
        onChange: (val: string | number | undefined) => emitEvent('change', val),
        onFocus: (e: Event) => emit('focus', e),
        onBlur: (e: Event) => emit('blur', e),
        onClear: (e: Event) => emit('clear', e),
        onKeydown: (e: KeyboardEvent) => emit('keydown', e),
      }, $slots)"
    />
  </div>
</template>

<style scoped>
/* 外层容器样式 - 确保宽度固定 */
.sunlight-input-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.sunlight-input-wrapper :deep(.el-input) {
  width: 100%;
}

.sunlight-input-wrapper :deep(.el-input__wrapper) {
  width: 100%;
  box-sizing: border-box;
  border-color: var(--select-wrapper-border-color)    ;
  border-radius: var(--select-wrapper-border-radius)    ;
  background-color: var(--select-wrapper-bg-color, inherit)    ;
  box-shadow: var(--select-wrapper-box-shadow, inherit)    ;
  border-width: 1.5px;
  border-style: solid;
}

.sunlight-input-wrapper :deep(.el-input__wrapper:hover) {
  border-color: var(--select-wrapper-border-color)    ;
}

.sunlight-input-wrapper :deep(.el-input__wrapper.is-focus) {
  border-color: var(--select-wrapper-focus-border-color)    ;
  box-shadow: var(--select-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.15))    ;
}

/* 默认主题样式 - 确保没有自定义颜色时也有默认边框色 */
.sunlight-input--default :deep(.el-input__wrapper) {
  border-color: var(--select-wrapper-border-color)   ;
}

/* 其他主题样式定义 */
.sunlight-input--primary :deep(.el-input__wrapper) {
  border-color: var(--select-wrapper-border-color, #409eff)   ;
}

.sunlight-input--success :deep(.el-input__wrapper) {
  border-color: var(--select-wrapper-border-color, #67c23a)   ;
}

.sunlight-input--warning :deep(.el-input__wrapper) {
  border-color: var(--select-wrapper-border-color, #e6a23c)   ;
}

.sunlight-input--danger :deep(.el-input__wrapper) {
  border-color: var(--select-wrapper-border-color, #f56c6c)   ;
}

.sunlight-input--rounded :deep(.el-input__wrapper) {
  border-radius: var(--select-wrapper-border-radius, 20px)   ;
}

/* 聚焦状态样式 */
.sunlight-input--default :deep(.el-input__wrapper.is-focus) {
  border-color: var(--select-wrapper-focus-border-color)   ;
  box-shadow: var(--select-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.15))   ;
}

.sunlight-input--primary :deep(.el-input__wrapper.is-focus) {
  border-color: var(--select-wrapper-focus-border-color, #409eff)   ;
  box-shadow: var(--select-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.15))   ;
}

.sunlight-input--success :deep(.el-input__wrapper.is-focus) {
  border-color: var(--select-wrapper-focus-border-color, #67c23a)   ;
  box-shadow: var(--select-wrapper-focus-box-shadow, 0 0 0 3px rgba(103, 194, 58, 0.15))   ;
}

.sunlight-input--warning :deep(.el-input__wrapper.is-focus) {
  border-color: var(--select-wrapper-focus-border-color, #e6a23c)   ;
  box-shadow: var(--select-wrapper-focus-box-shadow, 0 0 0 3px rgba(230, 162, 60, 0.15))   ;
}

.sunlight-input--danger :deep(.el-input__wrapper.is-focus) {
  border-color: var(--select-wrapper-focus-border-color, #f56c6c)   ;
  box-shadow: var(--select-wrapper-focus-box-shadow, 0 0 0 3px rgba(245, 108, 108, 0.15))   ;
}

/* 表单校验错误状态 */
:deep(.el-input__wrapper.is-error) {
  /* 错误状态使用红色边框，优先级高于默认样式 */
  border-color: #f56c6c     ;
  box-shadow: 0 0 0 3px rgba(245, 108, 108, 0.1)     ;
}

/* 错误状态下hover和focus样式 */
:deep(.el-input__wrapper.is-error:hover) {
  border-color: #f56c6c     ;
}

:deep(.el-input__wrapper.is-error.is-focus) {
  border-color: #f56c6c     ;
  box-shadow: 0 0 0 3px rgba(245, 108, 108, 0.25)     ;
}
</style>



<!-- <script setup>
import { ref, toRef, computed, watch, getCurrentInstance } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  item: {
    type: Object,
    default: () => ({}),
  },
  // 支持字符串或组件对象
  componentName: {
    type: [String, Object],
    default: 'el-input',
  },
});

const emit = defineEmits([
  'update:modelValue',
  'input',
  'change',
  'focus',
  'blur',
  'clear',
  'keydown',
  'compositionstart',
  'compositionend',
]);

// 直接用 toRef 绑定 props.modelValue，避免重复赋值
const innerValue = ref(props.modelValue);
watch(() => props.modelValue, (val) => {
  if (val !== innerValue.value) innerValue.value = val;
});
watch(innerValue, (val) => {
  if (val !== props.modelValue) emit('update:modelValue', val);
});

// 计算禁用和只读状态
const allDisabled = computed(() => props.item?.disabled ?? false);
const allReadonly = computed(() => props.item?.readonly ?? false);

// 统一事件处理函数，减少重复代码
function emitEvent(eventName, payload) {
  emit(eventName, payload);
  // 特殊处理 input 事件同步 innerValue
  if (eventName === 'input') {
    innerValue.value = payload;
  }
}

// 事件映射，方便模板绑定
const eventHandlers = {
  input: (val) => emitEvent('input', val),
  change: (val) => emitEvent('change', val),
  focus: (e) => emitEvent('focus', e),
  blur: (e) => emitEvent('blur', e),
  clear: (e) => emitEvent('clear', e),
  keydown: (e) => emitEvent('keydown', e),
};

</script>

<template>
  <component
    :is="'el-input'"
    v-model="innerValue"
    :disabled="allDisabled"
    :readonly="allReadonly"
    :clearable="item?.clearable"
    :maxlength="item?.maxlength"
    :show-word-limit="item?.showWordLimit"
    :prefix-icon="item?.prefixIcon"
    :suffix-icon="item?.suffixIcon"
    :placeholder="item?.placeholder"
    :size="item?.size"
    :autofocus="item?.autofocus"
    :rows="item?.type === 'textarea' ? item?.rows : undefined"
    :type="item?.type"
    :class="item?.customClass"
    :style="item?.customStyle"
    v-bind="item?.config"
    v-on="item?.eventFunction || {}"
    @input="eventHandlers.input"
    @change="eventHandlers.change"
    @focus="eventHandlers.focus"
    @blur="eventHandlers.blur"
    @clear="eventHandlers.clear"
    @keydown="eventHandlers.keydown"
  >
    <template v-for="slotName in item?.slotNames || []" #[slotName]>
      <slot :name="slotName" />
    </template>
  </component>
</template> -->



<!-- <script setup>
import { ref, computed, watch, defineOptions } from 'vue';

defineOptions({
  inheritAttrs: false, // 关闭自动继承，手动绑定 $attrs
});

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  item: {
    type: Object,
    default: () => ({}),
  },
  componentName: {
    type: [String, Object],
    default: 'el-input',
  },
});

const emit = defineEmits([
  'update:modelValue',
  'input',
  'change',
  'focus',
  'blur',
  'clear',
  'keydown',
  'compositionstart',
  'compositionend',
]);

const innerValue = ref(props.modelValue);
watch(() => props.modelValue, (val) => {
  if (val !== innerValue.value) innerValue.value = val;
});
watch(innerValue, (val) => {
  if (val !== props.modelValue) emit('update:modelValue', val);
});

const allDisabled = computed(() => props.item?.disabled ?? false);
const allReadonly = computed(() => props.item?.readonly ?? false);

function onInput(val) {
  innerValue.value = val;
  emit('input', val);
}
</script>

<template>
  <component
    :is="componentName"
    v-model="innerValue"
    :disabled="allDisabled"
    :readonly="allReadonly"
    :clearable="item?.clearable"
    :maxlength="item?.maxlength"
    :show-word-limit="item?.showWordLimit"
    :prefix-icon="item?.prefixIcon"
    :suffix-icon="item?.suffixIcon"
    :placeholder="item?.placeholder"
    :size="item?.size"
    :autofocus="item?.autofocus"
    :rows="item?.type === 'textarea' ? item?.rows : undefined"
    :type="item?.type"
    :class="item?.customClass"
    :style="item?.customStyle"
    v-bind="$attrs"
    v-on="$attrs"
    @input="onInput"
  >
    <template v-for="slotName in item?.slotNames || []" #[slotName]>
      <slot :name="slotName" />
    </template>
  </component>
</template>


<template>
  <SunlightInput v-model="inputValue" :item="itemConfig" @keydown="handleKeydown" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'
import { SunlightInput } from 'sunlight-ui'

const inputValue = ref('')

// 你可以通过 item 传递一些配置
const itemConfig = {
  disabled: false,
  clearable: true,
  maxlength: 20
  // 其他配置...
}

// keydown 事件处理函数
function handleKeydown(event) {
  console.log('按下了键：', event.key)
  // 例如按下 Enter 键时做点什么
  if (event.key === 'Enter') {
    alert('你按下了回车键！')
  }
}
</script> -->