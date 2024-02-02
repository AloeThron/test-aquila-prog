"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  title: string;
  isActive: boolean;
};

function Navbtn({ title, isActive }: Props) {
  return (
    <button
      className={`${
        isActive ? "bg-white" : "bg-transparent"
      } w-[88px] h-[40px] lg:w-[96px] text-center rounded-full`}
    >
      {title}
    </button>
  );
}

export default function Navbar() {
  const path = usePathname();

  const buttons = [
    { title: "Home", link: "/" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <nav className="flex fixed translate-x-[-50%] left-[50%] mx-auto top-5 py-1 px-1 z-50 bg-[#e8e5e480]/50 backdrop-blur-lg  rounded-full text-[14px] max-w-[280px] lg:max-w-[300px] gap-[4px] lg:top-8">
      {buttons.map((button, index) => (
        <Link key={index} href={button.link}>
          <Navbtn
            key={index}
            title={button.title}
            isActive={button.link === path}
          />
        </Link>
      ))}
    </nav>
  );
}
