import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Camera, Clock, Settings } from 'lucide-react';

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Camera, label: 'Labs', path: '/lab-reports' },
    { icon: Clock, label: 'Track', path: '/tracking' },
    { icon: Settings, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-sm" role="navigation" aria-label="Main navigation">
      <div className="glass rounded-full px-2 py-1.5 shadow-xl border border-white/10 backdrop-blur-xl bg-white/30 flex items-center justify-between" style={{boxShadow: '0 4px 24px 0 rgba(44,62,80,0.08)'}}>
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              className={`
                flex flex-col items-center justify-center relative transition-all duration-300 focus:outline-none
                ${isActive ? 'text-mint' : 'text-slate/50 hover:text-mint'}
              `}
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <Icon className={`icon-premium ${isActive ? 'icon-accent' : 'icon-muted'}`} />
              {/* Animated active indicator dot */}
              <span className={`absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1.5 h-1.5 rounded-full bg-mint transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></span>
              {/* Show label only for active */}
              <span className={`text-[11px] font-inter font-medium leading-none mt-0.5 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 w-0 overflow-hidden'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
