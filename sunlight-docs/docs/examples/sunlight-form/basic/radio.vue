<template>
  <div class="demo-container">
    <h3>单选框</h3>
    <SunlightForm v-model="formData" :columns="columns">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightForm } from "sunlight-ui";

// 表单数据
const formData = ref({
  horizontal: "",
  vertical: "",
  disabled: "male",
  size: "",
});

// 性别选项
const genderOptions = [
  { label: "男", value: "male" },
  { label: "女", value: "female" },
  { label: "保密", value: "secret" },
];

// 尺寸选项
const sizeOptions = [
  { label: "大尺寸", value: "large" },
  { label: "默认尺寸", value: "default" },
  { label: "小尺寸", value: "small" },
];

// 表单列配置
const columns = ref([
  {
    prop: "horizontal",
    label: "水平单选",
    type: "radio",
    span: 12,
    options: genderOptions,
    config: {
      size: "default",
    },
  },
  {
    prop: "vertical",
    label: "垂直单选",
    type: "radio",
    span: 12,
    options: genderOptions,
    config: {
      size: "default",
      direction: "vertical",
    },
  },
  {
    prop: "disabled",
    label: "禁用单选",
    type: "radio",
    span: 12,
    options: genderOptions,
    disabled: true,
  },
  {
    prop: "size",
    label: "不同尺寸",
    type: "radio",
    span: 12,
    options: sizeOptions,
    config: {
      size: "small",
    },
  },
]);

// 提交表单
const handleSubmit = () => {
  console.log("表单数据:", formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    horizontal: "",
    vertical: "",
    disabled: "male",
    size: "",
  };
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

h3 {
  margin-bottom: 20px;
  color: #303133;
  font-size: 16px;
  font-weight: 600;
}
</style>
