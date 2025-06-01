import React from 'react';
import SupplementGrid from './SupplementGrid';
import { Check, Edit, Archive, Bell } from 'lucide-react';

interface SupplementCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string; // Tailwind color class
  gridData: boolean[];
  streak: number;
  completionRate: number;
  onMarkTaken: () => void;
  onEdit: () => void;
  onArchive: () => void;
  onReminder?: () => void;
}

const SupplementCard: React.FC<SupplementCardProps> = ({
  name,
  description,
  icon,
  color,
  gridData,
  streak,
  completionRate,
  onMarkTaken,
  onEdit,
  onArchive,
  onReminder,
}) => {
  return (
    <div className="card-glass mb-4 relative overflow-hidden">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${color} bg-opacity-20`}>
          {icon && typeof icon === 'object' && 'type' in icon ?
            // If icon is a React element, clone it with premium classes
            (icon.type ?
              (typeof icon.type === 'function' ?
                icon.type({ className: 'icon-premium icon-accent' }) :
                icon
              ) : icon) : icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-poppins font-bold text-slate text-lg truncate">{name}</div>
          <div className="text-xs text-slate/60 truncate">{description}</div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onEdit} 
            className="btn-glass btn-secondary p-2 rounded-lg"
            aria-label="Edit supplement"
          >
            <Edit className="icon-sm icon-accent" />
          </button>
          <button 
            onClick={onArchive} 
            className="btn-glass btn-secondary p-2 rounded-lg"
            aria-label="Archive supplement"
          >
            <Archive className="icon-sm icon-muted" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <SupplementGrid days={90} data={gridData} color={color} />
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs mt-1">
        <div className="flex items-center gap-1 text-mint font-semibold">
          <Check className="w-4 h-4" /> Streak: {streak}d
        </div>
        <div className="text-slate/60">{completionRate}% taken</div>
        <div className="flex gap-2 ml-auto">
          {onReminder && (
            <button 
              onClick={onReminder} 
              className="btn-glass btn-secondary p-2 rounded-lg"
              aria-label="Set reminder"
            >
              <Bell className="icon-sm icon-accent" />
            </button>
          )}
          <button 
            onClick={onMarkTaken} 
            className="px-4 py-2 rounded-lg bg-mint/80 text-white font-bold text-xs hover:bg-mint transition-colors duration-200"
            aria-label="Mark as taken"
          >
            Mark as taken
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplementCard; 