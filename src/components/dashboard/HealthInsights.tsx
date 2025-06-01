import { useState } from 'react';

export const HealthInsights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const insights = [
    {
      title: 'Vitamin D Deficiency Detected',
      description: 'Your latest lab results show low vitamin D levels. Consider increasing sun exposure or supplementation.',
      type: 'warning',
      gradient: 'bg-gradient-coral',
    },
    {
      title: 'Great Progress on B12!',
      description: 'Your B12 levels have improved by 30% since starting supplementation. Keep it up!',
      type: 'success',
      gradient: 'bg-gradient-mint',
    },
    {
      title: 'Optimize Your Iron Absorption',
      description: 'Take iron supplements with vitamin C and avoid coffee/tea for 2 hours after.',
      type: 'tip',
      gradient: 'bg-gradient-sunny',
    },
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev + 1) % insights.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <h2 className="text-lg md:text-xl font-poppins font-semibold text-slate px-2">Health Insights</h2>
      
      <div className="relative overflow-hidden" aria-live="polite">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {insights.map((insight, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              <div className={`card-glass ${insight.gradient} text-white relative p-4 md:p-6`}>
                <button
                  className="absolute top-2 right-2 p-1 text-white/70 hover:text-white/100 text-lg font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-white/70 transition-colors duration-200"
                  aria-label="Dismiss insight"
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % insights.length)}
                >
                  ×
                </button>
                <h3 className="font-poppins font-semibold text-base md:text-lg mb-2 md:mb-3 pr-8">
                  {insight.title}
                </h3>
                <p className="font-inter text-sm md:text-base text-white/90 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced mobile-optimized dots indicator */}
        <div className="flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4">
          {insights.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-mint w-4 md:w-6' : 'bg-slate/30 w-1.5 md:w-2'
              }`}
              aria-label={`Go to insight ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
