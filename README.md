<div align="center"><a name="readme-top"></a>

<img src="https://github.com/TonyBlur/homepage/blob/main/src/assets/img/homepage-96.png?raw=true" width="96" height="96">

# HomePage<br> - 个人主页导航项目

一个简洁、美观的个人主页

<img src="https://github.com/TonyBlur/homepage/blob/main/src/assets/img/homepage_preview.png?raw=true">

</div>

# 使用说明 Usage

项目使用Vite构建，源代码结构如下：

- `/src/main.ts` - TypeScript主入口文件
- `/src/scripts/imageResources.ts` - 图片资源管理模块
- `/src/styles/style.css` - 主要样式文件
- `/src/assets/` - 图片、SVG等资源文件

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build
```

# 特色功能 Features

- **主题切换**：支持浅色、深色和跟随系统三种主题模式
- **响应式设计**：在不同设备上（手机、平板、电脑）均有良好的显示效果
- **动态效果**：包含贪吃蛇动画和交互按钮特效
- **模块化组织**：分为网站导航、项目展示和技能展示等多个模块
- **TypeScript支持**：使用TypeScript提供更好的开发体验和类型检查
- **自动化图片资源管理**：通过`imageResources.ts`自动扫描并导入所有图片资源，无需手动添加

# 技术栈 Tech Stack

- **构建工具**：Vite
- **主要语言**：HTML、CSS、TypeScript
- **版本控制**：Git
- **部署**：可部署在任何静态网站托管平台（如Vercel、Netlify、GitHub Pages等）

# 项目结构 Structure

```
homepage/
├── index.html          # 主HTML文件
├── package.json        # 项目配置
├── vite.config.ts      # Vite配置
├── tsconfig.json       # TypeScript配置
├── src/
│   ├── main.ts         # 主入口文件
│   ├── vite-env.d.ts   # 类型声明文件
│   ├── assets/         # 静态资源
│   │   ├── img/        # 图片资源
│   │   └── svg/        # SVG图标
│   ├── scripts/        # JavaScript/TypeScript脚本
│   │   └── imageResources.ts # 图片资源管理模块
│   └── styles/         # CSS样式
│       └── style.css   # 主样式文件
└── static/             # 其他静态资源
```

# 图片资源管理 Image Resources

项目通过`src/scripts/imageResources.ts`模块自动管理所有图片资源：

```typescript
// 自动导入所有图片资源
const svgModules = import.meta.glob('../assets/svg/*.svg', { eager: true });
const jpgModules = import.meta.glob('../assets/img/*.jpg', { eager: true });
const pngModules = import.meta.glob('../assets/img/*.png', { eager: true });
const icoModules = import.meta.glob('../assets/img/*.ico', { eager: true });

// 使用方法
import { images } from './scripts/imageResources';
// 访问图片: images.jpg.fileName 或 images.png.fileName 或 images.svg.fileName
```

# 鸣谢 Acknowledgement

原作者 [ZYYO666](https://github.com/ZYYO666) 及其 [开源仓库](https://github.com/ZYYO666/homepage)
