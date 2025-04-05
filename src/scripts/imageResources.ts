/**
 * 图片资源管理与优化模块
 * 
 * 自动导入所有图片资源，进行懒加载和优化处理
 */

// 使用 Vite 的 import.meta.glob 自动导入所有图片资源
const svgModules = import.meta.glob('../assets/svg/*.svg', { eager: true });
const jpgModules = import.meta.glob('../assets/img/*.jpg', { eager: true });
const pngModules = import.meta.glob('../assets/img/*.png', { eager: true });
const icoModules = import.meta.glob('../assets/img/*.ico', { eager: true });

// 处理模块，提取实际路径和默认导出
const processModules = (modules: Record<string, any>) => {
  const result: Record<string, string> = {};
  
  for (const path in modules) {
    // 从路径中提取文件名（不含扩展名）作为键名
    const fileName = path.split('/').pop()?.split('.').shift() || '';
    // 获取默认导出作为值
    result[fileName] = modules[path].default;
  }
  
  return result;
};

// 图片预加载处理
const preloadCriticalImages = (images: string[]) => {
  // 仅在浏览器环境执行
  if (typeof window === 'undefined') return;
  
  // 创建一个图片预加载队列
  const imageQueue = [...images];
  let isPreloading = false;
  
  // 预加载队列中的下一张图片
  const preloadNext = () => {
    if (imageQueue.length === 0 || isPreloading) return;
    
    isPreloading = true;
    const img = new Image();
    img.src = imageQueue.shift() as string;
    img.onload = img.onerror = () => {
      isPreloading = false;
      preloadNext();
    };
  };
  
  // 开始预加载
  preloadNext();
};

// 处理并组织所有图片资源
export const images = {
  svg: processModules(svgModules),
  jpg: processModules(jpgModules),
  png: processModules(pngModules),
  ico: processModules(icoModules),
};

// 预加载关键图片（只预加载首屏必需的图片）
export const initImageOptimization = () => {
  // 定义首屏关键图片
  const criticalImages = [
    images.svg['logo-outer-ring'],
    images.png['logo'],
    // 其他首屏必需的图片
  ];
  
  // 开始预加载
  preloadCriticalImages(criticalImages);
  
  // 为其他图片添加懒加载
  if ('loading' in HTMLImageElement.prototype) {
    // 浏览器原生支持懒加载
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('img:not([loading])').forEach((img) => {
        // 类型断言为 HTMLImageElement
        const imgElement = img as HTMLImageElement;
        if (!criticalImages.includes(imgElement.src)) {
          imgElement.setAttribute('loading', 'lazy');
        }
      });
    });
  } else {
    // 可以在这里添加懒加载的 polyfill
    console.log('Browser does not support native lazy loading');
  }
};

export default {
  images,
  initImageOptimization
};