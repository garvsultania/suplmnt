import { useState } from 'react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { User, LogOut, Mail, Bell, Moon, Sun, Camera } from 'lucide-react';

const Profile = () => {
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(true);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Feedback handler
  const handleSave = () => {
    setShowToast('Profile saved!');
    setTimeout(() => setShowToast(null), 2000);
  };
  const handleLogout = () => {
    setShowToast('Logged out!');
    setTimeout(() => setShowToast(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-main pb-28 flex flex-col safe-area-padding">
      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-mint text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fade-in">
          {showToast}
        </div>
      )}

      {/* Avatar Card */}
      <div className="glass m-3 p-5 rounded-3xl flex flex-col items-center relative">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-mint via-sunny to-coral flex items-center justify-center shadow-float">
            <User className="icon-lg icon-white" aria-label="User avatar" />
          </div>
          {/* Edit avatar icon */}
          <button className="absolute bottom-1 right-1 bg-white/80 rounded-full p-1 shadow-md border border-white hover:bg-mint/80 transition-colors" aria-label="Change avatar">
            <Camera className="icon-premium icon-accent" />
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-slate mb-0.5 text-center break-words">{name}</h1>
        <p className="text-base sm:text-lg text-slate/70 font-inter mb-1 text-center break-all">{email}</p>
      </div>

      {/* Editable Fields Card */}
      <div className="glass m-3 p-5 rounded-3xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="profile-name">Name</label>
          <input
            id="profile-name"
            className="w-full rounded-xl border px-4 py-3 bg-white/10 border-white/20 focus:border-mint focus:ring-2 focus:ring-mint text-base font-inter transition-all outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Name"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2" htmlFor="profile-email">Email</label>
          <input
            id="profile-email"
            className="w-full rounded-xl border px-4 py-3 bg-white/10 border-white/20 focus:border-mint focus:ring-2 focus:ring-mint text-base font-inter transition-all outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email"
            type="email"
            aria-label="Email"
            autoComplete="email"
          />
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2 text-slate/80 font-inter text-base">
            <Bell className="icon-premium icon-accent" aria-hidden /> Notifications
          </span>
          <button
            className={`w-14 h-8 rounded-full flex items-center transition-colors duration-300 ${notifications ? 'bg-mint/80' : 'bg-slate/30'}`}
            onClick={() => setNotifications(v => !v)}
            aria-label={notifications ? 'Disable notifications' : 'Enable notifications'}
            tabIndex={0}
          >
            <span className={`inline-block w-7 h-7 rounded-full bg-white shadow transition-transform duration-300 ${notifications ? 'translate-x-6' : 'translate-x-0'}`}></span>
          </button>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2 text-slate/80 font-inter text-base">
            {theme === 'light' ? <Sun className="icon-premium text-sunny" aria-hidden /> : <Moon className="icon-premium icon-muted" aria-hidden />} Theme
          </span>
          <button
            className="w-14 h-8 rounded-full flex items-center bg-slate/30 relative transition-colors duration-300 focus:ring-2 focus:ring-mint"
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            tabIndex={0}
          >
            <span className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></span>
            <span className="absolute left-2 top-2 text-mint">{theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</span>
          </button>
        </div>
        <button
          className="w-full btn-glass btn-primary mt-4 py-4 rounded-2xl font-semibold text-lg shadow-lg focus:ring-2 focus:ring-mint"
          onClick={handleSave}
          aria-label="Save changes"
        >
          Save Changes
        </button>
      </div>

      {/* Log Out Button Card */}
      <div className="glass m-3 p-5 rounded-3xl flex justify-center">
        <button
          className="flex items-center gap-2 text-coral font-semibold text-lg px-6 py-3 rounded-xl hover:bg-coral/10 transition-colors focus:ring-2 focus:ring-coral"
          onClick={handleLogout}
          aria-label="Log out"
        >
          <LogOut className="icon-premium text-coral" /> Log Out
        </button>
      </div>

      <div className="bottom-nav-spacer" />
      <BottomNavigation />
    </div>
  );
};

export default Profile;
