
import { BottomNavigation } from '@/components/layout/BottomNavigation';

const Supplements = () => {
  return (
    <div className="min-h-screen bg-gradient-main pb-20">
      <div className="glass m-4 p-6">
        <h1 className="text-2xl font-poppins font-bold text-slate">Supplements</h1>
        <p className="text-slate/70 font-inter">Personalized recommendations</p>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Supplements;
