import { defineConfig } from "vitepress";
import { fileURLToPath } from "node:url";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { sunlightConfig } from "./sunlightConfig";

const description = [
  "Sunlight UI 后台管理系统",
  "Sunlight UI 是一个基于 Vue3、TypeScript、Vite、Pinia、Element-Plus 搭建的现代 Template 管理系统模板",
].toString();

export default defineConfig({
  extends: sunlightConfig,
  title: "Sunlight UI",
  description: description,
  cleanUrls: false,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.ico" }],
    ["link", { rel: "icon", type: "image/png", href: "/favicon.ico" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "Sunlight UI" }],
    ["meta", { property: "og:site_name", content: "Sunlight UI" }],
    ["meta", { property: "og:image", content: "" }],
    ["meta", { property: "og:url", content: "" }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { name: "description", content: description }],
    ["meta", { name: "author", content: "Sunlight-creator" }],
    // [
    //   "meta",
    //   {
    //     name: "viewport",
    //     content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
    //   },
    // ],
    ["meta", { name: "keywords", content: description }],
    ["meta", { name: "msvalidate.01", content: "48CABE70F538B8D117567176ABF325AF" }], // Bing 收录验证
  ],
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载
      lazyLoading: true,
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./theme", import.meta.url)),
        // 配置 sunlight-ui 指向本地源码目录
        "sunlight-ui": fileURLToPath(new URL("../../../packages/Sunlight-ui/src", import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000, 
      watch: {
        ignored: ['!**/examples/**', '!**/design/**', '!**/ecosystem/**']
      }
    },
    plugins: [vueJsx()],
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true // 静默依赖警告
        }
      }
    },
  },
  sitemap: {
    hostname: "https://mysunlight.cn/",
    transformItems: items => {
      const permalinkItemBak: typeof items = [];
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks;
      items.forEach(item => {
        const permalink = permalinks?.map[item.url];
        if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
      });
      return [...items, ...permalinkItemBak];
    },
  },
  themeConfig: {
    logo: "/favicon.ico",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: "💡 指南", link: "/guide/" },
      // { text: "🛠️ 构建", link: "/structure/" },
      { text: "🎉 生态", link: "/ecosystem/components/" },
      { text: "🎨 设计", link: "/design/colors-panel/" },
      // { text: "✨ 示例", link: "/examples/" },
      { text: "🌟 赞赏", link: "/personal/" }, 
      {
        text: "🔗 链接",
        items: [
          {
            text: "预览地址",
            link: "http://case.mysunlight.cn/",
          },
          {
            text: "Github 源码",
            link: "https://github.com/Sunlight-creator/Sunlight-ui.git",
          },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Sunlight-creator/Sunlight-ui.git",
      },
    ],
    search: {
      provider: "local",
    },
    // 显式配置侧边栏
    sidebar: {
      "/guide/": [
        {
          text: "开始指南",
          link: "/guide/01.start/",
          items: [
            { text: "介绍", link: "/guide/01.start/01.introduce" },
            { text: "快速开始", link: "/guide/01.start/05.quick-start" },
            { text: "项目案例", link: "/guide/01.start/10.directory" }
          ]
        }
      ],
      "/examples/": [
        {
          text: "示例代码",
          link: "/examples/",
          items: [
            {
              text: "基础输入组件",
              items: [
                { text: "输入框", link: "/examples/sunlight-input/" },
                { text: "选择器", link: "/examples/sunlight-select/" },
                { text: "文本域", link: "/examples/sunlight-textarea/" },
                { text: "级联选择器", link: "/examples/sunlight-cascader/" },
              ],
            },
            {
              text: "选择组件",
              items: [
                { text: "复选框", link: "/examples/sunlight-checkbox/" },
                { text: "单选框", link: "/examples/sunlight-radio/" },
                { text: "日期选择器", link: "/examples/sunlight-date-picker/" },
              ],
            },
            {
              text: "容器组件",
              items: [
                { text: "对话框", link: "/examples/sunlight-dialog/" },
                { text: "抽屉", link: "/examples/sunlight-drawer/" },
              ],
            },
            {
              text: "数据展示组件",
              items: [
                { text: "表格", link: "/examples/sunlight-table/" },
                { text: "单张图片上传", link: "/examples/sunlight-image/" },
                { text: "多张图片上传", link: "/examples/sunlight-images/" },
              ],
            },
            {
              text: "高级组件",
              items: [
                { text: "表单", link: "/examples/sunlight-form/" },
                { text: "三级联动", link: "/examples/sunlight-three/" },
              ],
            },
          ],
        },
      ],
      "/ecosystem/components/": [
        {
          text: "组件",
          link: "/ecosystem/components/",
          items: [
            {
              text: "基础组件",
              items: [
                {
                  text: "输入框",
                  link: "/ecosystem/components/02.sunlight-input/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/02.sunlight-input/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/02.sunlight-input/20.custom-style" },
                    { text: "事件处理", link: "/ecosystem/components/02.sunlight-input/30.event-handling" },
                  ],
                },
                {
                  text: "选择器",
                  link: "/ecosystem/components/03.sunlight-select/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/03.sunlight-select/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/03.sunlight-select/20.custom-style" },
                    { text: "自定义模板", link: "/ecosystem/components/03.sunlight-select/30.custom-template" },
                    { text: "事件处理", link: "/ecosystem/components/03.sunlight-select/30.event-handling" },
                    { text: "多选功能", link: "/ecosystem/components/03.sunlight-select/40.multiple" },
                  ],
                },
                {
                  text: "日期选择器",
                  link: "/ecosystem/components/04.sunlight-date-picker/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/04.sunlight-date-picker/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/04.sunlight-date-picker/20.custom-style" },
                    { text: "事件处理", link: "/ecosystem/components/04.sunlight-date-picker/50.event-handling" },
                  ],
                },
                {
                  text: "文本域",
                  link: "/ecosystem/components/06.sunlight-textarea/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/06.sunlight-textarea/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/06.sunlight-textarea/20.custom-style" },
                    { text: "事件处理", link: "/ecosystem/components/06.sunlight-textarea/50.event-handling" },
                  ],
                },
                {
                  text: "级联选择器",
                  link: "/ecosystem/components/07.sunlight-cascader/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/07.sunlight-cascader/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/07.sunlight-cascader/20.custom-style" },
                    { text: "事件处理", link: "/ecosystem/components/07.sunlight-cascader/30.event-handling" },
                  ],
                },
                {
                  text: "复选框",
                  link: "/ecosystem/components/08.sunlight-checkbox/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/08.sunlight-checkbox/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/08.sunlight-checkbox/20.custom-style" },
                    { text: "事件处理", link: "/ecosystem/components/08.sunlight-checkbox/30.event-handling" },
                  ],
                },
                {
                  text: "单选框",
                  link: "/ecosystem/components/09.sunlight-radio/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/09.sunlight-radio/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/09.sunlight-radio/20.custom-style" },
                    { text: "事件处理", link: "/ecosystem/components/09.sunlight-radio/30.event-handling" },
                  ],
                },
                {
                  text: "三级联动",
                  link: "/ecosystem/components/10.sunlight-three/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/10.sunlight-three/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/10.sunlight-three/20.custom-style" },
                  ],
                },
                {
                  text: "单张图片上传",
                  link: "/ecosystem/components/11.sunlight-image/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/11.sunlight-image/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/11.sunlight-image/20.custom-style" },
                  ],
                },
                {
                  text: "多张图片上传",
                  link: "/ecosystem/components/12.sunlight-images/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/12.sunlight-images/10.basic" },
                    { text: "自定义样式", link: "/ecosystem/components/12.sunlight-images/20.custom-style" },
                  ],
                },
                {
                  text: "SunlightForm 表单组件",
                  link: "/ecosystem/components/13.sunlight-form/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/13.sunlight-form/10.basic" },
                    { text: "高级用法", link: "/ecosystem/components/13.sunlight-form/50.form-advance" },
                  ],
                },
                {
                  text: "SunlightTable 超级表格",
                  link: "/ecosystem/components/01.sunlight-table/",
                  items: [
                    { text: "基本用法", link: "/ecosystem/components/01.sunlight-table/10.basic" },
                    { text: "高级用法", link: "/ecosystem/components/01.sunlight-table/50.table-advance" },
                  ],
                },
                { text: "SunlightDialog 对话框", link: "/ecosystem/components/14.sunlight-dialog/" },
                { text: "SunlightDrawer 抽屉组件", link: "/ecosystem/components/15.sunlight-drawer/" },
              ],
            },
          ],
        },
      ],
      "/design/": [
        {
          text: "设计",
          link: "/design/components/",
          items: [
            { text: "颜色面板", link: "/design/colors-panel/" },
            {
              text: "组件设计",
              link: "/design/components/",
              items: [
                { text: "基础卡片", link: "/design/components/01sunlight-basic-card/" },
                { text: "进度卡片", link: "/design/components/02sunlight-progress-card/" },
                { text: "柱状图卡片", link: "/design/components/03sunlight-bar-chart-card/" },
                { text: "环形图卡片", link: "/design/components/04sunlight-donut-chart-card/" },
                { text: "折线图卡片", link: "/design/components/05sunlight-line-chart-card/" },
                { text: "large 柱状图卡片", link: "/design/components/06sunlight-large-bar-chart-card/" },
                { text: "large 环形图卡片", link: "/design/components/07sunlight-large-donut-chart-card/" },
                { text: "large 折线图卡片", link: "/design/components/08sunlight-large-line-chart-card/" },
                { text: "柱状图", link: "/design/components/09sunlight-bar-chart/" },
                { text: "双向堆叠柱状图", link: "/design/components/10sunlight-stacked-chart/" },
                { text: "水平柱状图", link: "/design/components/11sunlight-level-chart/" },
                { text: "K线图", link: "/design/components/12sunlight-k-line-chart/" },
                { text: "折线图", link: "/design/components/13sunlight-polyline-chart/" },
                { text: "雷达图", link: "/design/components/14sunlight-radar-chart/" },
                { text: "散点图", link: "/design/components/15sunlight-scatter-chart/" },
              ],
            },
          ],
        },
      ],
    },
  },
});
