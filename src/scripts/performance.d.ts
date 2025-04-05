// performance.d.ts
// 为performance模块提供类型声明

declare const createFpsCounter: () => void;
declare const collectPerformanceMetrics: () => Record<string, number>;
declare const reportPerformance: () => void;
declare const initPerformanceMonitoring: () => void;

// 默认导出的对象
declare const performance: {
  createFpsCounter: typeof createFpsCounter;
  collectPerformanceMetrics: typeof collectPerformanceMetrics;
  reportPerformance: typeof reportPerformance;
  initPerformanceMonitoring: typeof initPerformanceMonitoring;
};

export { createFpsCounter, collectPerformanceMetrics, reportPerformance, initPerformanceMonitoring };
export default performance;