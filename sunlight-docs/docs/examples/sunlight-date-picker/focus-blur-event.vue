<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";
import { ElMessage } from "element-plus";

const dateValue = ref("");

const handleFocus = (e: Event) => {
  ElMessage({
    message: 'focus事件已触发',
    type: 'success',
  });
};

const handleBlur = (e: Event) => {
  ElMessage({
    message: 'blur事件已触发',
    type: 'success',
  });
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '焦点与失焦事件示例',
          type: 'date',
        }"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>