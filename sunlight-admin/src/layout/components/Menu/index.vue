<template>
  <el-menu
    class="el-menu-custom"
    :default-active="activeMenu"
    :mode="globalStore.layout"
    :background-color="computedMenuBg"
    :text-color="computedMenuText"
    :active-text-color="computedMenuActiveText"
    :ellipsis="true"
    :collapse="isCollapse"
  >
    <template v-if="isVertical">
      <SubMenu v-for="routeItem in authRoutes" :key="routeItem.path" :item="routeItem" :base-path="routeItem.path" />
    </template>
    <template v-else>
      <div v-for="routeItem in authRoutes" :key="routeItem.path">
        <SubMenu :item="routeItem" :base-path="routeItem.path" />
      </div>
    </template>
  </el-menu>
</template>
<script lang="ts" setup name="Menu">
import SubMenu from '@/layout/components/Menu/SubMenu.vue'
import variables from '@/styles/variables.module.scss'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/store/modules/global'
import { useAuthStore } from '@/store/modules/auth'

const globalStore = useGlobalStore()
const authStore = useAuthStore()
const route = useRoute()

// 根据菜单风格计算菜单颜色
const computedMenuBg = computed(() => {
  switch (globalStore.menuStyle) {
    case 'dark':
      return variables.menuBg
    case 'light':
      return variables.menuBgLight
    default:
      return variables.menuBg
  }
})

const computedMenuText = computed(() => {
  switch (globalStore.menuStyle) {
    case 'dark':
      return variables.menuText
    case 'light':
      return variables.menuTextLight
    default:
      return variables.menuText
  }
})

const computedMenuActiveText = computed(() => {
  switch (globalStore.menuStyle) {
    case 'dark':
      return variables.menuActiveText
    case 'light':
      return variables.menuActiveTextLight
    default:
      return variables.menuActiveText
  }
})

// 是否是侧边栏菜单
const isVertical = computed(() => {
  return globalStore.layout === 'vertical'
})

const isCollapse = computed(() => {
  // 只有侧边栏模式的时候才能让折叠为开启状态
  return isVertical.value && globalStore.isCollapse
})

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) return meta.activeMenu
  return path
})

// 授权的路由
const authRoutes = computed(() => {
  return authStore.routes || []
})
</script>

<style scoped lang="scss">
.el-menu-custom {
  // 基础样式
  .el-menu-item,
  .el-sub-menu__title {
    height: 48px;
    line-height: 48px;
    margin: 0 10px;
    border-radius: 6px;
    transition: all 0.3s;
  }

  // 悬停样式
  .el-menu-item:hover,
  .el-sub-menu__title:hover {
    background-color: v-bind('globalStore.menuStyle === "light" ? "#f5f7fa" : "#263445"') !important;
  }

  // 激活样式
  .el-menu-item.is-active {
    background-color: v-bind('globalStore.menuStyle === "light" ? "rgba(64, 158, 255, 0.1)" : "#263445"') !important;
  }

  // 子菜单样式
  .el-sub-menu {
    .el-menu {
      background-color: v-bind('globalStore.menuStyle === "light" ? "#f5f7fa" : "#1f2d3d"') !important;

      .el-menu-item,
      .el-sub-menu__title {
        margin: 0 5px;

        &:hover {
          background-color: v-bind('globalStore.menuStyle === "light" ? "#ebeef5" : "#001528"') !important;
        }
      }

      .el-menu-item.is-active {
        background-color: v-bind(
          'globalStore.menuStyle === "light" ? "rgba(64, 158, 255, 0.1)" : "#001528"'
        ) !important;
      }
    }
  }
}
</style>
