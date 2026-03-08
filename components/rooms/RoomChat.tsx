"use client";

import { useState, useRef, useEffect } from "react";
import type { Room, Message } from "@/types";
import MessageBubble from "@/components/messages/MessageBubble";
import { useAuthStore } from "@/stores/useAuthStore";

interface RoomChatProps {
  room: Room | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export default function RoomChat({ room, messages, onSendMessage }: RoomChatProps) {
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !room) return;

    onSendMessage(messageText);
    setMessageText("");
  };

  if (!room) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🦐</div>
          <p className="text-xl font-semibold mb-2 shrimp-gradient-text">
            Select a room
          </p>
          <p style={{ color: '#ff6b6b' }}>
            Choose a room from the list to start chatting
          </p>
        </div>
      </div>
    );
  }

  const isMember = room.members.some((member) => member.id === user?.id);

  if (!isMember) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-xl font-semibold mb-2 shrimp-gradient-text">
            Join to Chat
          </p>
          <p style={{ color: '#ff6b6b' }}>
            You need to join this room to send messages
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Room Header */}
      <div className="p-4 border-b-2 flex items-center justify-between" style={{ borderColor: '#ffd4d4', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <div>
          <h3 className="text-xl font-bold" style={{ color: '#ff5252' }}>
            {room.name}
          </h3>
          {room.description && (
            <p className="text-sm" style={{ color: '#ff6b6b' }}>
              {room.description}
            </p>
          )}
          <p className="text-xs mt-1" style={{ color: '#ff6b6b' }}>
            {room.members.length} {room.members.length === 1 ? 'member' : 'members'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {room.members.slice(0, 4).map((member) => (
            <div key={member.id}>
              {member.avatarUrl ? (
                <img
                  src={member.avatarUrl}
                  alt={member.displayName}
                  className="w-8 h-8 rounded-full border-2"
                  style={{ borderColor: '#ffb3b3' }}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs"
                  style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
                >
                  🦐
                </div>
              )}
            </div>
          ))}
          {room.members.length > 4 && (
            <span className="text-sm" style={{ color: '#ff6b6b' }}>
              +{room.members.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#fff5f5' }}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🦐</div>
              <p style={{ color: '#ff6b6b' }}>No messages yet</p>
              <p className="text-sm mt-2" style={{ color: '#ff6b6b' }}>
                Start the conversation!
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t-2" style={{ borderColor: '#ffd4d4', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
            style={{
              borderColor: '#ffd4d4',
              backgroundColor: 'white',
              color: '#2d1b1b',
            }}
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="shrimp-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send 🦐
          </button>
        </form>
      </div>
    </div>
  );
}


