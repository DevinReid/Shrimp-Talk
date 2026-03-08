"use client";

import { useState, useRef, useEffect } from "react";
import type { Conversation, Message } from "@/types";
import MessageBubble from "./MessageBubble";
import { mockMessages } from "@/lib/mockData";
import { useAuthStore } from "@/stores/useAuthStore";

interface ChatWindowProps {
  conversation: Conversation;
  onBack: () => void;
}

export default function ChatWindow({ conversation, onBack }: ChatWindowProps) {
  const { user } = useAuthStore();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getConversationName = (conv: Conversation) => {
    if (conv.type === "dm") {
      const other = conv.participants.find((p) => p.id !== user?.id);
      return other?.displayName || "Unknown";
    }
    return conv.groupName || `Group (${conv.participants.length})`;
  };

  const getConversationSubtext = (conv: Conversation) => {
    if (conv.type === "dm") return "Active now";
    const names = conv.participants
      .filter((p) => p.id !== user?.id)
      .map((p) => p.displayName)
      .join(", ");
    return names || "Group chat";
  };

  useEffect(() => {
    const conversationMessages = mockMessages[conversation.id] || [];
    setMessages(conversationMessages);
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: conversation.id,
      senderId: user?.id || "1",
      sender: {
        id: user?.id || "1",
        email: user?.email || "user@example.com",
        displayName: user?.displayName || "You",
        createdAt: new Date(),
      },
      content: messageText,
      type: "text",
      createdAt: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const avatar =
    conversation.type === "dm"
      ? conversation.participants.find((p) => p.id !== user?.id)?.avatarUrl
      : null;

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <header
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b px-3 safe-area-top"
        style={{ borderColor: "#f2dada" }}
      >
        <div className="flex items-center gap-2 h-12">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1"
            style={{ color: "#d4544a" }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {avatar ? (
            <img
              src={avatar}
              alt={getConversationName(conversation)}
              className="w-8 h-8 rounded-full"
              style={{ border: "2px solid #e8c4c0" }}
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{ backgroundColor: "#f5e6e6", border: "2px solid #e8c4c0" }}
            >
              {conversation.type === "group" ? "👥" : "🦐"}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold truncate"
              style={{ color: "#2d1b1b" }}
            >
              {getConversationName(conversation)}
            </p>
            <p className="text-[11px] truncate" style={{ color: "#b0a0a0" }}>
              {getConversationSubtext(conversation)}
            </p>
          </div>

          <button className="p-1.5" style={{ color: "#d4544a" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3"
        style={{ backgroundColor: "#faf5f5" }}
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🦐</div>
              <p className="text-sm" style={{ color: "#b0a0a0" }}>
                No messages yet
              </p>
              <p className="text-xs mt-1" style={{ color: "#b0a0a0" }}>
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
      <div
        className="border-t px-3 py-2 safe-area-bottom bg-white"
        style={{ borderColor: "#f2dada" }}
      >
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Message..."
            className="flex-1 px-4 py-2.5 rounded-full text-sm focus:outline-none"
            style={{
              backgroundColor: "#f5e6e6",
              color: "#2d1b1b",
              border: "none",
            }}
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity disabled:opacity-30"
            style={{ backgroundColor: "#c2403a" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
              stroke="none"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
