'use client'
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Navigation links data for DRY principle
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/tools', label: 'Tools' },
    { href: '/services', label: 'Our Services' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className="bg-gray-100 text-black sticky top-0 left-0 w-full z-50 shadow-sm ">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <div className="container mx-auto flex items-center justify-between p-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" onClick={closeMenu}>
              <Image 
                src="/logos.png" 
                alt="Logo" 
                width={85} 
                height={64} 
                className="h-16 w-20 mr-4" 
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium ${
                  pathname === link.href ? 'text-[#4caf4f]' : 'text-gray-800'
                } hover:text-[#4caf4f] transition-colors duration-200`}
              >
                {link.label}
              </Link>
            ))}

            {/* Register Button with Arrow Icon */}
            <Link
              href="/register"
              className="bg-[#4caf4f] text-white py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-[#3d8b40] transition-colors duration-300"
            >
              <span>Register</span>
              <AiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-black hover:text-[#4caf4f] transition-colors"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-white text-black shadow-lg rounded-lg mt-2 mx-2">
            <div className="flex flex-col space-y-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`text-lg font-medium py-3 px-4 rounded ${
                    pathname === link.href ? 'text-[#4caf4f] bg-gray-100' : 'text-gray-800'
                  } hover:text-[#4caf4f] hover:bg-gray-50 transition-colors duration-200`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/register"
                onClick={closeMenu}
                className="bg-[#4caf4f] text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#3d8b40] transition-colors duration-300 mt-2"
              >
                <span>Register</span>
                <AiOutlineArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;