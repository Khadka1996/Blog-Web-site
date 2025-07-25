// src/app/components/ads/GoogleAd.jsx
'use client';

import { useEffect } from 'react';

export default function GoogleAd({ slot }) {
  useEffect(() => {
    if (window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Ad error:', e);
      }
    }
  }, [slot]);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-YOUR_PUB_ID"
      data-ad-slot={`YOUR_${slot.toUpperCase()}_SLOT_ID`}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}