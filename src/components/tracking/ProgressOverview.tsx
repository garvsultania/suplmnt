import { CheckCircle, Clock, Target, ChevronRight } from 'lucide-react';

export const ProgressOverview = () => {
  const progressData = [
    { 
      label: 'Morning Stack', 
      completed: 3, 
      total: 4, 
      time: '8:30 AM', 
      color: 'mint',
      supplements: ['Vitamin D3', 'Omega-3', 'Magnesium']
    },
    { 
      label: 'Afternoon Dose', 
      completed: 0, 
      total: 2, 
      time: '2:00 PM', 
      color: 'sunny',
      supplements: ['B-Complex', 'Iron']
    },
    { 
      label: 'Evening Stack', 
      completed: 0, 
      total: 1, 
      time: '8:00 PM', 
      color: 'coral',
      supplements: ['Melatonin']
    },
  ];

  return (
    <div className="card-glass mx-3 mb-4 p-5 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-mint rounded-xl md:rounded-2xl flex items-center justify-center shadow-float flex-shrink-0">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl md:text-2xl font-poppins font-bold text-slate tracking-tight truncate">Today's Progress</h2>
            <p className="text-slate/60 font-inter text-sm md:text-base">Your supplement journey</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xl md:text-2xl font-poppins font-bold text-mint">75%</div>
          <div className="text-xs md:text-sm font-inter text-slate/60 uppercase tracking-wider">Complete</div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {progressData.map((item, index) => (
          <div 
            key={index} 
            className="glass p-3 md:p-4 rounded-xl md:rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all duration-300 cursor-pointer"
          >
            {/* Enhanced gradient background with mobile optimization */}
            <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}/10 via-${item.color}/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-bl from-white/8 to-transparent rounded-full -translate-y-6 translate-x-6 md:-translate-y-8 md:translate-x-8" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 md:gap-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-${item.color}`}>
                  {item.completed === item.total ? (
                    <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  ) : (
                    <Clock className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-poppins font-semibold text-slate mb-0.5 truncate">
                    {item.label}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-slate/60 font-inter text-sm">
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      {item.time}
                    </span>
                    <span className="text-xs sm:text-sm truncate">{item.supplements.join(', ')}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="bottom-nav-spacer" />
      </div>
    </div>
  );
};
