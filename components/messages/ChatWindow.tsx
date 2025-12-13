"use client";

import { useState, useRef, useEffect } from "react";
import type { Conversation, Message } from "@/types";
import MessageBubble from "./MessageBubble";
import { mockMessages } from "@/lib/mockData";

interface ChatWindowProps {
  conversation: Conversation | null;
}

export default function ChatWindow({ conversation }: ChatWindowProps) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation) {
      // Load messages for this conversation
      const conversationMessages = mockMessages[conversation.id] || [];
      setMessages(conversationMessages);
    } else {
      setMessages([]);
    }
  }, [conversation]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !conversation) return;

    // Create new message (mock)
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: conversation.id,
      senderId: "1", // Current user ID (mock)
      sender: {
        id: "1",
        email: "alice@example.com",
        displayName: "Alice",
        createdAt: new Date(),
      },
      content: messageText,
      type: "text",
      createdAt: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🦐</div>
          <p className="text-xl font-semibold mb-2 shrimp-gradient-text">
            Select a conversation
          </p>
          <p style={{ color: '#ff6b6b' }}>
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b-2 flex items-center gap-3" style={{ borderColor: '#ffd4d4', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        {conversation.participants[0]?.avatarUrl ? (
          <img
            src={conversation.participants[0].avatarUrl}
            alt={conversation.participants[0].displayName}
            className="w-10 h-10 rounded-full border-2"
            style={{ borderColor: '#ffb3b3' }}
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
          >
            {conversation.type === "group" ? "👥" : "🦐"}
          </div>
        )}
        <div>
          <p className="font-semibold" style={{ color: '#ff5252' }}>
            {conversation.type === "dm"
              ? conversation.participants.find((p) => p.id !== "1")?.displayName || "Unknown"
              : `Group (${conversation.participants.length})`}
          </p>
          <p className="text-xs" style={{ color: '#ff6b6b' }}>
            {conversation.type === "dm" ? "Direct message" : "Group chat"}
          </p>
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

