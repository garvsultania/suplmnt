
import { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';

const LifestyleStep = () => {
  const { data, updateData } = useOnboarding();
  const [selectedDiets, setSelectedDiets] = useState<string[]>(data.dietPreferences || []);
  const [selectedExercise, setSelectedExercise] = useState(data.exerciseLevel || '');

  const dietOptions = [
    { id: 'omnivore', label: 'Omnivore', icon: '🍖', description: 'Eat everything' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥬', description: 'No meat' },
    { id: 'vegan', label: 'Vegan', icon: '🌱', description: 'Plant-based only' },
    { id: 'keto', label: 'Keto', icon: '🥑', description: 'Low-carb, high-fat' },
    { id: 'paleo', label: 'Paleo', icon: '🥩', description: 'Whole foods' },
    { id: 'mediterranean', label: 'Mediterranean', icon: '🫒', description: 'Fish, olive oil' },
  ];

  const exerciseOptions = [
    { id: 'low', label: 'Low Activity', icon: '🚶', description: 'Sedentary lifestyle', gradient: 'bg-gradient-sunny' },
    { id: 'moderate', label: 'Moderate Activity', icon: '🏃', description: '2-3 workouts/week', gradient: 'bg-gradient-mint' },
    { id: 'high', label: 'High Activity', icon: '💪', description: '5+ workouts/week', gradient: 'bg-gradient-coral' },
  ];

  const handleDietToggle = (dietId: string) => {
    const newSelection = selectedDiets.includes(dietId)
      ? selectedDiets.filter(id => id !== dietId)
      : [...selectedDiets, dietId];
    
    setSelectedDiets(newSelection);
    updateData({ dietPreferences: newSelection });
  };

  const handleExerciseSelect = (level: 'low' | 'moderate' | 'high') => {
    setSelectedExercise(level);
    updateData({ exerciseLevel: level });
  };

  return (
    <div className="card-glass h-full p-8 space-y-8 overflow-y-auto">
      <div className="text-center">
        <h2 className="text-2xl font-poppins font-bold text-slate mb-2">
          Lifestyle Preferences
        </h2>
        <p className="text-slate/70 font-inter">
          Tell us about your diet and exercise habits
        </p>
      </div>

      {/* Diet Preferences */}
      <div>
        <h3 className="text-lg font-poppins font-semibold text-slate mb-4">
          Dietary Preferences <span className="text-sm font-inter font-normal text-slate/60">(select all that apply)</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {dietOptions.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              onClick={() => handleDietToggle(option.id)}
              className={`
                btn-glass h-20 flex-col transition-all duration-300
                ${selectedDiets.includes(option.id)
                  ? 'bg-gradient-mint text-white border-transparent shadow-glass-lg scale-105'
                  : 'border-white/20 text-slate hover:border-mint hover:scale-105'
                }
              `}
            >
              <span className="text-2xl mb-1">{option.icon}</span>
              <span className="font-inter font-medium text-sm">{option.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Exercise Level */}
      <div>
        <h3 className="text-lg font-poppins font-semibold text-slate mb-4">
          Exercise Level
        </h3>
        <div className="space-y-3">
          {exerciseOptions.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              onClick={() => handleExerciseSelect(option.id as 'low' | 'moderate' | 'high')}
              className={`
                btn-glass w-full h-16 justify-start text-left transition-all duration-300
                ${selectedExercise === option.id
                  ? `${option.gradient} text-white border-transparent shadow-glass-lg scale-105`
                  : 'border-white/20 text-slate hover:border-mint hover:scale-105'
                }
              `}
            >
              <span className="text-2xl mr-4">{option.icon}</span>
              <div>
                <div className="font-inter font-medium text-base">{option.label}</div>
                <div className="text-sm opacity-80">{option.description}</div>
              </div>
            </Button>
          ))}
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
              Your lifestyle affects nutrient absorption and requirements. 
              Athletes need more electrolytes, while vegans may need B12 supplementation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleStep;
