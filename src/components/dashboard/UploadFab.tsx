import { Camera, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UploadFab = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <button
        onClick={() => navigate('/lab-reports')}
        className="w-16 h-16 bg-mint rounded-full shadow-float flex items-center justify-center hover:scale-110 transition-all duration-300 group"
      >
        <div className="relative">
          <Camera className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral rounded-full flex items-center justify-center">
            <Plus className="w-2 h-2 text-white" />
          </div>
        </div>
      </button>
    </div>
  );
};
