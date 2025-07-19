'use client'
import React from 'react';
import Image from 'next/image';
import image from '../assets/image.png';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';

const TopBody = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Place for your<br className="hidden lg:block" />One Step 
              </h1>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4caf4f]">
                Solutions
              </h2>
              
              <p className="text-base md:text-lg text-gray-600 max-w-[500px] mx-auto lg:mx-0">
                A vibrant hub for tools, content & services that empower your business
              </p>
              
              <div className="pt-2 md:pt-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#4caf4f] px-6 py-3 text-white shadow-md transition-all hover:bg-[#3d8b40] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4caf4f] focus:ring-offset-2"
                >
                  <span className="text-sm sm:text-base font-medium">Contact Us</span>
                  <AiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-xl">
              <Image
                src={image}
                alt="Digital solutions illustration"
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBody;