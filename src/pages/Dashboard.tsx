
import { useState } from 'react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ProgressRings } from '@/components/dashboard/ProgressRings';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { HealthInsights } from '@/components/dashboard/HealthInsights';
import { UploadFab } from '@/components/dashboard/UploadFab';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-main pb-20">
      <DashboardHeader />
      
      <div className="px-4 space-y-6">
        <ProgressRings />
        <QuickStats />
        <HealthInsights />
        <RecentActivity />
      </div>

      <UploadFab />
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
