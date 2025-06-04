import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-main/90 backdrop-blur-xl p-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-mint to-mint-dark rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
          </div>
          <span className="font-poppins font-bold text-slate text-xl tracking-tight">suplmnt</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-slate/70" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5 text-slate/70" />
          </Button>
        </div>
      </div>
    </header>
  );
}; 