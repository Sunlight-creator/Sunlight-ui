<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
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
    class="sunlight-radio-wrapper"
    :style="[
      item?.customStyle,
      {
        '--radio-wrapper-border-color': item?.wrapperStyle?.borderColor ?? '#c0c4cc',
        '--radio-wrapper-border-radius': item?.wrapperStyle?.borderRadius ?? '4px',
        '--radio-wrapper-bg-color': item?.wrapperStyle?.backgroundColor,
        '--radio-wrapper-box-shadow': item?.wrapperStyle?.boxShadow,
        '--radio-wrapper-focus-border-color': item?.wrapperStyle?.focusBorderColor ?? '#409eff',
        '--radio-wrapper-focus-box-shadow': item?.wrapperStyle?.focusBoxShadow,
        '--radio-wrapper-focus-box-shadow-color': item?.wrapperStyle?.focusBoxShadowColor
      }
    ]"
  >
    <el-radio-group
      v-if="isGroup"
      :disabled="allDisabled"
      v-model="value"
      v-bind="item?.config || {}"
      v-on="item?.eventFunction || {}"
    >
      <el-radio
        v-for="option in optionList"
        :key="option.key ?? option.value"
        :value="option.value"
        :disabled="option.disabled"
        v-bind="item?.optionConfig || {}"
      >
        {{ option.label }}
      </el-radio>

      <template v-for="slotName in item?.slotNames || []" #[slotName]="slotData">
        <slot :name="slotName" :slotData="slotData" />
      </template>
    </el-radio-group>

    <template v-else>
      <el-radio
        v-for="option in optionList"
        :key="option.key ?? option.value"
        :value="option.value"
        v-model="value"
        :disabled="allDisabled || option.disabled"
        v-bind="item?.config || {}"
        v-on="item?.eventFunction || {}"
      >
        {{ option.label }}
      </el-radio>
    </template>
  </div>
</template>

<style scoped>
/* 外层容器样式 */
.sunlight-radio-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.sunlight-radio-wrapper :deep(.el-radio__inner) {
  border-color: var(--radio-wrapper-focus-border-color)    ;
  border-radius: 50%;
}

/* Radio 自定义样式 */
.sunlight-radio-wrapper :deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: var(--radio-wrapper-focus-border-color)    ;
  border-color: var(--radio-wrapper-focus-border-color)    ;
}

.sunlight-radio-wrapper :deep(.el-radio__input.is-checked + .el-radio__label) {
  color: var(--radio-wrapper-focus-border-color)    ;
}

.sunlight-radio-wrapper :deep(.el-radio__input:hover:not(.is-checked) .el-radio__inner) {
  border-color: var(--radio-wrapper-border-color)    ;
}

.sunlight-radio-wrapper :deep(.el-radio__input.is-focus .el-radio__inner) {
  border-color: var(--radio-wrapper-focus-border-color)    ;
  box-shadow: 0 0 0 2px var(--radio-wrapper-focus-box-shadow-color, rgba(64, 158, 255, 0.1))    ;
}
</style>

