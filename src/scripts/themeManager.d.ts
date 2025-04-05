// themeManager.d.ts
// 为themeManager模块提供类型声明

declare type ThemeMode = 'light' | 'dark' | 'system';
declare type ThemeState = 'Light' | 'Dark';

declare const init: () => void;
declare const toggleTheme: () => void;
declare const applyThemeMode: (mode: ThemeMode) => void;
declare const getEffectiveTheme: (mode: ThemeMode) => ThemeState;
declare const applyThemeState: (theme: ThemeState) => void;
declare const getCookie: (name: string) => string | null;
declare const setCookie: (name: string, value: string, days: number) => void;

// 默认导出的对象
declare const themeManager: {
  init: typeof init;
  toggleTheme: typeof toggleTheme;
  applyThemeMode: typeof applyThemeMode;
  getEffectiveTheme: typeof getEffectiveTheme;
  applyThemeState: typeof applyThemeState;
  ThemeMode: {
    LIGHT: 'light';
    DARK: 'dark';
    SYSTEM: 'system';
  };
};

export { ThemeMode, ThemeState, init, toggleTheme, applyThemeMode, getEffectiveTheme, applyThemeState, getCookie, setCookie };
export default themeManager;