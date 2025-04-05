/**
 * 内容渲染器模块
 * 负责将数据模型渲染到HTML页面中，简化版本的实现
 */

import { ContentItem, ContentType, contentConfigs, getIconUrl } from './contentManager';

/**
 * 直接使用DOM索引获取对应的列表容器
 */
export const renderContent = (type: ContentType): void => {
  // 获取内容配置
  const config = contentConfigs[type];
  
  // 直接获取所有的projectList容器
  const allLists = document.querySelectorAll('.projectList');
  if (!allLists || allLists.length < 2) {
    console.error('网页上没有足够的列表容器');
    return;
  }
  
  // 为网站列表使用第一个容器，为项目列表使用第二个容器
  let listContainer: Element;
  if (type === ContentType.SITES) {
    listContainer = allLists[0]; // 第一个.projectList是网站列表
  } else {
    listContainer = allLists[1]; // 第二个.projectList是项目列表
  }
  
  // 确保容器存在
  if (!listContainer) {
    console.error(`未找到${type}列表容器`);
    return;
  }
  
  // 清空现有内容
  listContainer.innerHTML = '';
  
  // 为每个内容项创建HTML元素并添加到容器中
  config.data.forEach((item: ContentItem) => {
    const element = document.createElement('a');
    element.className = config.className;
    element.href = item.url;
    element.target = '_blank';
    
    element.innerHTML = `
      <div class="projectItemLeft">
        <h1>${item.title}</h1>
        <p>${item.description}</p>
      </div>
      <div class="projectItemRight">
        <img src="${getIconUrl(item.iconName)}" alt="${item.title}">
      </div>
    `;
    
    // 添加元素到列表容器
    listContainer.appendChild(element);
    
    // 添加点击动画效果
    addClickAnimation(element);
  });
};

/**
 * 为元素添加点击动画效果
 */
const addClickAnimation = (element: HTMLElement): void => {
  element.addEventListener('mousedown', function(this: HTMLElement): void {
    this.classList.add('pressed');
  });
  
  element.addEventListener('mouseup', function(this: HTMLElement): void {
    this.classList.remove('pressed');
  });
  
  element.addEventListener('mouseleave', function(this: HTMLElement): void {
    this.classList.remove('pressed');
  });
  
  element.addEventListener('touchstart', function(this: HTMLElement): void {
    this.classList.add('pressed');
  });
  
  element.addEventListener('touchend', function(this: HTMLElement): void {
    this.classList.remove('pressed');
  });
  
  element.addEventListener('touchcancel', function(this: HTMLElement): void {
    this.classList.remove('pressed');
  });
};

/**
 * 渲染网站列表
 */
export const renderSites = (): void => {
  renderContent(ContentType.SITES);
};

/**
 * 渲染项目列表
 */
export const renderProjects = (): void => {
  renderContent(ContentType.PROJECTS);
};

/**
 * 渲染所有内容
 */
export const renderAllContent = (): void => {
  renderSites();
  renderProjects();
};

/**
 * 初始化渲染器
 */
export const initRenderer = (): void => {
  // 确保在DOM完全加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAllContent);
  } else {
    // DOM已加载，直接执行
    renderAllContent();
  }
  
  // 额外的保险措施，确保加载完成后渲染
  window.addEventListener('load', renderAllContent);
};

export default {
  renderContent,
  renderSites,
  renderProjects,
  renderAllContent,
  initRenderer
};