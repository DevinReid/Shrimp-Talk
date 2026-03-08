"use client";

import { useState, useCallback } from "react";
import MobileTopBar from "@/components/app/MobileTopBar";
import BottomNav from "@/components/app/BottomNav";
import ConversationList from "@/components/messages/ConversationList";
import ChatWindow from "@/components/messages/ChatWindow";
import { wonkyColors } from "@/lib/wonkyTheme";
import { mockConversations as initialConversations } from "@/lib/mockData";
import type { Conversation } from "@/types";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>();

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const handleTogglePin = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, isPinned: !c.isPinned } : c
      )
    );
  }, []);

  const handleSelectConversation = useCallback((conversationId: string) => {
    setSelectedConversationId(conversationId);
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      )
    );
  }, []);

  const handleBack = useCallback(() => {
    setSelectedConversationId(undefined);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: wonkyColors.coral }}
    >
      {!selectedConversation ? (
        <>
          <MobileTopBar />
          <div className="px-3 pt-2 pb-24">
            <h2
              className="text-xl font-bold mb-3 px-1"
              style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}
            >
              messages
            </h2>
            <ConversationList
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={handleSelectConversation}
              onTogglePin={handleTogglePin}
            />
          </div>
          <BottomNav />
        </>
      ) : (
        <ChatWindow
          conversation={selectedConversation}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
