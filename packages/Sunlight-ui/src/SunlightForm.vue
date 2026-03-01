<template>
  <div class="pro-form-wrapper">
    <component
      :is="'el-form'"
      ref="proFormRef"
      :model="model"
      :rules="rules"
      v-bind="formOptions"
      @submit.native.prevent
    >
      <el-row :gutter="20">
        <el-col
          v-for="item in columns"
          :key="item.prop"
          :span="item.span || 24"
          :offset="item.offset || 0"
        >
          <component :is="'el-form-item'" v-bind="item.formItem" :prop="item.prop" :label="item.label" :rules="item.rules || []">
            <!-- 图片上传组件使用 v-model:fileList -->
            <component
              v-if="item.type === 'images'"
              :is="getComponent(item.type)"
              v-model:file-list="model[item.prop]"
              v-bind="getItemConfig(item)"
              v-on="getListeners(item)"
            >
              <template v-for="slotName in item.slotNames || []" #[slotName]="slotData">
                <slot :name="`${item.prop}-${slotName}`" :slotData="slotData" />
              </template>
            </component>
            <!-- 其他组件使用 v-model -->
              
            <component
              v-else
              :is="getComponent(item.type)"
              v-model="model[item.prop]"
              :item="getItemConfig(item)"
              v-on="getListeners(item)"
            >
              <template v-for="slotName in item.slotNames || []" #[slotName]="slotData">
                <slot :name="`${item.prop}-${slotName}`" :slotData="slotData" />
              </template>
            </component>
          </component>
        </el-col>
      </el-row>

      <component :is="'el-form-item'">
        <div :style="operationSlotStyle">
          <slot name="operation"></slot>
        </div>
      </component>
    </component>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, nextTick, computed } from 'vue';
import SunlightInput from './SunlightInput.vue';
import SunlightTextarea from './SunlightTextarea.vue';
import SunlightSelect from './SunlightSelect.vue';
import SunlightCascader from './SunlightCascader.vue';
import SunlightRadio from './SunlightRadio.vue';
import SunlightCheckbox from './SunlightCheckbox.vue';
import SunlightDatePicker from './SunlightDatePicker.vue';
import SunlightImages from './SunlightImages.vue';
import SunlightImage from './SunlightImage.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  formOptions: {
    type: Object,
    default: () => ({
      labelWidth: '100px',
      size: 'default',
      inline: false,
      disabled: false,
      labelSuffix: ':',
    }),
  },
  columns: {
    type: Array,
    required: true,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue', 'submit', 'reset']);

const proFormRef = ref();

// 初始化 model，确保所有 columns 中的 prop 都有初始值
function initModel() {
  const initialModel = { ...props.modelValue };
  props.columns.forEach((item) => {
    if (!(item.prop in initialModel) || initialModel[item.prop] === undefined) {
      // 根据类型设置默认值
      const isMultiple = item.type === 'checkbox' || 
                        item.type === 'images' ||
                        (item.type === 'select' && (item.multiple || item.config?.multiple));
      if (isMultiple) {
        initialModel[item.prop] = [];
      } else if (item.type === 'textarea' || item.type === 'input') {
        initialModel[item.prop] = '';
      } else {
        initialModel[item.prop] = null;
      }
    }
  });
  return initialModel;
}

const model = reactive(initModel());

// 计算操作按钮槽位的样式
const operationSlotStyle = computed(() => {
  const align = props.formOptions?.buttonAlign || 'left';
  return {
    display: 'flex',
    justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end',
    marginTop: '20px',
    width: '100%' // 确保表单项占据整个宽度，使对齐生效
  };
});

// 防止循环更新的标志
let isUpdatingFromProps = false;
let isUpdatingFromModel = false;

// 监听 props.modelValue 的变化，同步到内部 model
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && !isUpdatingFromProps && !isUpdatingFromModel) {
      isUpdatingFromProps = true;
      // 确保所有字段都存在
      props.columns.forEach((item) => {
        if (!(item.prop in newVal) || newVal[item.prop] === undefined) {
          const isMultiple = item.type === 'checkbox' || 
                            item.type === 'images' ||
                            (item.type === 'select' && (item.multiple || item.config?.multiple));
          if (isMultiple) {
            newVal[item.prop] = [];
          } else if (item.type === 'textarea' || item.type === 'input') {
            newVal[item.prop] = '';
          } else {
            newVal[item.prop] = null;
          }
        }
      });
      // 逐个更新属性，确保响应式
      props.columns.forEach((item) => {
        if (newVal[item.prop] !== undefined) {
          model[item.prop] = newVal[item.prop];
        }
      });
      nextTick(() => {
        isUpdatingFromProps = false;
      });
    }
  },
  { deep: true, immediate: true }
);

// 更新函数，统一处理 model 变化
function updateModelValue() {
  if (!isUpdatingFromProps && !isUpdatingFromModel) {
    isUpdatingFromModel = true;
    // 构建包含所有字段的对象
    const result = {};
    props.columns.forEach((col) => {
      result[col.prop] = model[col.prop];
    });
    emit('update:modelValue', { ...result });
    nextTick(() => {
      isUpdatingFromModel = false;
    });
  }
}

const asyncOptionsCache = reactive({});

async function loadAsyncOptions(item) {
  if (typeof item.options === 'function') {
    const data = await item.options();
    asyncOptionsCache[item.prop] = data;
  }
}

onMounted(() => {
  // 为每个字段设置 watch，确保能捕获所有变化
  props.columns.forEach((item) => {
    watch(
      () => model[item.prop],
      () => {
        updateModelValue();
      },
      { deep: true, immediate: false }
    );
    
    // 加载异步选项
    if (typeof item.options === 'function') {
      loadAsyncOptions(item);
    }
  });
});

function getOptions(item) {
  if (typeof item.options === 'function') {
    return asyncOptionsCache[item.prop] || [];
  }
  return item.options || [];
}

function getComponent(type) {
  const componentMap = {
    input: SunlightInput,
    textarea: SunlightTextarea,
    select: SunlightSelect,
    cascader: SunlightCascader,
    radio: SunlightRadio,
    checkbox: SunlightCheckbox,
    'date-picker': SunlightDatePicker,
    'datetime-picker': SunlightDatePicker,
    images: SunlightImages,
    image: SunlightImage,
  };
  return componentMap[type] || SunlightInput;
}

function getItemConfig(item) {
  const baseConfig = {
    label: item.label,
    disabled: item.disabled || props.formOptions?.disabled || false,
    config: item.config || {},
    eventFunction: item.eventFunction || {},
    slotNames: item.slotNames || [],
    wrapperStyle: item.wrapperStyle || {}, // 传递 wrapperStyle 到子组件
    customStyle: item.customStyle, // 传递 customStyle 到子组件
    customClass: item.customClass, // 传递 customClass 到子组件
  };

  // 根据不同类型设置特定配置
  switch (item.type) {
    case 'input':
      return {
        ...baseConfig,
        placeholder: item.placeholder || `请输入${item.label}`,
        clearable: item.clearable !== false,
        type: item.inputType || 'text',
        ...item.attrs,
      };

    case 'textarea':
      return {
        ...baseConfig,
        placeholder: item.placeholder || `请输入${item.label}`,
        clearable: item.clearable !== false,
        showWordLimit: item.showWordLimit !== false,
        config: {
          rows: item.rows || 3,
          maxlength: item.maxlength || 150,
          ...item.config,
        },
      };

    case 'select':
      return {
        ...baseConfig,
        placeholder: item.placeholder || `请选择${item.label}`,
        options: getOptions(item),
        setValue: item.setValue || 'value',
        setLabel: item.setLabel || 'label',
        config: {
          filterable: item.filterable || false,
          multiple: item.multiple || item.config?.multiple || false,
          ...item.config,
        },
      };

    case 'cascader':
      return {
        ...baseConfig,
        placeholder: item.placeholder || `请选择${item.label}`,
        options: getOptions(item),
        config: {
          filterable: item.filterable || false,
          multiple: item.multiple || false,
          ...item.config,
        },
      };

    case 'radio':
      return {
        ...baseConfig,
        options: getOptions(item),
        isGroup: item.isGroup !== false,
        config: {
          size: item.size || 'default',
          ...item.config,
        },
        optionConfig: item.optionConfig || {},
      };

    case 'checkbox':
      return {
        ...baseConfig,
        options: getOptions(item),
        isGroup: item.isGroup !== false,
        config: {
          size: item.size || 'default',
          ...item.config,
        },
        optionConfig: item.optionConfig || {},
      };

    case 'date-picker':
    case 'datetime-picker':
      return {
        ...baseConfig,
        type: item.type === 'datetime-picker' ? 'datetime' : 'date',
        valueFormat: item.valueFormat || (item.type === 'datetime-picker' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'),
        placeholder: item.placeholder || `请选择${item.label}`,
        config: {
          clearable: item.clearable !== false,
          ...item.config,
        },
      };

    case 'images':
      return {
        ...baseConfig, // 包含 wrapperStyle、customStyle、customClass
        api: item.api || (() => Promise.resolve({ fileUrl: '' })),
        drag: item.drag !== false,
        disabled: item.disabled || props.formOptions?.disabled || false,
        limit: item.limit || 5,
        multiple: item.multiple !== false,
        fileSize: item.fileSize || 5,
        fileType: item.fileType || ['image/jpeg', 'image/png', 'image/gif'],
        height: item.height || '150px',
        width: item.width || '150px',
        borderRadius: item.borderRadius || '8px',
        ...item.attrs,
      };
    case 'image':
      return {
        ...baseConfig, // 包含 wrapperStyle、customStyle、customClass
        api: item.api || (() => Promise.resolve({ fileUrl: '' })),
        drag: item.drag !== false,
        disabled: item.disabled || props.formOptions?.disabled || false,
        limit: item.limit || 5,
        multiple: item.multiple !== false,
        fileSize: item.fileSize || 5,
        fileType: item.fileType || ['image/jpeg', 'image/png', 'image/gif'],
        height: item.height || '150px',
        width: item.width || '150px',
        borderRadius: item.borderRadius || '8px',
        ...item.attrs,
      };
    default:
      return baseConfig;
  }
}

function getListeners(item) {
  return item.listeners || {};
}

function validate() {
  return new Promise((resolve) => {
    proFormRef.value.validate((valid) => {
      if (valid) {
        emit('submit', { ...model });
      }
      resolve(valid);
    });
  });
}

function reset() {
  proFormRef.value?.resetFields();
  // 根据 columns 的类型重新初始化默认值，而不是使用 props.modelValue 的当前值
  props.columns.forEach((item) => {
    const isMultiple = item.type === 'checkbox' || 
                      item.type === 'images' ||
                      (item.type === 'select' && (item.multiple || item.config?.multiple));
    if (isMultiple) {
      model[item.prop] = [];
    } else if (item.type === 'textarea' || item.type === 'input') {
      model[item.prop] = '';
    } else {
      model[item.prop] = null;
    }
  });
  // 触发更新，同步到父组件
  updateModelValue();
}

defineExpose({
  validate,
  reset,
  model,
  proFormRef,
});
</script>

<style scoped>
.pro-form-wrapper {
  width: 100%;
  margin-top: 20px;
}
</style>


