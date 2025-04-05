import { defineConfig } from 'vite';
import { resolve } from 'path';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';
import imagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 使用相对路径
  
  build: {
    target: 'es2015', // 增强旧浏览器兼容性
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // 小于4kb的文件内联为base64
    
    // 代码分割策略
    rollupOptions: {
      output: {
        manualChunks: {
          // 将核心模块拆分为单独的块
          core: ['./src/main.ts'],
          
          // 将UI相关代码拆分为单独的块
          ui: [
            './src/scripts/uiEffects.ts',
            './src/scripts/themeManager.ts'
          ],
          
          // 将内容管理和渲染逻辑拆分为单独的块
          content: [
            './src/scripts/contentManager.ts',
            './src/scripts/contentRenderer.ts'
          ],
          
          // 将性能监控相关代码拆分为单独的块
          performance: ['./src/scripts/performance.ts']
        },
        // 自定义分块名称
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(woff2?|ttf|eot)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    
    // 启用CSS代码分割
    cssCodeSplit: true,
    
    // 启用源码映射
    sourcemap: false,
    
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除console
        drop_debugger: true, // 移除debugger
        pure_funcs: ['console.log'] // 移除console.log
      }
    }
  },
  
  // 优化预览配置
  preview: {
    port: 8080,
    open: true
  },
  
  // 开发服务器配置
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },
  
  // 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  
  // CSS相关配置
  css: {
    // 启用CSS模块化
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    
    // 预处理器配置
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    
    // 开发环境启用源码映射
    devSourcemap: true
  },
  
  // 使用插件
  plugins: [
    // Gzip压缩
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 10240, // 只压缩大于10kb的文件
    }),
    
    // 图片压缩插件
    imagemin({
      // 启用针对不同类型的图片优化
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    
    // 仅在构建分析模式下启用可视化分析
    process.env.ANALYZE === 'true' ? visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    }) : null
  ].filter(Boolean)
});