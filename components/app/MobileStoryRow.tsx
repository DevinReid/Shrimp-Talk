"use client";

import type { Story } from "@/types";

interface MobileStoryRowProps {
  stories: Story[];
  onStoryClick?: (story: Story) => void;
}

export default function MobileStoryRow({ stories, onStoryClick }: MobileStoryRowProps) {
  return (
    <div className="border-b overflow-x-auto scrollbar-hide" style={{ borderColor: '#f0f0f0' }}>
      <div className="flex gap-3 px-4 py-3">
        {/* Your Story */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative w-16 h-16">
            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
                alt="Your story"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
          <span className="text-[10px] text-gray-500 leading-tight">Your story</span>
        </div>

        {/* Other Stories */}
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => onStoryClick?.(story)}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <div className="w-16 h-16 rounded-full p-[2px]"
              style={{
                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                {story.user.avatarUrl ? (
                  <img
                    src={story.user.avatarUrl}
                    alt={story.user.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-500">
                    {story.user.displayName[0]}
                  </div>
                )}
              </div>
            </div>
            <span className="text-[10px] text-gray-800 leading-tight max-w-[64px] truncate">
              {story.user.displayName.toLowerCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
