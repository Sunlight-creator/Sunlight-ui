<template>
  <div class="header-logo flx-center" :class="{ 'light-style': globalStore.menuStyle === 'light' }">
    <img v-if="logo" src="@/assets/image/598e912329ac1627eb7abb2092dc8b9.png" class="sidebar-logo" />
    <h1 class="sidebar-title" v-if="!isShowTitle">
      {{ title }}
    </h1>
  </div>
</template>

<script lang="ts" setup name="Logo">
import { reactive, toRefs, computed } from 'vue'
import { useGlobalStore } from '@/store/modules/global'
const globalStore = useGlobalStore()
const initData = reactive({
  title: 'Vue Sunlight Admin',
  logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20clean%20admin%20dashboard%20logo%20with%20blue%20color%20scheme%2C%20minimalist%20design%2C%20suitable%20for%20Vue%20Sunlight%20Admin%20system&image_size=square_hd'
})
const { title, logo } = toRefs(initData)
const isShowTitle = computed(() => {
  return globalStore.layout === 'vertical' && globalStore.isCollapse
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables.module.scss' as *;
.header-logo {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  max-width: $sideBarWidth;
  height: 100%;
  padding: 0 16px;
  .sidebar-logo {
    width: 26px;
    height: 26px;
    margin: 12px 0;
    vertical-align: middle;
  }
  .sidebar-title {
    display: inline-block;
    flex: 1;
    padding-left: 12px;
    margin: 0;
    overflow: hidden;
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 50px;
    color: #ffffff;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  // 浅色菜单风格
  &.light-style {
    background-color: #ffffff;
    border-bottom: 1px solid #ebeef5;

    .sidebar-title {
      color: #303133;
    }
  }
}
</style>
