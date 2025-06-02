import React from 'react';
import { DosageInfoCard } from './DosageInfoCard';
import { BenefitsCard } from './BenefitsCard';
import { SideEffectsCard } from './SideEffectsCard';
import { InteractionWarningsCard } from './InteractionWarningsCard';
import { DietaryInfoCard } from './DietaryInfoCard';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface SupplementOverviewProps {
  name: string;
  dosage: {
    amount: string;
    frequency: string;
    form?: string;
    storage?: string;
  };
  benefits: string[];
  sideEffects: string[];
  interactions?: string[];
  dietaryInfo?: {
    activeIngredients?: string[];
    source?: string;
    allergens?: string[];
    capsuleSize?: string;
  };
}

export const SupplementOverview: React.FC<SupplementOverviewProps> = ({
  name,
  dosage,
  benefits,
  sideEffects,
  interactions,
  dietaryInfo,
}) => {
  return (
    <div className="space-y-4 pb-8">
      {/* Dosage & Instructions Card */}
      <div className="card-glass">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-mint/20 rounded-full flex items-center justify-center">
            <Info className="w-4 h-4 text-mint" />
          </div>
          <h3 className="font-inter font-semibold text-base text-brand-dark-text">Dosage & Instructions</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-inter font-bold text-brand-dark-text">{dosage.amount}</p>
            <p className="text-sm text-brand-light-text">{dosage.frequency}</p>
          </div>
          <div>
            {dosage.form && (
              <p className="text-sm text-brand-light-text">Form: {dosage.form}</p>
            )}
            {dosage.storage && (
              <p className="text-sm text-brand-light-text">Storage: {dosage.storage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Card */}
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

      {/* Side Effects & Warnings Card */}
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

      {/* Interactions Card */}
      {interactions && interactions.length > 0 && (
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
      )}

      {/* Quick Facts Card */}
      {dietaryInfo && (
        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-mint/20 rounded-full flex items-center justify-center">
              <Info className="w-4 h-4 text-mint" />
            </div>
            <h3 className="font-inter font-semibold text-base text-brand-dark-text">Quick Facts</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {dietaryInfo.activeIngredients && (
              <div>
                <p className="text-sm font-medium text-brand-dark-text">Active Ingredients</p>
                <p className="text-sm text-brand-light-text">{dietaryInfo.activeIngredients.join(', ')}</p>
              </div>
            )}
            {dietaryInfo.source && (
              <div>
                <p className="text-sm font-medium text-brand-dark-text">Source</p>
                <p className="text-sm text-brand-light-text">{dietaryInfo.source}</p>
              </div>
            )}
            {dietaryInfo.allergens && (
              <div>
                <p className="text-sm font-medium text-brand-dark-text">Allergens</p>
                <p className="text-sm text-brand-light-text">{dietaryInfo.allergens.join(', ')}</p>
              </div>
            )}
            {dietaryInfo.capsuleSize && (
              <div>
                <p className="text-sm font-medium text-brand-dark-text">Capsule Size</p>
                <p className="text-sm text-brand-light-text">{dietaryInfo.capsuleSize}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 