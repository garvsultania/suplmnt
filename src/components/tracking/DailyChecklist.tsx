import { useState } from 'react';
import { Check, Plus, Clock, AlertCircle, ChevronRight, Star } from 'lucide-react';

export const DailyChecklist = () => {
  const [supplements] = useState([
    { id: 1, name: 'Vitamin D3', dosage: '2000 IU', time: '8:00 AM', completed: true, priority: 'high', category: 'Essential', benefits: 'Bone health, immunity' },
    { id: 2, name: 'Omega-3', dosage: '1000mg', time: '8:30 AM', completed: true, priority: 'high', category: 'Essential', benefits: 'Heart & brain health' },
    { id: 3, name: 'Magnesium', dosage: '400mg', time: '8:30 AM', completed: true, priority: 'medium', category: 'Wellness', benefits: 'Muscle & sleep support' },
    { id: 4, name: 'B-Complex', dosage: '1 tablet', time: '9:00 AM', completed: false, priority: 'high', category: 'Energy', benefits: 'Energy & metabolism' },
    { id: 5, name: 'Probiotics', dosage: '50B CFU', time: '2:00 PM', completed: false, priority: 'medium', category: 'Digestive', benefits: 'Gut health support' },
    { id: 6, name: 'Melatonin', dosage: '3mg', time: '8:00 PM', completed: false, priority: 'low', category: 'Sleep', benefits: 'Sleep quality' },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'coral';
      case 'medium': return 'sunny';
      case 'low': return 'mint';
      default: return 'mint';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />;
      case 'medium': return <Clock className="w-4 h-4 md:w-5 md:h-5" />;
      case 'low': return <Plus className="w-4 h-4 md:w-5 md:h-5" />;
      default: return <Plus className="w-4 h-4 md:w-5 md:h-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Essential': return '⭐';
      case 'Energy': return '⚡';
      case 'Wellness': return '💪';
      case 'Digestive': return '🌱';
      case 'Sleep': return '🌙';
      default: return '💊';
    }
  };

  return (
    <div className="card-glass mx-3 mb-4 p-5 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-coral rounded-xl md:rounded-2xl flex items-center justify-center shadow-float flex-shrink-0">
            <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl md:text-2xl font-poppins font-bold text-slate tracking-tight truncate">Daily Checklist</h2>
            <p className="text-slate/60 font-inter text-sm md:text-base">Your personalized schedule</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1 md:gap-2 mb-1">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-coral rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm font-inter text-slate/60 uppercase tracking-wider font-medium hidden sm:inline">High Priority</span>
            <span className="text-xs font-inter text-slate/60 uppercase tracking-wider font-medium sm:hidden">High</span>
          </div>
          <div className="text-lg md:text-lg font-poppins font-bold text-coral">4 remaining</div>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        {supplements.map((supplement) => (
          <div 
            key={supplement.id} 
            className={`glass p-4 md:p-6 rounded-2xl md:rounded-3xl transition-all duration-500 hover:scale-[1.01] md:hover:scale-[1.02] cursor-pointer relative overflow-hidden group ${
              supplement.completed ? 'opacity-70' : ''
            }`}
          >
            {/* Mobile-optimized gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r from-${getPriorityColor(supplement.priority)}/10 via-${getPriorityColor(supplement.priority)}/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-bl from-white/8 to-transparent rounded-full -translate-y-8 translate-x-8 md:-translate-y-10 md:translate-x-10" />
            
            <div className="relative z-10 flex items-center gap-3 md:gap-6">
              {/* Enhanced mobile-friendly completion checkbox */}
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 border-2 flex-shrink-0 ${
                supplement.completed 
                  ? `bg-gradient-${getPriorityColor(supplement.priority)} shadow-float border-white/20 scale-105 md:scale-110` 
                  : `glass border-white/30 hover:border-${getPriorityColor(supplement.priority)}/50 hover:scale-105`
              }`}>
                {supplement.completed ? (
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-white animate-bounce" />
                ) : (
                  <div className={`text-${getPriorityColor(supplement.priority)} transition-transform duration-300 group-hover:scale-110`}>
                    {getPriorityIcon(supplement.priority)}
                  </div>
                )}
              </div>

              {/* Enhanced mobile-optimized supplement info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <div className="text-lg md:text-2xl flex-shrink-0">{getCategoryIcon(supplement.category)}</div>
                  <h3 className={`text-lg md:text-xl font-poppins font-semibold ${supplement.completed ? 'line-through text-slate/50' : 'text-slate'} transition-all duration-300 truncate flex-1`}>
                    {supplement.name}
                  </h3>
                  <div className={`px-2 py-1 md:px-3 md:py-1 rounded-lg md:rounded-xl text-xs font-inter font-bold bg-${getPriorityColor(supplement.priority)}/20 text-${getPriorityColor(supplement.priority)} uppercase tracking-wider border border-${getPriorityColor(supplement.priority)}/30 flex-shrink-0`}>
                    {supplement.priority}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-slate/70 font-inter mb-1 md:mb-2">
                  <span className="flex items-center gap-1 font-semibold flex-shrink-0">
                    💊 {supplement.dosage}
                  </span>
                  <span className="flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    {supplement.time}
                  </span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-md text-xs font-medium hidden sm:inline">
                    {supplement.category}
                  </span>
                </div>
                
                <p className="text-xs md:text-sm text-slate/60 font-inter italic truncate">{supplement.benefits}</p>
              </div>

              {/* Enhanced mobile-friendly progress indicator */}
              <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                {supplement.completed && (
                  <div className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-2 bg-mint/20 rounded-xl md:rounded-2xl">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-mint" />
                    <span className="text-xs md:text-sm font-inter font-medium text-mint hidden sm:inline">Done</span>
                  </div>
                )}
                <ChevronRight className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
                  supplement.completed ? 'text-slate/30' : 'text-slate/60 group-hover:text-slate/90 group-hover:translate-x-1'
                }`} />
              </div>
            </div>

            {/* Mobile-optimized progress indicator line */}
            {!supplement.completed && (
              <div className="mt-3 md:mt-4 relative">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className={`h-1 bg-gradient-${getPriorityColor(supplement.priority)} rounded-full transition-all duration-700 ease-out opacity-60`} 
                       style={{ width: supplement.priority === 'high' ? '25%' : supplement.priority === 'medium' ? '15%' : '10%' }}>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced mobile-optimized action button */}
      <div className="mt-6 md:mt-8">
        <button className="w-full glass p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gradient-to-r from-mint/20 to-coral/20 border border-white/30 hover:shadow-glass-lg hover:scale-[1.01] md:hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-mint via-sunny to-coral opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
            <Plus className="w-5 h-5 md:w-6 md:h-6 text-slate group-hover:text-mint transition-colors duration-300" />
            <span className="text-base md:text-lg font-poppins font-semibold text-slate group-hover:text-mint transition-colors duration-300">
              Add Custom Supplement
            </span>
          </div>
        </button>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  );
};
