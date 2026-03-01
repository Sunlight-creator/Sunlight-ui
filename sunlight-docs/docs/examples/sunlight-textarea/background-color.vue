<script setup lang="ts">
import { ref } from "vue";
import { SunlightTextarea } from "sunlight-ui";

const inputValue = ref("");
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认背景色</div>
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
      <div style="margin-bottom: 8px">浅色背景</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          wrapperStyle: {
            backgroundColor: '#f5f7fa',
            borderColor: '#c0c4cc',
          },
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">彩色背景</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          wrapperStyle: {
            backgroundColor: '#ecf5ff',
            borderColor: '#409eff',
            focusBorderColor: '#66b1ff',
          },
        }"
        theme="primary"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">深色背景</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          wrapperStyle: {
            backgroundColor: '#f0f9eb',
            borderColor: '#67c23a',
            focusBorderColor: '#85ce61',
          },
        }"
        theme="success"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">自定义背景色</div>
      <SunlightTextarea
        v-model="inputValue"
        :item="{
          placeholder: '请输入内容...',
          clearable: true,
          rows: 4,
          wrapperStyle: {
            borderColor: '#e6a23c',
            backgroundColor: '#fdf6ec',
            focusBorderColor: '#e6a23c',
            focusBoxShadow: '0 0 0 3px rgba(230, 162, 60, 0.25)',
          },
        }"
        theme="warning"
      />
    </div>
  </div>
</template>