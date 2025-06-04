import { Clock } from 'lucide-react';

interface Activity {
  type: string;
  title: string;
  time: string;
  icon: string;
  color: string;
}

interface NotificationListProps {
  activities: Activity[];
}

export const NotificationList = ({ activities }: NotificationListProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-4 p-3 glass rounded-xl">
          <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center text-xl`}>
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
  );
}; 