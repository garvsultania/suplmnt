import { Clock } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    {
      type: 'supplement',
      title: 'Vitamin D3 taken',
      time: '2 hours ago',
      icon: '💊',
      color: 'bg-mint/20 text-mint',
    },
    {
      type: 'lab',
      title: 'Lab report uploaded',
      time: '1 day ago',
      icon: '📋',
      color: 'bg-coral/20 text-coral',
    },
    {
      type: 'achievement',
      title: '7-day streak achieved!',
      time: '2 days ago',
      icon: '🏆',
      color: 'bg-sunny/20 text-sunny',
    },
    {
      type: 'supplement',
      title: 'Magnesium taken',
      time: '3 days ago',
      icon: '💊',
      color: 'bg-mint/20 text-mint',
    },
  ];

  return (
    <div className="card-glass">
      <h2 className="text-xl font-poppins font-semibold text-slate mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4 p-3 glass rounded-xl hover:scale-105 transition-transform">
            <div className={`w-12 h-12 rounded-xl ${activity.color} flex items-center justify-center text-xl`}>
              {activity.icon}
            </div>
            
            <div className="flex-1">
              <h3 className="font-inter font-medium text-slate">{activity.title}</h3>
              <div className="flex items-center gap-1 text-sm text-slate/60">
                <Clock className="w-3 h-3" />
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
