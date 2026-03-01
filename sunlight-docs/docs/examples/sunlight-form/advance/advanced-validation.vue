<template>
  <div class="demo-container">
    <h3>高级表单验证</h3>
    <p>SunlightForm 支持多种高级表单验证方式，包括自定义验证函数、异步验证和复杂验证规则。</p>
    
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
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  idCard: '',
  customField: '',
  asyncField: '',
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

// 身份证验证函数
const validateIdCard = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入身份证号码'));
  }
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!idCardRegex.test(value)) {
    callback(new Error('请输入正确的身份证号码'));
  } else {
    callback();
  }
};

// 自定义字段验证
const validateCustomField = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入自定义字段'));
  }
  // 自定义验证逻辑：必须包含字母和数字
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  if (!hasLetter || !hasNumber) {
    callback(new Error('自定义字段必须包含字母和数字'));
  } else {
    callback();
  }
};

// 异步验证函数
const validateAsyncField = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入异步验证字段'));
  }
  // 模拟异步验证
  setTimeout(() => {
    if (value === 'async') {
      callback(new Error('该值已被使用'));
    } else {
      callback();
    }
  }, 1000);
};

// 表单列配置
const columns = reactive([
  {
    prop: 'username',
    label: '用户名',
    type: 'input',
    span: 12,
    placeholder: '请输入用户名',
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    placeholder: '请输入邮箱',
  },
  {
    prop: 'phone',
    label: '手机号码',
    type: 'input',
    span: 12,
    placeholder: '请输入手机号码',
  },
  {
    prop: 'idCard',
    label: '身份证号码',
    type: 'input',
    span: 12,
    placeholder: '请输入身份证号码',
  },
  {
    prop: 'password',
    label: '密码',
    type: 'input',
    span: 12,
    placeholder: '请输入密码',
    inputType: 'password',
  },
  {
    prop: 'confirmPassword',
    label: '确认密码',
    type: 'input',
    span: 12,
    placeholder: '请再次输入密码',
    inputType: 'password',
  },
  {
    prop: 'customField',
    label: '自定义字段',
    type: 'input',
    span: 12,
    placeholder: '必须包含字母和数字',
  },
  {
    prop: 'asyncField',
    label: '异步验证字段',
    type: 'input',
    span: 12,
    placeholder: '异步验证，请勿输入 "async"',
  },
]);

// 表单规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  phone: [
    { required: true, validator: validatePhone, trigger: 'blur' },
  ],
  idCard: [
    { required: true, validator: validateIdCard, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' },
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
  customField: [
    { required: true, validator: validateCustomField, trigger: 'blur' },
  ],
  asyncField: [
    { required: true, validator: validateAsyncField, trigger: 'blur' },
  ],
});

// 提交表单
const handleSubmit = async () => {
  try {
    const valid = await formRef.value.validate();
    if (valid) {
      submitResult.value = { ...formData.value };
      ElMessage.success('表单验证通过，提交成功！');
      console.log('表单数据:', formData.value);
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

p {
  margin-bottom: 20px;
  color: #909399;
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
