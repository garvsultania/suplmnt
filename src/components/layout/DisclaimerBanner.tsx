import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

export function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('disclaimerDismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('disclaimerDismissed', 'true');
    }, 300); // Match this with the CSS transition duration
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-20 left-0 right-0 z-40 px-4 pb-4 transition-all duration-300 transform ${
        isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-sm text-slate/80 leading-relaxed">
                This app provides supplement guidance and is not a substitute for professional medical advice.
                <a
                  href="/disclaimer"
                  className="ml-1 text-mint hover:text-mint-dark font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-slate/5 hover:bg-slate/10 flex items-center justify-center transition-colors"
              aria-label="Dismiss disclaimer"
            >
              <X className="w-4 h-4 text-slate/60" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 