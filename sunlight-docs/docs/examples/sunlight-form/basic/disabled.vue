<template>
  <div class="demo-container">
    <h3>表单禁用</h3>
    
    <h4>禁用整个表单</h4>
    <SunlightForm
      v-model="formData1"
      :columns="columns1"
      :form-options="{ disabled: true }"
    >
      <template #operation>
        <el-button type="primary" disabled>提交</el-button>
        <el-button disabled>重置</el-button>
      </template>
    </SunlightForm>
    
    <h4>禁用单个表单控件</h4>
    <SunlightForm
      v-model="formData2"
      :columns="columns2"
    >
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>
    
    <h4>动态禁用</h4>
    <div class="toggle-container">
      <el-switch v-model="isDisabled" @change="toggleDisabled">
        <template #default>{{ isDisabled ? '禁用表单' : '启用表单' }}</template>
      </el-switch>
    </div>
    <SunlightForm
      v-model="formData3"
      :columns="columns3"
      :form-options="{ disabled: isDisabled }"
    >
      <template #operation>
        <el-button type="primary" :disabled="isDisabled" @click="handleSubmit">提交</el-button>
        <el-button :disabled="isDisabled" @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>
    
    <div class="result-container" v-if="submitLog">
      <h4>操作日志</h4>
      <div class="log-item">
        <span class="log-time">{{ submitLog.time }}</span>
        <span class="log-content">{{ submitLog.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

// 表单数据
const formData1 = ref({ name: '已禁用', email: 'disabled@example.com' });
const formData2 = ref({ name: '', email: '', status: 'active' });
const formData3 = ref({ name: '', password: '' });

// 提交日志
const submitLog = ref(null);

// 动态禁用状态
const isDisabled = ref(false);

// 切换禁用状态
const toggleDisabled = () => {
  ElMessage.info(`表单已${isDisabled.value ? '禁用' : '启用'}`);
};

// 表单列配置
const columns1 = reactive([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
  },
]);

const columns2 = reactive([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    placeholder: '可编辑',
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    disabled: true,
    placeholder: '已禁用',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    span: 24,
    options: [
      { label: '激活', value: 'active' },
      { label: '禁用', value: 'disabled' },
    ],
    disabled: true,
  },
]);

const columns3 = reactive([
  {
    prop: 'name',
    label: '用户名',
    type: 'input',
    span: 12,
    placeholder: '请输入用户名',
  },
  {
    prop: 'password',
    label: '密码',
    type: 'input',
    span: 12,
    placeholder: '请输入密码',
    inputType: 'password',
  },
]);

// 提交表单
const handleSubmit = () => {
  submitLog.value = {
    time: new Date().toLocaleString(),
    content: '表单提交成功',
  };
  ElMessage.success('表单提交成功');
  console.log('表单数据:', { ...formData2.value, ...formData3.value });
};

// 重置表单
const handleReset = () => {
  submitLog.value = {
    time: new Date().toLocaleString(),
    content: '表单重置',
  };
  formData2.value = { name: '', email: '', status: 'active' };
  formData3.value = { name: '', password: '' };
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
  margin: 30px 0 15px;
  font-size: 16px;
  font-weight: 500;
  color: #606266;
}

.toggle-container {
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.result-container {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.log-item {
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
}

.log-time {
  color: #909399;
  margin-right: 10px;
  width: 150px;
}

.log-content {
  color: #606266;
  flex: 1;
}
</style>
