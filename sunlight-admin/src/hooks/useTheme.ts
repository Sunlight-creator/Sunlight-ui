import { storeToRefs } from 'pinia'
import { useGlobalStore, defaultPrimary } from '@/store/modules/global'
import { getLightColor, getDarkColor } from '@/utils/color'
import { setSunlightPrimary } from '@/plugins/sunlightTheme'

/**
 * @description 全局主题 hooks
 * */
export const useTheme = () => {
  const globalStore = useGlobalStore()
  const { primary } = storeToRefs(globalStore)

  // 设置主题颜色
  function changePrimary(val: string | null) {
    if (!val) {
      // 当清空主题颜色时需要把默认值替换上
      val = defaultPrimary
    }
    const html = document.documentElement as HTMLElement
    // 设置 elementplus 默认主题颜色
    html.style.setProperty('--el-color-primary', val)
    // 设置 elementplus 点击时颜色
    const primaryClickClr = `${getDarkColor(val, 0.3)}`
    document.documentElement.style.setProperty('--el-color-primary-dark-2', primaryClickClr)
    // 设置主题相关高亮颜色
    for (let i = 1; i <= 9; i++) {
      const primaryColor = `${getLightColor(val, i / 10)}`
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
    }
    
    // 同时更新 Sunlight UI 主题颜色
    setSunlightPrimary(val)
    
    globalStore.setGlobalState('primary', val)
  }

  // 初始化主题
  function initTheme() {
    changePrimary(primary.value)
  }

  return { changePrimary, initTheme }
}
