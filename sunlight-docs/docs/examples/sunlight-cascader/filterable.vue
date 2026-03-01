<script setup lang="ts">
import { ref } from "vue";
import { SunlightCascader } from "sunlight-ui";

// 可查询功能示例数据
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
      }
    ]
  }
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SunlightCascader 
        v-model="cascaderValue" 
        :item="{
          placeholder: '请输入关键词搜索...',
          clearable: true,
          filterable: true,
          options: options,
          showAllLevels: true,
          wrapperStyle: {
            borderColor: '#c0c4cc',
            focusBorderColor: '#409eff'
          }
        }" 
      />
    </div>
    <div style="margin-top: 20px;">
      <p>当前选择值：{{ cascaderValue || '暂无选择' }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
