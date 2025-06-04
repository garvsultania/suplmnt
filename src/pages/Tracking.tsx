import { useState } from 'react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { TrackingHeader } from '@/components/tracking/TrackingHeader';
import SupplementCard from '@/components/tracking/SupplementCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, BarChart2, Heart, Plus, Trophy } from 'lucide-react';
import { icons } from 'lucide-react';
import { ProgressOverview } from '@/components/tracking/ProgressOverview';
import { MoodTracker } from '@/components/tracking/MoodTracker';
import { WeeklyInsights } from '@/components/tracking/WeeklyInsights';
import { useToast } from '@/hooks/use-toast';
import { SupplementWithTracking, useSupplements, SymptomLog } from '@/contexts/SupplementsContext';

const Tracking = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const { supplements: contextSupplements, markAsTaken, logSymptom, onPurchase } = useSupplements();
  const { toast } = useToast();

  const handleMarkTaken = (idx: number) => {
    const supplementToUpdate = contextSupplements[idx];
    if (supplementToUpdate) {
      markAsTaken(supplementToUpdate.id);
    }
  };
  const handleReminder = (idx: number) => {
    toast({
      title: `Reminder set for ${contextSupplements[idx].name}`,
      description: 'You will be reminded to take this supplement.',
    });
  };

  const handleLogSymptom = (supplementId: string, score: number) => {
    logSymptom(supplementId, { date: new Date().toISOString(), score });
    markAsTaken(supplementId);
    toast({
      title: 'Symptom Logged',
      description: `Symptom score ${score} logged for ${contextSupplements.find(s => s.id === supplementId)?.name}.`,
    });
  };

  const getSupplementTrackingData = (supplement: SupplementWithTracking) => {
    const GRID_ROWS = 7;
    const GRID_COLS = 33;
    const grid: number[][] = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(0));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getColIndex = (date: Date): number | null => {
      const diffTime = today.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays < GRID_COLS) {
        return GRID_COLS - 1 - diffDays;
      }
      return null;
    };

    const dateStatusMap = new Map<string, number>();

    if (supplement.lastTaken) {
      const lastTakenDate = new Date(supplement.lastTaken);
      lastTakenDate.setHours(0, 0, 0, 0);
      dateStatusMap.set(lastTakenDate.toISOString().split('T')[0], 1);
    }

    (supplement.symptomHistory || []).forEach(log => {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);
      dateStatusMap.set(logDate.toISOString().split('T')[0], 2);
    });

    dateStatusMap.forEach((status, dateStr) => {
      const date = new Date(dateStr);
      const colIndex = getColIndex(date);
      if (colIndex !== null) {
        const dayOfWeek = date.getDay();
        grid[dayOfWeek][colIndex] = status;
      }
    });

    const relevantDates = Array.from(dateStatusMap.keys()).filter(dateStr => {
        const date = new Date(dateStr);
        const diffTime = today.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays < 30;
    });
    const takenCount = relevantDates.filter(dateStr => dateStatusMap.get(dateStr) !== 0).length;
    const adherenceRate = relevantDates.length > 0 ? Math.round((takenCount / Math.min(relevantDates.length, 30)) * 100) : 0;

    let currentStreak = 0;
    let checkDate = new Date(today);
    while(true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        const status = dateStatusMap.get(dateStr);
        if (status === 1 || status === 2) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else if (status === 0 && checkDate.getTime() === today.getTime()) {
           break;
        } else if (status === undefined && checkDate.getTime() <= today.getTime() && checkDate.getTime() >= today.getTime() - (GRID_COLS -1 ) * 24 * 60 * 60 * 1000) {
           break;
        } else if (checkDate.getTime() < today.getTime() - (GRID_COLS -1 ) * 24 * 60 * 60 * 1000) {
           break;
        } else {
           break;
        }
    }
    const daysStreak = currentStreak;

    const nextDose = new Date(Date.now() + 4 * 60 * 60 * 1000);

     const chartDataMap = new Map<string, { date: string; adherence?: number; symptomScore?: number }>();

     (supplement.symptomHistory || []).forEach(log => {
         const logDate = new Date(log.date);
         if (today.getTime() - logDate.getTime() < 30 * 24 * 60 * 60 * 1000) {
            chartDataMap.set(log.date, { date: log.date, symptomScore: log.score });
         }
     });

      const mockAdherencePoints = [
          { date: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], adherence: adherenceRate > 30 ? adherenceRate - 30 : 0 },
          { date: new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], adherence: adherenceRate > 20 ? adherenceRate - 20 : 0 },
          { date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], adherence: adherenceRate > 10 ? adherenceRate - 10 : 0 },
          { date: today.toISOString().split('T')[0], adherence: adherenceRate },
      ];

      mockAdherencePoints.forEach(point => {
          const existing = chartDataMap.get(point.date);
          if(existing) {
              chartDataMap.set(point.date, {...existing, adherence: point.adherence});
          } else {
              chartDataMap.set(point.date, point);
          }
      });

     const chartData = Array.from(chartDataMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      gridData: grid,
      adherenceRate,
      daysStreak,
      nextDose,
      symptomHistory: supplement.symptomHistory || [],
      chartData,
    };
  };

  const activeSupplements = contextSupplements.filter(supp => supp.status === 'active');

  return (
    <div className="min-h-screen bg-gradient-main pb-20 safe-area-padding relative">
      <TrackingHeader />
      <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
        <div className="sticky top-0 z-10 bg-gradient-main/80 backdrop-blur-sm">
          <TabsList className="w-full justify-start px-3 py-2 overflow-x-auto">
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Daily</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Mood</span>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="daily" className="mt-0">
          <div className="space-y-4 pb-20 lg:flex lg:flex-wrap lg:gap-4 lg:space-y-0">
            {activeSupplements.map((supp, idx) => {
              const Icon = icons[supp.icon as keyof typeof icons];
              const trackingData = getSupplementTrackingData(supp);
              return (
                <div key={supp.id} className="lg:w-[calc(50%-8px)] flex-shrink-0">
                  <SupplementCard
                    name={supp.name}
                    description={supp.description}
                    icon={<Icon className="w-6 h-6" />}
                    color={supp.purchaseLinks?.[0]?.name.toLowerCase().includes('amazon') ? 'mint' : 'coral'}
                    gridData={trackingData.gridData}
                    adherenceRate={trackingData.adherenceRate}
                    daysStreak={trackingData.daysStreak}
                    nextDose={trackingData.nextDose}
                    symptomHistory={trackingData.symptomHistory}
                    chartData={trackingData.chartData}
                    onMarkTaken={() => handleMarkTaken(idx)}
                    onLogSymptom={(score) => handleLogSymptom(supp.id, score)}
                    onReminder={() => handleReminder(idx)}
                    supplement={supp}
                  />
                </div>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="progress" className="mt-0">
          <ProgressOverview />
        </TabsContent>
        <TabsContent value="mood" className="mt-0">
          <MoodTracker />
        </TabsContent>
      </Tabs>
      <BottomNavigation />
    </div>
  );
};

export default Tracking;
