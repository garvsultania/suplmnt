import React from 'react';
import { CheckCircle } from 'lucide-react';

interface BenefitsCardProps {
  benefits: string[];
}

export const BenefitsCard: React.FC<BenefitsCardProps> = ({ benefits }) => {
  if (!benefits || benefits.length === 0) return null;

  return (
    <div className="card-glass">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-mint/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-mint" />
        </div>
        <h3 className="font-inter font-semibold text-base text-brand-dark-text">Benefits</h3>
      </div>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-5 h-5 bg-mint/20 rounded-full flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-mint rounded-full"></div>
            </div>
            <span className="text-sm text-brand-dark-text">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}; 