<template>
  <div class="demo-container">
    <h3>多选框</h3>
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
  horizontal: [],
  vertical: [],
  disabled: ['option1', 'option3'],
  size: [],
});

// 兴趣选项
const hobbyOptions = [
  { label: '篮球', value: 'option1' },
  { label: '足球', value: 'option2' },
  { label: '游泳', value: 'option3' },
  { label: '跑步', value: 'option4' },
  { label: '读书', value: 'option5' },
];

// 尺寸选项
const sizeOptions = [
  { label: '大尺寸', value: 'large' },
  { label: '默认尺寸', value: 'default' },
  { label: '小尺寸', value: 'small' },
];

// 表单列配置
const columns = ref([
  {
    prop: 'horizontal',
    label: '水平多选',
    type: 'checkbox',
    span: 12,
    options: hobbyOptions,
    config: {
      size: 'default',
    },
  },
  {
    prop: 'vertical',
    label: '垂直多选',
    type: 'checkbox',
    span: 12,
    options: hobbyOptions.slice(0, 3),
    config: {
      size: 'default',
      direction: 'vertical',
    },
  },
  {
    prop: 'disabled',
    label: '禁用多选',
    type: 'checkbox',
    span: 12,
    options: hobbyOptions.slice(0, 4),
    disabled: true,
  },
  {
    prop: 'size',
    label: '不同尺寸',
    type: 'checkbox',
    span: 12,
    options: sizeOptions,
    config: {
      size: 'small',
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
    horizontal: [],
    vertical: [],
    disabled: ['option1', 'option3'],
    size: [],
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
