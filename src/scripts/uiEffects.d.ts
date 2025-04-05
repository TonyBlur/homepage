// uiEffects.d.ts
// 为uiEffects模块提供类型声明

declare const toggleClass: (selector: string, className: string) => void;
declare const addButtonAnimations: (buttonSelector?: string) => void;
declare const init: () => void;

// 默认导出的对象
declare const uiEffects: {
  init: typeof init;
  toggleClass: typeof toggleClass;
  addButtonAnimations: typeof addButtonAnimations;
};

export { toggleClass, addButtonAnimations, init };
export default uiEffects;