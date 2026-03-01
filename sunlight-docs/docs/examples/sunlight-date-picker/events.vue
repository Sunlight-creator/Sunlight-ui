<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";
import { ElMessage } from "element-plus";

const dateValue = ref("");

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

const handleCalendarChange = (val: string) => {
  ElMessage({
    message: "calendar-change事件已触发",
    type: "success",
  });
};

const handleVisibleChange = (val: boolean) => {
  ElMessage({
    message: "visible-change事件已触发",
    type: "success",
  });
};

const handlePanelChange = (value: string, mode: string, oldMode: string) => {
  ElMessage({
    message: "panel-change事件已触发",
    type: "success",
  });
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <SunlightDatePicker
        v-model="dateValue"
        :item="{
          placeholder: '基础事件处理示例',
          type: 'date',
        }"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @calendar-change="handleCalendarChange"
        @visible-change="handleVisibleChange"
        @panel-change="handlePanelChange"
      />
    </div>
  </div>
</template>
