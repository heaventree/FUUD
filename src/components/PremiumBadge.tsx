import React from 'react';
import { Crown } from 'lucide-react';

export const PremiumBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-1 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
      <Crown size={14} />
      <span>Premium</span>
    </div>
  );
};
