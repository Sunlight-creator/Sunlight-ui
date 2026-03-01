<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";
import { ElMessage } from "element-plus";

const dateValue = ref("");

const handleVisibleChange = (val: boolean) => {
  ElMessage({
    message: 'visible-change事件已触发',
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
          placeholder: '下拉框显示/隐藏事件示例',
          type: 'date',
        }"
        @visible-change="handleVisibleChange"
      />
    </div>
  </div>
</template>