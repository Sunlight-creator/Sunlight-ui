<template>
  <div class="demo-container">
    <h3>表单尺寸</h3>
    <p>通过设置 formOptions.size 可以控制表单的整体尺寸，支持 large、default 和 small 三种尺寸。</p>
    
    <h4>大尺寸表单</h4>
    <SunlightForm
      v-model="formData1"
      :columns="columns"
      :form-options="{ size: 'large', labelWidth: '100px' }"
    >
      <template #operation>
        <el-button type="primary" size="large" @click="handleSubmit('large')">提交</el-button>
        <el-button size="large" @click="handleReset('large')">重置</el-button>
      </template>
    </SunlightForm>
    
    <h4>默认尺寸表单</h4>
    <SunlightForm
      v-model="formData2"
      :columns="columns"
      :form-options="{ size: 'default', labelWidth: '100px' }"
    >
      <template #operation>
        <el-button type="primary" @click="handleSubmit('default')">提交</el-button>
        <el-button @click="handleReset('default')">重置</el-button>
      </template>
    </SunlightForm>
    
    <h4>小尺寸表单</h4>
    <SunlightForm
      v-model="formData3"
      :columns="columns"
      :form-options="{ size: 'small', labelWidth: '100px' }"
    >
      <template #operation>
        <el-button type="primary" size="small" @click="handleSubmit('small')">提交</el-button>
        <el-button size="small" @click="handleReset('small')">重置</el-button>
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
const formData1 = ref({ name: '', email: '' });
const formData2 = ref({ name: '', email: '' });
const formData3 = ref({ name: '', email: '' });

// 提交结果
const submitResult = ref(null);

// 表单列配置
const columns = reactive([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    placeholder: '请输入姓名',
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    placeholder: '请输入邮箱',
  },
]);

// 提交表单
const handleSubmit = (size) => {
  let formData;
  switch (size) {
    case 'large':
      formData = formData1.value;
      break;
    case 'default':
      formData = formData2.value;
      break;
    case 'small':
      formData = formData3.value;
      break;
    default:
      formData = {};
  }
  submitResult.value = { size, data: formData };
  ElMessage.success(`${size} 尺寸表单提交成功`);
  console.log(`${size} 尺寸表单数据:`, formData);
};

// 重置表单
const handleReset = (size) => {
  switch (size) {
    case 'large':
      formData1.value = { name: '', email: '' };
      break;
    case 'default':
      formData2.value = { name: '', email: '' };
      break;
    case 'small':
      formData3.value = { name: '', email: '' };
      break;
  }
  ElMessage.info(`${size} 尺寸表单已重置`);
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
