'use client';
import React from 'react';
import Image from 'next/image';

// JSON Object with external image URLs
const clientsData = {
  clients: [
    {
      id: 1,
      src: 'https://assets.turbologo.com/assets/landing/logo_maker/how-3-958346d0e544dc23c2ed0c1bfa39bd736f2d88b2d8b53e14333252803e703832.svg',
      alt: 'Client 1',
    },
    {
      id: 2,
      src: 'https://assets.turbologo.com/assets/landing/logo_maker/how-3-958346d0e544dc23c2ed0c1bfa39bd736f2d88b2d8b53e14333252803e703832.svg',
      alt: 'Client 2',
    },
    {
      id: 3,
      src: 'https://assets.turbologo.com/assets/landing/logo_maker/how-3-958346d0e544dc23c2ed0c1bfa39bd736f2d88b2d8b53e14333252803e703832.svg',
      alt: 'Client 3',
    },
    {
      id: 4,
      src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      alt: 'Client 4',
    },
    {
      id: 5,
      src: 'https://assets.turbologo.com/assets/landing/logo_maker/how-3-958346d0e544dc23c2ed0c1bfa39bd736f2d88b2d8b53e14333252803e703832.svg',
      alt: 'Client 5',
    },
    {
      id: 6,
      src: 'https://assets.turbologo.com/assets/landing/logo_maker/how-3-958346d0e544dc23c2ed0c1bfa39bd736f2d88b2d8b53e14333252803e703832.svg',
      alt: 'Client 6',
    },
    {
      id: 7,
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      alt: 'Client 7',
    },
    {
      id: 8,
      src: 'https://assets.turbologo.com/assets/landing/logo_maker/how-3-958346d0e544dc23c2ed0c1bfa39bd736f2d88b2d8b53e14333252803e703832.svg',
      alt: 'Client 8',
    },
  ],
};

const OurClients = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Clients</h2>
        <p className="text-lg text-gray-600">
          We have been working with some Fortune 500+ clients
        </p>
      </div>

      {/* Marquee Effect */}
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marqueeSlow">
          {clientsData.clients.map((client) => (
            <div key={client.id} className="mx-8">
              <Image
                src={client.src}
                alt={client.alt}
                width={150}
                height={80}
                className="h-20 w-32 object-contain"
                priority
              />
            </div>
          ))}
          {clientsData.clients.map((client) => (
            <div key={`duplicate-${client.id}`} className="mx-8">
              <Image
                src={client.src}
                alt={client.alt}
                width={150}
                height={80}
                className="h-20 w-32 object-contain"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS Animation */}
      <style jsx>{`
        @keyframes marqueeSlow {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marqueeSlow {
          animation: marqueeSlow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OurClients;
