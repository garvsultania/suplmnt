import React from 'react';

interface DurationCardProps {
  duration?: string;
}

export const DurationCard: React.FC<DurationCardProps> = ({ duration }) => {
  if (!duration) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      <h3 className="text-sm font-medium text-gray-500">Recommended Duration</h3>
      <p className="text-base text-gray-900">{duration}</p>
    </div>
  );
}; 