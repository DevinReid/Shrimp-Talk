"use client";

import type { Message } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { user } = useAuthStore();
  const isOwn = message.senderId === user?.id;

  return (
    <div
      className={`flex gap-2 mb-4 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isOwn && (
        <div className="flex-shrink-0">
          {message.sender.avatarUrl ? (
            <img
              src={message.sender.avatarUrl}
              alt={message.sender.displayName}
              className="w-8 h-8 rounded-full border-2"
              style={{ borderColor: '#ffb3b3' }}
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
            >
              🦐
            </div>
          )}
        </div>
      )}
      <div className={`flex flex-col max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
        {!isOwn && (
          <span className="text-xs mb-1 px-2" style={{ color: '#ff6b6b' }}>
            {message.sender.displayName}
          </span>
        )}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn ? "rounded-tr-sm" : "rounded-tl-sm"
          }`}
          style={{
            backgroundColor: isOwn ? '#ff6b6b' : '#ffe8e8',
            color: isOwn ? 'white' : '#2d1b1b',
          }}
        >
          {message.type === "image" ? (
            <img
              src={message.content}
              alt="Shared image"
              className="max-w-full max-h-64 rounded-lg"
            />
          ) : message.type === "location" ? (
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>Location shared</span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          )}
        </div>
        <span className="text-xs mt-1 px-2" style={{ color: '#ff6b6b' }}>
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

