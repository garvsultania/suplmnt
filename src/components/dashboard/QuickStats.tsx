export const QuickStats = () => {
  const stats = [
    {
      label: 'Deficiencies Found',
      value: '4',
      change: '-1 from last month',
      color: 'bg-gradient-coral',
      textColor: 'text-coral',
    },
    {
      label: 'Daily Streak',
      value: '12',
      change: '+2 days this week',
      color: 'bg-gradient-mint',
      textColor: 'text-mint',
    },
    {
      label: 'Health Score',
      value: '8.5',
      change: '+0.3 this month',
      color: 'bg-gradient-sunny',
      textColor: 'text-sunny',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card-glass drop-shadow-lg" aria-label={`${stat.label}: ${stat.value}, ${stat.change}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
            <span className={`text-xs font-inter ${stat.textColor} font-medium`}>
              {stat.change}
            </span>
          </div>
          
          <div className="text-3xl font-poppins font-bold text-slate mb-1">
            {stat.value}
          </div>
          
          <div className="text-sm font-inter text-slate/70">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
