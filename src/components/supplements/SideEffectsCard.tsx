import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SideEffectsCardProps {
  sideEffects: string[];
}

export const SideEffectsCard: React.FC<SideEffectsCardProps> = ({ sideEffects }) => {
  if (!sideEffects || sideEffects.length === 0) return null;

  return (
    <div className="card-glass border border-red-200 bg-red-50/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-red-700" />
        </div>
        <h3 className="font-inter font-semibold text-base text-red-700">Side Effects & Warnings</h3>
      </div>
      <ul className="space-y-2">
        {sideEffects.map((effect, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-red-700 rounded-full"></div>
            </div>
            <span className="text-sm text-red-700">{effect}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}; 