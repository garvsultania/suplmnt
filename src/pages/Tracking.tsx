import { useState } from 'react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { TrackingHeader } from '@/components/tracking/TrackingHeader';
import SupplementCard from '@/components/tracking/SupplementCard';
import SupplementModal from '@/components/tracking/SupplementModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, BarChart2, Heart, History, Plus } from 'lucide-react';
import { icons } from 'lucide-react';
import { ProgressOverview } from '@/components/tracking/ProgressOverview';
import { MoodTracker } from '@/components/tracking/MoodTracker';
import { WeeklyInsights } from '@/components/tracking/WeeklyInsights';
import { useToast } from '@/hooks/use-toast';

const mockSupplements = [
  {
    name: 'Vitamin D3',
    description: 'Bone health, immunity',
    icon: 'Sun',
    color: 'bg-mint',
    gridData: Array(90).fill(true).map((v, i) => i % 3 !== 0),
    streak: 7,
    completionRate: 90,
  },
  {
    name: 'Omega-3',
    description: 'Heart & brain health',
    icon: 'Droplet',
    color: 'bg-coral',
    gridData: Array(90).fill(true).map((v, i) => i % 4 !== 0),
    streak: 3,
    completionRate: 80,
  },
  {
    name: 'Magnesium',
    description: 'Muscle & sleep support',
    icon: 'Moon',
    color: 'bg-sunny',
    gridData: Array(90).fill(true).map((v, i) => i % 5 !== 0),
    streak: 2,
    completionRate: 70,
  },
];

const Tracking = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [supplements, setSupplements] = useState(mockSupplements);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAdd = () => {
    setEditIndex(null);
    setModalOpen(true);
  };
  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setModalOpen(true);
  };
  const handleSave = (data: any) => {
    if (editIndex !== null) {
      setSupplements(supplements.map((s, i) =>
        i === editIndex
          ? { ...s, ...data, gridData: s.gridData, streak: s.streak, completionRate: s.completionRate }
          : s
      ));
    } else {
      setSupplements([...supplements, { ...data, gridData: Array(90).fill(false), streak: 0, completionRate: 0 }]);
    }
    setModalOpen(false);
  };
  const handleArchive = (idx: number) => {
    setSupplements(supplements.filter((_, i) => i !== idx));
  };
  const handleMarkTaken = (idx: number) => {
    // Mark today as taken (for demo, just update first false)
    const newSupps = [...supplements];
    const firstFalse = newSupps[idx].gridData.findIndex((v: boolean) => !v);
    if (firstFalse !== -1) newSupps[idx].gridData[firstFalse] = true;
    newSupps[idx].streak += 1;
    newSupps[idx].completionRate = Math.round((newSupps[idx].gridData.filter((v: boolean) => v).length / newSupps[idx].gridData.length) * 100);
    setSupplements(newSupps);
  };
  const handleReminder = (idx: number) => {
    toast({
      title: `Reminder set for ${supplements[idx].name}`,
      description: 'You will be reminded to take this supplement.',
    });
  };

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
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="daily" className="mt-0">
          <div className="space-y-4 pb-20">
            {supplements.map((supp, idx) => {
              const Icon = icons[supp.icon];
              return (
                <SupplementCard
                  key={idx}
                  name={supp.name}
                  description={supp.description}
                  icon={<Icon className="w-6 h-6" />}
                  color={supp.color}
                  gridData={supp.gridData}
                  streak={supp.streak}
                  completionRate={supp.completionRate}
                  onMarkTaken={() => handleMarkTaken(idx)}
                  onEdit={() => handleEdit(idx)}
                  onArchive={() => handleArchive(idx)}
                  onReminder={() => handleReminder(idx)}
                />
              );
            })}
          </div>
          <button
            className="fixed bottom-24 right-6 z-30 bg-mint text-white rounded-full shadow-lg p-4 hover:scale-110 transition-all"
            onClick={handleAdd}
            aria-label="Add Supplement"
          >
            <Plus className="w-7 h-7" />
          </button>
        </TabsContent>
        <TabsContent value="progress" className="mt-0">
          <ProgressOverview />
        </TabsContent>
        <TabsContent value="mood" className="mt-0">
          <MoodTracker />
        </TabsContent>
        <TabsContent value="history" className="mt-0">
          <WeeklyInsights />
        </TabsContent>
      </Tabs>
      <SupplementModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editIndex !== null ? supplements[editIndex] : undefined}
      />
      <BottomNavigation />
    </div>
  );
};

export default Tracking;
