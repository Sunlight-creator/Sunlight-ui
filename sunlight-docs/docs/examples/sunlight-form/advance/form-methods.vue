<template>
  <div class="demo-container">
    <SunlightForm ref="formRef" v-model="formData" :columns="columns" :rules="rules">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button @click="handleValidate">验证</el-button>
        <el-button @click="getFormModel">获取表单数据</el-button>
      </template>
    </SunlightForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";

// 表单引用
const formRef = ref();

// 表单数据
const formData = ref({
  username: "",
  password: "",
  confirmPassword: "",
});

// 表单规则
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== formData.value.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

// 验证结果
const validateResult = ref(null);

// 表单数据
const formModel = ref(null);

// 表单列配置
const columns = reactive([
  {
    prop: "username",
    label: "用户名",
    type: "input",
    span: 24,
    placeholder: "请输入用户名",
  },
  {
    prop: "password",
    label: "密码",
    type: "input",
    span: 24,
    placeholder: "请输入密码",
    inputType: "password",
  },
  {
    prop: "confirmPassword",
    label: "确认密码",
    type: "input",
    span: 24,
    placeholder: "请再次输入密码",
    inputType: "password",
  },
]);

// 提交表单
const handleSubmit = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    ElMessage.success("表单提交成功");
    console.log("表单数据:", formData.value);
  } else {
    ElMessage.error("表单验证失败");
  }
  validateResult.value = valid;
};

// 重置表单
const handleReset = () => {
  formRef.value.reset();
  ElMessage.info("表单已重置");
  validateResult.value = null;
  formModel.value = null;
};

// 验证表单
const handleValidate = async () => {
  const valid = await formRef.value.validate();
  validateResult.value = valid;
  if (valid) {
    ElMessage.success("表单验证通过");
  } else {
    ElMessage.error("表单验证失败");
  }
};

// 获取表单数据
const getFormModel = () => {
  formModel.value = formRef.value.model;
  ElMessage.info("已获取表单数据");
};
</script>

<style scoped>
.demo-container {
}
</style>
