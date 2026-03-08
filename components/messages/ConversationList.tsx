"use client";

import { useState } from "react";
import type { Conversation } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";

type TabFilter = "all" | "people" | "groups";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
  onTogglePin: (conversationId: string) => void;
}

export default function ConversationList({
  conversations,
  onSelectConversation,
  onTogglePin,
}: ConversationListProps) {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getOtherParticipants = (conversation: Conversation) => {
    return conversation.participants.filter((p) => p.id !== user?.id);
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.type === "dm") {
      const other = getOtherParticipants(conversation)[0];
      return other?.displayName || "Unknown";
    }
    return conversation.groupName || `Group (${conversation.participants.length})`;
  };

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.type === "dm") {
      const other = getOtherParticipants(conversation)[0];
      return other?.avatarUrl;
    }
    return null;
  };

  const getUnreadCount = (filter: TabFilter) => {
    return conversations
      .filter((c) => {
        if (filter === "people") return c.type === "dm";
        if (filter === "groups") return c.type === "group";
        return true;
      })
      .reduce((sum, c) => sum + c.unreadCount, 0);
  };

  const filtered = conversations
    .filter((c) => {
      if (activeTab === "people") return c.type === "dm";
      if (activeTab === "groups") return c.type === "group";
      return true;
    })
    .filter((c) => {
      if (!searchQuery.trim()) return true;
      const name = getConversationName(c).toLowerCase();
      return name.includes(searchQuery.toLowerCase());
    });

  const pinned = filtered.filter((c) => c.isPinned);
  const unpinned = filtered.filter((c) => !c.isPinned);

  const tabs: { key: TabFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "people", label: "People" },
    { key: "groups", label: "Groups" },
  ];

  return (
    <div>
      {/* Tabs & Search */}
      <div className="px-4 pt-3 pb-2">
        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden" style={{ backgroundColor: "#f5e6e6" }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const unread = getUnreadCount(tab.key);
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 py-2 px-3 text-sm font-semibold transition-all relative flex items-center justify-center gap-1.5 rounded-xl"
                style={{
                  backgroundColor: isActive ? "#c2403a" : "transparent",
                  color: isActive ? "white" : "#c2403a",
                }}
              >
                {tab.label}
                {unread > 0 && (
                  <span
                    className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[11px] font-bold px-1"
                    style={{
                      backgroundColor: isActive ? "white" : "#c2403a",
                      color: isActive ? "#c2403a" : "white",
                    }}
                  >
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mt-2.5 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            fill="none"
            stroke="#c2403a"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "#f5e6e6",
              color: "#2d1b1b",
              border: "none",
            }}
          />
        </div>
      </div>

      {/* Conversation List */}
      <div>
        {filtered.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-sm" style={{ color: "#c2403a" }}>
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </p>
          </div>
        ) : (
          <>
            {/* Pinned Section */}
            {pinned.length > 0 && (
              <div>
                <div
                  className="px-1 py-1.5 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: wonkyColors.goldSoft }}
                >
                  <svg className="w-3 h-3" fill={wonkyColors.goldSoft} viewBox="0 0 24 24">
                    <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                  </svg>
                  Pinned
                </div>
                <div className="space-y-1.5">
                  {pinned.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      name={getConversationName(conversation)}
                      avatarUrl={getConversationAvatar(conversation)}
                      onSelect={() => onSelectConversation(conversation.id)}
                      onTogglePin={() => onTogglePin(conversation.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Unpinned Section */}
            {unpinned.length > 0 && pinned.length > 0 && (
              <div
                className="px-1 py-1.5 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: wonkyColors.goldSoft }}
              >
                Recent
              </div>
            )}
            <div className="space-y-1.5">
              {unpinned.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  name={getConversationName(conversation)}
                  avatarUrl={getConversationAvatar(conversation)}
                  onSelect={() => onSelectConversation(conversation.id)}
                  onTogglePin={() => onTogglePin(conversation.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ConversationItem({
  conversation,
  name,
  avatarUrl,
  onSelect,
  onTogglePin,
}: {
  conversation: Conversation;
  name: string;
  avatarUrl?: string | null;
  onSelect: () => void;
  onTogglePin: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full px-5 py-4 text-left transition-all active:scale-[0.98] group"
      style={{
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        borderRadius: wonkyCardRadius,
        border: `2.5px solid ${wonkyColors.black}`,
      }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-12 h-12 rounded-full flex-shrink-0"
            style={{ border: "2px solid #e8c4c0" }}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
            style={{ backgroundColor: "#f5e6e6", border: "2px solid #e8c4c0" }}
          >
            {conversation.type === "group" ? "👥" : "🦐"}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p
              className="font-semibold truncate text-[15px]"
              style={{ color: "#2d1b1b" }}
            >
              {name}
            </p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Pin icon (visible on hover) */}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePin();
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-0.5 rounded"
                title={conversation.isPinned ? "Unpin" : "Pin"}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill={conversation.isPinned ? "#c2403a" : "none"}
                  stroke="#c2403a"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                </svg>
              </span>

              {/* Timestamp */}
              {conversation.lastMessage && (
                <span className="text-xs" style={{ color: "#b0a0a0" }}>
                  {new Date(
                    conversation.lastMessage.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-0.5">
            {conversation.lastMessage ? (
              <p
                className="text-sm truncate"
                style={{
                  color: conversation.unreadCount > 0 ? "#2d1b1b" : "#b0a0a0",
                  fontWeight: conversation.unreadCount > 0 ? 600 : 400,
                }}
              >
                {conversation.lastMessage.content}
              </p>
            ) : (
              <p className="text-sm" style={{ color: "#b0a0a0" }}>
                No messages yet
              </p>
            )}

            {/* Unread badge */}
            {conversation.unreadCount > 0 && (
              <span
                className="inline-flex items-center justify-center min-w-[20px] h-[20px] rounded-full text-xs font-bold px-1 flex-shrink-0"
                style={{ backgroundColor: "#c2403a", color: "white" }}
              >
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
