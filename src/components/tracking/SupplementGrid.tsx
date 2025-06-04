import React from 'react';

// Define the dimensions of the grid
const GRID_ROWS = 7; // Reversed rows
const GRID_COLS = 33; // Reversed columns

// Component to render the grid of dots
interface SupplementGridProps {
  data: number[][]; // Data in the format of array of arrays with 0 (not taken), 1 (taken), or 2 (taken with symptom)
  color: string; // Tailwind color class prefix (e.g., 'mint', 'coral', 'sunny')
}

const SupplementGrid: React.FC<SupplementGridProps> = ({ data, color }) => {
  return (
    <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}>
      {/* Data is now expected to be 7 rows, 33 columns */}
      {data.map((row, rowIndex) => (
        row.map((completion, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-2 h-2 rounded-full transition-all duration-300
              ${completion === 0 ? 'bg-gray-700/30' : // Not taken
                completion === 1 ? `bg-${color}/60` : // Taken without symptom
                `bg-${color}`} // Taken with symptom
            `}
            title={completion === 0 ? 'Not taken' : 
                   completion === 1 ? 'Taken' : 
                   'Taken with symptom logged'}
          ></div>
        ))
      ))}
    </div>
  );
};

export default SupplementGrid; 