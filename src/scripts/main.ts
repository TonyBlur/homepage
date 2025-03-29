/**
 * Homepage Main TypeScript File
 * Created by Tony Blur (tblu.xyz)
 * Copyright © 2025 tblu.xyz
 */

// 导入样式
import '../styles/style.css';
import '../styles/root.css';

// 控制台输出版权信息
const printCopyright = (): void => {
  console.log('%cCopyright © 2025 tblu.xyz',
    'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;'
  );
  console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
  console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
  console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
  console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
  console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');
};

// 防止右键菜单
document.addEventListener('contextmenu', (event: Event): void => {
  event.preventDefault();
});

// 点击动画效果
interface HTMLElementWithClassList extends HTMLElement {
  classList: DOMTokenList;
}

const handlePress = function(this: HTMLElementWithClassList, event: Event): void {
  this.classList.add('pressed');
};

const handleRelease = function(this: HTMLElementWithClassList, event: Event): void {
  this.classList.remove('pressed');
};

const handleCancel = function(this: HTMLElementWithClassList, event: Event): void {
  this.classList.remove('pressed');
};

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
const pop = (imageURL?: string): void => {
  const tcMainElement = document.querySelector(".tc-img") as HTMLImageElement;
  if (imageURL) {
    tcMainElement.src = imageURL;
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

  const showFPS = ((): void => {
    const requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
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
  })();
};

// 页面加载后执行
document.addEventListener('DOMContentLoaded', (): void => {
  printCopyright();
  
  // 添加项目元素点击动画
  const buttons = document.querySelectorAll('.projectItem');
  buttons.forEach((button: Element): void => {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
  });
  
  // 设置弹窗点击事件
  const tc = document.getElementsByClassName('tc')[0];
  const tc_main = document.getElementsByClassName('tc-main')[0];
  
  tc.addEventListener('click', (): void => {
    pop();
  });
  
  tc_main.addEventListener('click', (event: Event): void => {
    event.stopPropagation();
  });

  // 主题设置
  const html = document.querySelector('html');
  const tanChiShe = document.getElementById("tanChiShe") as HTMLImageElement;
  let themeState = getCookie("themeState") || "Light";

  const changeTheme = (theme: string): void => {
    // 更新图片路径，移除 static 前缀
    tanChiShe.src = `./svg/snake-${theme}.svg`;
    
    if (html) {
      html.dataset.theme = theme;
    }
    setCookie("themeState", theme, 365);
    themeState = theme;
  };

  const checkbox = document.getElementById('myonoffswitch') as HTMLInputElement;
  checkbox.addEventListener('change', (): void => {
    if (themeState === "Dark") {
      changeTheme("Light");
    } else if (themeState === "Light") {
      changeTheme("Dark");
    } else {
      changeTheme("Dark");
    }
  });

  if (themeState === "Dark") {
    checkbox.checked = false;
  }

  changeTheme(themeState);
  
  // 创建FPS计数器
  createFpsCounter();
});

// 页面加载完成后的动画
const pageLoading = document.querySelector("#tblu-loading");
window.addEventListener('load', (): void => {
  setTimeout((): void => {
    if (pageLoading) {
      (pageLoading as HTMLElement).style.opacity = '0';
    }
  }, 100);
});