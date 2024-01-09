'use client';
import { useTheme } from '@/store/useThemeStore';
import { getFromStorage } from '@/utils/utils';
import { useEffect, useState } from 'react';

interface ILocalStorage {
  state: {
    theme: 'dark' | 'light';
  };
}
export default function useDarkSide() {
  const store = useTheme();
  const [theme, setTheme] = useState<string>(
    getFromStorage<ILocalStorage>('theme')?.state.theme || store.theme
  );

  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme, theme] as const;
}
