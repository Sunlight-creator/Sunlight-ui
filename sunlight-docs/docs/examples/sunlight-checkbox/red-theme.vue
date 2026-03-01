<script setup lang="ts">
import { ref } from "vue";
import { SunlightCheckbox } from "sunlight-ui";

const checkboxValue = ref(["option1", "option3"]);
const options = [
  { label: "选项一", value: "option1" },
  { label: "选项二", value: "option2" },
  { label: "选项三", value: "option3" },
  { label: "选项四", value: "option4" },
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <SunlightCheckbox
        v-model="checkboxValue"
        :item="{
          options: options,
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#f56c6c',
            focusBoxShadowColor: 'rgba(245, 108, 108, 0.1)',
          },
        }"
      />
    </div>

    <div style="margin-top: 20px">
      <p>选中值：{{ checkboxValue || "暂无选择" }}</p>
    </div>
  </div>
</template>