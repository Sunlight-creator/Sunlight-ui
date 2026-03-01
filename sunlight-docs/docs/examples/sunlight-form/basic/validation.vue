<template>
  <div class="demo-container">
    <h3>表单验证</h3>
    <SunlightForm
      ref="formRef"
      v-model="formData"
      :columns="columns"
      :rules="rules"
    >
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>
    <div class="result-container" v-if="submitResult">
      <h4>提交结果</h4>
      <pre class="result-json">{{ JSON.stringify(submitResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

// 表单引用
const formRef = ref();

// 表单数据
const formData = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  age: null,
  agree: false,
});

// 提交结果
const submitResult = ref(null);

// 自定义验证函数
const validatePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入手机号码'));
  }
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(value)) {
    callback(new Error('请输入正确的手机号码'));
  } else {
    callback();
  }
};

// 表单规则
const rules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, validator: validatePhone, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== formData.value.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 18, max: 100, message: '年龄在 18 到 100 岁之间', trigger: 'blur' }
  ],
  agree: [
    { required: true, message: '请同意用户协议', trigger: 'change' },
    { validator: (rule, value, callback) => value ? callback() : callback(new Error('请同意用户协议')), trigger: 'change' }
  ]
});

// 表单列配置
const columns = reactive([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    placeholder: '请输入姓名'
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    placeholder: '请输入邮箱'
  },
  {
    prop: 'phone',
    label: '手机号码',
    type: 'input',
    span: 12,
    placeholder: '请输入手机号码'
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'input',
    span: 12,
    placeholder: '请输入年龄',
    inputType: 'number'
  },
  {
    prop: 'password',
    label: '密码',
    type: 'input',
    span: 12,
    placeholder: '请输入密码',
    inputType: 'password'
  },
  {
    prop: 'confirmPassword',
    label: '确认密码',
    type: 'input',
    span: 12,
    placeholder: '请确认密码',
    inputType: 'password'
  },
  {
    prop: 'agree',
    label: '用户协议',
    type: 'checkbox',
    span: 24,
    options: [
      { label: '我已阅读并同意用户协议和隐私政策', value: true }
    ]
  }
]);

// 提交表单
const handleSubmit = async () => {
  try {
    const valid = await formRef.value.validate();
    if (valid) {
      submitResult.value = { ...formData.value };
      ElMessage.success('表单验证通过，提交成功！');
    }
  } catch (error) {
    ElMessage.error('表单验证失败，请检查输入！');
  }
};

// 重置表单
const handleReset = () => {
  formRef.value.reset();
  submitResult.value = null;
  ElMessage.info('表单已重置');
};
</script>

<style scoped>
.demo-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

h3 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}

h4 {
  margin: 20px 0 10px;
  font-size: 16px;
  font-weight: 600;
}

.result-container {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.result-json {
  background-color: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
