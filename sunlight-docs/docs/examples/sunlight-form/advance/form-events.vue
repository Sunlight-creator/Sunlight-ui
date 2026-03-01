<template>
  <div class="demo-container">
    <SunlightForm ref="formRef" v-model="formData" :columns="columns" :rules="rules">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button @click="handleValidate">验证</el-button>
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
  name: "",
  email: "",
  age: null,
});

// 表单规则
const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  age: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    { type: "number", min: 18, max: 100, message: "年龄必须在18-100之间", trigger: "blur" },
  ],
});

// 事件日志
const eventLogs = ref([]);

// 添加事件日志
const addLog = content => {
  const time = new Date().toLocaleTimeString();
  eventLogs.value.unshift({ time, content });
  // 限制日志数量
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop();
  }
};

// 表单列配置
const columns = reactive([
  {
    prop: "name",
    label: "姓名",
    type: "input",
    span: 12,
    placeholder: "请输入姓名",
    listeners: {
      blur: () => addLog("姓名输入框失去焦点"),
    },
  },
  {
    prop: "email",
    label: "邮箱",
    type: "input",
    span: 12,
    placeholder: "请输入邮箱",
    listeners: {
      blur: () => addLog("邮箱输入框失去焦点"),
    },
  },
  {
    prop: "age",
    label: "年龄",
    type: "input",
    span: 12,
    placeholder: "请输入年龄",
    inputType: "number",
    listeners: {
      blur: () => addLog("年龄输入框失去焦点"),
    },
  },
]);

// 提交表单
const handleSubmit = async () => {
  try {
    const valid = await formRef.value.validate();
    if (valid) {
      addLog("表单提交成功");
      ElMessage.success("表单提交成功");
      console.log("表单数据:", formData.value);
    }
  } catch (error) {
    addLog("表单验证失败");
    ElMessage.error("表单验证失败");
  }
};

// 重置表单
const handleReset = () => {
  formRef.value.reset();
  addLog("表单重置");
  ElMessage.info("表单已重置");
};

// 单独验证
const handleValidate = async () => {
  try {
    const valid = await formRef.value.validate();
    if (valid) {
      addLog("表单验证通过");
      ElMessage.success("表单验证通过");
    }
  } catch (error) {
    addLog("表单验证失败");
    ElMessage.error("表单验证失败");
  }
};
</script>

<style scoped>
.demo-container {
}
</style>
