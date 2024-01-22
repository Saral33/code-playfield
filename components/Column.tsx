import { darkColumnIcon, lightColumnIcon } from '@/icons/Icons';
import { useLayoutState } from '@/store/useLayoutStore';
import { useTheme } from '@/store/useThemeStore';
import React from 'react';

const Column = () => {
  const { layout, setLDTheme } = useLayoutState((state) => state);
  const { theme } = useTheme();
  return (
    <div className="mt-[100px] container  mx-auto flex w-full justify-end">
      <div className="rounded-md">
        <button
          className={`${
            layout === 'row' && 'bg-slate-200 dark:bg-gray-600'
          } rounded-l-lg border border-slate-200  border-r border-r-slate-400 px-3 py-2`}
          onClick={() => setLDTheme('row')}
        >
          {theme === 'light' ? lightColumnIcon : darkColumnIcon}
        </button>
        <button
          className={`${
            layout === 'column' && 'bg-slate-200 dark:bg-gray-600'
          } border-slate-200 border rounded-r-lg  py-2 px-3`}
          onClick={() => setLDTheme('column')}
        >
          <div className="rotate-90">
            {' '}
            {theme === 'light' ? lightColumnIcon : darkColumnIcon}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Column;
