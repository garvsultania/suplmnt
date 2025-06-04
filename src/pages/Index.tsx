import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, Home, BarChart2, User, FlaskConical, Clock, Star, TrendingUp, Shield, Award } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-main flex flex-col relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-mint/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-coral/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sunny/3 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Success Banner */}
      <div className="w-full bg-gradient-to-r from-mint/10 to-coral/10 backdrop-blur-sm py-2 px-4 text-center text-sm font-medium text-slate/80">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4 text-mint" />
          <span>Trusted by 50,000+ users • $1M+ in funding</span>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col items-center justify-center px-6 py-16 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Enhanced Floating Supplement Capsule */}
        <div className="mb-12 w-32 h-32 bg-gradient-to-br from-mint to-mint-dark rounded-full flex items-center justify-center shadow-lg animate-float relative">
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
          <FlaskConical className="w-16 h-16 text-white drop-shadow-lg" />
        </div>

        {/* Enhanced Hero Content */}
        <div className="text-center mb-16 max-w-md">
          <img 
            src="/assets/suplmnt-logo-guidance.png"
            alt="suplmnt - AI-Driven Personalized Supplement Guidance"
            className="mx-auto mb-6 w-64 md:w-80 drop-shadow-lg"
          />
          <p className="text-base md:text-lg text-slate/80 font-inter leading-relaxed tracking-wide max-w-sm mx-auto">
            Transform your health journey with AI-powered supplement guidance and tracking for optimal wellness.
          </p>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-4xl">
          {[{
            title: 'Lab Analysis',
            desc: 'Upload lab reports for AI-powered health insights',
            icon: <FlaskConical className="w-10 h-10 text-white" />,
            bg: 'bg-gradient-mint',
            hover: 'group-hover:text-mint',
          }, {
            title: 'Smart Tracking',
            desc: 'Daily supplement reminders and progress monitoring',
            icon: <Clock className="w-10 h-10 text-white" />,
            bg: 'bg-gradient-coral',
            hover: 'group-hover:text-coral',
          }, {
            title: 'Personalized',
            desc: 'Tailored recommendations based on your unique profile',
            icon: <User className="w-10 h-10 text-white" />,
            bg: 'bg-gradient-sunny',
            hover: 'group-hover:text-sunny',
          }].map((f, i) => (
            <div
              key={f.title}
              className={`card-glass group relative overflow-hidden transition-all duration-500 hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} animate-fade-in`}
              style={{ transitionDelay: `${i * 120 + 300}ms` }}
            >
              <div className={`absolute inset-0 ${f.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className={`w-20 h-20 ${f.bg} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>{f.icon}</div>
              <h3 className={`font-poppins font-medium text-slate mb-2 text-xl ${f.hover} transition-colors duration-300 max-w-full md:max-w-xs mx-auto`} style={{overflowWrap: 'break-word'}}>{f.title}</h3>
              <p className="text-sm text-slate/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button 
            onClick={() => navigate('/onboarding')}
            className="btn-glass btn-primary flex-1 text-lg font-semibold animate-glow hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </Button>
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="btn-glass flex-1 text-lg font-semibold border-mint text-mint hover:bg-mint hover:text-white hover:scale-105 transition-transform duration-300"
          >
            View Demo
          </Button>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-6 text-sm text-slate/70">
          <div className="flex items-center gap-3 group">
            <div className="w-3 h-3 bg-mint rounded-full group-hover:scale-125 transition-transform duration-300"></div>
            <span className="font-medium group-hover:text-mint transition-colors duration-300">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="w-3 h-3 bg-coral rounded-full group-hover:scale-125 transition-transform duration-300"></div>
            <span className="font-medium group-hover:text-coral transition-colors duration-300">FDA Guidelines</span>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="w-3 h-3 bg-sunny rounded-full group-hover:scale-125 transition-transform duration-300"></div>
            <span className="font-medium group-hover:text-sunny transition-colors duration-300">Science-Based</span>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="w-3 h-3 bg-mint rounded-full group-hover:scale-125 transition-transform duration-300"></div>
            <span className="font-medium group-hover:text-mint transition-colors duration-300">50K+ Users</span>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mt-16 w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-mint to-coral border-2 border-white"></div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-sunny fill-sunny" />
              <span className="font-medium">4.9/5</span>
            </div>
          </div>
          <p className="text-center text-sm text-slate/60 italic">
            "The most comprehensive supplement tracking app I've used. The AI recommendations are spot on!"
          </p>
        </div>
      </div>

      {/* Enhanced Glassy Floating Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center h-20 bg-white/40 backdrop-blur-xl shadow-lg rounded-t-3xl mx-3 mb-3 border border-white/30">
        <button onClick={() => navigate('/')} className="flex flex-col items-center text-mint focus:outline-none hover:scale-110 transition-transform duration-300">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button onClick={() => navigate('/tracking')} className="flex flex-col items-center text-coral focus:outline-none hover:scale-110 transition-transform duration-300">
          <BarChart2 className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold">Track</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center text-sunny focus:outline-none hover:scale-110 transition-transform duration-300">
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold">Profile</span>
        </button>
      </nav>

      {/* Enhanced Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/20 to-transparent backdrop-blur-sm pointer-events-none"></div>
    </div>
  );
};

export default Index;
