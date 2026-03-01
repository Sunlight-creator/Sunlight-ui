import { App } from 'vue'
import { useGlobalStore } from '@/store/modules/global'
import { getLightColor, getDarkColor } from '@/utils/color'

/**
 * Sunlight UI 主题管理插件
 * 用于统一设置 Sunlight-ui 组件的主题样式
 */
export const sunlightThemePlugin = {
  install(app: App) {
    // 初始化主题
    initSunlightTheme()

    // 提供全局方法
    app.provide('$sunlightTheme', {
      updateTheme: initSunlightTheme,
      setPrimary: setSunlightPrimary
    })
  }
}

/**
 * 初始化 Sunlight UI 主题
 */
export function initSunlightTheme() {
  const globalStore = useGlobalStore()
  const { primary } = globalStore
  // 设置基础主题颜色
  setSunlightPrimary(primary)
}

/**
 * 设置 Sunlight UI 主题颜色
 * @param color 主题颜色
 */
export function setSunlightPrimary(color: string) {
  const html = document.documentElement as HTMLElement

  // 计算衍生颜色
  const lightColor = getLightColor(color, 0.2)
  const darkColor = getDarkColor(color, 0.3)
  const hoverColor = darkColor

  // 设置 Sunlight UI 基础变量
  html.style.setProperty('--sunlight-primary', color)
  html.style.setProperty('--sunlight-primary-hover', hoverColor)
  html.style.setProperty('--sunlight-primary-dark', darkColor)
  html.style.setProperty('--sunlight-primary-light', lightColor)

  // 设置输入框相关变量
  html.style.setProperty('--sunlight-input-border', '#c0c4cc')
  html.style.setProperty('--sunlight-input-focus-border', color)
  html.style.setProperty('--sunlight-input-focus-shadow', `0 0 0 3px ${color}20`)

  // 设置按钮相关变量
  html.style.setProperty('--sunlight-button-primary-bg', color)
  html.style.setProperty('--sunlight-button-primary-hover', hoverColor)

  // 设置选择器相关变量
  html.style.setProperty('--sunlight-select-border', '#c0c4cc')
  html.style.setProperty('--sunlight-select-focus-border', color)

  // 设置文本域相关变量
  html.style.setProperty('--sunlight-textarea-border', '#c0c4cc')
  html.style.setProperty('--sunlight-textarea-focus-border', color)
}
