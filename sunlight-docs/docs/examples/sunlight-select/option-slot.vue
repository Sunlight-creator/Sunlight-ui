<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";

// 插槽自定义选项示例数据
const selectValue = ref("");
const options = [
  { label: '选项一', value: 'option1', disabled: false },
  { label: '选项二', value: 'option2', disabled: true },
  { label: '选项三', value: 'option3', disabled: false }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '插槽自定义选项...',
          clearable: true,
          options: options
        }" 
      >
        <template #option="{ option }">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <span>{{ option.label }}</span>
            <el-tag :type="option.disabled ? 'danger' : 'success'" size="small">
              {{ option.disabled ? '禁用' : '可用' }}
            </el-tag>
          </div>
        </template>
      </SunlightSelect>
    </div>
    <div style="margin-top: 20px;">
      <p>当前选择值：{{ selectValue || '暂无选择' }}</p>
    </div>
  </div>
</template>