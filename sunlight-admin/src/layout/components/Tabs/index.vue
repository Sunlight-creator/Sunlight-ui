<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <svg-icon :name="item.icon" class="tabs-icon" v-show="item.icon && tabsIcon"></svg-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs'
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@/store/modules/global'
import { useTabsStore } from '@/store/modules/tabs'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
import { TabsPaneContext, TabPaneName } from 'element-plus'
import MoreButton from './components/MoreButton.vue'

const route = useRoute()
const router = useRouter()
const tabStore = useTabsStore()
const globalStore = useGlobalStore()
const keepAliveStore = useKeepAliveStore()

const tabsMenuValue = ref(route.fullPath)
const tabsMenuList = computed(() => tabStore.tabsMenuList)
const tabsIcon = computed(() => globalStore.tabsIcon)

onMounted(() => {
  tabsDrop()
  initTabs()
})

// 监听路由的变化（防止浏览器后退/前进不变化）
watch(
  () => route.fullPath,
  () => {
    tabsMenuValue.value = route.fullPath
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: route.fullPath !== '/home' ? true : false
    }
    tabStore.addTabs(tabsParams)
    route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string)
  },
  { immediate: true }
)

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector('.el-tabs__nav') as HTMLElement, {
    draggable: '.el-tabs__item', // 指定那些元素可以被拖拽
    animation: 300, // 动画时间
    onEnd({ newIndex, oldIndex }) {
      // 拖拽结束事件
      // 取当前位置的项插入到新索引下的位置，更新tabsMenuList数组
      const tabsList = [...tabStore.tabsMenuList]
      const currRow = tabsList.splice(oldIndex as number, 1)[0]
      tabsList.splice(newIndex as number, 0, currRow)
      tabStore.setTabs(tabsList)
    }
  })
}

// 初始化需要固定的 tabs
const initTabs = () => {
  const baseTab = [
    {
      icon: 'menu-home',
      title: '首页',
      path: '/home',
      name: 'Home',
      close: false
    }
  ]
  // 避免登录情况下已经有除首页外的指定路由，那会在tab组件渲染之前在store变量内记录路由数据
  // store内有的话就放置在首页后面
  const oldTabs = tabStore.tabsMenuList.filter((item: any) => item.title !== '首页')
  // 定制新的tabs列表
  tabStore.setTabs(baseTab.concat(oldTabs as []))
}

// 跳转
const tabClick = (tabItem: TabsPaneContext) => {
  router.push(tabItem.props.name as string)
}

// 删除tab
const tabRemove = (fullPath: TabPaneName) => {
  const name = tabStore.tabsMenuList.filter(item => item.path == fullPath)[0].name || ''
  keepAliveStore.removeKeepAliveName(name)
  tabStore.removeTabs(fullPath as string, fullPath == route.fullPath)
}
</script>

<style scoped lang="scss">
// 颜色变量
$primary-color: var(--el-color-primary);
$primary-light: rgba(24, 144, 255, 0.1);
$text-color: #303133;
$text-color-secondary: #606266;
$text-color-light: #afafaf;
$border-color: #ebeef5;
$bg-color: var(--el-bg-color);
$bg-color-hover: #f5f7fa;

// 阴影
$shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.06);
$shadow-md: 0 3px 10px rgba(0, 0, 0, 0.1);

// 过渡动画
$transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

.tabs-box {
  background-color: $bg-color;
  border-bottom: 1px solid $border-color;
  box-shadow: $shadow-sm;
  position: relative;

  .tabs-menu {
    position: relative;
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;

    .el-dropdown {
      position: absolute;
      top: 8px;
      right: 12px;
      z-index: 10;

      .el-dropdown__trigger {
        padding: 4px 8px;
        border-radius: 4px;
        transition: $transition;

        &:hover {
          background-color: $bg-color-hover;
          box-shadow: $shadow-sm;
        }
      }
    }

    :deep(.el-tabs) {
      flex: 1;
      height: 100%;

      .el-tabs__header {
        box-sizing: border-box;
        height: 100%;
        padding: 0 16px;
        margin: 0;
        background-color: $bg-color;

        .el-tabs__nav-wrap {
          position: relative;
          width: calc(100% - 100px);
          height: 100%;

          .el-tabs__nav-scroll {
            height: 100%;
            overflow-x: auto;
            overflow-y: hidden;

            &::-webkit-scrollbar {
              height: 3px;
            }

            &::-webkit-scrollbar-track {
              background: transparent;
            }

            &::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.1);
              border-radius: 2px;

              &:hover {
                background: rgba(0, 0, 0, 0.2);
              }
            }
          }

          .el-tabs__nav {
            display: flex;
            align-items: center;
            height: 100%;
            border: none;
            padding: 0;

            .el-tabs__item {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 32px;
              margin: 0 8px;
              padding: 0 16px;
              color: $text-color-secondary;
              font-size: 13px;
              font-weight: 400;
              border: none;
              border-radius: 6px;
              transition: $transition;
              position: relative;
              background-color: transparent;

              &:first-child {
                margin-left: 0;
              }

              &:hover {
                color: $primary-color;
                background-color: $primary-light;
                transform: translateY(-1px);
                box-shadow: $shadow-sm;
              }

              &:active {
                transform: translateY(0) scale(0.98);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
              }

              .tabs-icon {
                margin: 0 6px 0 0;
                font-size: 14px;
                color: inherit;
                transition: $transition;
              }

              .is-icon-close {
                margin: 0 0 0 8px;
                padding: 2px;
                border-radius: 50%;
                transition: $transition;
                opacity: 0.6;

                &:hover {
                  background-color: rgba(0, 0, 0, 0.1);
                  opacity: 1;
                }
              }

              &.is-active {
                color: white;
                font-weight: 500;
                background-color: $primary-color;
                transform: translateY(-1px);
                box-shadow: $shadow-md;

                &:hover {
                  background-color: #40a9ff;
                }

                &:active {
                  transform: translateY(0) scale(0.98);
                  box-shadow: 0 2px 6px rgba(24, 144, 255, 0.3);
                }

                .tabs-icon {
                  color: white;
                }

                .is-icon-close {
                  color: white;
                  opacity: 0.8;

                  &:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                  }

                  &:active {
                    transform: scale(0.9);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .tabs-box {
    .tabs-menu {
      height: 40px;

      :deep(.el-tabs) {
        .el-tabs__header {
          padding: 0 12px;

          .el-tabs__nav-wrap {
            width: calc(100% - 90px);

            .el-tabs__nav {
              .el-tabs__item {
                padding: 0 12px;
                margin: 0 6px;
                font-size: 12px;

                .tabs-icon {
                  font-size: 13px;
                  margin-right: 4px;
                }

                .is-icon-close {
                  margin-left: 6px;
                  padding: 1px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
