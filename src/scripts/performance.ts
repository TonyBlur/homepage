/**
 * 性能监控模块
 * 包含FPS计数器和性能统计功能
 */

// 兼容不同浏览器的requestAnimationFrame
const requestAnimFrame = (function() {
  const w = window as any;
  return w.requestAnimationFrame || 
    w.webkitRequestAnimationFrame || 
    w.mozRequestAnimationFrame || 
    w.oRequestAnimationFrame || 
    w.msRequestAnimationFrame || 
    function(callback: FrameRequestCallback) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * 创建FPS计数器
 */
export const createFpsCounter = (): void => {
  // 在生产环境中可以禁用
  if (process.env.NODE_ENV === 'production') return;
  
  const fpsElement = document.createElement('div');
  fpsElement.id = 'fps';
  fpsElement.style.zIndex = '10000';
  fpsElement.style.position = 'fixed';
  fpsElement.style.right = '5px';
  document.body.insertBefore(fpsElement, document.body.firstChild);

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

    requestAnimFrame(step);
  };

  step();
};

/**
 * 收集性能指标
 */
export const collectPerformanceMetrics = (): Record<string, number> => {
  if (typeof window === 'undefined' || !window.performance) {
    return { error: -1 };
  }
  
  // 获取导航计时API数据
  const perfData = window.performance.timing;
  const metrics: Record<string, number> = {};
  
  // DNS解析时间
  metrics.dns = perfData.domainLookupEnd - perfData.domainLookupStart;
  
  // TCP连接时间
  metrics.tcp = perfData.connectEnd - perfData.connectStart;
  
  // 请求响应时间
  metrics.request = perfData.responseStart - perfData.requestStart;
  
  // 响应下载时间
  metrics.response = perfData.responseEnd - perfData.responseStart;
  
  // DOM加载时间
  metrics.domLoading = perfData.domInteractive - perfData.responseEnd;
  
  // DOM交互时间
  metrics.domInteractive = perfData.domContentLoadedEventStart - perfData.domInteractive;
  
  // DOM完成时间
  metrics.domComplete = perfData.domComplete - perfData.domContentLoadedEventStart;
  
  // 总加载时间
  metrics.total = perfData.loadEventEnd - perfData.navigationStart;
  
  return metrics;
};

/**
 * 记录并上报性能指标
 */
export const reportPerformance = (): void => {
  // 确保页面完全加载
  window.addEventListener('load', () => {
    // 给浏览器一些时间完成所有加载
    setTimeout(() => {
      const metrics = collectPerformanceMetrics();
      
      // 输出到控制台（开发环境）
      if (process.env.NODE_ENV !== 'production') {
        console.table(metrics);
      }
      
      // 在这里可以添加将性能数据发送到服务器的代码
      // sendMetricsToServer(metrics);
    }, 0);
  });
};

// 初始化性能监控
export const initPerformanceMonitoring = (): void => {
  // 监控首次内容绘制(FCP)
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`FCP: ${entry.startTime}ms`);
      }
    });
  });
  
  try {
    observer.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // 不支持Performance Observer的浏览器
  }
  
  // 报告性能
  reportPerformance();
};

export default {
  createFpsCounter,
  collectPerformanceMetrics,
  reportPerformance,
  initPerformanceMonitoring
};