import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Camera, Pill, Clock, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Pill, label: 'Supplements', path: '/supplements' },
    { icon: Camera, label: 'Labs', path: '/lab-reports' },
    { icon: Clock, label: 'Track', path: '/tracking' },
    { icon: Settings, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-sm" role="navigation" aria-label="Main navigation">
      <div 
        className="glass rounded-2xl px-3 py-2 shadow-2xl border border-white/20 backdrop-blur-xl bg-white/40 flex items-center justify-between"
        style={{
          boxShadow: '0 8px 32px 0 rgba(44,62,80,0.12), 0 2px 8px 0 rgba(44,62,80,0.08)',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                "flex flex-col items-center justify-center relative transition-all duration-300 focus:outline-none group",
                isActive ? 'text-mint' : 'text-slate/60 hover:text-mint',
                "min-w-[48px] min-h-[48px]"
              )}
            >
              <div className={cn(
                "relative",
                isActive && "animate-bounce-subtle"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive ? "scale-110" : "group-hover:scale-105"
                )} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-mint rounded-full"></div>
                )}
              </div>
              <span className={cn(
                "text-[11px] font-inter font-medium leading-none mt-1 transition-all duration-300",
                isActive ? 'opacity-100' : 'opacity-0 h-0 w-0 overflow-hidden'
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
