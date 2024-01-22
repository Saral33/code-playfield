import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TState = {
  layout: 'row' | 'column';
};
type TActions = {
  setLDTheme: (theme: TState['layout']) => void;
};

export const useLayoutState = create(
  persist<TState & TActions>(
    (set) => ({
      layout: 'row',
      setLDTheme: (val: TState['layout']) => set({ layout: val }),
    }),
    {
      name: 'layout',
    }
  )
);
