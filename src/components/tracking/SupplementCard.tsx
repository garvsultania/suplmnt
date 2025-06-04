import React from 'react';
import SupplementGrid from './SupplementGrid';
import { Check, Edit, Archive, Bell } from 'lucide-react';
import { ChevronDown, CheckCircle2, PlusCircle, Info, BarChart2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line } from 'recharts';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface SupplementCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string; // Tailwind color class prefix (e.g., 'mint', 'coral', 'sunny')
  onMarkTaken: () => void;
  onReminder?: () => void;
  gridData: number[][];
  adherenceRate: number;
  daysStreak: number;
  nextDose: Date;
  symptomHistory: { date: string; score: number; notes?: string }[];
  chartData: { date: string; adherence?: number; symptomScore?: number }[];
  onLogSymptom: (score: number) => void;
  supplement: any; // Added supplement prop
}

const SupplementCard: React.FC<SupplementCardProps> = ({
  name,
  description,
  icon,
  color,
  onMarkTaken,
  onReminder,
  gridData,
  adherenceRate,
  daysStreak,
  nextDose,
  symptomHistory,
  chartData,
  onLogSymptom,
  supplement,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSymptomScore, setNewSymptomScore] = useState<number | ''>('');

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogSymptomClick = () => {
    if (newSymptomScore !== '') {
      onLogSymptom(newSymptomScore as number);
      setNewSymptomScore('');
    }
  };

  // Determine status color based on completion (simplified for demo)
  const statusColor = supplement.status === 'active' ? 'bg-mint' : supplement.status === 'completed' ? 'bg-coral' : 'bg-gray-400';

  return (
    <div className={`card-glass mb-4 relative overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? '' : 'pb-4'}`}>
      <div className="flex items-center gap-3 cursor-pointer" onClick={handleToggleExpand}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-${color}/20`}>
          {icon && typeof icon === 'object' && 'type' in icon ?
            (icon.type ?
              (typeof icon.type === 'function' ?
                React.createElement(icon.type as React.ElementType, { className: 'w-6 h-6' }) :
                icon
              ) : icon) : icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-poppins font-bold text-slate text-base truncate">{name}</div>
          <div className="text-xs text-slate/60 truncate">{description}</div>
        </div>
      </div>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
      >
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900">Recent Activity</h4>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-700/30"></div>
                  <span className="text-gray-600">Not taken</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full bg-${color}/60`}></div>
                  <span className="text-gray-600">Taken</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full bg-${color}`}></div>
                  <span className="text-gray-600">With symptom</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="bg-white rounded-lg p-3 border border-gray-100 inline-block min-w-full">
                <SupplementGrid data={gridData} color={color} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Quick Actions</h4>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Symptom score (1-10)"
                  value={newSymptomScore}
                  onChange={(e) => setNewSymptomScore(Number(e.target.value))}
                  className="w-full"
                  min="1"
                  max="10"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  1-10 scale
                </div>
              </div>
              <Button 
                onClick={handleLogSymptomClick}
                className="w-full bg-coral hover:bg-coral-dark text-white"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Log Symptom & Mark Taken
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Progress Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Adherence Rate</span>
                  <span className="text-sm font-medium text-mint">{adherenceRate}%</span>
                </div>
                <Progress value={adherenceRate} className="h-2" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-1">Current Streak</p>
                <p className="text-lg font-bold text-mint">{daysStreak} days</p>
              </div>
            </div>
            {nextDose && (
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Next Dose:</p>
                <p className="text-base font-semibold text-gray-900">
                  {nextDose.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Recent History</h4>
            <div className="space-y-2">
              {(symptomHistory || []).slice(-5).map((log, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-3">
                    {log.notes ? (
                      <PlusCircle className="w-4 h-4 text-coral" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-mint" />
                    )}
                    <span className="text-sm text-gray-600">
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-600">Score: {log.score}</span>
                    {log.notes && (
                      <span className="text-sm text-gray-500">({log.notes})</span>
                    )}
                  </div>
                </div>
              ))}
              {(symptomHistory || []).length === 0 && (
                <p className="text-sm text-gray-500">No history logged yet.</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Progress Over Time</h4>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" label={{ value: 'Adherence (%)', angle: -90, position: 'insideLeft', fontSize: 12 }} tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Symptom Score', angle: 90, position: 'insideRight', fontSize: 12 }} tick={{ fontSize: 12 }} domain={[0, 10]} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="adherence" stroke="#10b981" activeDot={{ r: 8 }} name="Adherence" />
                  <Line yAxisId="right" type="monotone" dataKey="symptomScore" stroke="#f59e0b" name="Symptom Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplementCard; 