import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const HealthInsights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const insights = [
    {
      title: 'Vitamin D Deficiency Detected',
      description: 'Your latest lab results show low vitamin D levels. Consider increasing sun exposure or supplementation.',
      type: 'warning',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      action: { label: 'Take Action', link: '/supplements' }
    },
    {
      title: 'Great Progress on B12!',
      description: 'Your B12 levels have improved by 30% since starting supplementation. Keep it up!',
      type: 'success',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      action: null
    },
    {
      title: 'Optimize Your Iron Absorption',
      description: 'Take iron supplements with vitamin C and avoid coffee/tea for 2 hours after.',
      type: 'tip',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      action: { label: 'Learn More', link: '/research' }
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
              <div className={`card-glass ${insight.bgColor} ${insight.textColor} relative p-4 md:p-6`}>
                <button
                  className="absolute top-2 right-2 p-1 text-white/70 hover:text-white/100 text-lg font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-white/70 transition-colors duration-200"
                  aria-label="Dismiss insight"
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % insights.length)}
                >
                  ×
                </button>
                <h3 className={`font-poppins font-semibold text-base md:text-lg mb-2 md:mb-3 pr-8 ${insight.textColor}`}>
                  {insight.title}
                </h3>
                <p className={`font-inter text-sm md:text-base ${insight.textColor} leading-relaxed`}>
                  {insight.description}
                </p>
                {insight.action && (
                  <div className="mt-4">
                    <a href={insight.action.link} className={`inline-flex items-center text-sm font-medium ${insight.textColor} hover:underline`}>
                      {insight.action.label}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                )}
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
