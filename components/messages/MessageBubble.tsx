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
      className={`flex gap-2 mb-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isOwn && (
        <div className="flex-shrink-0 mt-auto">
          {message.sender.avatarUrl ? (
            <img
              src={message.sender.avatarUrl}
              alt={message.sender.displayName}
              className="w-7 h-7 rounded-full"
              style={{ border: "1.5px solid #e8c4c0" }}
            />
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: "#f5e6e6", border: "1.5px solid #e8c4c0" }}
            >
              🦐
            </div>
          )}
        </div>
      )}
      <div
        className={`flex flex-col max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}
      >
        {!isOwn && (
          <span
            className="text-[11px] mb-0.5 px-1"
            style={{ color: "#b0a0a0" }}
          >
            {message.sender.displayName}
          </span>
        )}
        <div
          className={`px-3.5 py-2 text-[15px] leading-snug ${
            isOwn
              ? "rounded-2xl rounded-br-md"
              : "rounded-2xl rounded-bl-md"
          }`}
          style={{
            backgroundColor: isOwn ? "#c2403a" : "#f0e0e0",
            color: isOwn ? "white" : "#2d1b1b",
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
        <span
          className="text-[10px] mt-0.5 px-1"
          style={{ color: "#b0a0a0" }}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
