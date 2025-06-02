import React from 'react';

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-10 bg-gradient-main/80 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="flex items-center gap-2">
        {/* Placeholder for logo - replace with actual logo */}
        <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center">
           <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <span className="font-poppins font-bold text-slate text-xl">suplmnt</span>
      </div>
    </header>
  );
}; 