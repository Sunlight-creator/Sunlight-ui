import { defineTeekConfig } from "vitepress-theme-teek/config";

export const sunlightConfig = defineTeekConfig({
  teekHome: false,
  themeEnhance: {
    layoutSwitch: {
      defaultMode: "bothWidthAdjustable",
    },
  },
  author: { name: "Sunlight-creator", link: "https://github.com/Sunlight-creator/Sunlight-ui.git" },
  docAnalysis: {
    createTime: "2021-10-19",
  },
  footerInfo: {

    // 备案信息
    securityRecord: {
      icon: "/qrcode/备案图标.png",
      link: "https://beian.mps.gov.cn/#/query/webSearch?code=23128202000167",
    },
    theme: {
      name: "黑公网安备23128202000167号",
      link: "https://beian.mps.gov.cn/#/query/webSearch?code=23128202000167",
    },
  },
  codeBlock: {
    copiedDone: TkMessage => TkMessage.success("复制成功！"),
  },
  articleShare: { enabled: true },
  articleUpdate: { enabled: false },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
      titleFormMd: true, // 是否从 index.md 文件获取一级标题作为目录名
      ignoreIndexMd: true, // 不扫描 index.md 作为侧边栏
    },
  },
});
