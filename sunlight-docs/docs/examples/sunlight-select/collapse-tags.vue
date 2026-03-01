<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";

// 折叠标签示例数据
const selectValue = ref<string[]>([]);
const options = [
  { label: "选项一", value: "option1" },
  { label: "选项二", value: "option2" },
  { label: "选项三", value: "option3" },
  { label: "选项四", value: "option4" },
  { label: "选项五", value: "option5" },
  { label: "选项六", value: "option6" },
  { label: "选项七", value: "option7" },
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <SunlightSelect
        v-model="selectValue"
        :item="{
          placeholder: '折叠标签示例...',
          clearable: true,
          options: options,
          config: {
            multiple: true,
            clearable: true,
            collapseTags: true,
            collapseTagsTooltip: true,
          },
        }"
      />
    </div>
    <div style="margin-top: 20px">
      <p>当前选择值：{{ selectValue || "暂无选择" }}</p>
    </div>
  </div>
</template>
