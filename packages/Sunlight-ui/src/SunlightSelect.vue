<script setup>
import { ref, computed, watch, useAttrs } from 'vue';

/**
 * SunlightSelect 组件 - 封装了 Element Plus 的 Select 组件，提供了更灵活的配置和样式定制能力
 * @component SunlightSelect
 * @author Sunlight UI Team
 * @version 1.0.0
 */

/**
 * 组件属性定义
 */
const props = defineProps({
  /**
   * 双向绑定的值
   * @type {String|Number|Array} - 单选时为 String/Number，多选时为 Array
   * @default null
   */
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
  /**
   * 组件配置项，包含所有 Select 相关的配置
   * @type {Object}
   * @default {}
   */
  item: {
    type: Object,
    default: () => ({}),
  },
});

/**
 * 组件事件定义
 */
const emit = defineEmits([
  /**
   * 值更新事件（v-model）
   * @param {String|Number|Array} val - 更新后的值
   */
  'update:modelValue',
  /**
   * 选择变化事件
   * @param {String|Number|Array} val - 选择后的值
   */
  'change',
  /**
   * 清空事件
   * @param {Event} event - 清空事件对象
   */
  'clear',
  /**
   * 聚焦事件
   * @param {Event} event - 聚焦事件对象
   */
  'focus',
  /**
   * 失焦事件
   * @param {Event} event - 失焦事件对象
   */
  'blur',
  /**
   * 下拉框显示/隐藏切换事件
   * @param {Boolean} val - 下拉框是否可见
   */
  'visible-change',
  /**
   * 搜索事件（仅在 filterable 为 true 时触发）
   * @param {String} val - 搜索关键词
   */
  'search',
]);

// 获取所有属性和事件
const attrs = useAttrs();

// 内部值状态管理
const value = ref(props.modelValue);
const filterValue = ref('');

// 监听外部值变化，同步到内部状态
watch(() => props.modelValue, (val) => {
  value.value = val;
});

// 监听内部值变化，同步到外部
watch(value, (val) => {
  emit('update:modelValue', val);
});

// 计算组件是否禁用
const allDisabled = computed(() => props.item?.disabled ?? false);

// 监听搜索事件，更新过滤值
watch(filterValue, (val) => {
  emit('search', val);
});

/**
 * 获取选项列表
 * @returns {Array} 选项数组
 */
function getOptions() {
  const options = props.item?.options;
  // 确保返回的是数组
  const allOptions = Array.isArray(options) ? options : [];
  
  // 如果不是可查询状态或者没有过滤值，直接返回所有选项
  if (!props.item?.filterable || !filterValue.value) {
    return allOptions;
  }
  
  // 获取label属性名
  const labelProp = props.item?.setLabel ?? 'label';
  // 转换为小写，进行不区分大小写的过滤
  const filterText = filterValue.value.toLowerCase();
  
  // 过滤选项
  return allOptions.filter(option => {
    const label = option[labelProp]?.toString().toLowerCase();
    return label.includes(filterText);
  });
}

/**
 * 根据value查找对应的option对象
 * @param {String|Number|Object} value - 选项值
 * @returns {Object} 完整的option对象，始终包含label和value属性
 */
function getOptionByValue(value) {
  // 使用item.setValue指定的属性名，默认为'value'
  const valueProp = props.item?.setValue ?? 'value';
  // 使用item.setLabel指定的属性名，默认为'label'
  const labelProp = props.item?.setLabel ?? 'label';
  
  // 如果value是undefined或null，直接返回默认值
  if (value === undefined || value === null) {
    return { value: null, label: '' };
  }
  
  // 如果value已经是一个完整的option对象（包含label属性），直接返回
  if (typeof value === 'object') {
    if (value[labelProp] !== undefined) {
      // 确保返回的对象始终有label和value属性
      return {
        value: value[valueProp] ?? value.value ?? value,
        label: value[labelProp]
      };
    }
    // 如果是对象但只有value字段，提取值
    if (value[valueProp] !== undefined) {
      value = value[valueProp];
    } else if (value.value !== undefined) {
      value = value.value;
    }
  }
  
  const options = getOptions();
  
  // 查找选项
  if (options.length) {
    const option = options.find(opt => opt[valueProp] === value);
    if (option) {
      return {
        value: option[valueProp],
        label: option[labelProp]
      };
    }
  }
  
  // 如果找不到选项，返回默认值
  // 避免将对象直接转换为字符串导致的[object Object]
  if (typeof value === 'object') {
    return { value: null, label: '' };
  }
  return { value, label: String(value) };
}



/**
 * 处理选择变化事件
 * @param {String|Number|Array} val - 选择后的值
 */
function handleChange(val) {
  emit('change', val);
}

/**
 * 处理清空事件
 * @param {Event} event - 清空事件对象
 */
function handleClear(event) {
  emit('clear', event);
}

/**
 * 处理聚焦事件
 * @param {Event} event - 聚焦事件对象
 */
function handleFocus(event) {
  emit('focus', event);
}

/**
 * 处理失焦事件
 * @param {Event} event - 失焦事件对象
 */
function handleBlur(event) {
  emit('blur', event);
}

/**
 * 处理下拉框显示/隐藏切换事件
 * @param {Boolean} val - 下拉框是否可见
 */
function handleVisibleChange(val) {
  emit('visible-change', val);
}

/**
 * 处理搜索事件
 * @param {String} val - 搜索关键词
 */
function handleSearch(val) {
  emit('search', val);
}
</script>

<template>
  <div 
    class="sunlight-select-wrapper"
    :style="[
      item?.customStyle,
      {
        '--select-wrapper-border-color': item?.wrapperStyle?.borderColor ?? 'var(--sunlight-select-border, #c0c4cc)',
        '--select-wrapper-border-radius': item?.wrapperStyle?.borderRadius ?? '4px',
        '--select-wrapper-bg-color': item?.wrapperStyle?.backgroundColor,
        '--select-wrapper-box-shadow': item?.wrapperStyle?.boxShadow,
        '--select-wrapper-focus-border-color': item?.wrapperStyle?.focusBorderColor ?? 'var(--sunlight-select-focus-border, #409eff)',
        '--select-wrapper-focus-box-shadow': item?.wrapperStyle?.focusBoxShadow ?? 'var(--sunlight-input-focus-shadow)'
      }
    ]"
  >
    <el-select
      :clearable="item?.clearable !== false"
      :disabled="allDisabled"
      :filterable="item?.filterable"
      :filter-value="filterValue"
      :filter-method="val => filterValue = val"
      :placeholder="item?.placeholder || ('请选择' + (item?.label || ''))"
      v-model="value"
      v-bind="item?.config || {}"
      v-on="{...attrs.on, ...item?.eventFunction || {}}"
      @change="handleChange"
      @clear="handleClear"
      @focus="handleFocus"
      @blur="handleBlur"
      @visible-change="handleVisibleChange"
      @search="handleSearch"
    >
      <!-- 支持自定义前缀模板 -->
      <template #prefix>
        <slot name="prefix" />
        <template v-if="item?.prefix">
          {{ item?.prefix }}
        </template>
      </template>
      
      <!-- 支持自定义后缀模板 -->
      <template #suffix>
        <slot name="suffix" />
        <template v-if="item?.suffix">
          {{ item?.suffix }}
        </template>
      </template>
      
      <!-- 支持自定义清空按钮模板 -->
      <template #clear-icon>
        <slot name="clear-icon" />
      </template>
      

      
      <!-- 默认插槽 - 允许用户自定义选项 -->
      <slot>
        <!-- 默认选项模板 -->
        <el-option
          v-for="option in getOptions()"
          :key="option.key ?? option[item?.setValue ?? 'value']"
          :value="option[item?.setValue ?? 'value']"
          :label="option[item?.setLabel ?? 'label']"
          :disabled="option.disabled"
          v-on="item?.optionFunction || {}"
        >
          <!-- 支持自定义选项内容 -->
          <slot name="option" :option="option">
            <template v-if="item?.optionTemplate">
              <component :is="item?.optionTemplate" :option="option" />
            </template>
            <template v-else>
              {{ option[item?.setLabel ?? 'label'] }}
            </template>
          </slot>
        </el-option>
      </slot>
      
      <!-- 支持通过slotNames动态传递的其他插槽 -->
      <template v-for="slotName in item?.slotNames || []" #[slotName]="slotData">
        <slot :name="slotName" :slotData="slotData" />
      </template>
    </el-select>
  </div>
</template>

<style scoped>
/* 外层容器样式 - 确保宽度固定 */
.sunlight-select-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.sunlight-select-wrapper :deep(.el-select) {
  width: 100%;
}

.sunlight-select-wrapper :deep(.el-select__wrapper) {
  width: 100%;
  box-sizing: border-box;
  border-color: var(--select-wrapper-border-color)    ;
  border-radius: var(--select-wrapper-border-radius)    ;
  background-color: var(--select-wrapper-bg-color, inherit)    ;
  box-shadow: var(--select-wrapper-box-shadow, inherit)    ;
  border-width: 1.5px;
  border-style: solid;
}

.sunlight-select-wrapper :deep(.el-select__wrapper:hover) {
  border-color: var(--select-wrapper-border-color)    ;
}

.sunlight-select-wrapper :deep(.el-select__wrapper.is-focused) {
  border-color: var(--select-wrapper-focus-border-color)    ;
  box-shadow: var(--select-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.15))    ;
}
  /* 全局样式 - 确保下拉选项内容能正确布局 */
  .el-select-dropdown__item {
    display: flex    ;
    align-items: center    ;
    padding: 8px 12px    ;
  }

  /* 确保自定义选项内容能正确显示 */
  .el-select-dropdown__item .custom-option {
    display: flex;
    align-items: center;
    width: 100%;
  }
</style>

