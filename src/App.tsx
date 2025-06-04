import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Profile } from './pages/Profile';
import { LabReports } from './pages/LabReports';
import { Supplements } from './pages/Supplements';
import { ProfileProvider } from './contexts/ProfileContext';
import { LabReportsProvider } from './contexts/LabReportsContext';
import { SupplementsProvider } from './contexts/SupplementsContext';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { AppHeader } from './components/layout/AppHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './components/ui/tooltip';
import { OnboardingProvider } from './contexts/OnboardingContext';
import Index from './pages/Index';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Tracking from './pages/Tracking';
import NotFound from './pages/NotFound';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { FeedbackButton } from './components/feedback/FeedbackButton';
import { CartDrawer } from './components/supplements/CartDrawer';

const queryClient = new QueryClient();

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <OnboardingProvider>
          <ProfileProvider>
            <LabReportsProvider>
              <SupplementsProvider>
                <Toaster position="top-center" />
                <Router>
                  <div className="min-h-screen bg-ivory">
                    <AppHeader />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/onboarding" element={<Onboarding />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/lab-reports" element={<LabReports />} />
                      <Route path="/supplements" element={<Supplements />} />
                      <Route path="/tracking" element={<Tracking />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <BottomNavigation />
                  </div>
                </Router>
                <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                <DisclaimerBanner />
                <FeedbackButton />
              </SupplementsProvider>
            </LabReportsProvider>
          </ProfileProvider>
        </OnboardingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
