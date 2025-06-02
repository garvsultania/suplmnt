import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface InteractionWarningsCardProps {
  interactions: string[];
}

export const InteractionWarningsCard: React.FC<InteractionWarningsCardProps> = ({ interactions }) => {
  if (!interactions || interactions.length === 0) return null;

  return (
    <div className="card-glass border border-yellow-200 bg-yellow-50/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-yellow-700" />
        </div>
        <h3 className="font-inter font-semibold text-base text-yellow-700">Interactions & Contraindications</h3>
      </div>
      <ul className="space-y-2">
        {interactions.map((interaction, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-yellow-700 rounded-full"></div>
            </div>
            <span className="text-sm text-yellow-700">{interaction}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}; 