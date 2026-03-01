<template>
  <div class="demo-container">
    <h3>复杂表单布局</h3>
    <p>通过组合多种表单控件和布局配置，实现复杂的表单设计。</p>
    
    <SunlightForm
      v-model="formData"
      :columns="columns"
      :form-options="formOptions"
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

// 表单数据
const formData = ref({
  // 基本信息
  name: '',
  email: '',
  phone: '',
  gender: 'male',
  age: null,
  
  // 地址信息
  province: '',
  city: '',
  district: '',
  address: '',
  
  // 工作信息
  company: '',
  position: '',
  industry: '',
  salary: '',
  
  // 其他信息
  status: 'active',
  tags: [],
  description: '',
});

// 提交结果
const submitResult = ref(null);

// 表单配置
const formOptions = reactive({
  labelWidth: '120px',
  size: 'default',
  buttonAlign: 'right',
});

// 表单列配置
const columns = reactive([
  // 基本信息
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
    label: '手机号码',
    type: 'input',
    span: 8,
    placeholder: '请输入手机号码',
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'radio',
    span: 8,
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '其他', value: 'other' },
    ],
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'input',
    span: 8,
    inputType: 'number',
    placeholder: '请输入年龄',
  },
  
  // 地址信息
  {
    prop: 'province',
    label: '省份',
    type: 'select',
    span: 8,
    placeholder: '请选择省份',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广东', value: 'guangdong' },
      { label: '江苏', value: 'jiangsu' },
    ],
  },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    span: 8,
    placeholder: '请选择城市',
    options: [
      { label: '北京市', value: 'beijing' },
      { label: '上海市', value: 'shanghai' },
      { label: '广州市', value: 'guangzhou' },
      { label: '深圳市', value: 'shenzhen' },
      { label: '杭州市', value: 'hangzhou' },
      { label: '南京市', value: 'nanjing' },
    ],
  },
  {
    prop: 'district',
    label: '区县',
    type: 'select',
    span: 8,
    placeholder: '请选择区县',
    options: [
      { label: '朝阳区', value: 'chaoyang' },
      { label: '海淀区', value: 'haidian' },
      { label: '浦东新区', value: 'pudong' },
      { label: '黄浦区', value: 'huangpu' },
    ],
  },
  {
    prop: 'address',
    label: '详细地址',
    type: 'textarea',
    span: 24,
    placeholder: '请输入详细地址',
    rows: 3,
  },
  
  // 工作信息
  {
    prop: 'company',
    label: '公司名称',
    type: 'input',
    span: 12,
    placeholder: '请输入公司名称',
  },
  {
    prop: 'position',
    label: '职位',
    type: 'input',
    span: 12,
    placeholder: '请输入职位',
  },
  {
    prop: 'industry',
    label: '行业',
    type: 'select',
    span: 12,
    placeholder: '请选择行业',
    options: [
      { label: '互联网', value: 'internet' },
      { label: '金融', value: 'finance' },
      { label: '教育', value: 'education' },
      { label: '医疗', value: 'medical' },
      { label: '制造业', value: 'manufacturing' },
    ],
  },
  {
    prop: 'salary',
    label: '薪资范围',
    type: 'select',
    span: 12,
    placeholder: '请选择薪资范围',
    options: [
      { label: '5k以下', value: 'below5k' },
      { label: '5k-10k', value: '5k-10k' },
      { label: '10k-20k', value: '10k-20k' },
      { label: '20k-30k', value: '20k-30k' },
      { label: '30k以上', value: 'above30k' },
    ],
  },
  
  // 其他信息
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    span: 12,
    placeholder: '请选择状态',
    options: [
      { label: '激活', value: 'active' },
      { label: '禁用', value: 'disabled' },
      { label: '审核中', value: 'pending' },
    ],
  },
  {
    prop: 'tags',
    label: '标签',
    type: 'select',
    span: 12,
    placeholder: '请选择标签',
    options: [
      { label: '技术', value: 'tech' },
      { label: '管理', value: 'management' },
      { label: '设计', value: 'design' },
      { label: '市场', value: 'marketing' },
      { label: '销售', value: 'sales' },
    ],
    multiple: true,
    filterable: true,
  },
  {
    prop: 'description',
    label: '个人描述',
    type: 'textarea',
    span: 24,
    placeholder: '请输入个人描述',
    rows: 4,
    showWordLimit: true,
    maxlength: 500,
  },
]);

// 提交表单
const handleSubmit = () => {
  submitResult.value = { ...formData.value };
  ElMessage.success('复杂表单提交成功');
  console.log('表单数据:', formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    gender: 'male',
    age: null,
    province: '',
    city: '',
    district: '',
    address: '',
    company: '',
    position: '',
    industry: '',
    salary: '',
    status: 'active',
    tags: [],
    description: '',
  };
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
