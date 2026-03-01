<template>
  <div class="demo-container">
    <h3>日期时间选择器</h3>
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
  disabled: '2023-12-12 12:00:00',
  clearable: '',
  format: '',
});

// 表单列配置
const columns = ref([
  {
    prop: 'basic',
    label: '基础日期时间',
    type: 'datetime-picker',
    span: 12,
    placeholder: '请选择日期时间',
  },
  {
    prop: 'disabled',
    label: '禁用日期时间',
    type: 'datetime-picker',
    span: 12,
    placeholder: '请选择日期时间',
    disabled: true,
  },
  {
    prop: 'clearable',
    label: '可清空',
    type: 'datetime-picker',
    span: 12,
    placeholder: '请选择日期时间',
    clearable: true,
  },
  {
    prop: 'format',
    label: '自定义格式',
    type: 'datetime-picker',
    span: 12,
    placeholder: '请选择日期时间',
    valueFormat: 'YYYY/MM/DD HH:mm:ss',
    config: {
      format: 'YYYY/MM/DD HH:mm:ss',
    },
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
    disabled: '2023-12-12 12:00:00',
    clearable: '',
    format: '',
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
