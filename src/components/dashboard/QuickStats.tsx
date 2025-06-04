import { ChevronRight, Info } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

export const QuickStats = () => {
  const stats = [
    {
      label: 'Deficiencies Found',
      value: '4',
      change: '-1 from last month',
      color: 'bg-gradient-coral',
      textColor: 'text-coral',
      icon: '🔍',
      description: 'Track your nutritional gaps',
    },
    {
      label: 'Daily Streak',
      value: '12',
      change: '+2 days this week',
      color: 'bg-gradient-mint',
      textColor: 'text-mint',
      icon: '🔥',
      description: 'Keep up the good work!',
    },
    {
      label: 'Health Score',
      value: '8.5',
      change: '+0.3 this month',
      color: 'bg-gradient-sunny',
      textColor: 'text-sunny',
      icon: '📊',
      description: 'Overall wellness indicator',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate/70">{stat.label}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate">{stat.value}</span>
                    <span className={`text-xs font-medium ${stat.textColor}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
              
              <Tooltip content={stat.description}>
                <button className="text-slate/40 hover:text-slate/60 transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </Tooltip>
            </div>
            
            {stat.label === 'Deficiencies Found' && (
              <button className="mt-4 w-full flex items-center justify-between text-sm text-slate/60 hover:text-slate/80 transition-colors">
                <span>View details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
