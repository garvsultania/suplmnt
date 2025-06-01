import React from 'react';

interface SupplementGridProps {
  days: number;
  data: boolean[]; // true = taken, false = missed
  color: string; // Tailwind color class, e.g. 'bg-mint', 'bg-coral'
}

const SupplementGrid: React.FC<SupplementGridProps> = ({ days, data, color }) => {
  // 7 columns (days of week), enough rows for 'days'
  const columns = 7;
  const rows = Math.ceil(days / columns);
  const grid = Array.from({ length: rows * columns }, (_, i) => data[i] || false);

  return (
    <div className="grid grid-cols-7 gap-1 md:gap-1.5">
      {grid.map((taken, idx) => (
        <div
          key={idx}
          className={`w-3 h-3 md:w-4 md:h-4 rounded-md transition-all duration-300
            ${taken ? `${color} opacity-90 shadow-md` : 'bg-slate-700/30 opacity-40'}
            hover:scale-110`}
          style={{ transitionDelay: `${idx * 10}ms` }}
        />
      ))}
    </div>
  );
};

export default SupplementGrid; 