// 为各种静态资源声明模块类型
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

// 为 Vite 的 import.meta.glob API 添加类型支持
interface ImportMeta {
  glob: (pattern: string, options?: {eager?: boolean}) => Record<string, any>;
}