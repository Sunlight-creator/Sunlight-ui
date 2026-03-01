<template>
  <div class="demo-container">
    <h3>输入框</h3>
    <SunlightForm
      v-model="formData"
      :columns="columns"
    >
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SunlightForm } from 'sunlight-ui';

// 表单数据
const formData = ref({
  text: '',
  password: '',
  number: null,
  email: '',
  url: '',
  tel: '',
  disabled: '禁用输入框',
});

// 表单列配置
const columns = ref([
  {
    prop: 'text',
    label: '文本输入',
    type: 'input',
    span: 12,
    placeholder: '请输入文本',
  },
  {
    prop: 'password',
    label: '密码输入',
    type: 'input',
    inputType: 'password',
    span: 12,
    placeholder: '请输入密码',
  },
  {
    prop: 'number',
    label: '数字输入',
    type: 'input',
    inputType: 'number',
    span: 12,
    placeholder: '请输入数字',
    config: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  {
    prop: 'email',
    label: '邮箱输入',
    type: 'input',
    inputType: 'email',
    span: 12,
    placeholder: '请输入邮箱',
  },
  {
    prop: 'url',
    label: 'URL输入',
    type: 'input',
    inputType: 'url',
    span: 12,
    placeholder: '请输入URL',
  },
  {
    prop: 'tel',
    label: '电话输入',
    type: 'input',
    inputType: 'tel',
    span: 12,
    placeholder: '请输入电话号码',
  },
  {
    prop: 'disabled',
    label: '禁用输入',
    type: 'input',
    span: 12,
    disabled: true,
    placeholder: '禁用输入框',
  },
]);

// 提交表单
const handleSubmit = () => {
  console.log('表单数据:', formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    text: '',
    password: '',
    number: null,
    email: '',
    url: '',
    tel: '',
    disabled: '禁用输入框',
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
