<template>
  <div>
    <el-button type="primary" @click="drawerVisible = true">打开自定义底部抽屉</el-button>

    <SunlightDrawer
      v-model:visible="drawerVisible"
      drawer-title="自定义底部"
      drawer-size="50%"
      content-height="400"
      @on-confirm="handleConfirm"
      @on-cancel="handleCancel"
    >
      <div class="drawer-content">
        <p>这是一个自定义底部的抽屉示例，您可以通过插槽自定义底部的按钮和布局。</p>
        <p>底部区域可以包含多个按钮、不同样式的按钮，或者其他自定义内容。</p>
      </div>
      
      <!-- 底部上方的额外内容 -->
      <template #footer-top>
        <div class="footer-top-content">
          <el-divider />
          <div class="additional-info">
            <el-icon><InfoFilled /></el-icon>
            <span>点击"确认"将保存当前设置，点击"取消"将关闭抽屉。</span>
          </div>
        </div>
      </template>
      
      <!-- 自定义底部按钮 -->
      <template #footer="{ handleConfirmClick, handleCancelClick }">
        <div class="custom-footer">
          <!-- 左侧按钮 -->
          <div class="footer-left">
            <el-button type="info" @click="handleReset">重置</el-button>
            <el-button type="warning" @click="handlePreview">预览</el-button>
          </div>
          
          <!-- 右侧按钮 -->
          <div class="footer-right">
            <el-button @click="handleCancelClick">取消</el-button>
            <el-button type="primary" :loading="isLoading" @click="handleConfirmClick">
              <el-icon v-if="isLoading"><Loading /></el-icon>
              <span>确认</span>
            </el-button>
            <el-button type="success" @click="handleSaveAndContinue">保存并继续</el-button>
          </div>
        </div>
      </template>
    </SunlightDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightDrawer } from 'sunlight-ui';
import { ElMessage } from 'element-plus';
import { InfoFilled, Loading } from '@element-plus/icons-vue';

// 抽屉显示状态
const drawerVisible = ref(false);

// 加载状态
const isLoading = ref(false);

// 处理确认按钮点击
const handleConfirm = () => {
  isLoading.value = true;
  
  // 模拟异步操作
  setTimeout(() => {
    isLoading.value = false;
    ElMessage.success('点击了确认按钮');
    drawerVisible.value = false;
  }, 1500);
};

// 处理取消按钮点击
const handleCancel = () => {
  ElMessage.info('点击了取消按钮');
};

// 处理重置按钮点击
const handleReset = () => {
  ElMessage.warning('点击了重置按钮');
};

// 处理预览按钮点击
const handlePreview = () => {
  ElMessage.info('点击了预览按钮');
};

// 处理保存并继续按钮点击
const handleSaveAndContinue = () => {
  ElMessage.success('点击了保存并继续按钮');
};
</script>

<style scoped>
.drawer-content {
  padding: 20px;
  line-height: 1.8;
}

/* 底部上方内容 */
.footer-top-content {
  margin: 10px 0;
}

.additional-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #909399;
  font-size: 14px;
  margin-top: 10px;
}

/* 自定义底部样式 */
.custom-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
}

.footer-left,
.footer-right {
  display: flex;
  gap: 10px;
}
</style>