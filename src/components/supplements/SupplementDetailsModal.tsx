import React, { useState, useEffect, useMemo } from 'react';
import { Supplement } from '../../contexts/SupplementsContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FileText, Link, AlertTriangle, Clock, PackageOpen, Star, ShoppingCart, BarChart2, Calendar, Heart, Info, ChevronRight, Bell, X, CheckCircle2, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSupplements, ReminderSettings, SymptomLog, SupplementWithTracking } from '../../contexts/SupplementsContext';
import { toast } from 'sonner';
import SupplementGrid from '../tracking/SupplementGrid';
import { DosageInfoCard } from './DosageInfoCard';
import { DietaryInfoCard } from './DietaryInfoCard';
import { BenefitsCard } from './BenefitsCard';
import { SideEffectsCard } from './SideEffectsCard';
import { InteractionWarningsCard } from './InteractionWarningsCard';
import { DeficienciesCoveredCard } from './DeficienciesCoveredCard';
import { DurationCard } from './DurationCard';

interface SupplementDetailsModalProps {
  supplement: SupplementWithTracking | null;
  onClose: () => void;
  onPurchase: (id: string, link: Supplement['purchaseLinks'][0]) => void;
}

// Mock interaction data
const mockInteractions = [
  { name: 'Vitamin D3', severity: 'moderate', description: 'May affect calcium absorption' },
  { name: 'Iron', severity: 'mild', description: 'May reduce effectiveness' },
  { name: 'Magnesium', severity: 'severe', description: 'Should not be taken together' }
];

// Mock tracking data for chart - now includes symptom data from context
// const mockTrackingData = [
//   { date: 'Jan 01', adherence: 70, symptomScore: 5 },
//   { date: 'Jan 08', adherence: 75, symptomScore: 4 },
//   { date: 'Jan 15', adherence: 80, symptomScore: 3 },
//   { date: 'Jan 22', adherence: 85, symptomScore: 3 },
//   { date: 'Jan 29', adherence: 88, symptomScore: 2 },
//   { date: 'Feb 05', adherence: 90, symptomScore: 2 },
//   { date: 'Feb 12', adherence: 92, symptomScore: 1 },
// ];

export function SupplementDetailsModal({ supplement, onClose, onPurchase }: SupplementDetailsModalProps) {
  if (!supplement) return null;

  const { updateReminderSettings, markAsTaken, logSymptom } = useSupplements();

  const [reminderEnabled, setReminderEnabled] = useState(supplement.reminderSettings?.enabled || false);
  const [reminderTime, setReminderTime] = useState(supplement.reminderSettings?.time || '09:00');
  const [reminderFrequency, setReminderFrequency] = useState(supplement.reminderSettings?.frequency || 'daily');
  const [reminderDays, setReminderDays] = useState<string[]>(supplement.reminderSettings?.days || []);
  const [newSymptomScore, setNewSymptomScore] = useState<number | ''>('');

  // Update local state when the supplement prop changes (e.g., modal opens with a different supplement)
  useEffect(() => {
    if (supplement) {
      setReminderEnabled(supplement.reminderSettings?.enabled || false);
      setReminderTime(supplement.reminderSettings?.time || '09:00');
      setReminderFrequency(supplement.reminderSettings?.frequency || 'daily');
      setReminderDays(supplement.reminderSettings?.days || []);
      setNewSymptomScore(''); // Clear symptom score input on supplement change
    }
  }, [supplement]);

  // Request notification permission when reminder is enabled
  useEffect(() => {
    if (reminderEnabled && "Notification" in window) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }
  }, [reminderEnabled]);

  // Set up timer for reminders
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const scheduleReminder = () => {
      if (!reminderEnabled || !supplement) return;

      const [hours, minutes] = reminderTime.split(':').map(Number);
      const now = new Date();
      const reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

      // If reminder time is in the past for today, schedule for tomorrow
      if (reminderDate.getTime() < now.getTime()) {
        reminderDate.setDate(reminderDate.getDate() + 1);
      }

      const timeUntilReminder = reminderDate.getTime() - now.getTime();

      timer = setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification(`Time for ${supplement.name}`, {
            body: `It's time to take your ${supplement.name}.`,
            icon: '/path/to/your/icon.png' // TODO: Replace with actual icon path
          });
        }
        // Schedule the next reminder (for daily or custom frequency)
        if (reminderFrequency === 'daily' || (reminderFrequency === 'custom' && reminderDays.includes(getDayOfWeek(reminderDate)))) {
           scheduleReminder(); // Reschedule for the next day/occurrence
        }

      }, timeUntilReminder);
    };

    const getDayOfWeek = (date: Date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
    };

    if (reminderEnabled) {
      scheduleReminder();
    }

    return () => { clearTimeout(timer); };
  }, [reminderEnabled, reminderTime, reminderFrequency, reminderDays, supplement]); // Re-run effect if these dependencies change

  // Calculate adherence rate (mock data for now) - TODO: Replace with real data
  const adherenceRate = 85;
  const daysStreak = 7;
  const nextDose = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours from now

  const handleReminderDaysChange = (day: string) => {
    setReminderDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSaveReminder = () => {
    if (supplement) {
      const settings: ReminderSettings = {
        enabled: reminderEnabled,
        time: reminderTime,
        frequency: reminderFrequency,
        days: reminderDays,
      };
      updateReminderSettings(supplement.id, settings);
      toast.success('Reminder settings saved!');
    }
  };

  const handleMarkTaken = () => {
    if (supplement) {
      markAsTaken(supplement.id);
      toast.success(`${supplement.name} marked as taken!`);
    }
  };

  const handleLogSymptom = () => {
    if (supplement && newSymptomScore !== '') {
      // First mark as taken if not already taken today
      const today = new Date().toISOString().split('T')[0];
      const lastTaken = supplement.lastTaken ? new Date(supplement.lastTaken).toISOString().split('T')[0] : null;
      
      if (lastTaken !== today) {
        markAsTaken(supplement.id);
      }

      // Then log the symptom
      const symptomLog: SymptomLog = {
        date: today,
        score: newSymptomScore as number,
        notes: `Taken with symptom score ${newSymptomScore}`
      };
      logSymptom(supplement.id, symptomLog);
      setNewSymptomScore(''); // Clear input after logging
      toast.success('Symptom logged successfully!');
    } else if (newSymptomScore === '') {
      toast.error('Please enter a symptom score.');
    }
  };

  // Prepare tracking data for the chart
  const chartData = useMemo(() => {
      // Combine mock adherence (daily) with supplement's symptom history
      const adherenceData = [
        { date: 'Jan 01', adherence: 70 },
        { date: 'Jan 08', adherence: 75 },
        { date: 'Jan 15', adherence: 80 },
        { date: 'Jan 22', adherence: 85 },
        { date: 'Jan 29', adherence: 88 },
        { date: 'Feb 05', adherence: 90 },
        { date: 'Feb 12', adherence: 92 },
      ]; // TODO: Replace with real adherence data

      const symptomData = (supplement.symptomHistory || []).map(log => ({
          date: log.date, // Assuming date is in a format compatible with adherence data dates
          symptomScore: log.score,
      }));

      // Merge data by date
      const mergedDataMap = new Map();

      adherenceData.forEach(item => mergedDataMap.set(item.date, item));
      symptomData.forEach(item => {
          const existing = mergedDataMap.get(item.date);
          if (existing) {
              mergedDataMap.set(item.date, { ...existing, ...item });
          } else {
              mergedDataMap.set(item.date, item);
          }
      });

      // Convert map back to array and sort by date
      const sortedData = Array.from(mergedDataMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      return sortedData;
  }, [supplement.symptomHistory]);

  // Prepare data for the SupplementGrid
  const gridData = useMemo(() => {
    const GRID_ROWS = 7;
    const GRID_COLS = 33;
    const grid: number[][] = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(0)); // Initialize with 0 (not taken)

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day

    // Helper to get the column index for a given date (0 to GRID_COLS-1 for last 33 days)
    const getColIndex = (date: Date): number | null => {
      const diffTime = today.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays < GRID_COLS) {
        return GRID_COLS - 1 - diffDays; // Map older dates to earlier columns
      }
      return null;
    };

    // Create a map of dates to their status
    const dateStatusMap = new Map<string, number>();

    // Add lastTaken dates (status 1 - taken)
    if (supplement.lastTaken) {
      const lastTakenDate = new Date(supplement.lastTaken);
      lastTakenDate.setHours(0, 0, 0, 0);
      dateStatusMap.set(lastTakenDate.toISOString().split('T')[0], 1);
    }

    // Add symptom history dates (status 2 - taken with symptom)
    (supplement.symptomHistory || []).forEach(log => {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);
      dateStatusMap.set(logDate.toISOString().split('T')[0], 2);
    });

    // Populate grid based on the date status map
    dateStatusMap.forEach((status, dateStr) => {
      const date = new Date(dateStr);
      const colIndex = getColIndex(date);
      if (colIndex !== null) {
        const dayOfWeek = date.getDay();
        grid[dayOfWeek][colIndex] = status;
      }
    });

    return grid;
  }, [supplement.lastTaken, supplement.symptomHistory]);

  // Determine color for the grid - simple mapping based on supplement name for now
  const getSupplementColor = (name: string): string => {
      const lowerName = name.toLowerCase();
      if (lowerName.includes('omega')) return 'coral';
      if (lowerName.includes('vitamin d')) return 'mint';
      if (lowerName.includes('magnesium')) return 'sunny';
      return 'gray'; // Default color
  };

  const gridColor = getSupplementColor(supplement.name);

  return (
    <Dialog open={!!supplement} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95vw] p-4 space-y-4 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PackageOpen className="w-5 h-5 text-mint" />
            {supplement.name}
          </DialogTitle>
        </DialogHeader>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 mb-1">Adherence</p>
            <p className="text-2xl font-bold text-mint">{adherenceRate}%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 mb-1">Streak</p>
            <p className="text-2xl font-bold text-mint">{daysStreak} days</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500 mb-1">Next Dose</p>
            <p className="text-lg font-semibold text-gray-900">
              {nextDose.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4 gap-1 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="purchase">Purchase</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-1">
            {/* Dosage */}
            {supplement.dosage && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4">
                <DosageInfoCard
                  amount={supplement.dosage.amount}
                  frequency={supplement.dosage.frequency}
                  notes={supplement.dosage.notes}
                />
              </div>
            )}
            {/* Dietary Info */}
            {supplement.dietaryInfo && (
               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4">
                <DietaryInfoCard
                  isVegetarian={supplement.dietaryInfo.isVegetarian}
                  isVegan={supplement.dietaryInfo.isVegan}
                  allergens={supplement.dietaryInfo.allergens}
                />
              </div>
            )}

            {/* Benefits */}
            {supplement.benefits && supplement.benefits.length > 0 && (
               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4">
                <BenefitsCard benefits={supplement.benefits} />
              </div>
            )}

            {/* Side Effects */}
            {supplement.sideEffects && supplement.sideEffects.length > 0 && (
               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4">
                <SideEffectsCard sideEffects={supplement.sideEffects} />
              </div>
            )}

            {/* Deficiencies they cover */}
            {supplement.deficienciesCovered && supplement.deficienciesCovered.length > 0 && (
               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4">
                <DeficienciesCoveredCard deficiencies={supplement.deficienciesCovered} />
              </div>
            )}

            {/* Duration */}
            {supplement.duration && (
               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4">
                <DurationCard duration={supplement.duration} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="research" className="space-y-4 p-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Scientific Studies</h3>
              <div className="space-y-4">
                {/* Mock research data */}
                <div className="bg-white rounded-lg p-3 border border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-1">Efficacy Study (2023)</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    A comprehensive study on the effectiveness of {supplement.name} in improving overall health outcomes.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>Journal of Health Sciences</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-1">Safety Analysis (2022)</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Long-term safety study examining the effects of {supplement.name} on various health parameters.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>International Health Review</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="purchase" className="space-y-4 p-1">
            <div className="grid gap-4">
              {supplement.purchaseLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{link.name}</h3>
                    {link.price && (
                      <p className="text-sm text-gray-600">{link.price}</p>
                    )}
                  </div>
                  <Button
                    onClick={() => onPurchase(supplement.id, link)}
                    className="inline-flex items-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4 p-1">
            {/* Reminder Setting - Placeholder */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="reminder-enabled" className="text-slate font-semibold">Enable Reminder</Label>
                    <Switch
                        id="reminder-enabled"
                        checked={reminderEnabled}
                        onCheckedChange={setReminderEnabled}
                         className="data-[state=checked]:bg-mint"
                    />
                </div>

                {reminderEnabled && (
                    <div className="space-y-4 p-4 border border-gray-100 rounded-lg">
                        <div className="space-y-2">
                            <Label htmlFor="reminder-time" className="text-slate font-semibold">Time</Label>
                             <Input
                                type="time"
                                id="reminder-time"
                                value={reminderTime}
                                onChange={(e) => setReminderTime(e.target.value)}
                                className="w-fit"
                             />
                        </div>

                        <div className="space-y-2">
                             <Label htmlFor="reminder-frequency" className="text-slate font-semibold">Frequency</Label>
                            <Select value={reminderFrequency} onValueChange={setReminderFrequency}>
                                <SelectTrigger id="reminder-frequency" className="w-full">
                                    <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="custom">Custom Days</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {reminderFrequency === 'custom' && (
                            <div className="space-y-2">
                                <Label className="text-slate font-semibold">Days</Label>
                                <div className="flex flex-wrap gap-2">
                                    {[ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <Button
                                            key={day}
                                            variant={reminderDays.includes(day) ? "default" : "outline"}
                                            onClick={() => handleReminderDaysChange(day)}
                                             className={cn(
                                                "px-3 py-1 text-xs",
                                                reminderDays.includes(day) && "bg-mint text-white hover:bg-mint/90"
                                            )}
                                        >
                                            {day}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button onClick={handleSaveReminder} className="w-full bg-mint hover:bg-mint/90">
                            Save Reminder
                        </Button>
                    </div>
                )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 