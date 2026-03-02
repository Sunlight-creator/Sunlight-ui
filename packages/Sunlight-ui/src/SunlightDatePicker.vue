<script setup>
import { computed, ref, useAttrs } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Date, Array],
    default: null,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue', 'change', 'input']);
const attrs = useAttrs();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
    emit('change', val);
    emit('input', val);
  },
});

const allDisabled = computed(() => props.item?.disabled ?? false);

const elRef = ref();

// 合并所有属性
const mergedAttrs = computed(() => {
  return {
    ...props.item.config,
    ...attrs
  };
});
</script>

<template>
  <div 
    class="sunlight-date-picker-wrapper"
    :style="[
      props.item?.customStyle,
      {
        '--date-picker-wrapper-border-color': props.item?.wrapperStyle?.borderColor ?? '#c0c4cc',
        '--date-picker-wrapper-border-radius': props.item?.wrapperStyle?.borderRadius ?? '4px',
        '--date-picker-wrapper-bg-color': props.item?.wrapperStyle?.backgroundColor,
        '--date-picker-wrapper-box-shadow': props.item?.wrapperStyle?.boxShadow,
        '--date-picker-wrapper-focus-border-color': props.item?.wrapperStyle?.focusBorderColor ?? '#409eff',
        '--date-picker-wrapper-focus-box-shadow': props.item?.wrapperStyle?.focusBoxShadow,
        // 禁用状态：默认提供禁用颜色，无需额外传递参数
        '--date-picker-wrapper-disabled-border-color': '#dcdfe6',  // 禁用边框色
        '--date-picker-wrapper-disabled-bg-color': '#f5f7fa',     // 禁用背景色
        '--date-picker-wrapper-disabled-color': '#c0c4cc'         // 禁用文字色
      }
    ]"
  >
    <el-date-picker
      ref="elRef"
      :disabled="allDisabled"
      :placeholder="props.item.placeholder || ('请选择' + props.item.label)"
      v-model="value"
      :type="props.item.type || 'date'"
      :value-format="props.item.valueFormat || 'YYYY-MM-DD'"
      v-bind="mergedAttrs"
      v-on="{
        ...attrs.on,
        ...props.item.eventFunction
      }"
    >
      <template v-for="slotName in props.item.slotNames || []" #[slotName]="slotData">
        <slot :name="slotName" :slotData="slotData" />
      </template>
    </el-date-picker>
  </div>
</template>

<style scoped>
.sunlight-date-picker-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.sunlight-date-picker-wrapper :deep(.el-date-editor) {
  width: 100%;
}

.sunlight-date-picker-wrapper :deep(.el-date-editor__wrapper) {
  width: 100%;
  box-sizing: border-box;
}

.sunlight-date-picker-wrapper :deep(.el-input__wrapper) {
  border-color: var(--date-picker-wrapper-border-color)    ;
  border-radius: var(--date-picker-wrapper-border-radius)    ;
  background-color: var(--date-picker-wrapper-bg-color, inherit)    ;
  box-shadow: var(--date-picker-wrapper-box-shadow, inherit)    ;
  border-width: 1.5px;
  border-style: solid;
}

.sunlight-date-picker-wrapper :deep(.el-input__wrapper:hover) {
  border-color: var(--date-picker-wrapper-border-color)    ;
}

.sunlight-date-picker-wrapper :deep(.el-input__wrapper.is-focus) {
  border-color: var(--date-picker-wrapper-focus-border-color)    ;
  box-shadow: var(--date-picker-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.15))    ;
}


.sunlight-date-picker-wrapper :deep(.is-disabled) {
  border-color: var(--date-picker-wrapper-disabled-border-color)    ;
  background-color: var(--date-picker-wrapper-disabled-bg-color)    ;
  color: var(--date-picker-wrapper-disabled-color)    ;

}


.sunlight-date-picker-wrapper :deep(.el-input__wrapper.is-disabled:hover) {
  border-color: var(--date-picker-wrapper-disabled-border-color)    ;
  background-color: var(--date-picker-wrapper-disabled-bg-color)    ;
  color: var(--date-picker-wrapper-disabled-color)    ;
}

.sunlight-date-picker-wrapper :deep(.el-input__wrapper.is-disabled.is-focus) {
  border-color: var(--date-picker-wrapper-disabled-border-color)    ;
  background-color: var(--date-picker-wrapper-disabled-bg-color)    ;
  color: var(--date-picker-wrapper-disabled-color)    ;
  box-shadow: none    ;
}


.sunlight-date-picker-wrapper :deep(.el-input__wrapper.is-disabled .el-input__inner) {
  color: var(--date-picker-wrapper-disabled-color)    ;
  background-color: transparent    ;
}

.sunlight-date-picker-wrapper :deep(.el-input__wrapper.is-disabled .el-date-editor__icon) {
  color: var(--date-picker-wrapper-disabled-color)    ;
}
</style>

