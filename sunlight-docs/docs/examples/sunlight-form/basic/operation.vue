<template>
  <div class="demo-container">
    <h3>操作按钮</h3>
    <p>通过插槽自定义操作按钮，支持多种布局和样式配置</p>
    
    <h4>居中对齐</h4>
    <SunlightForm
      v-model="formData1"
      :columns="columns1"
      :form-options="{ buttonAlign: 'center' }"
    >
      <template #operation>
        <el-button type="primary" @click="handleSubmit('form1')">提交</el-button>
        <el-button @click="handleReset('form1')">重置</el-button>
      </template>
    </SunlightForm>
    
    <h4>右对齐</h4>
    <SunlightForm
      v-model="formData2"
      :columns="columns2"
      :form-options="{ buttonAlign: 'right' }"
    >
      <template #operation>
        <el-button @click="handleReset('form2')">重置</el-button>
        <el-button type="primary" @click="handleSubmit('form2')">提交</el-button>
      </template>
    </SunlightForm>
    
    <h4>自定义样式</h4>
    <SunlightForm
      v-model="formData3"
      :columns="columns3"
    >
      <template #operation>
        <el-button size="small" @click="handleReset('form3')">取消</el-button>
        <el-button size="small" type="success" @click="handleSubmit('form3')">保存</el-button>
        <el-button size="small" type="danger">删除</el-button>
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
const formData1 = ref({ name: '' });
const formData2 = ref({ email: '' });
const formData3 = ref({ title: '' });

// 提交日志
const submitLog = ref(null);

// 表单列配置
const columns1 = reactive([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    span: 12,
    placeholder: '请输入姓名'
  }
]);

const columns2 = reactive([
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    span: 12,
    placeholder: '请输入邮箱'
  }
]);

const columns3 = reactive([
  {
    prop: 'title',
    label: '标题',
    type: 'input',
    span: 24,
    placeholder: '请输入标题'
  }
]);

// 提交表单
const handleSubmit = (formName) => {
  submitLog.value = {
    time: new Date().toLocaleString(),
    content: `${formName} 表单提交`
  };
  ElMessage.success(`${formName} 表单提交成功`);
  console.log(`${formName} 表单数据:`, formName === 'form1' ? formData1.value : formName === 'form2' ? formData2.value : formData3.value);
};

// 重置表单
const handleReset = (formName) => {
  submitLog.value = {
    time: new Date().toLocaleString(),
    content: `${formName} 表单重置`
  };
  ElMessage.info(`${formName} 表单已重置`);
  if (formName === 'form1') formData1.value.name = '';
  if (formName === 'form2') formData2.value.email = '';
  if (formName === 'form3') formData3.value.title = '';
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
