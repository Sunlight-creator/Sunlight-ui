<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";
import { ElMessage } from "element-plus";

const selectValue = ref("");

const options = [
  { label: "选项1", value: "option1" },
  { label: "选项2", value: "option2" },
  { label: "选项3", value: "option3" },
  { label: "选项4", value: "option4" },
  { label: "选项5", value: "option5" },
];

const handleSearch = (val: string) => {
  ElMessage({
    message: 'search事件已触发',
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
          placeholder: '搜索事件示例',
          options: options,
          filterable: true,
        }"
        @search="handleSearch"
      />
    </div>
  </div>
</template>