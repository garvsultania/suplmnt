import { Calendar, Trophy, Flame, TrendingUp } from 'lucide-react';

export const TrackingHeader = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="glass mx-3 mt-6 mb-4 p-6 md:p-8 relative overflow-hidden">
      {/* Enhanced luxury gradient overlay with mobile optimization */}
      <div className="absolute inset-0 bg-gradient-to-br from-mint/25 via-sunny/8 to-coral/20 opacity-70 animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-white/15 to-transparent rounded-full -translate-y-12 translate-x-12 md:-translate-y-16 md:translate-x-16" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-coral/10 to-transparent rounded-full translate-y-10 -translate-x-10" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6 md:mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-1.5 h-6 md:w-2 md:h-8 bg-gradient-mint rounded-full shadow-glow" />
              <h1 className="text-2xl md:text-3xl font-poppins font-bold text-slate tracking-tight">
                Daily Tracking
              </h1>
            </div>
            <p className="text-slate/60 font-inter font-medium text-base md:text-lg ml-3.5 md:ml-5">{today}</p>
          </div>
          
          {/* Enhanced premium achievement badges with mobile spacing */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="glass-hover p-3 md:p-4 rounded-2xl md:rounded-3xl bg-gradient-to-br from-coral/35 to-sunny/25 border border-white/40">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative">
                  <Flame className="w-5 h-5 md:w-6 md:h-6 text-coral drop-shadow-sm" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-3 md:h-3 bg-coral rounded-full animate-pulse" />
                </div>
                <div className="text-right hidden sm:block">
                  <div className="font-poppins font-bold text-base md:text-lg text-slate">7</div>
                  <div className="text-xs font-inter text-slate/60 uppercase tracking-wider">Streak</div>
                </div>
              </div>
            </div>
            
            <div className="glass-hover p-3 md:p-4 rounded-2xl md:rounded-3xl bg-gradient-to-br from-mint/35 to-sunny/25 border border-white/40">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-mint drop-shadow-sm" />
            </div>
          </div>
        </div>

        {/* Sophisticated mobile-optimized stats grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <div className="text-center group">
            <div className="relative mb-2 md:mb-3">
              <div className="text-2xl md:text-3xl font-poppins font-bold text-mint drop-shadow-sm group-hover:scale-105 transition-transform duration-300">85%</div>
              <div className="absolute -inset-1 md:-inset-2 bg-mint/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-xs md:text-sm font-inter text-slate/70 uppercase tracking-widest font-medium">Adherence</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-mint" />
              <span className="text-xs text-mint font-medium">+5%</span>
            </div>
          </div>
          
          <div className="text-center group">
            <div className="relative mb-2 md:mb-3">
              <div className="text-2xl md:text-3xl font-poppins font-bold text-coral drop-shadow-sm group-hover:scale-105 transition-transform duration-300">4/5</div>
              <div className="absolute -inset-1 md:-inset-2 bg-coral/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-xs md:text-sm font-inter text-slate/70 uppercase tracking-widest font-medium">Today</div>
            <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-coral to-sunny rounded-full mx-auto mt-2" />
          </div>
          
          <div className="text-center group">
            <div className="relative mb-2 md:mb-3">
              <div className="text-2xl md:text-3xl font-poppins font-bold text-sunny drop-shadow-sm group-hover:scale-105 transition-transform duration-300">12</div>
              <div className="absolute -inset-1 md:-inset-2 bg-sunny/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-xs md:text-sm font-inter text-slate/70 uppercase tracking-widest font-medium">Week</div>
            <div className="flex justify-center mt-1">
              <div className="w-2 h-2 bg-sunny rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
