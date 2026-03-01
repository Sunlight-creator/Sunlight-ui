<template>
  <div class="demo-container">
    <h3>级联选择器</h3>
    <SunlightForm
      v-model="formData"
      :columns="columns"
    >
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>
    <div class="result-container">
      <h4>选择结果</h4>
      <div class="result-item">
        <span class="result-label">基本级联选择：</span>
        <span class="result-value">{{ formData.basicCascader || '未选择' }}</span>
      </div>
      <div class="result-item">
        <span class="result-label">多选级联选择：</span>
        <span class="result-value">{{ formData.multipleCascader ? JSON.stringify(formData.multipleCascader) : '未选择' }}</span>
      </div>
      <div class="result-item">
        <span class="result-label">可搜索级联选择：</span>
        <span class="result-value">{{ formData.searchableCascader || '未选择' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

// 表单数据
const formData = ref({
  basicCascader: '',
  multipleCascader: [],
  searchableCascader: '',
});

// 级联选择数据
const cascaderOptions = [
  {
    label: '北京',
    value: 'beijing',
    children: [
      {
        label: '朝阳区',
        value: 'chaoyang',
        children: [
          { label: '三里屯', value: 'sanlitun' },
          { label: '国贸', value: 'guomao' },
        ],
      },
      {
        label: '海淀区',
        value: 'haidian',
        children: [
          { label: '中关村', value: 'zhongguancun' },
          { label: '五道口', value: 'wudaokou' },
        ],
      },
    ],
  },
  {
    label: '上海',
    value: 'shanghai',
    children: [
      {
        label: '浦东新区',
        value: 'pudong',
        children: [
          { label: '陆家嘴', value: 'lujiazui' },
          { label: '张江', value: 'zhangjiang' },
        ],
      },
      {
        label: '徐汇区',
        value: 'xuhui',
        children: [
          { label: '徐家汇', value: 'xujiahui' },
          { label: '衡山路', value: 'hengshanlu' },
        ],
      },
    ],
  },
  {
    label: '广州',
    value: 'guangzhou',
    children: [
      {
        label: '天河区',
        value: 'tianhe',
        children: [
          { label: '珠江新城', value: 'zhujiangxincheng' },
          { label: '天河城', value: 'tianhecheng' },
        ],
      },
      {
        label: '越秀区',
        value: 'yuexiu',
        children: [
          { label: '北京路', value: 'beijinglu' },
          { label: '越秀公园', value: 'yuexiugongyuan' },
        ],
      },
    ],
  },
];

// 表单列配置
const columns = reactive([
  {
    prop: 'basicCascader',
    label: '基本级联选择',
    type: 'cascader',
    span: 24,
    placeholder: '请选择地址',
    options: cascaderOptions,
  },
  {
    prop: 'multipleCascader',
    label: '多选级联选择',
    type: 'cascader',
    span: 24,
    placeholder: '请选择地址（可多选）',
    options: cascaderOptions,
    multiple: true,
    clearable: true,
  },
  {
    prop: 'searchableCascader',
    label: '可搜索级联选择',
    type: 'cascader',
    span: 24,
    placeholder: '请选择地址（可搜索）',
    options: cascaderOptions,
    filterable: true,
    clearable: true,
  },
]);

// 提交表单
const handleSubmit = () => {
  console.log('表单数据:', formData.value);
  ElMessage.success('提交成功');
};

// 重置表单
const handleReset = () => {
  formData.value = {
    basicCascader: '',
    multipleCascader: [],
    searchableCascader: '',
  };
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

.result-container {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.result-item {
  display: flex;
  margin-bottom: 10px;
  align-items: flex-start;
}

.result-label {
  width: 150px;
  font-weight: 500;
  color: #303133;
}

.result-value {
  flex: 1;
  color: #606266;
  word-break: break-all;
}
</style>
