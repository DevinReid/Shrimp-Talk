"use client";

import Link from "next/link";
import type { Story } from "@/types";

interface StoryCircleProps {
  story: Story;
  isOwn?: boolean;
  onClick?: () => void;
}

export default function StoryCircle({ story, isOwn, onClick }: StoryCircleProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center gap-2 cursor-pointer group"
    >
      <div
        className="relative w-16 h-16 rounded-full border-4 overflow-hidden transition-transform group-hover:scale-110"
        style={{ borderColor: '#ff6b6b' }}
      >
        {story.user.avatarUrl ? (
          <img
            src={story.user.avatarUrl}
            alt={story.user.displayName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: '#ffe8e8' }}
          >
            🦐
          </div>
        )}
      </div>
      <p className="text-xs text-center max-w-[64px] truncate" style={{ color: '#ff5252' }}>
        {isOwn ? "Your story" : story.user.displayName}
      </p>
    </div>
  );
}

