
const WelcomeStep = () => {
  return (
    <div className="card-glass h-full flex flex-col items-center justify-center text-center p-8">
      {/* Animated Icon */}
      <div className="mb-8 relative">
        <div className="w-32 h-32 bg-gradient-mint rounded-full flex items-center justify-center shadow-glass animate-float">
          <div className="w-20 h-20 bg-white/30 rounded-full backdrop-blur-sm border border-white/40 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-coral rounded-full"></div>
          </div>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-sunny rounded-full animate-pulse-slow"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-mint rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <h1 className="text-3xl font-poppins font-bold text-slate mb-4">
        Let's Personalize Your
        <span className="block bg-gradient-mint bg-clip-text text-transparent">
          Wellness Journey
        </span>
      </h1>
      
      <p className="text-lg text-slate/80 font-inter leading-relaxed mb-8 max-w-md">
        We'll ask you a few questions to create a personalized supplement plan 
        based on your unique health profile and goals.
      </p>

      {/* Features List */}
      <div className="space-y-4 w-full max-w-sm">
        <div className="flex items-center gap-3 text-left">
          <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-slate/80 font-inter">Personalized recommendations</span>
        </div>
        <div className="flex items-center gap-3 text-left">
          <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-slate/80 font-inter">Smart tracking & reminders</span>
        </div>
        <div className="flex items-center gap-3 text-left">
          <div className="w-6 h-6 bg-sunny rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 bg-slate rounded-full"></div>
          </div>
          <span className="text-slate/80 font-inter">Lab report analysis</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;
