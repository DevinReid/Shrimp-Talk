"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import MobileTopBar from "@/components/app/MobileTopBar";
import BottomNav from "@/components/app/BottomNav";
import RoomList from "@/components/rooms/RoomList";
import RoomChat from "@/components/rooms/RoomChat";
import CreateRoomModal from "@/components/rooms/CreateRoomModal";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";
import { mockRooms, currentUser, mockUsers } from "@/lib/mockData";
import type { Room, Message } from "@/types";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [roomMessages, setRoomMessages] = useState<Record<string, Message[]>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  const messages = selectedRoomId ? roomMessages[selectedRoomId] || [] : [];

  const handleCreateRoom = (data: { name: string; description: string; isPublic: boolean }) => {
    const newRoom: Room = {
      id: `room-${Date.now()}`, name: data.name, description: data.description,
      isPublic: data.isPublic, createdBy: currentUser.id, members: [currentUser], createdAt: new Date(),
    };
    setRooms([...rooms, newRoom]);
    setSelectedRoomId(newRoom.id);
  };

  const handleJoinRoom = (roomId: string) => {
    setRooms((prev) => prev.map((room) => room.id === roomId ? { ...room, members: [...room.members, currentUser] } : room));
  };

  const handleLeaveRoom = (roomId: string) => {
    setRooms((prev) => prev.map((room) => room.id === roomId ? { ...room, members: room.members.filter((m) => m.id !== currentUser.id) } : room));
    if (selectedRoomId === roomId) setSelectedRoomId(undefined);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedRoomId) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`, conversationId: selectedRoomId, senderId: currentUser.id, sender: currentUser,
      content, type: "text", createdAt: new Date(),
    };
    setRoomMessages((prev) => ({ ...prev, [selectedRoomId]: [...(prev[selectedRoomId] || []), newMessage] }));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative" style={{ backgroundColor: wonkyColors.coral }}>
        {selectedRoomId && selectedRoom ? (
          <div className="flex flex-col h-dvh">
            <header className="sticky top-0 z-40 px-4 safe-area-top backdrop-blur-xl"
              style={{ backgroundColor: wonkyColors.pink, borderBottom: `2.5px solid ${wonkyColors.black}` }}>
              <div className="flex items-center h-14 gap-3">
                <button onClick={() => setSelectedRoomId(undefined)} className="text-sm font-bold" style={{ color: "white" }}>
                  ← Back
                </button>
                <h1 className="text-lg font-bold tracking-tight flex-1 truncate" style={{ color: "white", fontFamily: "var(--font-fredoka), sans-serif" }}>
                  {selectedRoom.name}
                </h1>
              </div>
            </header>
            <div className="flex-1 min-h-0">
              <RoomChat room={selectedRoom} messages={messages} onSendMessage={handleSendMessage} />
            </div>
          </div>
        ) : (
          <>
            <MobileTopBar />
            <div className="px-4 pt-3 pb-24">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold" style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}>
                  chat rooms
                </h2>
                <button onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 text-sm font-bold transition-all active:scale-95"
                  style={{ backgroundColor: wonkyColors.gold, color: wonkyColors.black, borderRadius: "18px 22px 18px 22px", border: `2.5px solid ${wonkyColors.black}` }}>
                  + New Room
                </button>
              </div>
              <div className="overflow-hidden" style={{ borderRadius: wonkyCardRadius, border: `2.5px solid ${wonkyColors.black}`, backgroundColor: "rgba(255,255,255,0.92)" }}>
                <RoomList rooms={rooms} selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} onJoinRoom={handleJoinRoom} onLeaveRoom={handleLeaveRoom} />
              </div>
            </div>
            <BottomNav />
          </>
        )}
        <CreateRoomModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSubmit={handleCreateRoom} />
      </div>
    </ProtectedRoute>
  );
}
