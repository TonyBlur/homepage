/**
 * 内容管理模块
 * 统一管理网站和项目数据，提供更简洁的接口
 */

// 导入所需模块
import { images } from './imageResources';

/**
 * 内容项接口
 */
export interface ContentItem {
  title: string;       // 标题
  description: string; // 描述
  url: string;         // 链接
  iconName: string;    // 图标名称（不含扩展名）
}

/**
 * 网站数据
 */
export const sitesData: ContentItem[] = [
  {
    title: "tblu LobeChat",
    description: "你的AI助手",
    url: "https://chat.tblu.xyz",
    iconName: "aichat-96"
  },
  {
    title: "AI 绘画",
    description: "使用AI进行文生图创作",
    url: "https://aimage.tblu.xyz",
    iconName: "aimage-96"
  },
  {
    title: "tblu New API",
    description: "用于集成AI大模型的API <br>(尚未对外开放注册)",
    url: "https://new-api.tblu.xyz/",
    iconName: "api-96"
  },
  {
    title: "思绪思维导图",
    description: "编辑与创建你的思维导图",
    url: "https://mindmap.tblu.xyz",
    iconName: "mindmap-96"
  },
  {
    title: "中国古代数学成就",
    description: "一次摆烂的小组作业",
    url: "https://ancientmath.tblu.xyz",
    iconName: "math-96"
  },
  {
    title: "tblu Bookmark",
    description: "我收藏的网站们",
    url: "https://bookmark.tblu.xyz",
    iconName: "bookmark-96"
  },
  {
    title: "函数图像绘制工具",
    description: "借助此网站绘制函数图像以学习",
    url: "https://math-function-tool.vercel.app",
    iconName: "function-graph-96"
  },
  {
    title: "博客",
    description: "记录我的日常 <br>(还没有做这个网站)",
    url: "https://blog.tblu.xyz",
    iconName: "blog-96"
  }
];

/**
 * 项目数据
 */
export const projectsData: ContentItem[] = [
  {
    title: "tblu LobeChat",
    description: "一个AI聊天与知识库问答web UI",
    url: "https://github.com/TonyBlur/tblu-lobechat",
    iconName: "aichat-96"
  },
  {
    title: "思绪思维导图",
    description: "一个还算强大的Web思维导图",
    url: "https://github.com/TonyBlur/mind-map",
    iconName: "mindmap-96"
  },
  {
    title: "个人主页",
    description: "个人主页与导航",
    url: "https://github.com/TonyBlur/homepage",
    iconName: "homepage-96"
  },
  {
    title: "AI 绘画",
    description: "使用API调用AI绘画",
    url: "https://github.com/TonyBlur/AImageGen-API-with-React",
    iconName: "aimage-96"
  },
  {
    title: "tblu Bookmark",
    description: "一个分享收藏站点的页面",
    url: "https://github.com/TonyBlur/tblu-bookmark",
    iconName: "bookmark-96"
  }
];

/**
 * 内容类型枚举
 */
export enum ContentType {
  SITES = 'sites',
  PROJECTS = 'projects'
}

/**
 * 内容配置接口
 */
export interface ContentConfig {
  data: ContentItem[];       // 内容数据
  selector: string;          // CSS选择器
  className: string;         // CSS类名
}

/**
 * 内容配置映射
 */
export const contentConfigs: Record<ContentType, ContentConfig> = {
  [ContentType.SITES]: {
    data: sitesData,
    selector: '#SitesList',
    className: 'projectItem a'
  },
  [ContentType.PROJECTS]: {
    data: projectsData,
    selector: '#ProjectsList',
    className: 'projectItem b'
  }
};

/**
 * 获取内容项的图标URL
 */
export const getIconUrl = (iconName: string): string => {
  return images.png[iconName] || './src/assets/img/default-96.png';
};

export default {
  sitesData,
  projectsData,
  contentConfigs,
  ContentType,
  getIconUrl
};