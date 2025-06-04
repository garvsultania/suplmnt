import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { FeedbackForm } from './FeedbackForm';

export function FeedbackButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-20 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        aria-label="Send feedback"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <FeedbackForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
} 