'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import useWindowSize from 'react-use/lib/useWindowSize';
const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});
const HeroSection = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="h-[95vh] bg-black ">
      <Confetti numberOfPieces={40} height={height} width={width} />
      <div className="text-white w-full flex justify-center items-center h-full">
        <div className="flex text-center flex-col gap-16 px-3 max-w-[650px]">
          <h1 className="text-4xl md:text-6xl font-medium">
            Unleash Your Code
          </h1>
          <p className="text-xl md:text-2xl text-[#c2c8cc]">
            Explore diverse coding realms in playcode field. Show creativity,
            experiment, and collaborate seamlessly. Your code, your playground,
            your rules.
          </p>
          <div>
            <Link
              href="#services"
              className="bg-blue-700 hover:bg-blue-400 text-lg rounded-lg p-4 cursor-pointer"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
