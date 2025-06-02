import React from 'react';
import { cn } from '@/lib/utils';

interface DietaryInfoCardProps {
  isVegetarian?: boolean;
  isVegan?: boolean;
  allergens?: string[];
}

export const DietaryInfoCard: React.FC<DietaryInfoCardProps> = ({
  isVegetarian,
  isVegan,
  allergens,
}) => {
  const hasInfo = isVegetarian || isVegan || (allergens && allergens.length > 0);

  if (!hasInfo) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      <h3 className="text-sm font-medium text-gray-500">Dietary Info</h3>
      <div className="flex flex-wrap gap-2">
        {isVegetarian && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Vegetarian
          </span>
        )}
        {isVegan && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Vegan
          </span>
        )}
        {allergens?.map(allergen => (
          <span
            key={allergen}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"
          >
            {allergen}
          </span>
        ))}
      </div>
    </div>
  );
}; 