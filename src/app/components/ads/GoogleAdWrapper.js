// src/app/components/ads/AdWrapper.jsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const GoogleAd = dynamic(() => import('./GoogleAd'), { 
  ssr: false,
  loading: () => <AdPlaceholder />
});

function AdPlaceholder() {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg h-[90px] flex items-center justify-center">
      <span className="text-gray-500">Advertisement</span>
    </div>
  );
}

export default function AdWrapper({ position }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't show ads in development
  if (process.env.NODE_ENV !== 'production') {
    return <AdPlaceholder />;
  }

  return (
    <div className={position === 'top' || position === 'bottom' ? 'h-[90px]' : 'h-[250px]'}>
      {isClient && <GoogleAd slot={position} />}
    </div>
  );
}