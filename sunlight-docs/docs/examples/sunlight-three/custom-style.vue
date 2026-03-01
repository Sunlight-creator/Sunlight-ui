<script setup lang="ts">
import { ref } from "vue";
import { SunlightThree } from "sunlight-ui";

const selectedValue = ref("");
const treeData = ref([
  {
    id: "1",
    label: "一级 1",
    children: [
      {
        id: "1-1",
        label: "二级 1-1",
        children: [
          { id: "1-1-1", label: "三级 1-1-1" },
          { id: "1-1-2", label: "三级 1-1-2" }
        ]
      },
      {
        id: "1-2",
        label: "二级 1-2",
        children: [
          { id: "1-2-1", label: "三级 1-2-1" },
          { id: "1-2-2", label: "三级 1-2-2" }
        ]
      }
    ]
  },
  {
    id: "2",
    label: "一级 2",
    children: [
      {
        id: "2-1",
        label: "二级 2-1",
        children: [
          { id: "2-1-1", label: "三级 2-1-1" },
          { id: "2-1-2", label: "三级 2-1-2" }
        ]
      },
      {
        id: "2-2",
        label: "二级 2-2",
        children: [
          { id: "2-2-1", label: "三级 2-2-1" },
          { id: "2-2-2", label: "三级 2-2-2" }
        ]
      }
    ]
  }
]);
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">自定义边框颜色</div>
      <SunlightThree 
        :data="treeData" 
        :defaultValue="selectedValue" 
        :wrapperStyle="{
          borderColor: '#909399',
          borderRadius: '8px',
          focusBorderColor: '#67c23a',
          focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)',
          selectedBgColor: '#67c23a',
          selectedTextColor: '#ffffff'
        }" 
        @change="(val) => selectedValue = val"
      />
    </div>
    
    <div style="margin-top: 20px;">
      <p>选中值：{{ selectedValue || '暂无选择' }}</p>
    </div>
  </div>
</template>