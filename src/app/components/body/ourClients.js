'use client'
import React from 'react'
import Image from 'next/image'
import Facebook from './clientAssets/Facebook ads-1.svg'
import Tiktok from './clientAssets/tiktok.png'
import Instagram from './clientAssets/instagram-ads-logo.webp'
import Youtube from './clientAssets/youtube.jpg'
import Google from './clientAssets/google.webp'
import Bing from './clientAssets/bing.webp'
import X from './clientAssets/x.png'

const OurClients = () => {
  const clients = [
    { id: 1, src: Tiktok, alt: 'TikTok Ads' },
    { id: 2, src: Instagram, alt: 'Instagram Ads' },
    { id: 3, src: Youtube, alt: 'YouTube Ads' },
    { id: 4, src: Facebook, alt: 'Meta Ads' },
    { id: 5, src: Google, alt: 'Google Ads' },
    { id: 6, src: Bing, alt: 'Microsoft Ads' },
    { id: 7, src: X, alt: 'X Platform Ads' }
  ]

  return (
    <section className="relative bg-gray-50 py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-32 w-32 rounded-full bg-[#4caf4f]/10 blur-3xl" />
        <div className="absolute right-0 bottom-1/3 h-40 w-40 rounded-full bg-[#4caf4f]/05 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-10 relative">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Trusted by <span className="text-[#4caf4f]">Industry Leaders</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partnering with the world's top advertising platforms to deliver exceptional results
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full">
          {/* First Marquee Row */}
          <div className="flex w-max animate-marquee items-center py-6 space-x-10 md:space-x-12">
            {[...clients, ...clients].map((client, index) => (
              <div key={`${client.id}-${index}`} className="flex-shrink-0">
                <div className="relative h-16 w-32 sm:h-20 sm:w-40 transition-all duration-300 hover:scale-105">
                  <Image
                    src={client.src}
                    alt={client.alt}
                    fill
                    className="object-contain object-center  transition-all duration-500"
                    quality={90}
                    sizes="(max-width: 768px) 160px, 200px"
                  />
                </div>
              </div>
            ))}
          </div>

         
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
      `}</style>
    </section>
  )
}

export default OurClients