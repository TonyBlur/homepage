/**
 * UI特效模块
 * 处理各种UI动画和交互效果
 */

/**
 * 切换类
 */
export const toggleClass = (selector: string, className: string): void => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element: Element): void => {
    element.classList.toggle(className);
  });
};

/**
 * 添加按钮动画效果
 */
export const addButtonAnimations = (buttonSelector: string = '.projectItem'): void => {
  const buttons = document.querySelectorAll(buttonSelector);
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
};

/**
 * 初始化UI特效和相关事件
 */
export const init = (): void => {
  // 初始化弹窗事件
  setupPopups();
  
  // 给新添加的元素设置动画效果
  setupDynamicAnimations();
  
  // 隐藏加载界面
  setupLoadingScreen();
};

/**
 * 设置弹窗点击事件
 */
const setupPopups = (): void => {
  const tc = document.getElementsByClassName('tc')[0] as HTMLElement;
  const tc_main = document.getElementsByClassName('tc-main')[0] as HTMLElement;
  
  if (tc && tc_main) {
    tc.addEventListener('click', () => {
      toggleClass('.tc-main', 'active');
      toggleClass('.tc', 'active');
    });
    
    tc_main.addEventListener('click', (event: Event) => {
      event.stopPropagation();
    });
  }
};

/**
 * 监听动态添加的元素并添加动画效果
 */
const setupDynamicAnimations = (): void => {
  // 使用MutationObserver监听DOM变化
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // 元素节点
            const element = node as Element;
            
            // 检查新添加的元素是否包含需要添加动画的元素
            const projectItems = element.classList.contains('projectItem') ? 
              [element] : 
              Array.from(element.querySelectorAll('.projectItem'));
            
            if (projectItems.length > 0) {
              projectItems.forEach((item) => {
                // 添加按钮动画
                addButtonAnimations(`.${item.classList.value.replace(/\s+/g, '.')}`);
              });
            }
          }
        });
      }
    });
  });
  
  // 设置观察选项
  const observerConfig = {
    childList: true,
    subtree: true
  };
  
  // 开始监听文档变化
  observer.observe(document.body, observerConfig);
};

/**
 * 隐藏加载界面
 */
const setupLoadingScreen = (): void => {
  const pageLoading = document.querySelector("#tblu-loading");
  if (pageLoading) {
    (pageLoading as HTMLElement).style.transition = 'opacity 0.5s ease';
    (pageLoading as HTMLElement).style.opacity = '0';
    
    // 完全隐藏后移除元素
    setTimeout(() => {
      (pageLoading as HTMLElement).style.display = 'none';
    }, 500);
  }
};

export default {
  init,
  toggleClass,
  addButtonAnimations
};