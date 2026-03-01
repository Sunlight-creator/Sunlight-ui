<template>
  <div class="demo-container">
    <h3>表单尺寸</h3>
    <p>通过设置 formOptions.size 可以控制表单的整体尺寸，支持 large、default 和 small 三种尺寸。</p>
    
    <h4>大尺寸表单</h4>
    <SunlightForm
      v-model="formData1"
      :columns="columns1"
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
      :columns="columns2"
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
      :columns="columns3"
      :form-options="{ size: 'small', labelWidth: '100px' }"
    >
      <template #operation>
        <el-button type="primary" size="small" @click="handleSubmit('small')">提交</el-button>
        <el-button size="small" @click="handleReset('small')">重置</el-button>
      </template>
    </SunlightForm>
    
    <h4>行内表单</h4>
    <SunlightForm
      v-model="formData4"
      :columns="columns4"
      :form-options="{ inline: true, size: 'default', labelWidth: '80px' }"
    >
      <template #operation>
        <el-button type="primary" @click="handleSubmit('inline')">提交</el-button>
        <el-button @click="handleReset('inline')">重置</el-button>
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
const formData1 = ref({ name: '', email: '' });
const formData2 = ref({ name: '', email: '' });
const formData3 = ref({ name: '', email: '' });
const formData4 = ref({ name: '', email: '' });

// 提交日志
const submitLog = ref(null);

// 表单列配置
const columns1 = reactive([
  { prop: 'name', label: '姓名', type: 'input', span: 12, placeholder: '请输入姓名' },
  { prop: 'email', label: '邮箱', type: 'input', span: 12, placeholder: '请输入邮箱' },
]);

const columns2 = reactive([
  { prop: 'name', label: '姓名', type: 'input', span: 12, placeholder: '请输入姓名' },
  { prop: 'email', label: '邮箱', type: 'input', span: 12, placeholder: '请输入邮箱' },
]);

const columns3 = reactive([
  { prop: 'name', label: '姓名', type: 'input', span: 12, placeholder: '请输入姓名' },
  { prop: 'email', label: '邮箱', type: 'input', span: 12, placeholder: '请输入邮箱' },
]);

const columns4 = reactive([
  { prop: 'name', label: '姓名', type: 'input', span: 8, placeholder: '请输入姓名' },
  { prop: 'email', label: '邮箱', type: 'input', span: 12, placeholder: '请输入邮箱' },
]);

// 提交表单
const handleSubmit = (size) => {
  submitLog.value = {
    time: new Date().toLocaleString(),
    content: `尺寸为 ${size} 的表单提交成功`
  };
  ElMessage.success(`尺寸为 ${size} 的表单提交成功`);
};

// 重置表单
const handleReset = (size) => {
  submitLog.value = {
    time: new Date().toLocaleString(),
    content: `尺寸为 ${size} 的表单已重置`
  };
  ElMessage.info(`尺寸为 ${size} 的表单已重置`);
  // 根据尺寸重置对应的表单数据
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
    case 'inline':
      formData4.value = { name: '', email: '' };
      break;
  }
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
