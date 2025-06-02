import React from 'react';
import { Supplement } from '@/contexts/SupplementsContext'; // Assuming Supplement type is here
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SupplementListItemProps {
  supplement: Supplement;
  onMarkTaken: (id: string) => void;
  onViewDetails: (id: string) => void;
  icon: React.ReactNode; // Assuming icon is passed down
  color: string; // Assuming color is passed down
}

const SupplementListItem: React.FC<SupplementListItemProps> = ({
  supplement,
  onMarkTaken,
  onViewDetails,
  icon,
  color,
}) => {

  // Determine status color based on completion (simplified for demo)
  const statusColor = supplement.status === 'active' ? 'bg-mint' : supplement.status === 'completed' ? 'bg-coral' : 'bg-gray-400';

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between gap-4"
      onClick={() => onViewDetails(supplement.id)}
    >
      <div className="flex items-center space-x-4">
        {/* Supplement Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-${color}/20 flex-shrink-0`}>
          {icon}
        </div>
        {/* Supplement Name and Description */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate text-base">{supplement.name}</h3>
          <p className="text-sm text-gray-500 truncate">{supplement.description}</p>
        </div>
      </div>
      {/* Status and Quick Action */}
      <div className="flex items-center space-x-3 flex-shrink-0">
         <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
               <div className={cn("w-3 h-3 rounded-full", statusColor)} /> {/* Status dot */}
            </TooltipTrigger>
            <TooltipContent>
              <p>{supplement.status.charAt(0).toUpperCase() + supplement.status.slice(1)}</p>
            </TooltipContent>
          </Tooltip>
         </TooltipProvider>
         {/* Mark Taken Button */}
         <button
           onClick={(e) => {
             e.stopPropagation();
             onMarkTaken(supplement.id);
           }}
           className="p-1.5 text-gray-400 hover:text-mint rounded-lg hover:bg-mint-50 transition-colors"
           aria-label="Mark as taken"
         >
           <CheckCircle2 className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
};

export default SupplementListItem; 