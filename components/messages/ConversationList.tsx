"use client";

import { useState } from "react";
import type { Conversation } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
}

export default function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const { user } = useAuthStore();

  const getOtherParticipants = (conversation: Conversation) => {
    return conversation.participants.filter((p) => p.id !== user?.id);
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.type === "dm") {
      const other = getOtherParticipants(conversation)[0];
      return other?.displayName || "Unknown";
    } else {
      return `Group (${conversation.participants.length})`;
    }
  };

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.type === "dm") {
      const other = getOtherParticipants(conversation)[0];
      return other?.avatarUrl;
    }
    return null;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b-2" style={{ borderColor: '#ffd4d4' }}>
        <h2 className="text-xl font-bold shrimp-gradient-text">Messages 🦐</h2>
      </div>
      <div className="divide-y-2" style={{ borderColor: '#ffd4d4' }}>
        {conversations.length === 0 ? (
          <div className="p-8 text-center">
            <p style={{ color: '#ff6b6b' }}>No conversations yet</p>
          </div>
        ) : (
          conversations.map((conversation) => {
            const isSelected = selectedConversationId === conversation.id;
            const avatarUrl = getConversationAvatar(conversation);
            const name = getConversationName(conversation);

            return (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full p-4 text-left hover:opacity-80 transition-opacity ${
                  isSelected ? "bg-shrimp-100" : ""
                }`}
                style={{
                  backgroundColor: isSelected ? '#ffe8e8' : 'transparent',
                }}
              >
                <div className="flex items-center gap-3">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={name}
                      className="w-12 h-12 rounded-full border-2 flex-shrink-0"
                      style={{ borderColor: '#ffb3b3' }}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
                    >
                      {conversation.type === "group" ? "👥" : "🦐"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate" style={{ color: '#ff5252' }}>
                      {name}
                    </p>
                    {conversation.lastMessage && (
                      <p className="text-sm truncate" style={{ color: '#ff6b6b' }}>
                        {conversation.lastMessage.content}
                      </p>
                    )}
                  </div>
                  {conversation.lastMessage && (
                    <span className="text-xs flex-shrink-0" style={{ color: '#ff6b6b' }}>
                      {new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

