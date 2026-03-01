<template>
  <div class="demo-container">
    <h3>事件处理</h3>
    <SunlightForm
      v-model="formData"
      :columns="columns"
    >
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>
    <div class="event-log">
      <h4>事件日志</h4>
      <el-scrollbar height="200px">
        <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-content">{{ log.content }}</span>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

// 表单数据
const formData = ref({
  input: '',
  select: '',
  date: '',
});

// 事件日志
const eventLogs = ref([]);

// 添加事件日志
const addLog = (content) => {
  const time = new Date().toLocaleTimeString();
  eventLogs.value.unshift({ time, content });
  // 限制日志数量
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop();
  }
};

// 表单列配置
const columns = reactive([
  {
    prop: 'input',
    label: '输入框事件',
    type: 'input',
    span: 12,
    placeholder: '请输入',
    listeners: {
      change: (value) => addLog(`输入框值变化: ${value}`),
      input: (value) => addLog(`输入框实时输入: ${value}`),
      blur: () => addLog('输入框失去焦点'),
      focus: () => addLog('输入框获得焦点'),
    },
  },
  {
    prop: 'select',
    label: '选择器事件',
    type: 'select',
    span: 12,
    placeholder: '请选择',
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' },
    ],
    listeners: {
      change: (value) => addLog(`选择器值变化: ${value}`),
      visibleChange: (visible) => addLog(`选择器下拉框${visible ? '打开' : '关闭'}`),
    },
  },
  {
    prop: 'date',
    label: '日期选择器事件',
    type: 'date-picker',
    span: 12,
    placeholder: '请选择日期',
    listeners: {
      change: (value) => addLog(`日期选择器值变化: ${value}`),
      visibleChange: (visible) => addLog(`日期选择器面板${visible ? '打开' : '关闭'}`),
    },
  },
]);

// 提交表单
const handleSubmit = () => {
  console.log('表单数据:', formData.value);
  ElMessage.success('提交成功');
  addLog('表单提交');
};

// 重置表单
const handleReset = () => {
  formData.value = {
    input: '',
    select: '',
    date: '',
  };
  addLog('表单重置');
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

.event-log {
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
  width: 80px;
  text-align: right;
}

.log-content {
  color: #303133;
  flex: 1;
  word-break: break-word;
}
</style>
