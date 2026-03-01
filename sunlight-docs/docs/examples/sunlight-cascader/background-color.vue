<script setup lang="ts">
import { ref } from "vue";
import { SunlightCascader } from "sunlight-ui";

const cascaderValue = ref("");
const options = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          { value: 'yizhi', label: '一致' },
          { value: 'fankui', label: '反馈' },
          { value: 'xiaolu', label: '效率' }
        ]
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          { value: 'cexiangdaohang', label: '侧向导航' },
          { value: 'dingbudaohang', label: '顶部导航' }
        ]
      }
    ]
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          { value: 'layout', label: 'Layout 布局' },
          { value: 'color', label: 'Color 色彩' }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          { value: 'radio', label: 'Radio 单选框' },
          { value: 'checkbox', label: 'Checkbox 多选框' }
        ]
      }
    ]
  }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">默认背景色</div>
      <SunlightCascader
        v-model="cascaderValue"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">浅色背景</div>
      <SunlightCascader
        v-model="cascaderValue"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          wrapperStyle: {
            backgroundColor: '#f5f7fa',
            borderColor: '#c0c4cc'
          }
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">彩色背景</div>
      <SunlightCascader
        v-model="cascaderValue"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          wrapperStyle: {
            backgroundColor: '#ecf5ff',
            borderColor: '#409eff',
            focusBorderColor: '#66b1ff'
          }
        }"
        theme="primary"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">深色背景</div>
      <SunlightCascader
        v-model="cascaderValue"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          wrapperStyle: {
            backgroundColor: '#f0f9eb',
            borderColor: '#67c23a',
            focusBorderColor: '#85ce61'
          }
        }"
        theme="success"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">自定义背景色</div>
      <SunlightCascader
        v-model="cascaderValue"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          wrapperStyle: {
            borderColor: '#e6a23c',
            backgroundColor: '#fdf6ec',
            focusBorderColor: '#e6a23c',
            focusBoxShadow: '0 0 0 3px rgba(230, 162, 60, 0.25)'
          }
        }"
        theme="warning"
      />
    </div>
  </div>
</template>