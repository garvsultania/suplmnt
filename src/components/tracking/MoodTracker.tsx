import { useState } from 'react';
import { Smile, Meh, Frown, Heart, Zap, Moon, Sparkles } from 'lucide-react';

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null);

  const moods = [
    { id: 'amazing', icon: Sparkles, label: 'Amazing', color: 'mint', gradient: 'from-mint to-sunny' },
    { id: 'great', icon: Smile, label: 'Great', color: 'sunny', gradient: 'from-sunny to-coral' },
    { id: 'good', icon: Heart, label: 'Good', color: 'coral', gradient: 'from-coral to-mint' },
    { id: 'okay', icon: Meh, label: 'Okay', color: 'slate', gradient: 'from-slate/60 to-slate/40' },
    { id: 'low', icon: Frown, label: 'Low', color: 'slate', gradient: 'from-slate/50 to-slate/30' },
  ];

  const energyLevels = [
    { id: 'high', icon: Zap, label: 'High Energy', color: 'mint', description: 'Feeling energized' },
    { id: 'medium', icon: Heart, label: 'Moderate', color: 'sunny', description: 'Balanced energy' },
    { id: 'low', icon: Moon, label: 'Low Energy', color: 'coral', description: 'Need some rest' },
  ];

  return (
    <div className="card-glass mb-4">
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-coral to-sunny rounded-xl md:rounded-2xl flex items-center justify-center shadow-float flex-shrink-0">
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl md:text-2xl font-poppins font-bold text-slate tracking-tight">Wellness Check</h2>
          <p className="text-slate/60 font-inter text-sm md:text-base">How are you feeling today?</p>
        </div>
      </div>
      
      {/* Enhanced mobile-optimized mood selection */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-poppins font-semibold text-slate mb-4 md:mb-6 flex items-center gap-2">
          <div className="w-1 h-5 md:h-6 bg-gradient-mint rounded-full" />
          Mood & Wellbeing
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.id;
            
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex flex-col items-center gap-2 md:gap-3 glass relative overflow-hidden group ${
                  isSelected 
                    ? `glass-hover bg-gradient-to-br ${mood.gradient} text-white scale-105` 
                    : 'hover:scale-105'
                }`}
                aria-label={`Select ${mood.label} mood`}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                )}
                <div className="relative z-10 text-center">
                  <Icon className={`icon-premium mb-1 md:mb-2 mx-auto ${isSelected ? 'animate-bounce' : 'group-hover:scale-110 transition-transform duration-300'} ${isSelected ? 'icon-white' : ''}`} />
                  <span className="text-xs md:text-sm font-inter font-semibold block">{mood.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Enhanced mobile-optimized energy level selection */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-poppins font-semibold text-slate mb-4 md:mb-6 flex items-center gap-2">
          <div className="w-1 h-5 md:h-6 bg-gradient-sunny rounded-full" />
          Energy Level
        </h3>
        <div className="grid grid-cols-1 gap-2 md:gap-4">
          {energyLevels.map((energy) => {
            const Icon = energy.icon;
            const isSelected = selectedEnergy === energy.id;
            
            return (
              <button
                key={energy.id}
                onClick={() => setSelectedEnergy(energy.id)}
                className={`flex items-center gap-3 md:gap-4 glass text-left relative overflow-hidden group ${
                  isSelected 
                    ? `glass-hover bg-gradient-${energy.color} text-white scale-[1.02]` 
                    : 'hover:scale-[1.01]'
                }`}
                aria-label={`Select ${energy.label} energy level`}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                )}
                <div className="relative z-10 flex items-center gap-3 md:gap-4 w-full">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/20' : `bg-gradient-${energy.color}`
                  } ${isSelected ? '' : 'group-hover:scale-110'} transition-transform duration-300`}>
                    <Icon className={`icon-premium mr-2 ${isSelected ? 'icon-white' : ''}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-poppins font-semibold mb-0.5 truncate">{energy.label}</h4>
                    <p className={`text-xs md:text-sm font-inter ${isSelected ? 'text-white/80' : 'text-slate/60'}`}>
                      {energy.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-white/30 rounded-full flex items-center justify-center animate-pulse flex-shrink-0">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Enhanced mobile-optimized save button */}
      {(selectedMood || selectedEnergy) && (
        <div className="relative">
          <button 
            className="w-full btn-glass btn-primary p-3 md:p-4 rounded-xl md:rounded-2xl font-poppins font-semibold text-sm md:text-base relative overflow-hidden group"
            aria-label="Save wellness check"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-mint via-sunny to-coral opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10 text-white drop-shadow-sm">Save Today's Wellness Check</span>
          </button>
        </div>
      )}
    </div>
  );
};
