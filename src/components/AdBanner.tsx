import React, { useEffect } from 'react';
import { GoogleAdSense } from '@react-google-ads/api';

export const AdBanner: React.FC = () => {
  useEffect(() => {
    // Initialize Google AdSense
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="w-full bg-surface-100 rounded-lg overflow-hidden my-6">
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_AD_CLIENT_ID"
        data-ad-slot="YOUR_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};
