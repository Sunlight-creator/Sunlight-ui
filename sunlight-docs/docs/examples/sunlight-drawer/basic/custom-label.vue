<template>
  <div>
    <el-button type="primary" @click="drawerVisible = true">打开自定义标签抽屉</el-button>

    <SunlightDrawer
      v-model:visible="drawerVisible"
      drawer-title="自定义表单 Label"
      drawer-size="50%"
      content-height="500"
      @on-confirm="handleConfirm"
      @on-cancel="handleCancel"
    >
      <el-form :model="formData" label-width="120px" class="custom-label-form">
        <!-- 自定义样式标签 -->
        <el-form-item label="姓名" prop="name" class="custom-label-item">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        
        <!-- 带图标标签 -->
        <el-form-item prop="email">
          <template #label>
            <span class="label-with-icon">
              <el-icon><Message /></el-icon>
              <span>邮箱</span>
            </span>
          </template>
          <el-input v-model="formData.email" placeholder="请输入邮箱" type="email" />
        </el-form-item>
        
        <!-- 带必填标记的自定义标签 -->
        <el-form-item prop="phone">
          <template #label>
            <span class="custom-required-label">
              手机号
              <span class="required-mark">*</span>
            </span>
          </template>
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        
        <!-- 多行标签 -->
        <el-form-item prop="address">
          <template #label>
            <div class="multi-line-label">
              <span>详细地址</span>
              <small>(请填写完整地址，包括省市区街道)</small>
            </div>
          </template>
          <el-input v-model="formData.address" type="textarea" :rows="3" placeholder="请输入详细地址" />
        </el-form-item>
        
        <!-- 自定义颜色标签 -->
        <el-form-item prop="status">
          <template #label>
            <span class="color-label">状态</span>
          </template>
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="启用" value="active" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-form-item>
      </el-form>
    </SunlightDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { SunlightDrawer } from 'sunlight-ui';
import { ElMessage } from 'element-plus';
import { Message } from '@element-plus/icons-vue';

// 抽屉显示状态
const drawerVisible = ref(false);

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  status: 'active'
});

// 处理确认按钮点击
const handleConfirm = () => {
  ElMessage.success('点击了确认按钮');
  console.log('表单数据:', formData);
  drawerVisible.value = false;
};

// 处理取消按钮点击
const handleCancel = () => {
  ElMessage.info('点击了取消按钮');
};
</script>

<style scoped>
.custom-label-form {
  padding: 10px 0;
}

/* 自定义样式标签 */
.custom-label-item :deep(.el-form-item__label) {
  font-weight: bold;
  color: #67C23A;
  font-size: 15px;
}

/* 带图标标签 */
.label-with-icon {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.label-with-icon .el-icon {
  color: #409EFF;
}

/* 带必填标记的自定义标签 */
.custom-required-label {
  display: flex;
  align-items: center;
  gap: 4px;
}

.required-mark {
  color: #F56C6C;
  font-size: 14px;
  margin-right: 4px;
}

/* 多行标签 */
.multi-line-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.multi-line-label small {
  font-size: 11px;
  color: #909399;
  font-weight: normal;
}

/* 自定义颜色标签 */
.color-label {
  color: #E6A23C;
  font-weight: bold;
}
</style>