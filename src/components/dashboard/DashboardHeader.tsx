import { Bell } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <div className="glass m-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-slate" aria-label="Good morning, Alex">
            Good morning, Alex
          </h1>
          <p className="text-slate/70 font-inter">
            Ready to boost your wellness today?
          </p>
          <span className="text-xs font-inter text-mint font-semibold mt-1 block" aria-label="App name">suplmnt</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate/10 flex items-center justify-center mr-2" aria-label="User avatar placeholder">
            <span className="text-slate/50 font-bold text-lg">A</span>
          </div>
          <div className="relative">
            <button className="glass w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform" aria-label="Notifications">
              <Bell className="w-5 h-5 text-slate" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-coral rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-inter font-medium">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
