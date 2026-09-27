# domweb

云术工作室域名说明页（Vue 3 + Vite）。访问者打开工作室持有的某个域名时，页面会说明
该域名的归属，并提供前往官网 [www.cldery.com](https://www.cldery.com) 的入口。

界面沿用官网（`E:\.Cloudery\Website\official-site`）的 Material Design 3 设计语言：
同一套配色令牌、字体、形状、海拔与动效曲线。

## 结构

```
index.html                       # 首屏前解析主题，避免亮色闪烁
public/favicon.svg               # 工作室标记（与官网一致）
public/fonts/…                   # 自托管的 Roboto Flex（拉丁子集）
src/main.js                      # 挂载应用、注册 v-ripple、初始化主题
src/App.vue                      # 页面本体
src/icons.js                     # Material Symbols / Simple Icons 内联图标
src/components/m3/               # M3 组件：Button / IconButton / Icon
src/composables/useTheme.js      # light / dark / system，键名 cloudery-theme
src/directives/ripple.js         # v-ripple
src/styles/
  index.css                      # 样式入口（顺序有意义）
  fonts.css                      # @font-face
  m3-color-tokens.css            # 颜色角色，由官网生成器产出，勿手改
  m3-foundations.css             # 字体阶、形状、海拔、动效、状态层令牌
  base.css                       # 重置、文档外壳、焦点、涟漪、状态层
  motion.css                     # 主题切换交叉淡入、共享关键帧
```

## 配色

`src/styles/m3-color-tokens.css` 由官网的 `scripts/generate-m3-theme.mjs` 生成
（三来源 HCT 组合：品牌蓝 `#2563EB`、强调青 `#0E7490`、中性色相 255）。要调整配色，
在官网目录执行 `pnpm theme`，然后把生成的文件复制到本项目的 `src/styles/`，两个站点即可
保持一致。

## 开发与构建

```bash
pnpm install
pnpm dev
pnpm build      # 产物在 dist/
pnpm preview
```

## 说明

- 深浅色跟随系统，右上角按钮可手动切换，选择会记在 `localStorage` 的
  `cloudery-theme` 中（与官网共用）。
- 动效遵循 `prefers-reduced-motion`：只把时长与位移裁剪得更短，不整体关闭。
- 页面不请求任何第三方资源，域名与年份在前端读取。