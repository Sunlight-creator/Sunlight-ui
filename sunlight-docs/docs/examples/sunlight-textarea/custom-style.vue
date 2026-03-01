<script setup lang="ts">
import { ref } from "vue";
import { SunlightTextarea } from "sunlight-ui";

const inputValue = ref("");
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认边框颜色</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
        }"
      />
    </div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">自定绿色边框颜色</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          wrapperStyle: {
            borderColor: '#67c23a',
            focusBorderColor: '#67c23a',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">自定蓝色边框颜色</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          wrapperStyle: {
            borderColor: '#409eff',
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">自定橙色边框颜色</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          wrapperStyle: {
            borderColor: '#e6a23c',
            focusBorderColor: '#e6a23c',
            focusBoxShadow: '0 0 0 3px rgba(230, 162, 60, 0.25)',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">自定红色边框颜色</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          wrapperStyle: {
            borderColor: '#f56c6c',
            focusBorderColor: '#f56c6c',
            focusBoxShadow: '0 0 0 3px rgba(245, 108, 108, 0.25)',
          },
        }"
      />
    </div>

    <div style="margin-top: 20px">
      <p>输入的值: {{ inputValue || "暂无输入" }}</p>
    </div>
  </div>
</template>
