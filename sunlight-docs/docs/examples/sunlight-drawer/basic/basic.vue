<template>
  <div>
    <el-button type="primary" @click="drawerVisible = true">打开抽屉</el-button>
    <el-button type="success" @click="drawerVisibleLtr = true">从左侧打开</el-button>
    <el-button type="warning" @click="drawerVisibleTtb = true">从上侧打开</el-button>

    <!-- 右侧抽屉 -->
    <SunlightDrawer
      v-model:visible="drawerVisible"
      drawer-title="基础抽屉"
      content-height="600"
      @on-confirm="handleConfirm"
      @on-cancel="handleCancel"
    >
      <div class="drawer-content">
        <p>这是一个基础的 SunlightDrawer 抽屉示例。</p>
        <p>该组件基于 Element Plus Drawer 封装，提供了更多增强功能：</p>
        <ul>
          <li>支持自定义宽度和方向</li>
          <li>支持自适应内容高度</li>
          <li>灵活的底部按钮配置</li>
          <li>支持全屏切换功能</li>
        </ul>
        <p>您可以通过点击右上角的全屏图标切换全屏模式。</p>
      </div>
    </SunlightDrawer>

    <!-- 左侧抽屉 -->
    <SunlightDrawer
      v-model:visible="drawerVisibleLtr"
      drawer-title="左侧抽屉"
      drawer-direction="ltr"
      drawer-size="40%"
      content-height="500"
      @on-confirm="handleConfirmLtr"
      @on-cancel="handleCancel"
    >
      <div class="drawer-content">
        <p>这是一个从左侧打开的抽屉示例。</p>
        <p>抽屉方向可以通过 drawerDirection 属性设置，支持以下值：</p>
        <ul>
          <li>rtl: 从右侧打开（默认）</li>
          <li>ltr: 从左侧打开</li>
          <li>ttb: 从上侧打开</li>
          <li>btt: 从下侧打开</li>
        </ul>
      </div>
    </SunlightDrawer>

    <!-- 上侧抽屉 -->
    <SunlightDrawer
      v-model:visible="drawerVisibleTtb"
      drawer-title="上侧抽屉"
      drawer-direction="ttb"
      drawer-size="50%"
      content-height="300"
      @on-confirm="handleConfirmTtb"
      @on-cancel="handleCancel"
    >
      <div class="drawer-content">
        <p>这是一个从上侧打开的抽屉示例。</p>
        <p>您可以通过 drawerSize 属性设置抽屉的大小，支持百分比和像素值。</p>
      </div>
    </SunlightDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SunlightDrawer } from 'sunlight-ui';
import { ElMessage } from 'element-plus';

// 抽屉显示状态
const drawerVisible = ref(false);
const drawerVisibleLtr = ref(false);
const drawerVisibleTtb = ref(false);

// 处理右侧抽屉确认按钮点击
const handleConfirm = () => {
  ElMessage.success('右侧抽屉 - 点击了确认按钮');
  drawerVisible.value = false;
};

// 处理左侧抽屉确认按钮点击
const handleConfirmLtr = () => {
  ElMessage.success('左侧抽屉 - 点击了确认按钮');
  drawerVisibleLtr.value = false;
};

// 处理上侧抽屉确认按钮点击
const handleConfirmTtb = () => {
  ElMessage.success('上侧抽屉 - 点击了确认按钮');
  drawerVisibleTtb.value = false;
};

// 处理取消按钮点击
const handleCancel = () => {
  ElMessage.info('点击了取消按钮');
};
</script>

<style scoped>
.drawer-content {
  padding: 20px;
  line-height: 1.8;
}

.drawer-content ul {
  margin: 10px 0;
  padding-left: 20px;
}

.drawer-content li {
  margin-bottom: 5px;
}
</style>