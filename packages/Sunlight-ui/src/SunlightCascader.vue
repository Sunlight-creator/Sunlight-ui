<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Object, null],
    default: null,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits([
  'update:modelValue',
  'change',
  'clear',
  'focus',
  'blur',
  'visible-change',
]);

const innerValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  innerValue.value = val;
});

watch(innerValue, (val) => {
  emit('update:modelValue', val);
});

const allDisabled = computed(() => props.item?.disabled ?? false);

function onChange(val) {
  emit('change', val);
}

function onClear(event) {
  emit('clear', event);
}

function onFocus(event) {
  emit('focus', event);
}

function onBlur(event) {
  emit('blur', event);
}

function onVisibleChange(visible) {
  emit('visible-change', visible);
}
</script>

<template>
  <div 
    class="sunlight-cascader-wrapper"
    :style="[
      item?.customStyle,
      {
        '--cascader-wrapper-border-color': item?.wrapperStyle?.borderColor ?? '#c0c4cc',
        '--cascader-wrapper-border-radius': item?.wrapperStyle?.borderRadius ?? '4px',
        '--cascader-wrapper-bg-color': item?.wrapperStyle?.backgroundColor,
        '--cascader-wrapper-box-shadow': item?.wrapperStyle?.boxShadow,
        '--cascader-wrapper-focus-border-color': item?.wrapperStyle?.focusBorderColor ?? '#409eff',
        '--cascader-wrapper-focus-box-shadow': item?.wrapperStyle?.focusBoxShadow,
        '--cascader-wrapper-disabled-border-color': '#dcdfe6',  // 禁用边框色
        '--cascader-wrapper-disabled-bg-color': '#f5f7fa',     // 禁用背景色
        '--cascader-wrapper-disabled-color': '#c0c4cc'         // 禁用文字色
      }
    ]"
  >
    <el-cascader
      v-model="innerValue"
      :options="item?.options || []"
      :placeholder="item?.placeholder || '请选择'"
      :disabled="allDisabled"
      :clearable="item?.clearable !== false"
      :filterable="item?.filterable || false"
      :props="{multiple:item?.multiple || false}"
      :show-all-levels="item?.showAllLevels !== false"
      :collapse-tags="item?.collapseTags || false"
      :separator="item?.separator || '/'"
      :size="item?.size || 'default'"
      v-bind="item?.config || {}"
      v-on="item?.eventFunction || {}"
      @change="onChange"
      @clear="onClear"
      @focus="onFocus"
      @blur="onBlur"
      @visible-change="onVisibleChange"
    >
      <template v-for="slotName in item?.slotNames || []" #[slotName]="slotData">
        <slot :name="slotName" :slotData="slotData" />
      </template>
    </el-cascader>
  </div>
</template>

<style scoped>
.sunlight-cascader-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.sunlight-cascader-wrapper :deep(.el-cascader) {
  width: 100%;
}


.sunlight-cascader-wrapper :deep(.el-input__wrapper) {
  width: 100%    ;
  box-sizing: border-box    ;
  border: 1.5px solid var(--cascader-wrapper-border-color)    ;
  border-radius: var(--cascader-wrapper-border-radius)    ;
  background-color: var(--cascader-wrapper-bg-color, #ffffff)    ;
  box-shadow: var(--cascader-wrapper-box-shadow, none)    ;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)    ;
}


.sunlight-cascader-wrapper :deep(.el-input__wrapper:hover) {
  border-color: var(--cascader-wrapper-border-color)    ;
  box-shadow: none    ;
}


.sunlight-cascader-wrapper :deep(.el-input__wrapper.is-focus) {
  border-color: var(--cascader-wrapper-focus-border-color)    ;
  box-shadow: var(--cascader-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.15))    ;
}

.sunlight-cascader-wrapper :deep(.el-input__wrapper.is-disabled) {
  border-color: var(--cascader-wrapper-disabled-border-color)    ;
  background-color: var(--cascader-wrapper-disabled-bg-color)    ;
  color: var(--cascader-wrapper-disabled-color)    ;
  border-width: 1.5px    ;
  border-style: solid    ;
}

.sunlight-cascader-wrapper :deep(.el-input__wrapper.is-disabled:hover) {
  border-color: var(--cascader-wrapper-disabled-border-color)    ;
  background-color: var(--cascader-wrapper-disabled-bg-color)    ;
  color: var(--cascader-wrapper-disabled-color)    ;
}

.sunlight-cascader-wrapper :deep(.el-input__wrapper.is-disabled.is-focus) {
  border-color: var(--cascader-wrapper-disabled-border-color)    ;
  background-color: var(--cascader-wrapper-disabled-bg-color)    ;
  color: var(--cascader-wrapper-disabled-color)    ;
  box-shadow: none    ;
}

.sunlight-cascader-wrapper :deep(.el-input__wrapper.is-disabled .el-input__inner) {
  color: var(--cascader-wrapper-disabled-color)    ;
  background-color: transparent    ;
}

.sunlight-cascader-wrapper :deep(.el-input__wrapper.is-disabled .el-input__icon) {
  color: var(--cascader-wrapper-disabled-color)    ;
}
</style>



