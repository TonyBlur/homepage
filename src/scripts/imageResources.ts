/**
 * 图片资源管理模块
 * 
 * 自动导入所有图片资源，省去手动添加的麻烦
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

// 处理并组织所有图片资源
export const images = {
  svg: processModules(svgModules),
  jpg: processModules(jpgModules),
  png: processModules(pngModules),
  ico: processModules(icoModules),
};

export default images;