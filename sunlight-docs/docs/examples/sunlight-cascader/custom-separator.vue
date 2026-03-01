<script setup lang="ts">
import { ref } from "vue";
import { SunlightCascader } from "sunlight-ui";

// 自定义分隔符示例数据
const cascaderValue1 = ref("");
const cascaderValue2 = ref("");
const cascaderValue3 = ref("");
const cascaderValue4 = ref("");
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
      <div style="margin-bottom: 8px">默认分隔符 (/)：指南/设计原则/一致</div>
      <SunlightCascader
        v-model="cascaderValue1"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          separator: '/',
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">竖线分隔符 (|)：指南|设计原则|一致</div>
      <SunlightCascader
        v-model="cascaderValue2"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          separator: '|',
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">箭头分隔符 (→)：指南→设计原则→一致</div>
      <SunlightCascader
        v-model="cascaderValue3"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          separator: '→',
        }"
      />
    </div>

    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">点分隔符 (.)：指南.设计原则.一致</div>
      <SunlightCascader
        v-model="cascaderValue4"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true,
          separator: '.',
        }"
      />
    </div>
  </div>
</template>