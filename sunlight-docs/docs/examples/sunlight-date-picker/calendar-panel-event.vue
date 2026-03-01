<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";
import { ElMessage } from "element-plus";

const dateValue = ref("");

const handleCalendarChange = (val: string) => {
  ElMessage({
    message: 'calendar-change事件已触发',
    type: 'success',
  });
};

const handlePanelChange = (value: string, mode: string, oldMode: string) => {
  ElMessage({
    message: 'panel-change事件已触发',
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
          placeholder: '日历与面板事件示例',
          type: 'date',
        }"
        @calendar-change="handleCalendarChange"
        @panel-change="handlePanelChange"
      />
    </div>
  </div>
</template>