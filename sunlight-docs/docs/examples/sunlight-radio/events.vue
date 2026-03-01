<script setup lang="ts">
import { ref } from "vue";
import { SunlightRadio } from "sunlight-ui";
import { ElMessage } from "element-plus";

const radioValue = ref("option1");
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
      <div style="margin-bottom: 8px">基础事件演示</div>
      <SunlightRadio
        v-model="radioValue"
        :item="{
          options: options,
          placeholder: '请选择选项',
        }"
        @change="handleChange"
      />
    </div>

    <div style="margin-top: 20px">
      <p>选中值：{{ radioValue || "暂无选择" }}</p>
    </div>
  </div>
</template>