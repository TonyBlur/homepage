<div align="center"><a name="readme-top"></a>

<img src="https://github.com/TonyBlur/homepage/blob/main/src/assets/img/homepage-96.png?raw=true" width="96" height="96">

# HomePage<br> - 个人主页导航项目

一个简洁、美观的个人主页

<img src="https://github.com/TonyBlur/homepage/blob/main/src/assets/img/homepage_preview.png?raw=true">

</div>

# 使用说明 Usage

项目使用Vite构建，源代码结构如下：

- `/src/main.ts` - TypeScript主入口文件
- `/src/scripts/main.ts` - 主要脚本功能
- `/src/styles/style.css` - 主要样式文件
- `/src/styles/root.css` - 主题相关样式文件（深色/浅色模式）
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

# 技术栈 Tech Stack

- **构建工具**：Vite
- **主要语言**：HTML、CSS、TypeScript
- **版本控制**：Git
- **部署**：可部署在任何静态网站托管平台

# 项目结构 Structure

```
homepage/
├── index.html          # 主HTML文件
├── package.json        # 项目配置
├── vite.config.ts      # Vite配置
├── src/
│   ├── main.ts         # 主入口文件
│   ├── assets/         # 静态资源
│   │   ├── img/        # 图片资源
│   │   └── svg/        # SVG图标
│   ├── scripts/        # JavaScript/TypeScript脚本
│   │   └── main.ts     # 主要脚本功能
│   └── styles/         # CSS样式
│       ├── style.css   # 主样式文件
│       └── root.css    # 主题样式
└── static/             # 其他静态资源
```

# 鸣谢 Acknowledgement

原作者 [ZYYO666](https://github.com/ZYYO666) 及其 [开源仓库](https://github.com/ZYYO666/homepage)
