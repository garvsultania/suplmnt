import { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Pill, 
  Flame, 
  Activity, 
  Clock, 
  TrendingUp,
  Heart,
  Droplet,
  Brain,
  Moon,
  Sun,
  Battery,
  AlertCircle,
  ChevronRight,
  X
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Simple Progress Circle Component (Placeholder - can be replaced with a more robust library component)
const ProgressCircle = ({ progress, color }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg className="w-12 h-12" viewBox="0 0 44 44">
            <circle
                className="text-gray-300 stroke-current"
                strokeWidth="4"
                cx="22"
                cy="22"
                r={radius}
                fill="transparent"
            />
            <circle
                className={`${color} stroke-current`}
                strokeWidth="4"
                cx="22"
                cy="22"
                r={radius}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
            />
             <text 
                x="22"
                y="22"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium text-slate-700"
            >
                {progress.toFixed(0)}%
            </text>
        </svg>
    );
};

// Reusable Health Insight Card Component
const HealthInsightCard = ({ icon, title, value, subValue, progress, progressColor, onClick }) => {
    return (
        <div 
            className="flex-shrink-0 w-60 bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                    {icon}
                    <h3 className="text-sm font-medium text-slate">{title}</h3>
                 </div>
                 <ChevronRight className="w-4 h-4 text-slate/40" />
            </div>
            <div className="flex items-center gap-4">
               <ProgressCircle progress={progress} color={progressColor} />
                <div className="flex-1">
                    <p className="text-xl font-bold text-slate">{value}</p>
                    {subValue && <p className="text-xs text-slate/60">{subValue}</p>}
                </div>
            </div>
        </div>
    )
}

export default function Dashboard() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);
  const [sleepInput, setSleepInput] = useState('');
  const [isHydrationModalOpen, setIsHydrationModalOpen] = useState(false);
  const [hydrationInput, setHydrationInput] = useState('');

  // Mock data - replace with actual data from your backend
  const todayStats = {
    supplements: {
      taken: 3,
      total: 5,
      next: 'Vitamin D3 in 2 hours',
      progress: 60,
      trend: '+2 from yesterday'
    },
    streak: {
      current: 12,
      best: 30,
      progress: (12/30) * 100,
      trend: '+3 this week'
    },
    healthScore: {
      current: 8.5,
      previous: 8.2,
      progress: 85,
      trend: '+0.3 this week'
    }
  };

  const healthInsights = {
    sleep: {
      quality: 85,
      hours: 7.5,
      target: 8,
      progress: (7.5/8) * 100,
      trend: 'Improving',
      icon: <Moon className="w-5 h-5 text-indigo-500" />
    },
    hydration: {
      intake: 1800,
      target: 2500,
      progress: (1800/2500) * 100,
      icon: <Droplet className="w-5 h-5 text-blue-500" />
    },
    stress: {
      level: 'Low',
      score: 2.5,
      trend: 'Stable',
      progress: (2.5/10) * 100,
      icon: <Brain className="w-5 h-5 text-purple-500" />
    },
    energy: {
      level: 'High',
      score: 8.5,
      trend: 'Improving',
      progress: (8.5/10) * 100,
      icon: <Battery className="w-5 h-5 text-green-500" />
    }
  };

  const healthInsightsArray = [
    {
      title: 'Sleep',
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      value: `${healthInsights.sleep.hours}h`,
      subValue: `${healthInsights.sleep.quality}% quality`,
      progress: healthInsights.sleep.progress,
      progressColor: 'text-indigo-500',
      onClick: () => setIsSleepModalOpen(true)
    },
    {
      title: 'Hydration',
      icon: <Droplet className="w-5 h-5 text-blue-500" />,
      value: `${healthInsights.hydration.intake}ml`,
      subValue: `Target: ${healthInsights.hydration.target}ml`,
      progress: healthInsights.hydration.progress,
      progressColor: 'text-blue-500',
      onClick: () => setIsHydrationModalOpen(true)
    },
    {
      title: 'Stress',
      icon: <Brain className="w-5 h-5 text-purple-500" />,
      value: healthInsights.stress.level,
      subValue: `Score: ${healthInsights.stress.score}/10`,
      progress: healthInsights.stress.progress,
      progressColor: 'text-purple-500'
    },
    {
      title: 'Energy',
      icon: <Battery className="w-5 h-5 text-green-500" />,
      value: healthInsights.energy.level,
      subValue: `Score: ${healthInsights.energy.score}/10`,
      progress: healthInsights.energy.progress,
      progressColor: 'text-green-500'
    },
  ];

  const moodOptions = ['Happy', 'Excited', 'Calm', 'Stressed', 'Tired'];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Minimal Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-lg font-medium text-slate">Dashboard</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="relative p-2 rounded-full hover:bg-gray-50 transition-colors"
                    onClick={() => setIsNotificationOpen(true)}
                  >
                    <Bell className="w-5 h-5 text-slate/70" />
                    <span className="absolute top-0 right-0 w-4 h-4 bg-coral rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-white font-medium">2</span>
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6">
        {/* Date/Period Selector */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            <button 
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ${selectedPeriod === 'today' ? 'bg-mint text-white shadow-md' : 'text-slate-700 border border-gray-300 hover:bg-gray-50'}`}
                onClick={() => setSelectedPeriod('today')}
            >
                Today
            </button>
            <button 
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ${selectedPeriod === 'weekly' ? 'bg-mint text-white shadow-md' : 'text-slate-700 border border-gray-300 hover:bg-gray-50'}`}
                onClick={() => setSelectedPeriod('weekly')}
            >
                Weekly
            </button>
            <button 
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ${selectedPeriod === 'monthly' ? 'bg-mint text-white shadow-md' : 'text-slate-700 border border-gray-300 hover:bg-gray-50'}`}
                onClick={() => setSelectedPeriod('monthly')}
            >
                Monthly
            </button>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Supplements Card */}
            <div className="bg-gradient-to-br from-mint-light to-mint rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Supplements Taken</h2>
                    <Pill className="w-6 h-6 opacity-50" />
                </div>
                <p className="text-4xl font-bold mb-4">{todayStats.supplements.taken}<span className="text-xl font-medium opacity-80">/{todayStats.supplements.total}</span></p>
                <div className="text-sm opacity-90">
                    <p>{todayStats.supplements.next}</p>
                    <p className="mt-1">Trend: {todayStats.supplements.trend}</p>
                </div>
                {/* Background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
            </div>

            {/* Streak Card */}
            <div className="bg-gradient-to-br from-sunny-light to-sunny rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Current Streak</h2>
                    <Flame className="w-6 h-6 opacity-50" />
                </div>
                <p className="text-4xl font-bold mb-4">{todayStats.streak.current} <span className="text-xl font-medium opacity-80">days</span></p>
                 <div className="text-sm opacity-90">
                    <p>Best: {todayStats.streak.best} days</p>
                    <p className="mt-1">Trend: {todayStats.streak.trend}</p>
                </div>
                {/* Background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
            </div>

            {/* Health Score Card */}
            <div className="bg-gradient-to-br from-coral-light to-coral rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Health Score</h2>
                    <Activity className="w-6 h-6 opacity-50" />
                </div>
                <p className="text-4xl font-bold mb-4">{todayStats.healthScore.current} <span className="text-xl font-medium opacity-80">/10</span></p>
                 <div className="text-sm opacity-90">
                    <p>Previous: {todayStats.healthScore.previous}</p>
                    <p className="mt-1">Trend: {todayStats.healthScore.trend}</p>
                </div>
                {/* Background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
            </div>
        </div>

        {/* Key Health Metrics Section */}
        <div className="space-y-4">
            <h2 className="text-lg font-medium text-slate">Key Health Metrics</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                {healthInsightsArray.map((insight, index) => (
                    <HealthInsightCard 
                        key={index}
                        icon={insight.icon}
                        title={insight.title}
                        value={insight.value}
                        subValue={insight.subValue}
                        progress={insight.progress}
                        progressColor={insight.progressColor}
                        onClick={insight.onClick}
                    />
                ))}
            </div>
        </div>

      </main>

      {/* Footer for brand recall */}
      <footer className="w-full text-center py-4 text-slate/40 text-sm">
        suplmnt
      </footer>

      {/* Floating Action Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="fixed bottom-20 right-4 w-14 h-14 bg-mint rounded-full shadow-lg flex items-center justify-center text-white hover:bg-mint-dark transition-colors"
              aria-label="Add new item"
            >
              <Plus className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new item</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Sleep Input Modal */}
      {isSleepModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 shadow-xl w-80">
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-slate">Log Sleep</h3>
                      <button onClick={() => setIsSleepModalOpen(false)}>
                          <X className="w-5 h-5 text-slate/70" />
                      </button>
                  </div>
                  <input 
                      type="number" 
                      placeholder="Hours slept" 
                      className="w-full border border-gray-300 rounded-md p-2 mb-4 text-slate-700"
                      value={sleepInput}
                      onChange={(e) => setSleepInput(e.target.value)}
                  />
                  <button className="w-full bg-mint text-white py-2 rounded-md font-medium hover:bg-mint-dark transition-colors">
                      Save Sleep
                  </button>
              </div>
          </div>
      )}

      {/* Hydration Input Modal */}
      {isHydrationModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 shadow-xl w-80">
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-slate">Log Hydration</h3>
                      <button onClick={() => setIsHydrationModalOpen(false)}>
                          <X className="w-5 h-5 text-slate/70" />
                      </button>
                  </div>
                  <input 
                      type="number" 
                      placeholder="ml intake" 
                      className="w-full border border-gray-300 rounded-md p-2 mb-4 text-slate-700"
                      value={hydrationInput}
                      onChange={(e) => setHydrationInput(e.target.value)}
                  />
                  <button className="w-full bg-mint text-white py-2 rounded-md font-medium hover:bg-mint-dark transition-colors">
                      Save Hydration
                  </button>
              </div>
          </div>
      )}

    </div>
  );
}
