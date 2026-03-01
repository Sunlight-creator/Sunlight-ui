<template>
  <div>
    <SunlightForm v-model="formData" :columns="columns" :rules="rules">
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
  name: "",
  email: "",
  age: null,
  department: "",
});

// 表单列配置
const columns = ref([
  {
    prop: "name",
    label: "姓名",
    type: "input",
    span: 12,
    placeholder: "请输入姓名",
  },
  {
    prop: "email",
    label: "邮箱",
    type: "input",
    span: 12,
    placeholder: "请输入邮箱",
  },
  {
    prop: "age",
    label: "年龄",
    type: "input",
    span: 12,
    inputType: "number",
    placeholder: "请输入年龄",
  },
  {
    prop: "department",
    label: "部门",
    type: "select",
    span: 12,
    placeholder: "请选择部门",
    options: [
      { label: "技术部", value: "tech" },
      { label: "市场部", value: "market" },
      { label: "销售部", value: "sales" },
      { label: "人事部", value: "hr" },
    ],
  },
]);

// 表单验证规则
const rules = ref({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
  department: [{ required: true, message: "请选择部门", trigger: "change" }],
});

// 提交表单
const handleSubmit = () => {
  console.log("表单数据:", formData.value);
  // 这里可以调用 API 提交表单数据
};

// 重置表单
const handleReset = () => {
  console.log("重置表单");
  // 重置表单数据
  formData.value = {
    name: "",
    email: "",
    age: null,
    department: "",
  };
};
</script>


