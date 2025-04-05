/**
 * Homepage Main TypeScript File
 * Created by Tony Blur (tblu.xyz)
 * Copyright © 2025 tblu.xyz
 */

// 导入样式
import './styles/style.css';

// 导入图片资源管理模块
import { images, initImageOptimization } from './scripts/imageResources';

// 导入内容渲染器
import { renderSites } from './scripts/contentRenderer';

// 从TypeScript类型导入所需的类型
import { ThemeMode, ThemeState } from './scripts/themeManager';

/**
 * 主应用程序类 - 实现网站的主要功能
 */
class HomePage {
  // 主题相关属性
  private currentThemeMode: ThemeMode = 'system';
  private currentThemeState: ThemeState = 'Light';
  
  // DOM元素
  private html: HTMLElement | null = null;
  private tanChiShe: HTMLImageElement | null = null;
  private pageLoading: HTMLElement | null = null;
  
  /**
   * 构造函数 - 初始化应用
   */
  constructor() {
    // 初始化图片优化
    initImageOptimization();
    
    // 注册事件监听器
    document.addEventListener('DOMContentLoaded', this.handleDOMContentLoaded.bind(this));
    window.addEventListener('load', this.handleWindowLoad.bind(this));
    
    // 绑定全局弹出图片方法
    window.pop = this.popImage.bind(this);
  }
  
  /**
   * 处理DOM内容加载完成事件
   */
  private handleDOMContentLoaded(): void {
    // 输出版权信息
    console.log('%cCopyright © 2025 tblu.xyz',
      'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;'
    );

    // 渲染首屏站点列表
    renderSites();
    
    // 设置延迟加载非首屏内容
    this.setupLazyLoading();
    
    // 设置弹窗事件
    this.setupPopupEvents();
    
    // 设置主题
    this.setupTheme();
  }
  
  /**
   * 设置延迟加载
   */
  private setupLazyLoading(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 当项目列表区域进入视口时，动态导入项目列表渲染逻辑
          import('./scripts/contentRenderer.js').then(module => {
            module.renderProjects();
            observer.disconnect(); // 只需要加载一次
          }).catch(err => console.error('无法加载内容渲染器:', err));
        }
      });
    }, { threshold: 0.1 }); // 当10%的元素可见时触发

    // 观察项目列表容器
    const projectsContainer = document.querySelector('#ProjectsList');
    if (projectsContainer) {
      observer.observe(projectsContainer);
    }

    // 延迟加载非关键组件
    setTimeout(() => {
      // 动态导入和初始化非关键功能
      Promise.all([
        import('./scripts/themeManager.js'),
        import('./scripts/uiEffects.js')
      ]).then(([themeModule, uiModule]) => {
        themeModule.default.init();
        uiModule.default.init();
      }).catch(err => console.error('无法加载UI组件:', err));
    }, 100);
  }
  
  /**
   * 设置弹窗事件
   */
  private setupPopupEvents(): void {
    const tc = document.getElementsByClassName('tc')[0] as HTMLElement;
    const tc_main = document.getElementsByClassName('tc-main')[0] as HTMLElement;
    
    tc?.addEventListener('click', () => {
      this.toggleClass('.tc-main', 'active');
      this.toggleClass('.tc', 'active');
    });
    
    tc_main?.addEventListener('click', (event: Event) => {
      event.stopPropagation();
    });
  }
  
  /**
   * 设置主题
   */
  private setupTheme(): void {
    // 获取相关DOM元素
    this.html = document.querySelector('html');
    this.tanChiShe = document.getElementById("tanChiShe") as HTMLImageElement;
    
    // 获取存储的主题模式或使用默认值
    this.currentThemeMode = this.getCookie("themeMode") as ThemeMode || 'system';
    this.currentThemeState = this.getEffectiveTheme(this.currentThemeMode);

    // 设置初始主题状态
    this.applyThemeMode(this.currentThemeMode);
    
    // 添加主题切换功能示例
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        // 切换主题模式
        const newMode: ThemeMode = this.currentThemeMode === 'dark' ? 'light' : 'dark';
        this.currentThemeMode = newMode;
        this.applyThemeMode(newMode);
        // 保存用户选择
        this.saveCookie("themeMode", newMode, 30);
      });
    }
  }
  
  /**
   * 保存Cookie - 重命名setCookie为saveCookie并使用它
   */
  private saveCookie(name: string, value: string, days: number): void {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  
  /**
   * 获取Cookie
   */
  private getCookie(name: string): string | null {
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
  }
  
  /**
   * 处理窗口加载完成事件
   */
  private handleWindowLoad(): void {
    // 延迟加载非关键功能
    setTimeout(() => {
      // FPS计数器等非关键功能在页面完全加载后初始化
      import('./scripts/performance.js').then(module => {
        module.createFpsCounter();
      }).catch(err => console.error('无法加载性能监控模块:', err));
      
      // 添加项目元素点击动画
      this.addButtonAnimations();
      
      // 淡出加载界面
      this.pageLoading = document.querySelector("#tblu-loading");
      if (this.pageLoading) {
        this.pageLoading.style.opacity = '0';
      }
    }, 100);
  }
  
  /**
   * 根据主题模式应用相应的主题状态和UI
   */
  private applyThemeMode(mode: ThemeMode): void {
    // 设置主题模式属性
    document.documentElement.setAttribute('data-theme-mode', mode);
    
    // 根据主题模式获取实际应用的主题状态
    this.currentThemeState = this.getEffectiveTheme(mode);
    
    // 应用主题状态
    this.applyThemeState(this.currentThemeState);
  }
  
  /**
   * 根据主题模式获取有效的主题状态
   */
  private getEffectiveTheme(mode: ThemeMode): ThemeState {
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? "Dark" : "Light";
    }
    return mode === 'dark' ? "Dark" : "Light";
  }
  
  /**
   * 应用主题状态（Light或Dark）
   */
  private applyThemeState(theme: ThemeState): void {
    // 使用导入的SVG资源
    if (this.tanChiShe) {
      this.tanChiShe.src = theme === "Dark" ? images.svg["snake-Dark"] : images.svg["snake-Light"];
    }
    
    if (this.html) {
      this.html.dataset.theme = theme;
    }
  }
  
  /**
   * 为所有projectItem添加点击动画
   */
  private addButtonAnimations(): void {
    const buttons = document.querySelectorAll('.projectItem');
    buttons.forEach((button: Element): void => {
      button.addEventListener('mousedown', function(this: HTMLElement): void {
        this.classList.add('pressed');
      });
      button.addEventListener('mouseup', function(this: HTMLElement): void {
        this.classList.remove('pressed');
      });
      button.addEventListener('mouseleave', function(this: HTMLElement): void {
        this.classList.remove('pressed');
      });
      button.addEventListener('touchstart', function(this: HTMLElement): void {
        this.classList.add('pressed');
      });
      button.addEventListener('touchend', function(this: HTMLElement): void {
        this.classList.remove('pressed');
      });
      button.addEventListener('touchcancel', function(this: HTMLElement): void {
        this.classList.remove('pressed');
      });
    });
  }
  
  /**
   * 切换类
   */
  private toggleClass(selector: string, className: string): void {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element: Element): void => {
      element.classList.toggle(className);
    });
  }
  
  /**
   * 弹出图片
   */
  private popImage(imageKey?: string): void {
    const tcMainElement = document.querySelector(".tc-img") as HTMLImageElement;
    if (imageKey && tcMainElement) {
      tcMainElement.src = images.jpg[imageKey];
    }
    this.toggleClass(".tc-main", "active");
    this.toggleClass(".tc", "active");
  }
}

// 为弹出图片功能定义全局类型
declare global {
  interface Window {
    pop: (imageKey?: string) => void;
  }
}

// 实例化应用
new HomePage();