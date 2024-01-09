import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type TCards = {
  image: string;
  heading: string;
  desc: string;
  link: string;
};

const Cards = ({ image, heading, desc, link }: TCards) => {
  return (
    <div className="w-full h-full px-4">
      <div className="bg-white text-black shadow-lg  dark:bg-secondary-dark dark:text-white w-full h-full  rounded-lg  ">
        <div className="relative h-[230px] border-b pb-2">
          <Image fill alt={heading} src={image} />
        </div>

        <div className="p-8 sm:p-9 h-full md:p-7 xl:p-9 text-center">
          <h3 className="dark:text-white">
            <div
              className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
            >
              {heading}
            </div>
          </h3>
          <p className="text-lg text-body-color leading-relaxed mb-7">{desc}</p>
          <Link
            href={link}
            className="inline-block
                     py-2
                     px-7
                     border border-[#000] dark:border-white
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-blue-500 hover:bg-blue-500 hover:text-white
                     transition
                     "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
