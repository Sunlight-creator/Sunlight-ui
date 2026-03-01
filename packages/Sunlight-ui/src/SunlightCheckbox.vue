<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  item: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const options = ref([]);

async function loadOptions() {
  const optionsSource = props.item?.options || [];
  if (typeof optionsSource === 'function') {
    options.value = await optionsSource();
  } else {
    options.value = optionsSource;
  }
}

onMounted(() => {
  loadOptions();
});

watch(() => props.item?.options, () => {
  loadOptions();
}, { immediate: true });

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
    emit('change', val);
  },
});

const allDisabled = computed(() => props.item?.disabled ?? false);

const optionList = computed(() => options.value);

const isGroup = computed(() => props.item?.isGroup !== false);
</script>

<template>
  <div 
    class="sunlight-checkbox-wrapper"
    :style="[
      item?.customStyle,
      {
        '--checkbox-wrapper-border-color': item?.wrapperStyle?.borderColor ?? '#c0c4cc',
        '--checkbox-wrapper-border-radius': item?.wrapperStyle?.borderRadius ?? '4px',
        '--checkbox-wrapper-bg-color': item?.wrapperStyle?.backgroundColor,
        '--checkbox-wrapper-box-shadow': item?.wrapperStyle?.boxShadow,
        '--checkbox-wrapper-focus-border-color': item?.wrapperStyle?.focusBorderColor ?? '#409eff',
        '--checkbox-wrapper-focus-box-shadow': item?.wrapperStyle?.focusBoxShadow,
        '--checkbox-wrapper-focus-box-shadow-color': item?.wrapperStyle?.focusBoxShadowColor
      }
    ]"


  >
    <el-checkbox-group
      v-if="isGroup"
      :disabled="allDisabled"
      v-model="value"
      v-bind="item?.config || {}"
      v-on="item?.eventFunction || {}"
    >
      <el-checkbox
        v-for="option in optionList"
        :key="option.key ?? option.value"
        :label="option.value"
        :disabled="option.disabled"
        v-bind="item?.optionConfig || {}"
      >
        {{ option.label }}
      </el-checkbox>

      <template v-for="slotName in item?.slotNames || []" #[slotName]="slotData">
        <slot :name="slotName" :slotData="slotData" />
      </template>
    </el-checkbox-group>

    <template v-else>
      <el-checkbox
        v-for="option in optionList"
        :key="option.key ?? option.value"
        :label="option.value"
        v-model="value"
        :disabled="allDisabled || option.disabled"
        v-bind="item?.config || {}"
        v-on="item?.eventFunction || {}"
      >
        {{ option.label }}
      </el-checkbox>
    </template>
  </div>
</template>

<style scoped>
/* 外层容器样式 */
.sunlight-checkbox-wrapper {
  width: 100%;
  box-sizing: border-box;
}
.sunlight-checkbox-wrapper :deep(.el-checkbox__inner) {
  border-color: var(--checkbox-wrapper-focus-border-color)    ;
}

/* Checkbox 自定义样式 */
.sunlight-checkbox-wrapper :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--checkbox-wrapper-focus-border-color)    ;
  border-color: var(--checkbox-wrapper-focus-border-color)    ;
}

.sunlight-checkbox-wrapper :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: var(--checkbox-wrapper-focus-border-color)    ;
}

.sunlight-checkbox-wrapper :deep(.el-checkbox__input:hover:not(.is-checked) .el-checkbox__inner) {
  border-color: var(--checkbox-wrapper-border-color)    ;
}

.sunlight-checkbox-wrapper :deep(.el-checkbox__input.is-focus .el-checkbox__inner) {
  border-color: var(--checkbox-wrapper-focus-border-color)    ;
  box-shadow: 0 0 0 2px var(--checkbox-wrapper-focus-box-shadow-color, rgba(64, 158, 255, 0.1))    ;
}
</style>