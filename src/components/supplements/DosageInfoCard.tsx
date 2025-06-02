import React from 'react';
import { Info } from 'lucide-react';

interface DosageInfoCardProps {
  amount: string;
  frequency: string;
  form?: string;
  storage?: string;
}

export const DosageInfoCard: React.FC<DosageInfoCardProps> = ({
  amount,
  frequency,
  form,
  storage,
}) => {
  return (
    <div className="card-glass">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-mint/20 rounded-full flex items-center justify-center">
          <Info className="w-4 h-4 text-mint" />
        </div>
        <h3 className="font-inter font-semibold text-base text-brand-dark-text">Dosage & Instructions</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-inter font-bold text-brand-dark-text">{amount}</p>
          <p className="text-sm text-brand-light-text">{frequency}</p>
        </div>
        <div>
          {form && (
            <p className="text-sm text-brand-light-text">Form: {form}</p>
          )}
          {storage && (
            <p className="text-sm text-brand-light-text">Storage: {storage}</p>
          )}
        </div>
      </div>
    </div>
  );
}; 