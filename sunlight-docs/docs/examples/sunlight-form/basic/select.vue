<template>
  <div class="demo-container">
    <h3>下拉选择器</h3>
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
  basic: '',
  multiple: [],
  filterable: '',
  disabled: 'tech',
  size: '',
});

// 部门选项
const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '市场部', value: 'market' },
  { label: '销售部', value: 'sales' },
  { label: '人事部', value: 'hr' },
  { label: '财务部', value: 'finance' },
];

// 表单列配置
const columns = ref([
  {
    prop: 'basic',
    label: '基础选择',
    type: 'select',
    span: 12,
    placeholder: '请选择部门',
    options: departmentOptions,
  },
  {
    prop: 'multiple',
    label: '多选选择',
    type: 'select',
    span: 12,
    placeholder: '请选择部门',
    options: departmentOptions,
    multiple: true,
    clearable: true,
  },
  {
    prop: 'filterable',
    label: '可搜索选择',
    type: 'select',
    span: 12,
    placeholder: '请选择部门',
    options: departmentOptions,
    filterable: true,
    clearable: true,
  },
  {
    prop: 'disabled',
    label: '禁用选择',
    type: 'select',
    span: 12,
    placeholder: '请选择部门',
    options: departmentOptions,
    disabled: true,
  },
  {
    prop: 'size',
    label: '不同尺寸',
    type: 'select',
    span: 24,
    placeholder: '请选择尺寸',
    options: [
      { label: '大尺寸', value: 'large' },
      { label: '默认尺寸', value: 'default' },
      { label: '小尺寸', value: 'small' },
    ],
  },
]);

// 提交表单
const handleSubmit = () => {
  console.log('表单数据:', formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    basic: '',
    multiple: [],
    filterable: '',
    disabled: 'tech',
    size: '',
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
