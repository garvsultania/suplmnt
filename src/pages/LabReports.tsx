
import { BottomNavigation } from '@/components/layout/BottomNavigation';

const LabReports = () => {
  return (
    <div className="min-h-screen bg-gradient-main pb-20">
      <div className="glass m-4 p-6">
        <h1 className="text-2xl font-poppins font-bold text-slate">Lab Reports</h1>
        <p className="text-slate/70 font-inter">Upload and analyze your health data</p>
      </div>
      
      <div className="px-4">
        <div className="card-glass text-center py-16">
          <div className="w-24 h-24 bg-gradient-mint rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">🧪</span>
          </div>
          <h2 className="text-xl font-poppins font-semibold text-slate mb-4">
            Coming Soon
          </h2>
          <p className="text-slate/70 font-inter max-w-md mx-auto">
            Lab report upload and analysis features are in development. 
            Stay tuned for AI-powered health insights!
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default LabReports;
