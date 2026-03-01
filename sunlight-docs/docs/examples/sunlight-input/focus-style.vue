<script setup lang="ts">
import { ref } from "vue";
import { SunlightInput } from "sunlight-ui";

const inputValue = ref("");
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认聚焦样式</div>
      <SunlightInput
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">绿色聚焦样式</div>
      <SunlightInput
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          wrapperStyle: {
            focusBorderColor: '#67c23a',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">蓝色聚焦样式</div>
      <SunlightInput
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          wrapperStyle: {
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)',
          },
        }"
        theme="primary"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">红色聚焦样式</div>
      <SunlightInput
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          wrapperStyle: {
            focusBorderColor: '#f56c6c',
            focusBoxShadow: '0 0 0 3px rgba(245, 108, 108, 0.25)',
          },
        }"
        theme="danger"
      />
    </div>
  </div>
</template>
