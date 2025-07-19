"use client";

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '9779815817938';
    const message = 'Hello! I have a question.';
    
    if (isMobile) {
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isMobile ? (
        // Mobile - Icon only
        <button
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-all"
          onClick={handleWhatsAppClick}
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp className="w-8 h-8" />
        </button>
      ) : (
        // Desktop - Button with text
        <button
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-all"
          onClick={handleWhatsAppClick}
        >
          <FaWhatsapp className="w-5 h-5" />
          <span className="font-medium">Chat on WhatsApp</span>
        </button>
      )}
    </div>
  );
}