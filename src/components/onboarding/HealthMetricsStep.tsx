import { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Slider } from '@/components/ui/slider';

const HealthMetricsStep = () => {
  const { data, updateData } = useOnboarding();
  const [height, setHeight] = useState(data.height || 170);
  const [weight, setWeight] = useState(data.weight || 70);

  const handleHeightChange = (value: number[]) => {
    const newHeight = value[0];
    setHeight(newHeight);
    updateData({ height: newHeight });
  };

  const handleWeightChange = (value: number[]) => {
    const newWeight = value[0];
    setWeight(newWeight);
    updateData({ weight: newWeight });
  };

  const getBMI = () => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-coral' };
    if (bmi < 25) return { label: 'Normal', color: 'text-mint' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-sunny' };
    return { label: 'Obese', color: 'text-coral' };
  };

  const bmi = parseFloat(getBMI());
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="card-glass h-full p-8 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-poppins font-bold text-slate mb-2">
          Health Metrics
        </h2>
        <p className="text-slate/70 font-inter">
          Help us calculate your nutritional requirements
        </p>
      </div>

      {/* Height Slider */}
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-poppins font-semibold text-slate mb-4">
            Height: <span className="text-mint">{height} cm</span>
          </label>
          <div className="relative">
            <Slider
              value={[height]}
              onValueChange={handleHeightChange}
              max={220}
              min={120}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-slate/50 mt-2">
              <span>120 cm</span>
              <span>220 cm</span>
            </div>
          </div>
        </div>

        {/* Weight Slider */}
        <div>
          <label className="block text-lg font-poppins font-semibold text-slate mb-4">
            Weight: <span className="text-mint">{weight} kg</span>
          </label>
          <div className="relative">
            <Slider
              value={[weight]}
              onValueChange={handleWeightChange}
              max={200}
              min={30}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-slate/50 mt-2">
              <span>30 kg</span>
              <span>200 kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* BMI Display */}
      <div className="glass p-6 bg-gradient-to-r from-mint/10 to-coral/10 border-mint/20">
        <div className="text-center">
          <h3 className="font-poppins font-semibold text-slate mb-2">Your BMI</h3>
          <div className="text-4xl font-poppins font-bold text-mint mb-2">
            {getBMI()}
          </div>
          <div className={`text-lg font-inter font-medium ${bmiCategory.color}`}>
            {bmiCategory.label}
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="glass p-4 bg-mint/5 border-mint/20 mt-6">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <p className="text-sm text-slate/80 font-inter leading-relaxed">
              BMI helps determine your metabolic rate and dosage requirements 
              for certain supplements like vitamins and minerals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMetricsStep;
