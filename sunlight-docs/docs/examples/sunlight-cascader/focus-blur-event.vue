<script setup lang="ts">
import { ref } from "vue";
import { SunlightCascader } from "sunlight-ui";
import { ElMessage } from "element-plus";

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

const handleFocus = (event: Event) => {
  ElMessage({
    message: '级联选择器获得焦点',
    type: 'info',
  });
};

const handleBlur = (event: Event) => {
  ElMessage({
    message: '级联选择器失去焦点',
    type: 'info',
  });
};
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <div style="margin-bottom: 8px">focus & blur 事件：点击输入框获得焦点，点击其他地方失去焦点</div>
      <SunlightCascader
        v-model="cascaderValue"
        :item="{
          placeholder: '请选择内容...',
          clearable: true,
          options: options,
          showAllLevels: true
        }"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>

    <div style="margin-top: 20px">
      <p>选择的值: {{ cascaderValue || "暂无选择" }}</p>
    </div>
  </div>
</template>