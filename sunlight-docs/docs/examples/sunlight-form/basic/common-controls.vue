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
  // 输入框
  text: "",
  password: "",
  number: null,
  email: "",
  // 文本域
  description: "",
  // 下拉选择器
  department: "",
  roles: [],
  // 单选框
  gender: "",
  // 多选框
  hobbies: [],
});

// 部门选项
const departmentOptions = [
  { label: "技术部", value: "tech" },
  { label: "市场部", value: "market" },
  { label: "销售部", value: "sales" },
  { label: "人事部", value: "hr" },
  { label: "财务部", value: "finance" },
];

// 角色选项
const roleOptions = [
  { label: "管理员", value: "admin" },
  { label: "编辑", value: "editor" },
  { label: "审核员", value: "reviewer" },
  { label: "访客", value: "visitor" },
];

// 性别选项
const genderOptions = [
  { label: "男", value: "male" },
  { label: "女", value: "female" },
  { label: "其他", value: "other" },
];

// 爱好选项
const hobbyOptions = [
  { label: "阅读", value: "reading" },
  { label: "运动", value: "sports" },
  { label: "音乐", value: "music" },
  { label: "旅行", value: "travel" },
  { label: "摄影", value: "photography" },
];

// 表单列配置
const columns = ref([
  // 输入框组
  {
    prop: "text",
    label: "文本输入",
    type: "input",
    span: 12,
    placeholder: "请输入文本",
  },
  {
    prop: "password",
    label: "密码输入",
    type: "input",
    inputType: "password",
    span: 12,
    placeholder: "请输入密码",
  },
  {
    prop: "number",
    label: "数字输入",
    type: "input",
    inputType: "number",
    span: 12,
    placeholder: "请输入数字",
    config: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  {
    prop: "email",
    label: "邮箱输入",
    type: "input",
    inputType: "email",
    span: 12,
    placeholder: "请输入邮箱",
  },
  // 文本域
  {
    prop: "description",
    label: "个人简介",
    type: "textarea",
    span: 24,
    rows: 4,
    maxlength: 200,
    showWordLimit: true,
    placeholder: "请输入个人简介",
  },
  // 下拉选择器组
  {
    prop: "department",
    label: "所属部门",
    type: "select",
    span: 12,
    placeholder: "请选择部门",
    options: departmentOptions,
  },
  {
    prop: "roles",
    label: "角色权限",
    type: "select",
    span: 12,
    placeholder: "请选择角色",
    options: roleOptions,
    multiple: true,
    clearable: true,
  },
  // 单选框组
  {
    prop: "gender",
    label: "性别",
    type: "radio",
    span: 12,
    options: genderOptions,
  },
  // 多选框组
  {
    prop: "hobbies",
    label: "兴趣爱好",
    type: "checkbox",
    span: 12,
    options: hobbyOptions,
  },
]);

// 表单验证规则
const rules = ref({
  text: [{ required: true, message: "请输入文本", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  department: [{ required: true, message: "请选择部门", trigger: "change" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  description: [{ required: true, message: "请输入个人简介", trigger: "blur" }],
});

// 提交表单
const handleSubmit = () => {
  console.log("表单数据:", formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    text: "",
    password: "",
    number: null,
    email: "",
    description: "",
    department: "",
    roles: [],
    gender: "",
    hobbies: [],
  };
};
</script>


