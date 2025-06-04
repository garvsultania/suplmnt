import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Removed GRID_ROWS, GRID_COLS, mockCompletionData, and CompletionGrid component

export const ProgressRings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTracker, setSelectedTracker] = useState(null);

  const progress = {
    supplements: 75,
    water: 60,
    exercise: 40,
  };

  // Reinstated CircularProgress component
  const CircularProgress = ({
    percentage,
    size = 80,
    strokeWidth = 8,
    color = '#4ECDC4',
    label,
    value
  }: {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    label: string;
    value: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-poppins font-bold text-slate">{percentage}%</span>
            <span className="text-xs font-inter text-slate/60">{value}</span>
          </div>
        </div>
        <span className="text-sm font-inter font-medium text-slate mt-2">{label}</span>
      </div>
    );
  };

  const openModal = (trackerType) => {
    setSelectedTracker(trackerType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTracker(null);
  };

  return (
    <div className="card-glass">
      <h2 className="text-xl font-poppins font-semibold text-slate mb-6">Today's Progress</h2>

      <div className="progress-circles flex justify-around">
        {/* Reinstated CircularProgress */}
        <div aria-label="Supplements progress: 75% (6 out of 8)" className="progress-circle drop-shadow-lg cursor-pointer flex flex-col items-center" onClick={() => openModal('supplements')}>
          <CircularProgress
            percentage={progress.supplements}
            color="#4ECDC4"
            label="Supplements"
            value="6/8"
          />
        </div>
        <div aria-label="Hydration progress: 60% (1.5L)" className="progress-circle drop-shadow-lg cursor-pointer flex flex-col items-center" onClick={() => openModal('water')}>
          <CircularProgress
            percentage={progress.water}
            color="#FFE66D"
            label="Hydration"
            value="1.5L"
          />
        </div>
        <div aria-label="Activity progress: 40% (20min)" className="progress-circle drop-shadow-lg cursor-pointer flex flex-col items-center" onClick={() => openModal('exercise')}>
          <CircularProgress
            percentage={progress.exercise}
            color="#FF6B9D"
            label="Activity"
            value="20min"
          />
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTracker ? selectedTracker.charAt(0).toUpperCase() + selectedTracker.slice(1) : 'Details'}</DialogTitle>
            <DialogDescription>
              {selectedTracker === 'supplements' ? 'Details for supplements' : selectedTracker === 'water' ? 'Details for hydration' : 'Details for activity'}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
