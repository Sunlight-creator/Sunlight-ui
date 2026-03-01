<script setup lang="ts">
import { ref } from "vue";
import { SunlightSelect } from "sunlight-ui";

// 可查询的多选示例数据
const selectValue = ref<string[]>([]);
const options = [
  { label: "北京", value: "beijing" },
  { label: "上海", value: "shanghai" },
  { label: "广州", value: "guangzhou" },
  { label: "深圳", value: "shenzhen" },
  { label: "杭州", value: "hangzhou" },
  { label: "南京", value: "nanjing" },
  { label: "成都", value: "chengdu" },
  { label: "武汉", value: "wuhan" },
  { label: "西安", value: "xian" },
  { label: "重庆", value: "chongqing" },
];
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <SunlightSelect
        v-model="selectValue"
        :item="{
          placeholder: '可查询的多选示例...',
          clearable: true,
          filterable: true,
          options: options,
          config: {
            multiple: true,
            clearable: true,
          },
        }"
      />
    </div>
    <div style="margin-top: 20px">
      <p>当前选择值：{{ selectValue || "暂无选择" }}</p>
    </div>
  </div>
</template>
