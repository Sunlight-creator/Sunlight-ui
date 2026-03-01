<template>
  <div class="demo-container">
    <h3>文本域</h3>
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
  customRows: '',
  wordLimit: '',
  disabled: '这是一个禁用的文本域，无法编辑',
});

// 表单列配置
const columns = ref([
  {
    prop: 'basic',
    label: '基础文本域',
    type: 'textarea',
    span: 12,
    placeholder: '请输入内容',
  },
  {
    prop: 'customRows',
    label: '自定义行数',
    type: 'textarea',
    span: 12,
    placeholder: '请输入内容',
    rows: 5,
  },
  {
    prop: 'wordLimit',
    label: '字数限制',
    type: 'textarea',
    span: 24,
    placeholder: '请输入内容，最多100字',
    maxlength: 100,
    showWordLimit: true,
    rows: 4,
  },
  {
    prop: 'disabled',
    label: '禁用文本域',
    type: 'textarea',
    span: 24,
    disabled: true,
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
    basic: '',
    customRows: '',
    wordLimit: '',
    disabled: '这是一个禁用的文本域，无法编辑',
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
