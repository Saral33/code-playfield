import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TState = {
  theme: 'light' | 'dark';
};
type TActions = {
  setLDTheme: (theme: TState['theme']) => void;
};

export const useTheme = create(
  persist<TState & TActions>(
    (set) => ({
      theme: 'light',
      setLDTheme: (val: TState['theme']) => set({ theme: val }),
    }),
    {
      name: 'theme',
    }
  )
);
