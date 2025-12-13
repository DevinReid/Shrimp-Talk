"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import ConversationList from "@/components/messages/ConversationList";
import ChatWindow from "@/components/messages/ChatWindow";
import { mockConversations } from "@/lib/mockData";
import type { Conversation } from "@/types";

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>();
  const selectedConversation = mockConversations.find(
    (c) => c.id === selectedConversationId
  );

  return (
    <ProtectedRoute>
      <div className="h-[calc(100vh-12rem)] max-w-7xl mx-auto">
        <div className="h-full backdrop-blur-sm rounded-xl border-2 shadow-lg overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
          <div className="flex h-full">
            {/* Conversations List - Left Sidebar */}
            <div className="w-80 border-r-2 flex-shrink-0" style={{ borderColor: '#ffd4d4' }}>
              <ConversationList
                conversations={mockConversations}
                selectedConversationId={selectedConversationId}
                onSelectConversation={setSelectedConversationId}
              />
            </div>

            {/* Chat Window - Right Side */}
            <div className="flex-1 min-w-0">
              <ChatWindow conversation={selectedConversation || null} />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

