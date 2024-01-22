'use client';
import React, { useState } from 'react';
import useDarkSide from '@/hooks/useDarkMode';
import { DarkModeIcon, LightModeIcon } from '@/icons/Icons';
import { useTheme } from '@/store/useThemeStore';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className="w-full z-50  fixed top-0 shadow-lg bg-secondary-light dark:bg-secondary-dark py-4">
      <div className="container items-center justify-between flex mx-auto">
        <Link
          href="/"
          className="text-2xl text-black dark:text-white font-semibold"
        >
          <Image
            className="dark:invert"
            alt="Logo"
            src="/whitemode.png"
            height={90}
            width={90}
          />
        </Link>
        {darkSide ? (
          <div className="flex text-white items-center gap-2">
            <span>Mode:</span>
            <div
              className="h-10 mt-2  w-10 cursor-pointer"
              onClick={() => toggleDarkMode(false)}
            >
              {LightModeIcon}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>Mode:</span>
            <div
              className="h-10 w-10 mt-2  cursor-pointer"
              onClick={() => toggleDarkMode(true)}
            >
              {DarkModeIcon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
