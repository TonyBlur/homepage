/**
 * Homepage Main TypeScript File
 * Created by Tony Blur (tblu.xyz)
 * Copyright © 2025 tblu.xyz
 */

// 定义兼容老浏览器的window扩展接口
interface WindowWithVendorAnimation extends Window {
  webkitRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  mozRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  oRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  msRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
}

// 导入样式
import './styles/style.css';

// 主题模式类型定义
type ThemeMode = 'light' | 'dark' | 'system';

// 页面加载完成后的初始化函数
window.addEventListener('DOMContentLoaded', () => {
  // 控制台输出版权信息
  console.log('%cCopyright © 2025 tblu.xyz',
    'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;'
  );
  console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
  console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
  console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
  console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
  console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');

  // 防止右键菜单
  document.addEventListener('contextmenu', (event: Event): void => {
    event.preventDefault();
  });

  // 添加项目元素点击动画
  const buttons = document.querySelectorAll('.projectItem');
  buttons.forEach((button: Element): void => {
    button.addEventListener('mousedown', function(this: HTMLElement, event: Event): void {
      this.classList.add('pressed');
    });
    button.addEventListener('mouseup', function(this: HTMLElement, event: Event): void {
      this.classList.remove('pressed');
    });
    button.addEventListener('mouseleave', function(this: HTMLElement, event: Event): void {
      this.classList.remove('pressed');
    });
    button.addEventListener('touchstart', function(this: HTMLElement, event: Event): void {
      this.classList.add('pressed');
    });
    button.addEventListener('touchend', function(this: HTMLElement, event: Event): void {
      this.classList.remove('pressed');
    });
    button.addEventListener('touchcancel', function(this: HTMLElement, event: Event): void {
      this.classList.remove('pressed');
    });
  });

  // 设置弹窗点击事件
  const tc = document.getElementsByClassName('tc')[0] as HTMLElement;
  const tc_main = document.getElementsByClassName('tc-main')[0] as HTMLElement;
  
  tc.addEventListener('click', function(): void {
    toggleClass('.tc-main', 'active');
    toggleClass('.tc', 'active');
  });
  
  tc_main.addEventListener('click', function(event: Event): void {
    event.stopPropagation();
  });

  // 主题设置
  const html = document.querySelector('html');
  const tanChiShe = document.getElementById("tanChiShe") as HTMLImageElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn') as HTMLElement;
  
  // 获取系统/浏览器颜色模式偏好
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // 获取存储的主题模式或使用默认值
  let themeMode = getCookie("themeMode") as ThemeMode || 'system';
  let themeState = getEffectiveTheme(themeMode);

  // 设置初始主题状态
  applyThemeMode(themeMode);
  
  // 点击主题切换按钮
  themeToggleBtn.addEventListener('click', (): void => {
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
  });

  // 监听系统主题变化
  prefersDarkScheme.addEventListener('change', () => {
    // 只有在系统模式下才应用系统主题变化
    if (themeMode === 'system') {
      themeState = prefersDarkScheme.matches ? "Dark" : "Light";
      applyThemeState(themeState);
    }
  });
  
  // 创建FPS计数器
  createFpsCounter();

  // 根据主题模式应用相应的主题状态和UI
  function applyThemeMode(mode: ThemeMode): void {
    // 设置主题模式属性
    document.documentElement.setAttribute('data-theme-mode', mode);
    
    // 根据主题模式获取实际应用的主题状态
    themeState = getEffectiveTheme(mode);
    
    // 应用主题状态
    applyThemeState(themeState);
  }
  
  // 根据主题模式获取有效的主题状态
  function getEffectiveTheme(mode: ThemeMode): string {
    if (mode === 'system') {
      return prefersDarkScheme.matches ? "Dark" : "Light";
    }
    return mode === 'dark' ? "Dark" : "Light";
  }
  
  // 应用主题状态（Light或Dark）
  function applyThemeState(theme: string): void {
    tanChiShe.src = `./src/assets/svg/snake-${theme}.svg`;
    
    if (html) {
      html.dataset.theme = theme;
    }
  }
});

// Cookie操作
const setCookie = (name: string, value: string, days: number): void => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};

const getCookie = (name: string): string | null => {
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

// 切换类
const toggleClass = (selector: string, className: string): void => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element: Element): void => {
    element.classList.toggle(className);
  });
};

// 弹出图片
window.pop = (imageURL?: string): void => {
  const tcMainElement = document.querySelector(".tc-img") as HTMLImageElement;
  if (imageURL) {
    tcMainElement.src = imageURL.replace('./img/', './src/assets/img/');
  }
  toggleClass(".tc-main", "active");
  toggleClass(".tc", "active");
};

// FPS计数器
const createFpsCounter = (): void => {
  const fpsElement = document.createElement('div');
  fpsElement.id = 'fps';
  fpsElement.style.zIndex = '10000';
  fpsElement.style.position = 'fixed';
  fpsElement.style.right = '5px';
  document.body.insertBefore(fpsElement, document.body.firstChild);

  // 使用带浏览器前缀兼容的requestAnimationFrame
  const windowWithVendor = window as WindowWithVendorAnimation;
  const requestAnimationFrame = windowWithVendor.requestAnimationFrame ||
    windowWithVendor.webkitRequestAnimationFrame ||
    windowWithVendor.mozRequestAnimationFrame ||
    windowWithVendor.oRequestAnimationFrame ||
    windowWithVendor.msRequestAnimationFrame ||
    function (callback: FrameRequestCallback): number {
      return window.setTimeout(callback, 1000 / 60);
    };

  let fps = 0;
  let last = Date.now();
  let offset: number;

  const appendFps = (fpsValue: number): void => {
    fpsElement.textContent = 'FPS: ' + fpsValue;
  };

  const step = (): void => {
    offset = Date.now() - last;
    fps += 1;

    if (offset >= 1000) {
      last += offset;
      appendFps(fps);
      fps = 0;
    }

    requestAnimationFrame(step);
  };

  step();
};

// 页面加载完成后的动画
const pageLoading = document.querySelector("#tblu-loading");
window.addEventListener('load', (): void => {
  setTimeout((): void => {
    if (pageLoading) {
      (pageLoading as HTMLElement).style.opacity = '0';
    }
  }, 100);
});

// 为pop函数增加全局类型声明
declare global {
  interface Window {
    pop: (imageURL?: string) => void;
  }
}