<script setup lang="ts">
import { ref } from "vue";
import { SunlightDatePicker } from "sunlight-ui";
import { ElMessage } from "element-plus";

const dateValue = ref("");

const handleChange = (val: string) => {
  ElMessage({
    message: 'change事件已触发',
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
          placeholder: '选择变化事件示例',
          type: 'date',
        }"
        @change="handleChange"
      />
    </div>
  </div>
</template>