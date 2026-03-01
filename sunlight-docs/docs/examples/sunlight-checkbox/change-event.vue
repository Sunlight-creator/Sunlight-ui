<script setup lang="ts">
import { ref } from "vue";
import { SunlightCheckbox } from "sunlight-ui";
import { ElMessage } from "element-plus";

const checkboxValue = ref(["option1", "option3"]);
const options = [
  { label: "选项一", value: "option1" },
  { label: "选项二", value: "option2" },
  { label: "选项三", value: "option3" },
  { label: "选项四", value: "option4" },
];

const handleChange = (val: any) => {
  ElMessage({
    message: `选择变化: ${val}`,
    type: "success",
  });
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">change 事件：当选中状态变化时触发</div>
      <SunlightCheckbox
        v-model="checkboxValue"
        :item="{
          options: options,
          placeholder: '请选择选项',
        }"
        @change="handleChange"
      />
    </div>

    <div style="margin-top: 20px">
      <p>选中值：{{ checkboxValue || "暂无选择" }}</p>
    </div>
  </div>
</template>