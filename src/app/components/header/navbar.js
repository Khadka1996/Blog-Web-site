'use client'
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AiOutlineArrowRight } from "react-icons/ai";
import Image from 'next/image';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100 text-black sticky top-0 left-0 w-full z-50 shadow-sm">
      <div className="mx-3 md:mx-10 lg:mx-18">
        <div className="container mx-auto flex items-center justify-between p-1">
          {/* Logo */}
          <div className="flex items-center">
            <Image 
              src="/logo.webp" 
              alt="Logo" 
              width={64} 
              height={64} 
              className="h-16 w-16 mr-5" 
              priority // Important for above-the-fold images
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className={`text-lg font-semibold ${
                pathname === '/' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f] transition-colors`}
            >
              Home
            </a>

            <a
              href="/blog"
              className={`text-lg font-semibold ${
                pathname === '/blog' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f] transition-colors`}
            >
              Blog
            </a>

            <a
              href="/tools"
              className={`text-lg font-semibold ${
                pathname === '/tools' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f] transition-colors`}
            >
              Tools
            </a>

            <a
              href="/services"
              className={`text-lg font-semibold ${
                pathname === '/services' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f] transition-colors`}
            >
              Our Services
            </a>

            {/* <a
              href="/e-book"
              className={`text-lg font-semibold ${
                pathname === '/e-book' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f] transition-colors`}
            >
              E-Book
            </a> */}

            {/* Register Button with Arrow Icon */}
            <a
              href="/register"
              className="bg-[#4caf4f] text-white py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-[#3d8b40] transition-colors duration-300"
            >
              <span>Register</span>
              <AiOutlineArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="focus:outline-none"
              aria-label="Toggle menu"
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
          <div className="md:hidden bg-white text-black shadow-lg rounded-lg mt-1">
            <div className="flex flex-col space-y-3 p-4">
              <a
                href="/"
                className={`text-lg font-semibold py-2 px-4 rounded ${
                  pathname === '/' ? 'text-[#4caf4f] bg-gray-100' : 'text-gray-800'
                } hover:text-[#4caf4f] hover:bg-gray-50 transition-colors`}
                onClick={toggleMenu}
              >
                Home
              </a>
              <a
                href="/blog"
                className={`text-lg font-semibold py-2 px-4 rounded ${
                  pathname === '/blog' ? 'text-[#4caf4f] bg-gray-100' : 'text-gray-800'
                } hover:text-[#4caf4f] hover:bg-gray-50 transition-colors`}
                onClick={toggleMenu}
              >
                Blog
              </a>
              <a
                href="/tools"
                className={`text-lg font-semibold py-2 px-4 rounded ${
                  pathname === '/tools' ? 'text-[#4caf4f] bg-gray-100' : 'text-gray-800'
                } hover:text-[#4caf4f] hover:bg-gray-50 transition-colors`}
                onClick={toggleMenu}
              >
                Tools
              </a>
              <a
                href="/services"
                className={`text-lg font-semibold py-2 px-4 rounded ${
                  pathname === '/services' ? 'text-[#4caf4f] bg-gray-100' : 'text-gray-800'
                } hover:text-[#4caf4f] hover:bg-gray-50 transition-colors`}
                onClick={toggleMenu}
              >
                Our Services
              </a>
              {/* <a
                href="/e-book"
                className={`text-lg font-semibold py-2 px-4 rounded ${
                  pathname === '/e-book' ? 'text-[#4caf4f] bg-gray-100' : 'text-gray-800'
                } hover:text-[#4caf4f] hover:bg-gray-50 transition-colors`}
                onClick={toggleMenu}
              >
                E-Book
              </a> */}

              <a
                href="/register"
                className="bg-[#4caf4f] text-white py-2 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#3d8b40] transition-colors duration-300 mt-2"
                onClick={toggleMenu}
              >
                <span>Register</span>
                <AiOutlineArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;