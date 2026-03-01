<template>
  <el-dropdown trigger="click" :teleported="false" class="more-dropdown">
    <el-button size="small" class="more-button">
      <span>{{ $t('tabs.more') }}</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="more-dropdown-menu">
        <!-- 关闭当前 -->
        <el-dropdown-item @click="closeCurrentTab" class="dropdown-item">
          <el-icon class="item-icon"><Remove /></el-icon>
          <span class="item-text">{{ $t('tabs.closeCurrent') }}</span>
        </el-dropdown-item>
        <!-- 关闭其它 -->
        <el-dropdown-item @click="closeOtherTab" class="dropdown-item">
          <el-icon class="item-icon"><CircleClose /></el-icon>
          <span class="item-text">{{ $t('tabs.closeOther') }}</span>
        </el-dropdown-item>
        <!-- 关闭所有 -->
        <el-dropdown-item @click="closeAllTab" class="dropdown-item">
          <el-icon class="item-icon"><FolderDelete /></el-icon>
          <span class="item-text">{{ $t('tabs.closeAll') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/store/modules/tabs'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const tabStore = useTabsStore()
const keepAliveStore = useKeepAliveStore()

// Close Current
const closeCurrentTab = () => {
  if (route.fullPath === '/home') return
  tabStore.removeTabs(route.fullPath)
  keepAliveStore.removeKeepAliveName(route.name as string)
}

// Close Other
const closeOtherTab = () => {
  tabStore.closeMultipleTab(route.fullPath)
  keepAliveStore.setKeepAliveName([route.name] as string[])
}

// Close All
const closeAllTab = () => {
  tabStore.closeMultipleTab()
  keepAliveStore.setKeepAliveName()
  router.push('/')
}
</script>

<style scoped lang="scss">
// 颜色变量
$primary-color: var(--el-color-primary);
$text-color: #303133;
$text-color-secondary: #606266;
$border-color: #ebeef5;
$bg-color: var(--el-bg-color);
$bg-color-hover: #f5f7fa;

// 阴影
$shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.06);
$shadow-md: 0 3px 10px rgba(0, 0, 0, 0.1);

// 过渡动画
$transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

.more-dropdown {
  .more-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0 12px;
    margin: 0;
    font-size: 13px;
    font-weight: 400;
    color: $primary-color;
    background-color: transparent;
    border: 1px solid $primary-color;
    border-radius: 6px;
    transition: $transition;

    &:hover {
      color: white;
      background-color: $primary-color;
      box-shadow: $shadow-sm;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0) scale(0.98);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .el-icon--right {
      margin-left: 6px;
      font-size: 12px;
      transition: $transition;

      .more-button:hover & {
        transform: rotate(180deg);
      }
    }
  }

  .more-dropdown-menu {
    min-width: 160px;
    margin-top: 8px;
    padding: 4px 0;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border: 1px solid $border-color;
    background-color: $bg-color;
    overflow: hidden;

    .dropdown-item {
      display: flex;
      align-items: center;
      height: 36px;
      padding: 0 16px;
      margin: 0;
      font-size: 13px;
      font-weight: 400;
      color: $text-color;
      transition: $transition;
      border: none;

      &:hover {
        color: $primary-color;
        background-color: $bg-color-hover;
      }

      &:active {
        background-color: rgba(24, 144, 255, 0.1);
      }

      .item-icon {
        margin-right: 10px;
        font-size: 14px;
        color: $text-color-secondary;
        transition: $transition;

        .dropdown-item:hover & {
          color: $primary-color;
        }
      }

      .item-text {
        flex: 1;
      }
    }
  }
}
</style>
