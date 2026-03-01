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

const handleChange = (val: string) => {
  ElMessage({
    message: "change事件已触发",
    type: "success",
  });
};

const handleFocus = (e: Event) => {
  ElMessage({
    message: "focus事件已触发",
    type: "success",
  });
};

const handleBlur = (e: Event) => {
  ElMessage({
    message: "blur事件已触发",
    type: "success",
  });
};

const handleClear = (e: Event) => {
  ElMessage({
    message: "clear事件已触发",
    type: "success",
  });
};

const handleVisibleChange = (val: boolean) => {
  ElMessage({
    message: "visible-change事件已触发",
    type: "success",
  });
};

const handleSearch = (val: string) => {
  ElMessage({
    message: "search事件已触发",
    type: "success",
  });
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <SunlightSelect
        v-model="selectValue"
        :item="{
          placeholder: '基础事件处理示例',
          options: options,
          clearable: true,
          filterable: true,
        }"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="handleClear"
        @visible-change="handleVisibleChange"
        @search="handleSearch"
      />
    </div>
  </div>
</template>
