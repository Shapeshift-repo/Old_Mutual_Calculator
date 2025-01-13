'use client'; 

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Image from 'next/image';

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Set 'active' class on the first scroll
      setIsActive(scrollY > 0);

      // Set 'small-header' class after some scroll (e.g., 150px)
      setIsSmall(scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-[999] transition-all duration-300 ${
        isActive ? 'active' : ''
      } ${isSmall ? 'small-header' : ''}`}
    >
      <div className="pl-[10px] pr-[10px] 2xl:pl-[30px] 2xl:pr-[30px]">
        <div className="flex relative gap-[40px] items-center justify-between">
          <div className="w-full">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={82}
                height={123}
                className="absolute top-[-20px] lg:top-0 left-0"
              />
            </Link>
          </div>
          <div className="w-full">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
}