<template>
  <div>
    <div class="control-buttons">
      <el-button type="warning" @click="toggleDisabled">切换禁用状态</el-button>
      <el-button type="info" @click="toggleSize">切换表单尺寸</el-button>
    </div>

    <SunlightForm v-model="formData" :columns="columns" :rules="rules" :formOptions="formOptions">
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
  // 响应式布局
  name: "",
  email: "",
  phone: "",
  // 表单验证
  idCard: "",
  password: "",
  confirmPassword: "",
  // 表单禁用
  disabledField: "这个字段被禁用了",
  // 表单尺寸
  sizeDemo: "",
});

// 表单选项
const formOptions = ref({
  disabled: false,
  size: "default",
  buttonAlign: "center",
});

// 部门选项
const departmentOptions = [
  { label: "技术部", value: "tech" },
  { label: "市场部", value: "market" },
  { label: "销售部", value: "sales" },
  { label: "人事部", value: "hr" },
  { label: "财务部", value: "finance" },
];

// 表单列配置
const columns = ref([
  // 响应式布局示例
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
    inputType: "email",
    span: 12,
    placeholder: "请输入邮箱",
  },
  {
    prop: "phone",
    label: "电话",
    type: "input",
    inputType: "tel",
    span: 12,
    placeholder: "请输入电话",
  },
  // 表单验证示例
  {
    prop: "idCard",
    label: "身份证号",
    type: "input",
    span: 12,
    placeholder: "请输入身份证号",
  },
  {
    prop: "password",
    label: "密码",
    type: "input",
    inputType: "password",
    span: 12,
    placeholder: "请输入密码",
  },
  {
    prop: "confirmPassword",
    label: "确认密码",
    type: "input",
    inputType: "password",
    span: 12,
    placeholder: "请再次输入密码",
  },
  // 表单禁用示例
  {
    prop: "disabledField",
    label: "禁用字段",
    type: "input",
    span: 12,
    disabled: true,
    placeholder: "这个字段被禁用了",
  },
  // 表单尺寸示例
  {
    prop: "sizeDemo",
    label: "尺寸演示",
    type: "select",
    span: 12,
    placeholder: "请选择",
    options: departmentOptions,
  },
]);

// 表单验证规则
const rules = ref({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 10, message: "姓名长度在 2 到 10 个字符", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入电话", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码", trigger: "blur" },
  ],
  idCard: [
    { required: true, message: "请输入身份证号", trigger: "blur" },
    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: "请输入正确的身份证号码", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

// 提交表单
const handleSubmit = () => {
  console.log("表单数据:", formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    name: "",
    email: "",
    phone: "",
    idCard: "",
    password: "",
    confirmPassword: "",
    disabledField: "这个字段被禁用了",
    sizeDemo: "",
  };
};

// 切换禁用状态
const toggleDisabled = () => {
  formOptions.value.disabled = !formOptions.value.disabled;
};

// 切换表单尺寸
const toggleSize = () => {
  const sizes = ["large", "default", "small"];
  const currentIndex = sizes.indexOf(formOptions.value.size);
  formOptions.value.size = sizes[(currentIndex + 1) % sizes.length];
};
</script>

<style scoped>
.control-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>
