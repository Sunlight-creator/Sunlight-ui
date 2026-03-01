<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";

// 自定义模板示例数据
const selectValue = ref("");
const options = [
  { label: '选项一', value: 'option1', icon: 'User' },
  { label: '选项二', value: 'option2', icon: 'Star' },
  { label: '选项三', value: 'option3', icon: 'Goods' }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SunlightSelect 
        v-model="selectValue" 
        :item="{
          placeholder: '自定义模板示例...',
          clearable: true,
          options: options
        }" 
      >
        <template #option="{ option }">
          <div style="display: flex; align-items: center;">
            <el-icon style="margin-right: 8px;">
              <component :is="option.icon" />
            </el-icon>
            {{ option.label }}
          </div>
        </template>
      </SunlightSelect>
    </div>
    <div style="margin-top: 20px;">
      <p>当前选择值：{{ selectValue || '暂无选择' }}</p>
    </div>
  </div>
</template>