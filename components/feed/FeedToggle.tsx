"use client";

import { useState } from "react";

interface FeedToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function FeedToggle({ isEnabled, onToggle }: FeedToggleProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = () => {
    if (isEnabled) {
      // Turning feed OFF - show confirmation
      setShowConfirm(true);
    } else {
      // Turning feed ON - no confirmation needed
      onToggle(true);
    }
  };

  const handleConfirm = () => {
    onToggle(false);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="backdrop-blur-sm p-6 rounded-xl border-2 shadow-lg mb-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1" style={{ color: '#ff5252' }}>
              Feed Control 🦐
            </h3>
            <p className="text-sm" style={{ color: '#ff6b6b' }}>
              {isEnabled 
                ? "Your feed is currently visible. Turn it off to focus on what matters."
                : "Your feed is hidden. Turn it on when you're ready."}
            </p>
          </div>
          <button
            onClick={handleToggle}
            className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
              isEnabled 
                ? "border-2" 
                : "shrimp-gradient text-white"
            }`}
            style={isEnabled ? { borderColor: '#ffb3b3', color: '#ff6b6b' } : {}}
          >
            {isEnabled ? "Turn Feed Off" : "Turn Feed On"}
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="backdrop-blur-sm rounded-xl border-2 shadow-2xl p-6 max-w-md w-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ffd4d4' }}>
            <h3 className="text-xl font-bold mb-4 shrimp-gradient-text">
              Turn Feed Off? 🦐
            </h3>
            <p className="mb-6" style={{ color: '#2d1b1b' }}>
              Are you sure you want to hide your feed? This will help you focus on intentional engagement with your friends.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border-2 px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-80"
                style={{ borderColor: '#ffb3b3', color: '#ff6b6b' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 shrimp-gradient hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg"
              >
                Turn Off Feed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

