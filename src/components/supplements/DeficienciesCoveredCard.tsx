import React from 'react';

interface DeficienciesCoveredCardProps {
  deficiencies?: string[];
}

export const DeficienciesCoveredCard: React.FC<DeficienciesCoveredCardProps> = ({
  deficiencies,
}) => {
  if (!deficiencies || deficiencies.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      <h3 className="text-sm font-medium text-gray-500">Deficiencies Covered</h3>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
        {deficiencies.map((deficiency, index) => (
          <li key={index}>{deficiency}</li>
        ))}
      </ul>
    </div>
  );
}; 