"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Story } from "@/types";

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
}

export default function StoryViewer({ story, onClose }: StoryViewerProps) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onClose();
          return 100;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
      <div className="relative w-full h-full max-w-md max-h-[90vh] mx-auto">
        {/* Progress Bar */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="h-1 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ 
                width: `${progress}%`,
                backgroundColor: '#ff6b6b'
              }}
            />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          ✕
        </button>

        {/* Story Image */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={story.imageUrl}
            alt="Story"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* User Info */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="flex items-center gap-3">
            {story.user.avatarUrl ? (
              <img
                src={story.user.avatarUrl}
                alt={story.user.displayName}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ) : (
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center" style={{ backgroundColor: '#ff6b6b' }}>
                🦐
              </div>
            )}
            <div>
              <p className="font-semibold text-white">{story.user.displayName}</p>
              <p className="text-xs text-white/80">
                {new Date(story.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


