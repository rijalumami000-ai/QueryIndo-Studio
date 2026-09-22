export type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'queryindo_theme';

export class ThemeService {
  public static getTheme(): ThemeMode {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      // Check system preference if no explicit choice yet
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  }

  public static setTheme(theme: ThemeMode): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }

  public static toggleTheme(): ThemeMode {
    const next = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }

  public static init(): void {
    this.setTheme(this.getTheme());
  }
}
