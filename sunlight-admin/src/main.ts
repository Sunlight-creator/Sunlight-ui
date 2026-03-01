import { createApp } from 'vue'
import '@/styles/index.scss' // global css
import App from './App.vue'
import Pinia from './store'
import router from './router'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register' // 引入注册脚本
import SvgIcon from '@/components/SvgIcon/index.vue'
import I18n from '@/languages/index'
import VueGridLayout from 'vue-grid-layout'
import directives from '@/directives' // 自定义指令
import JsonViewer from 'vue3-json-viewer'
import SunlightUI from 'sunlight-ui'
// 2.4.x 不再提供 dist/index.css，改为直接引入主样式文件
import 'vue3-json-viewer/dist/vue3-json-viewer.css'
// 在开发环境中不需要导入构建后的样式文件
// import echarts from 'echarts'  //引入echarts
// import 'echarts-liquidfill'

// 导入主题插件
import { sunlightThemePlugin } from '@/plugins/sunlightTheme'

const app = createApp(App)
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})
app.component('SvgIcon', SvgIcon)
app.use(ElementPlus)
app.use(VueGridLayout)
app.use(SunlightUI)
app.use(VueGridLayout)
app.use(JsonViewer)
app.use(I18n)
app.use(Pinia)
app.use(directives)
app.use(sunlightThemePlugin)
app.use(router)
app.mount('#app')
