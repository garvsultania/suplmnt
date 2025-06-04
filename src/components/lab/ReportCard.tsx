import React from 'react';
import { LabReport } from '../../contexts/LabReportsContext';
import { FileText, Clock, CheckCircle, XCircle, Trash2, ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ReportCardProps {
  report: LabReport;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const statusConfig = {
  analyzed: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    text: 'Analyzed'
  },
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    text: 'Pending'
  },
  failed: {
    icon: XCircle,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    text: 'Failed'
  }
};

export function ReportCard({ report, onDelete, onView }: ReportCardProps) {
  const status = statusConfig[report.status];
  const StatusIcon = status.icon;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onView(report.id)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50/10 flex-shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{report.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Uploaded on {new Date(report.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
           <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                 <div className={cn("w-3 h-3 rounded-full", 
                    report.status === 'analyzed' && 'bg-green-500',
                    report.status === 'pending' && 'bg-yellow-500',
                    report.status === 'failed' && 'bg-gray-500'
                 )} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{status.text}</p>
              </TooltipContent>
            </Tooltip>
           </TooltipProvider>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(report.id);
            }}
            className="p-1 sm:p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Delete report"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 