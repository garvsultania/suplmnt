
import { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const PersonalInfoStep = () => {
  const { data, updateData } = useOnboarding();
  const [age, setAge] = useState(data.age || 25);
  const [selectedGender, setSelectedGender] = useState(data.gender || '');

  const handleAgeChange = (value: number[]) => {
    const newAge = value[0];
    setAge(newAge);
    updateData({ age: newAge });
  };

  const handleGenderSelect = (gender: 'male' | 'female' | 'other') => {
    setSelectedGender(gender);
    updateData({ gender });
  };

  const genderOptions = [
    { id: 'female', label: 'Female', icon: '👩', gradient: 'bg-gradient-coral' },
    { id: 'male', label: 'Male', icon: '👨', gradient: 'bg-gradient-mint' },
    { id: 'other', label: 'Other', icon: '👤', gradient: 'bg-gradient-sunny' },
  ];

  return (
    <div className="card-glass h-full p-8 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-poppins font-bold text-slate mb-2">
          Tell us about yourself
        </h2>
        <p className="text-slate/70 font-inter">
          This helps us provide more accurate recommendations
        </p>
      </div>

      {/* Age Slider */}
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-poppins font-semibold text-slate mb-4">
            Age: <span className="text-mint">{age}</span>
          </label>
          <div className="relative">
            <Slider
              value={[age]}
              onValueChange={handleAgeChange}
              max={100}
              min={13}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-slate/50 mt-2">
              <span>13</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-lg font-poppins font-semibold text-slate mb-4">
            Gender
          </label>
          <div className="grid grid-cols-1 gap-3">
            {genderOptions.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                onClick={() => handleGenderSelect(option.id as 'male' | 'female' | 'other')}
                className={`
                  btn-glass h-16 justify-start text-left transition-all duration-300
                  ${selectedGender === option.id 
                    ? `${option.gradient} text-white border-transparent shadow-glass-lg scale-105` 
                    : 'border-white/20 text-slate hover:border-mint hover:scale-105'
                  }
                `}
              >
                <span className="text-2xl mr-4">{option.icon}</span>
                <span className="font-inter font-medium text-lg">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="glass p-4 bg-mint/5 border-mint/20">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <p className="text-sm text-slate/80 font-inter leading-relaxed">
              Your age and gender help us understand your nutritional needs and 
              recommended daily values for supplements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
