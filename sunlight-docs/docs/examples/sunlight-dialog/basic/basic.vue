<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">打开对话框</el-button>

    <SunlightDialog
      v-model:visible="dialogVisible"
      dialog-title="基本对话框"
      content-height="400"
      @on-confirm="handleConfirm"
      @on-cancel="handleCancel"
    >
      <div class="dialog-content">
        <p>这是一个基本的 SunlightDialog 对话框示例。</p>
        <p>该组件基于 Element Plus Dialog 封装，提供了更多增强功能：</p>
        <ul>
          <li>支持全屏切换</li>
          <li>支持拖拽功能</li>
          <li>可自定义内容高度</li>
          <li>灵活的底部按钮配置</li>
        </ul>
        <p>您可以通过点击右上角的全屏图标切换全屏模式，或者通过拖拽对话框标题栏移动对话框位置。</p>
      </div>
    </SunlightDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightDialog } from 'sunlight-ui';
import { ElMessage } from 'element-plus';

// 对话框显示状态
const dialogVisible = ref(false);

// 处理确认按钮点击
const handleConfirm = () => {
  ElMessage.success('点击了确认按钮');
  dialogVisible.value = false;
};

// 处理取消按钮点击
const handleCancel = () => {
  ElMessage.info('点击了取消按钮');
};
</script>

<style scoped>
.dialog-content {
  padding: 20px;
  line-height: 1.8;
}

.dialog-content ul {
  margin: 10px 0;
  padding-left: 20px;
}

.dialog-content li {
  margin-bottom: 5px;
}
</style>