'use client';
import React, { useState } from 'react';
import useDarkSide from '@/hooks/useDarkMode';
import { DarkModeIcon, LightModeIcon } from '@/icons/Icons';
import { useTheme } from '@/store/useThemeStore';
import Link from 'next/link';

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  );
  const { setLDTheme } = useTheme((state) => state);

  const toggleDarkMode = (checked: boolean) => {
    setLDTheme(checked ? 'dark' : 'light');
    setTheme(checked ? 'dark' : 'light');
    setDarkSide(checked);
  };
  return (
    <div className="w-full fixed top-0 shadow-lg bg-secondary-light dark:bg-secondary-dark py-4">
      <div className="container items-center justify-between flex mx-auto">
        <Link
          href="/"
          className="text-2xl text-black dark:text-white font-semibold"
        >
          Code PlayField
        </Link>
        {darkSide ? (
          <div className="flex text-white items-center gap-1">
            <span>Mode:</span>
            <div
              className="h-10 mt-2 w-10 cursor-pointer"
              onClick={() => toggleDarkMode(false)}
            >
              {LightModeIcon}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span>Mode:</span>
            <div
              className="h-10 w-10  cursor-pointer"
              onClick={() => toggleDarkMode(true)}
            >
              {DarkModeIcon}
            </div>
          </div>
        )}
        {/* <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={56} /> */}
      </div>
    </div>
  );
}
