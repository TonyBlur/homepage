/**
 * 主题管理模块
 * 处理主题的切换、存储和应用
 */

import { images } from './imageResources';

// 主题模式类型
export type ThemeMode = 'light' | 'dark' | 'system';

// 主题状态
export type ThemeState = 'Light' | 'Dark';

// 主题相关DOM元素
let html: HTMLElement | null;
let tanChiShe: HTMLImageElement | null;
let themeToggleBtn: HTMLElement | null;

// 当前主题模式和状态
let themeMode: ThemeMode = 'system';
let themeState: ThemeState = 'Light';

// 系统主题偏好
let prefersDarkScheme: MediaQueryList;

/**
 * 初始化主题管理
 */
export const init = (): void => {
  // 获取相关DOM元素
  html = document.querySelector('html');
  tanChiShe = document.getElementById("tanChiShe") as HTMLImageElement;
  themeToggleBtn = document.getElementById('themeToggleBtn');
  
  // 获取系统颜色模式偏好
  prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // 获取存储的主题模式或使用默认值
  themeMode = getCookie("themeMode") as ThemeMode || 'system';
  themeState = getEffectiveTheme(themeMode);

  // 设置初始主题状态
  applyThemeMode(themeMode);
  
  // 设置主题切换按钮事件
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  // 监听系统主题变化
  prefersDarkScheme.addEventListener('change', handleSystemThemeChange);
};

/**
 * 切换主题
 */
export const toggleTheme = (): void => {
  // 按系统 -> 浅色 -> 深色 -> 系统的顺序循环切换
  if (themeMode === 'system') {
    themeMode = 'light';
  } else if (themeMode === 'light') {
    themeMode = 'dark';
  } else {
    themeMode = 'system';
  }
  
  applyThemeMode(themeMode);
  setCookie("themeMode", themeMode, 365);
};

/**
 * 根据主题模式应用相应的主题状态和UI
 */
export const applyThemeMode = (mode: ThemeMode): void => {
  // 设置主题模式属性
  document.documentElement.setAttribute('data-theme-mode', mode);
  
  // 根据主题模式获取实际应用的主题状态
  themeState = getEffectiveTheme(mode);
  
  // 应用主题状态
  applyThemeState(themeState);
};

/**
 * 处理系统主题变化
 */
export const handleSystemThemeChange = (): void => {
  // 只有在系统模式下才应用系统主题变化
  if (themeMode === 'system') {
    themeState = prefersDarkScheme.matches ? "Dark" : "Light";
    applyThemeState(themeState);
  }
};

/**
 * 根据主题模式获取有效的主题状态
 */
export const getEffectiveTheme = (mode: ThemeMode): ThemeState => {
  if (mode === 'system') {
    return prefersDarkScheme?.matches ? "Dark" : "Light";
  }
  return mode === 'dark' ? "Dark" : "Light";
};

/**
 * 应用主题状态（Light或Dark）
 */
export const applyThemeState = (theme: ThemeState): void => {
  // 使用导入的SVG资源
  if (tanChiShe) {
    tanChiShe.src = theme === "Dark" ? images.svg["snake-Dark"] : images.svg["snake-Light"];
  }
  
  if (html) {
    html.dataset.theme = theme;
  }
};

/**
 * 获取Cookie
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
};

/**
 * 设置Cookie
 */
export const setCookie = (name: string, value: string, days: number): void => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};

export default {
  init,
  toggleTheme,
  applyThemeMode,
  getEffectiveTheme,
  applyThemeState,
  ThemeMode: { LIGHT: 'light', DARK: 'dark', SYSTEM: 'system' }
};