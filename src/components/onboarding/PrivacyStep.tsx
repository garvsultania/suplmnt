
import { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Checkbox } from '@/components/ui/checkbox';

const PrivacyStep = () => {
  const { data, updateData } = useOnboarding();
  const [isAccepted, setIsAccepted] = useState(data.privacyAccepted || false);

  const handleAcceptance = (checked: boolean) => {
    setIsAccepted(checked);
    updateData({ privacyAccepted: checked });
  };

  return (
    <div className="card-glass h-full p-8 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-poppins font-bold text-slate mb-2">
          Privacy & Security
        </h2>
        <p className="text-slate/70 font-inter">
          Your health data is protected with enterprise-grade security
        </p>
      </div>

      {/* Security Features */}
      <div className="space-y-4">
        <div className="glass p-4 bg-mint/5 border-mint/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-mint rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <h3 className="font-poppins font-semibold text-slate">HIPAA Compliant</h3>
          </div>
          <p className="text-sm text-slate/70 font-inter pl-11">
            Your health information is encrypted and stored according to healthcare privacy standards.
          </p>
        </div>

        <div className="glass p-4 bg-coral/5 border-coral/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <h3 className="font-poppins font-semibold text-slate">End-to-End Encryption</h3>
          </div>
          <p className="text-sm text-slate/70 font-inter pl-11">
            All data transmission uses bank-level 256-bit SSL encryption.
          </p>
        </div>

        <div className="glass p-4 bg-sunny/5 border-sunny/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-sunny rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-slate rounded-full"></div>
            </div>
            <h3 className="font-poppins font-semibold text-slate">Your Data, Your Control</h3>
          </div>
          <p className="text-sm text-slate/70 font-inter pl-11">
            You can export or delete your data at any time. We never sell personal information.
          </p>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="glass p-6 border-slate/20">
        <h3 className="font-poppins font-semibold text-slate mb-4">Privacy Policy Summary</h3>
        <div className="space-y-3 text-sm text-slate/70 font-inter">
          <p>• We collect only the health data you provide to give personalized recommendations</p>
          <p>• Lab reports are analyzed by AI and securely stored with your consent</p>
          <p>• We may share anonymized, aggregated data for research purposes</p>
          <p>• Third-party integrations (retailers, labs) have their own privacy policies</p>
          <p>• You can opt out of data collection or delete your account anytime</p>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isAccepted}
            onCheckedChange={handleAcceptance}
            className="mt-1 data-[state=checked]:bg-mint data-[state=checked]:border-mint"
          />
          <div className="flex-1">
            <label className="text-slate font-inter leading-relaxed cursor-pointer">
              I agree to the <span className="text-mint font-medium">Terms of Service</span> and{' '}
              <span className="text-mint font-medium">Privacy Policy</span>. I understand that 
              my health data will be used to provide personalized supplement recommendations 
              and that I can withdraw consent at any time.
            </label>
          </div>
        </div>

        {isAccepted && (
          <div className="glass p-4 bg-mint/10 border-mint/30 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p className="text-sm text-mint font-inter font-medium">
                Thank you! You're all set to start your wellness journey.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyStep;
