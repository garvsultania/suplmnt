import React from 'react';
import { Supplement } from '../../contexts/SupplementsContext';
import { Star, Clock, PackageOpen, ShoppingCart, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface SupplementCardProps {
  supplement: Supplement;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (id: string) => void;
  onPurchase: (id: string, link: Supplement['purchaseLinks'][0]) => void;
}

export function SupplementCard({
  supplement,
  onToggleFavorite,
  onViewDetails,
  onPurchase,
}: SupplementCardProps) {
  const statusConfig = {
    active: {
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      text: 'Active',
      icon: CheckCircle2
    },
    paused: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      text: 'Paused',
      icon: AlertCircle
    },
    completed: {
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      text: 'Completed',
      icon: CheckCircle2
    }
  };

  const status = statusConfig[supplement.status];
  const StatusIcon = status.icon;

  // Find the best price from purchase links
  const bestPriceLink = supplement.purchaseLinks.reduce((bestLink, currentLink) => {
    if (!currentLink.price) return bestLink;
    if (!bestLink || !bestLink.price) return currentLink;
    const priceCurrent = parseFloat(currentLink.price.replace(/[^0-9.]/g, ''));
    const priceBest = parseFloat(bestLink.price.replace(/[^0-9.]/g, ''));
    return priceCurrent < priceBest ? currentLink : bestLink;
  }, supplement.purchaseLinks[0] || null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetails(supplement.id)}
    >
      {/* Header / Basic Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-mint/10">
            <PackageOpen className="w-6 h-6 text-mint" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-gray-900 truncate">{supplement.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  onToggleFavorite(supplement.id);
                }}
                className={cn(
                  "p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-mint/50",
                  supplement.isFavorite ? "text-yellow-400 hover:text-yellow-500" : "text-gray-400 hover:text-yellow-400"
                )}
                aria-label={supplement.isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star className="w-4 h-4" fill={supplement.isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">{supplement.description}</p>
          </div>
        </div>
      </div>

      {/* Key Details */}
      <div className="px-4 py-3 bg-gray-50/50">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-mint" />
            <span>{supplement.dosage.amount} • {supplement.dosage.frequency}</span>
          </div>
          <div className={cn("flex items-center gap-2 px-2 py-1 rounded-full", status.bgColor, status.color)}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-xs font-medium">{status.text}</span>
          </div>
        </div>
      </div>

      {/* Dietary Info */}
      <div className="px-4 py-3 flex flex-wrap gap-2">
        {supplement.dietaryInfo.isVegetarian && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Veg
          </span>
        )}
        {supplement.dietaryInfo.isVegan && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Vegan
          </span>
        )}
        {supplement.dietaryInfo.allergens?.map(allergen => (
          <span
            key={allergen}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"
          >
            {allergen}
          </span>
        ))}
      </div>

      {/* Purchase Actions */}
      <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-500">Best Price</p>
            <p className="text-xl font-bold text-gray-900">
              {bestPriceLink?.price ? `₹${parseFloat(bestPriceLink.price.replace(/[^0-9.]/g, '')).toFixed(0)}` : 'N/A'}
            </p>
            {bestPriceLink && <p className="text-xs text-gray-500">from {bestPriceLink.name}</p>}
          </div>
          {bestPriceLink && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click from triggering
                onPurchase(supplement.id, bestPriceLink);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-mint hover:bg-mint/90 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-mint/50"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 