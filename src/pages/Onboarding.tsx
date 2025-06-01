
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import WelcomeStep from '@/components/onboarding/WelcomeStep';
import PersonalInfoStep from '@/components/onboarding/PersonalInfoStep';
import HealthMetricsStep from '@/components/onboarding/HealthMetricsStep';
import LifestyleStep from '@/components/onboarding/LifestyleStep';
import PrivacyStep from '@/components/onboarding/PrivacyStep';

const Onboarding = () => {
  const { currentStep, setCurrentStep, totalSteps, data } = useOnboarding();
  const navigate = useNavigate();

  const steps = [
    { component: WelcomeStep, title: 'Welcome' },
    { component: PersonalInfoStep, title: 'Personal Info' },
    { component: HealthMetricsStep, title: 'Health Metrics' },
    { component: LifestyleStep, title: 'Lifestyle' },
    { component: PrivacyStep, title: 'Privacy' },
  ];

  const CurrentStepComponent = steps[currentStep]?.component;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      console.log('Onboarding completed:', data);
      navigate('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true; // Welcome step
      case 1: return data.age && data.gender; // Personal info
      case 2: return data.height && data.weight; // Health metrics
      case 3: return data.dietPreferences && data.exerciseLevel; // Lifestyle
      case 4: return data.privacyAccepted; // Privacy
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main flex flex-col">
      {/* Progress Header */}
      <div className="glass m-4 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-poppins font-semibold text-slate">
            {steps[currentStep]?.title}
          </h2>
          <span className="text-sm text-slate/60 font-inter font-medium">
            {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-white/20">
          <div 
            className="h-full bg-gradient-mint rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>

      {/* Step Content */}
      <div className="flex-1 px-4 pb-4">
        <div className="h-full">
          {CurrentStepComponent && <CurrentStepComponent />}
        </div>
      </div>

      {/* Navigation */}
      <div className="glass m-4 p-4">
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrev}
            className="btn-glass border-slate/20 text-slate hover:bg-slate hover:text-white px-8"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn-glass btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
