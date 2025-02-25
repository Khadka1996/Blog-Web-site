'use client'
import React, { useState } from 'react';
import logo from '../assets/logo.webp';
import { AiOutlineArrowRight } from "react-icons/ai";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-black top-0 left-0 w-full z-50">
      <div className="mx-3 md:mx-10 lg:mx-18">
        <div className="container mx-auto flex items-center justify-between p-1">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 w-16 mr-5" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className={`text-lg font-semibold ${
                location.pathname === '/' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f]`}
            >
              Home
            </a>

            <a
              href="/blog"
              className={`text-lg font-semibold ${
                location.pathname === '/services' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f]`}
            >
              Blog
            </a>

            <a
              href="/tools"
              className={`text-lg font-semibold ${
                location.pathname === '/about' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f]`}
            >
              Tools
            </a>

            <a
              href="/services"
              className={`text-lg font-semibold ${
                location.pathname === '/my-work' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f]`}
            >
              Our Services
            </a>

            <a
              href="/e-book"
              className={`text-lg font-semibold ${
                location.pathname === '/contact' ? 'text-[#4caf4f]' : 'text-gray-800'
              } hover:text-[#4caf4f]`}
            >
              E-Book
            </a>

            {/* Register Button with UserPlus Icon */}
            <a
              href="/register"
              className="bg-[#4caf4f] text-white py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-[#6a9b52] transition duration-300"
            >
              <span>Register</span>
              <AiOutlineArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-black hover:text-[#4caf4f]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <div className="md:hidden bg-white text-black shadow-lg mt-2 rounded-lg">
            <div className="flex flex-col space-y-2 p-4">
              <a
                href="/"
                className={`text-lg font-semibold ${
                  location.pathname === '/' ? 'text-[#4caf4f]' : 'text-gray-800'
                } hover:text-[#4caf4f]`}
                onClick={toggleMenu}
              >
                Home
              </a>
              <a
                href="/blog"
                className={`text-lg font-semibold ${
                  location.pathname === '/services' ? 'text-[#4caf4f]' : 'text-gray-800'
                } hover:text-[#4caf4f]`}
                onClick={toggleMenu}
              >
                Blog
              </a>
              <a
                href="/tools"
                className={`text-lg font-semibold ${
                  location.pathname === '/about' ? 'text-[#4caf4f]' : 'text-gray-800'
                } hover:text-[#4caf4f]`}
                onClick={toggleMenu}
              >
                Tools
              </a>
              <a
                href="/services"
                className={`text-lg font-semibold ${
                  location.pathname === '/my-work' ? 'text-[#4caf4f]' : 'text-gray-800'
                } hover:text-[#4caf4f]`}
                onClick={toggleMenu}
              >
                Our Services
              </a>
              <a
                href="/e-book"
                className={`text-lg font-semibold ${
                  location.pathname === '/contact' ? 'text-[#4caf4f]' : 'text-gray-800'
                } hover:text-[#4caf4f]`}
                onClick={toggleMenu}
              >
                E-Book
              </a>

              {/* Register Button with UserPlus Icon */}
              <a
                href="/register"
                className="bg-[#4caf4f] text-white py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-[#6a9b52] transition duration-300"
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
