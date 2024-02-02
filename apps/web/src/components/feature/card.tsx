"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  img: string;
  id: string;
};

export default function Card({ img, id }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full cursor-pointer project-card relative flex flex-col items-start justify-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute item w-full hidden md:flex top-0 left-0 justify-between items-start px-5 pt-5 lg:px-5 lg:pt-5 z-30 ${
          isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity ease-in-out duration-300`}
      >
        <div>
          <h4 className="text-white text-[14px] lg:text-[18px]">{id}</h4>
          <h4 className={`hidden text-white/50 text-[14px] lg:text-[18px]`}>
            Coming Soon
          </h4>
        </div>
        <div
          className={`bg-white w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full cursor-pointer flex items-center justify-center transition-transform duration-300`}
          style={{
            transform: isHovered ? "translate(0)" : "translate(-20px, 20px)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(0, 0, 0)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
      <div
        className={`overlay absolute w-full flex-col h-full rounded-xl hidden md:flex ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <Image
        src={img}
        alt="project-image"
        width={40}
        height={40}
        className="w-full h-[450px] rounded-xl justify-cente object-cover bg-cover bg-center"
      />

      <div className="text-[14px] md:hidden flex gap-2">
        <p>{id}</p>
      </div>
    </div>
  );
}
