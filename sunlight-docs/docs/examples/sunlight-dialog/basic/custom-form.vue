<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">打开带表单的对话框</el-button>

    <SunlightDialog
      v-model:visible="dialogVisible"
      dialog-title="自定义表单组件"
      content-height="500"
      @on-confirm="handleConfirm"
      @on-cancel="handleCancel"
    >
      <el-form :model="formData" label-width="100px" :rules="rules" ref="formRef">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="formData.age" :min="1" :max="120" placeholder="请输入年龄" />
        </el-form-item>
        
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
            <el-radio label="other">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" type="email" />
        </el-form-item>
        
        <el-form-item label="部门" prop="department">
          <el-select v-model="formData.department" placeholder="请选择部门">
            <el-option label="技术部" value="tech" />
            <el-option label="市场部" value="market" />
            <el-option label="销售部" value="sales" />
            <el-option label="人事部" value="hr" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="备注">
          <el-input v-model="formData.remark" type="textarea" :rows="4" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
    </SunlightDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { SunlightDialog } from 'sunlight-ui';
import { ElMessage } from 'element-plus';

// 对话框显示状态
const dialogVisible = ref(false);

// 表单引用
const formRef = ref();

// 表单数据
const formData = reactive({
  name: '',
  age: null,
  gender: 'male',
  email: '',
  department: '',
  remark: ''
});

// 表单验证规则
const rules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字值', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  department: [
    { required: true, message: '请选择部门', trigger: 'change' }
  ]
});

// 处理确认按钮点击
const handleConfirm = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validate();
    ElMessage.success('表单验证通过，点击了确认按钮');
    console.log('表单数据:', formData);
    dialogVisible.value = false;
  } catch (error) {
    ElMessage.error('表单验证失败，请检查输入');
  }
};

// 处理取消按钮点击
const handleCancel = () => {
  ElMessage.info('点击了取消按钮');
  // 重置表单
  if (formRef.value) {
    formRef.value.resetFields();
  }
};
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>