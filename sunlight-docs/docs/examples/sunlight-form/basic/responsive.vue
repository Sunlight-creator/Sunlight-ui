<template>
  <div class="demo-container">
    <h3>响应式布局</h3>
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
  name: '',
  email: '',
  phone: '',
  department: '',
  position: '',
  address: '',
});

// 部门选项
const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '市场部', value: 'market' },
  { label: '销售部', value: 'sales' },
  { label: '人事部', value: 'hr' },
  { label: '财务部', value: 'finance' },
];

// 职位选项
const positionOptions = [
  { label: '前端开发', value: 'frontend' },
  { label: '后端开发', value: 'backend' },
  { label: '产品经理', value: 'product' },
  { label: '设计师', value: 'designer' },
  { label: '测试工程师', value: 'tester' },
];

// 表单列配置
const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 8,
    placeholder: '请输入姓名',
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 8,
    placeholder: '请输入邮箱',
  },
  {
    prop: 'phone',
    label: '电话',
    type: 'input',
    span: 8,
    placeholder: '请输入电话号码',
  },
  {
    prop: 'department',
    label: '部门',
    type: 'select',
    span: 12,
    placeholder: '请选择部门',
    options: departmentOptions,
  },
  {
    prop: 'position',
    label: '职位',
    type: 'select',
    span: 12,
    placeholder: '请选择职位',
    options: positionOptions,
  },
  {
    prop: 'address',
    label: '地址',
    type: 'textarea',
    span: 24,
    placeholder: '请输入地址',
    rows: 3,
  },
]);

// 提交表单
const handleSubmit = () => {
  console.log('表单数据:', formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    address: '',
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
