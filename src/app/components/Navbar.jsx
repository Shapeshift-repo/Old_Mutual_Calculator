'use client'

import React, { useState } from "react";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Button from './Button'
import TalkForm from './TalkForm'
import Heading from './Heading'

export default function Navbar() {

    const pathname = usePathname();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control side menu visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown

    const toggleSideForm = () => {
      const element = document.querySelector('#sideform');
      if (element.classList.contains('active')) {
        element.classList.remove('active');
      } else {
        element.classList.add('active');
      }
    };

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen); // Toggle the side menu visibility
      if (isDropdownOpen) {
        setIsDropdownOpen(false); // Close the dropdown if it's open
      }
    };

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown in mobile
    };

  return (
    <>
      {/* Sideform */}
      <div id="sideform"
        className={`sideform fixed z-10 top-0 w-full max-w-[402px] bg-white p-[45px] rounded-[10px] shadow-[0_4px_18px_0_rgba(0,0,0,0.18)] transition-all duration-500 right-[-100%]
        }`}
      >
        <span className="toggle-sideform absolute top-[20px] right-[20px] cursor-pointer" onClick={toggleSideForm}>          
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 17" stroke="#009677" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 17L17 1" stroke="#009677" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <Heading 
          content="Let's talk"
          className="text-[24px] leading-[28px] font-normal text-[#1E1E1E] mb-[14px]" 
          tag="h3"
        />
        <p className="text-[20px] leading-[25px] font-light mb-[25px]">Share your details and we&lsquo;ll get in touch as soon as possible.</p>
        <TalkForm />
      </div>

      {/* Navbar Holder */}
      <div className="navbar-holder flex gap-[20px] items-center justify-end py-[30px]">
        <div className="flex items-center gap-[25px] lg:gap-[73px]">

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-[53px] items-center"> {/* Hide on mobile */}
            <ul className="flex gap-[53px] items-center [&>li>a]:text-black [&>li>a]:text-[18px] [&>li>a]:font-light [&>li>a:hover]:text-primary">
              <li>
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
                  Home
                </Link>
              </li>
              <li className="submenu relative group">
                <Link
                  className={`link ${pathname === '/about' ? 'active' : ''}`}
                  href="#"
                >
                  Retirement Calculators
                  <svg className="submenu-icon" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5.5 5.5L10 1" stroke="#009677" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </Link>
                {/* Dropdown for desktop (on hover) */}
                <div className="submenu-holder absolute z-10 bg-white top-[20px] left-0 pt-[25px] hidden group-hover:block">
                  <ul className="flex flex-col gap-[10px] p-[30px] rounded-[10px] shadow-[0_4px_10px_0_rgba(0,0,0,0.18)] [&>li>a]:text-[18px] [&>li>a]:font-light [&>li>a:hover]:text-primary">
                    <li>
                      <Link href="/tax-back">Tax Back</Link>
                    </li>
                    <li>
                      <Link href="/retirement-annuity">Retirement Annuity</Link>
                    </li>
                    <li>
                      <Link href="/retirement-income">Income Annuity</Link>
                    </li>
                    <li>
                      <Link href="#">Pay Yourself First</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
          
          {/* Call me back button */}
          <Button label="CALL ME BACK" onClick={toggleSideForm} className="text-white max-w-[170px] lg:max-w-[238px] lg:w-[238px] small-btn" />

          {/* Menu button for mobile */}
          <button
            className="menu-btn md:hidden"
            onClick={toggleMenu}
          >
            
            <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="26" height="2" rx="1" fill="#8DC63F"/>
              <rect y="8" width="26" height="2" rx="1" fill="#8DC63F"/>
              <rect y="16" width="26" height="2" rx="1" fill="#8DC63F"/>
            </svg>

          </button>

        </div>
      </div>

      {/* Side Menu for Mobile */}
      <div
        className={`side-menu fixed z-10 top-0 left-0 w-full max-w-[428px] h-full py-[160px] px-[60px] bg-gradient-to-r from-[#009677] to-[#50B848] transition-transform duration-500 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`} // Only show on mobile
      >
        <span className="toggle-menu absolute top-[20px] right-[20px] cursor-pointer" onClick={toggleMenu}>          
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 17L17 1" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <nav>
          <ul className="flex flex-col gap-[16px] [&>li]:mb-[16px] [&>li>a]:text-[18px] [&>li>a]:leading-[25px] [&>li>a]:text-white [&>li>a]:font-light">
            <li>
              <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="submenu relative">
              <div onClick={toggleDropdown} className="flex justify-between cursor-pointer">
                <Link className={`link font-normal text-white`} href="#">
                  Retirement Calculators
                </Link>
                <svg className="submenu-icon" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5.5 5.5L10 1" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              {/* Dropdown for mobile (on click) */}
              <ul className={`mt-[10px] [&>li>a]:text-[18px] [&>li>a]:leading-[40px] [&>li>a]:text-white [&>li>a]:font-light ${isDropdownOpen ? 'hidden' : 'block'}`}>
                  <li>
                    <Link href="/tax-back" onClick={toggleMenu}>Tax Back</Link>
                  </li>
                  <li>
                    <Link href="/retirement-annuity" onClick={toggleMenu}>Retirement Annuity</Link>
                  </li>
                  <li>
                    <Link href="/retirement-income" onClick={toggleMenu}>Income Annuity</Link>
                  </li>
                  <li>
                    <Link href="#" onClick={toggleMenu}>Pay Yourself First</Link>
                  </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}