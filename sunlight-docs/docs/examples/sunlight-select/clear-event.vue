<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";
import { ElMessage } from "element-plus";

const selectValue = ref("");

const options = [
  { label: "选项1", value: "option1" },
  { label: "选项2", value: "option2" },
  { label: "选项3", value: "option3" },
];

const handleClear = (e: Event) => {
  ElMessage({
    message: 'clear事件已触发',
    type: 'success',
  });
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SunlightSelect
        v-model="selectValue"
        :item="{
          placeholder: '清除事件示例',
          options: options,
          clearable: true,
        }"
        @clear="handleClear"
      />
    </div>
  </div>
</template>