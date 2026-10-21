# 青竹蜂云剑阵（The Sword Array）

青竹蜂云剑阵 (The Sword Array) /大庚剑阵

**在线体验：** [theswordarray.pages.dev](https://theswordarray.pages.dev/)

一个通过手势控制的浏览器 3D 剑阵演示。将手伸到摄像头前，即可切换游龙、护盾、莲花和大庚剑阵，体验指尖御剑的效果。

## 源码来源与致谢

**原始代码来源：哔哩哔哩 UP 主 [一只喵猫Miao](https://space.bilibili.com/8940668)。** 本仓库用于源码整理、分析与部署，保留原始代码和说明文档中的作者署名。

原视频：[Gemini 3.0手搓能手势控制的凡人大庚剑阵让Gemini复刻了凡人修仙传的飞剑效果，手势操作万剑归宗的效果拉满了！](https://www.bilibili.com/video/BV1tprgBkE35/) · [分享链接](https://b23.tv/GVBNgUQ)

原 React 版说明中还保留了“Created by User & Gemini 3.0”的署名。详见 [React 版原始说明](React/说明文档.md)和 [HTML 版原始说明](HTML/说明文档.md)。

## 本地运行

使用与锁定的 Vite 依赖兼容的 Node.js 环境，例如 Node.js 22 系列中的 22.12 或更高版本。

```bash
git clone https://github.com/NicoleZ-code/TheSwordArray.git
cd TheSwordArray/React
npm ci
npm run dev
```

打开 Vite 在终端中输出的本地地址，并允许浏览器访问摄像头。手势识别需要浏览器支持摄像头、图形渲染和模型运行环境。远程访问请使用上方的 HTTPS 在线地址；建议在光线充足的环境下横屏体验。

## 手势操作

点击页面右上角的 **「手势示例」** 按钮，即可查看图解。支持点击关闭按钮、点击弹窗外的遮罩或按 Esc 关闭。

以下为按识别规则绘制的手势示意图及其界面截图，不是真实摄像头照片。

| 示例图 | 手势 | 剑阵效果 |
| --- | --- | --- |
| <img src="doc/gestures/dragon-sword.png" width="210" alt="双指剑诀：食指、中指伸直，其他手指弯曲" /> | 食指、中指伸直，其余手指弯曲 | 游龙随行：飞剑跟随指尖移动 |
| <img src="doc/gestures/dragon-gun.png" width="210" alt="手枪手势：拇指、食指伸直，其余三指弯曲" /> | 拇指、食指伸直，其余三指弯曲 | 游龙随行：另一种御剑手势 |
| <img src="doc/gestures/lotus.png" width="210" alt="张开手掌：四根长指伸直" /> | 自然张开手掌 | 莲花现世：飞剑形成旋转的盘状剑莲 |
| <img src="doc/gestures/shield.png" width="210" alt="握紧拳头：五指收拢" /> | 五指收拢握拳 | 剑盾护体：飞剑形成球形护盾阵型 |
| <img src="doc/gestures/dageng.png" width="210" alt="摇滚手势：食指、小指伸直，中指、无名指弯曲" /> | 食指、小指伸直，中指、无名指弯曲 | 大庚剑阵：同心剑环、雷电与法阵 |

切换手势后保持约 250 毫秒，系统才会确认新阵型。当前识别规则中，仅伸出食指会进入护盾阵型；触发游龙请使用上表中的手枪或双指手势。

更多图片见 [手势示例与阵型截图](doc/07-手势示例与截图.md)，包括完整弹窗、手机界面及四种剑阵效果。

## 构建与预览

在仓库根目录执行：

```bash
cd React
npm run build
npm run preview
```

构建产物位于 `React/dist/`。部署时需要完整上传构建产物，包括由 `React/public/models/` 复制的模型和 WebAssembly 资源。

## 项目结构

```text
React/       React + TypeScript 版本，包含本地模型资源
HTML/        单文件 HTML 版本，使用外部 CDN 资源
doc/         源码分析、架构、算法及验证记录
yuanma.zip   原始源码压缩包
LICENSE      MIT 开源协议
```

HTML 版需要能够访问其外部依赖和模型地址，与 React 版的本地构建产物相互独立。

## 技术栈

- React、TypeScript、Vite：组件开发、类型检查与构建。
- Three.js、React Three Fiber：3D 场景、剑群与逐帧动画。
- MediaPipe Tasks Vision：手部关键点识别，使用本地模型和 WASM 资源。
- Zustand：共享手势、目标位置与轨迹状态。
- React Three Postprocessing：Bloom 辉光效果。
- 自定义 GLSL：程序生成法阵图案。

实现细节与已知问题见 [文档索引](doc/README.md)和 [技术栈与源码文件对应](doc/06-技术栈与源码文件对应.md)。

## Cloudflare Pages 部署

[线上应用](https://theswordarray.pages.dev/)部署的是 React 版本。Pages 项目名称为 `theswordarray`，生产分支为 `main`；向 `main` 推送更新会触发自动生产部署。

通过 GitHub 集成部署时，使用以下配置：

| 配置项 | 值 |
| --- | --- |
| 根目录 | `React` |
| 构建命令 | `npm ci --no-audit --no-fund && npm run build` |
| 构建输出目录 | `dist` |
| 构建环境变量 `NODE_VERSION` | `22.23.1` |
| 构建环境变量 `SKIP_DEPENDENCY_INSTALL` | `true` |

## 开源协议

本项目采用 [MIT 协议](LICENSE)。第三方库、生成的运行时文件和模型资源仍遵循各自上游的许可证及声明。原作者署名保留在上方的来源说明和原始说明文档中。
