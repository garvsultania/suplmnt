import { TrendingUp, Award, Target, Calendar, Star, Trophy } from 'lucide-react';

export const WeeklyInsights = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Adherence Trending Up',
      description: 'Your supplement consistency improved by 12% this week',
      color: 'mint',
      value: '+12%',
      trend: 'up',
      premium: true
    },
    {
      icon: Award,
      title: 'Perfect Week Streak',
      description: 'You\'ve maintained 90%+ adherence for 3 consecutive weeks',
      color: 'sunny',
      value: '3 weeks',
      trend: 'stable',
      premium: true
    },
    {
      icon: Target,
      title: 'Weekly Goal Achieved',
      description: 'You took 89% of scheduled supplements this week',
      color: 'coral',
      value: '89%',
      trend: 'up',
      premium: false
    }
  ];

  return (
    <div className="card-glass mb-4">
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-mint via-sunny to-coral rounded-xl md:rounded-2xl flex items-center justify-center shadow-float flex-shrink-0">
          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl md:text-2xl font-poppins font-bold text-slate tracking-tight truncate">Weekly Insights</h2>
          <p className="text-slate/60 font-inter text-sm md:text-base">Your wellness journey this week</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-base md:text-lg font-poppins font-bold text-mint">Premium</div>
          <div className="text-xs font-inter text-slate/60 uppercase tracking-wider">Analytics</div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          
          return (
            <div key={index} className="glass relative overflow-hidden hover:scale-[1.01] md:hover:scale-[1.02] transition-all duration-500 cursor-pointer group">
              {/* Mobile-optimized premium gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r from-${insight.color}/12 via-${insight.color}/6 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-bl from-white/8 to-transparent rounded-full -translate-y-10 translate-x-10 md:-translate-y-16 md:translate-x-16" />
              
              {insight.premium && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-sunny to-coral rounded-full flex items-center justify-center shadow-sm">
                    <Star className="icon-sm md:icon-md icon-white" />
                  </div>
                </div>
              )}
              
              <div className="relative z-10 flex items-center gap-4 md:gap-6">
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-${insight.color} rounded-2xl md:rounded-3xl flex items-center justify-center shadow-float group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <Icon className="icon-premium icon-white md:icon-lg" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 md:mb-2 gap-3">
                    <h3 className="text-lg md:text-xl font-poppins font-semibold text-slate truncate flex-1">{insight.title}</h3>
                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                      <span className={`text-xl md:text-2xl font-poppins font-bold text-${insight.color} drop-shadow-sm`}>
                        {insight.value}
                      </span>
                      {insight.trend === 'up' && (
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-mint/20 rounded-full flex items-center justify-center">
                          <TrendingUp className="icon-sm md:icon-md icon-accent" />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-slate/70 font-inter leading-relaxed mb-3 md:mb-4">{insight.description}</p>
                  
                  {/* Mobile-optimized progress indicator */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex-1 h-1.5 md:h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className={`h-1.5 md:h-2 bg-gradient-${insight.color} rounded-full transition-all duration-1000 ease-out`} 
                           style={{ width: insight.color === 'mint' ? '88%' : insight.color === 'sunny' ? '95%' : '75%' }}>
                      </div>
                    </div>
                    <span className="text-xs md:text-sm font-inter text-slate/60 flex-shrink-0">
                      {insight.color === 'mint' ? 'Excellent' : insight.color === 'sunny' ? 'Outstanding' : 'Good'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="bottom-nav-spacer" />
      </div>

      {/* Enhanced mobile-optimized achievement badge */}
      <div className="mt-6 md:mt-8 glass relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-bl from-sunny/20 to-transparent rounded-full -translate-y-8 translate-x-8 md:-translate-y-12 md:translate-x-12" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-mint via-sunny to-coral rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center shadow-float animate-float">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-poppins font-bold text-slate mb-2 md:mb-3">Consistency Champion</h3>
          <p className="text-slate/70 font-inter text-sm md:text-lg leading-relaxed max-w-md mx-auto">
            You're building incredible health habits. Keep up the exceptional work!
          </p>
          <div className="mt-4 md:mt-6 flex justify-center gap-1 md:gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-sunny fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
