import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, Home, BarChart2, User } from 'lucide-react';

const Sparkle = () => (
  <div className="absolute z-0 pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white/30 blur-lg animate-sparkle"
        style={{
          width: `${6 + Math.random() * 10}px`,
          height: `${6 + Math.random() * 10}px`,
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-main flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-40 h-40 bg-mint/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-16 w-32 h-32 bg-coral/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-sunny/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-mint/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <Sparkle />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Floating Supplement Capsule */}
        <div className="mb-16 relative group">
          <div className="w-40 h-40 bg-gradient-mint rounded-full flex items-center justify-center shadow-glass animate-float group-hover:scale-105 transition-transform duration-500">
            <div className="w-24 h-24 bg-white/30 rounded-full backdrop-blur-sm border border-white/40 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-coral rounded-full animate-pulse-slow"></div>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-sunny rounded-full animate-pulse-slow"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-coral/50 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="text-center mb-16 max-w-md">
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-slate mb-6 leading-tight tracking-tight relative inline-block" aria-label="Welcome to suplmnt">
            Welcome to
            <span className="block bg-gradient-mint bg-clip-text text-transparent mt-2 relative overflow-hidden">
              <span className="relative z-10">suplmnt</span>
              <span className="absolute left-0 top-1/2 w-full h-2 bg-gradient-to-r from-white/60 to-transparent opacity-60 animate-shine" style={{transform: 'translateY(-50%)'}}></span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate/80 font-inter leading-relaxed tracking-wide">
            AI-powered supplement tracking for optimal wellness. Transform your health journey with personalized insights.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-4xl">
          {[{
            title: 'Lab Analysis',
            desc: 'Upload lab reports for AI-powered health insights',
            icon: <Camera className="w-10 h-10 text-white" />,
            bg: 'bg-gradient-mint',
            hover: 'group-hover:text-mint',
          }, {
            title: 'Smart Tracking',
            desc: 'Daily supplement reminders and progress monitoring',
            icon: <div className="w-10 h-10 bg-white rounded-full"></div>,
            bg: 'bg-gradient-coral',
            hover: 'group-hover:text-coral',
          }, {
            title: 'Personalized',
            desc: 'Tailored recommendations based on your unique profile',
            icon: <div className="w-10 h-10 bg-slate rounded-full"></div>,
            bg: 'bg-gradient-sunny',
            hover: 'group-hover:text-sunny',
          }].map((f, i) => (
            <div
              key={f.title}
              className={`card-glass group relative overflow-hidden transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} animate-fade-in`}
              style={{ transitionDelay: `${i * 120 + 300}ms` }}
            >
              <div className={`absolute inset-0 ${f.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className={`w-20 h-20 ${f.bg} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>{f.icon}</div>
              <h3 className={`font-poppins font-semibold text-slate mb-3 text-lg ${f.hover} transition-colors duration-300 max-w-full md:max-w-xs mx-auto`} style={{overflowWrap: 'break-word'}}>{f.title}</h3>
              <p className="text-sm text-slate/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="bottom-nav-spacer" />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Button 
            onClick={() => navigate('/onboarding')}
            className="btn-glass btn-primary flex-1 text-lg font-semibold animate-glow"
          >
            Get Started
          </Button>
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="btn-glass flex-1 text-lg font-semibold border-mint text-mint hover:bg-mint hover:text-white"
          >
            View Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-slate/60">
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
        </div>
      </div>

      {/* Glassy Floating Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center h-16 bg-white/30 backdrop-blur-lg shadow-lg rounded-t-2xl mx-2 mb-2 border border-white/20">
        <button onClick={() => navigate('/')} className="flex flex-col items-center text-mint focus:outline-none">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button onClick={() => navigate('/tracking')} className="flex flex-col items-center text-coral focus:outline-none">
          <BarChart2 className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold">Track</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center text-sunny focus:outline-none">
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold">Profile</span>
        </button>
      </nav>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm pointer-events-none"></div>
    </div>
  );
};

export default Index;
