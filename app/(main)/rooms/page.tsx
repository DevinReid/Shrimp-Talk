"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import RoomList from "@/components/rooms/RoomList";
import RoomChat from "@/components/rooms/RoomChat";
import CreateRoomModal from "@/components/rooms/CreateRoomModal";
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
      id: `room-${Date.now()}`,
      name: data.name,
      description: data.description,
      isPublic: data.isPublic,
      createdBy: currentUser.id,
      members: [currentUser],
      createdAt: new Date(),
    };
    setRooms([...rooms, newRoom]);
    setSelectedRoomId(newRoom.id);
  };

  const handleJoinRoom = (roomId: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? { ...room, members: [...room.members, currentUser] }
          : room
      )
    );
  };

  const handleLeaveRoom = (roomId: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? { ...room, members: room.members.filter((m) => m.id !== currentUser.id) }
          : room
      )
    );
    if (selectedRoomId === roomId) {
      setSelectedRoomId(undefined);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!selectedRoomId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedRoomId,
      senderId: currentUser.id,
      sender: currentUser,
      content,
      type: "text",
      createdAt: new Date(),
    };

    setRoomMessages((prev) => ({
      ...prev,
      [selectedRoomId]: [...(prev[selectedRoomId] || []), newMessage],
    }));
  };

  return (
    <ProtectedRoute>
      <div className="h-[calc(100vh-12rem)] max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 shrimp-gradient-text">
              Chat Rooms 🦐
            </h1>
            <p className="text-lg" style={{ color: '#ff6b6b' }}>
              Join rooms and chat with your friends
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="shrimp-gradient hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            + Create Room 🦐
          </button>
        </div>

        <div className="h-full backdrop-blur-sm rounded-xl border-2 shadow-lg overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
          <div className="flex h-full">
            {/* Rooms List - Left Sidebar */}
            <div className="w-80 border-r-2 flex-shrink-0" style={{ borderColor: '#ffd4d4' }}>
              <RoomList
                rooms={rooms}
                selectedRoomId={selectedRoomId}
                onSelectRoom={setSelectedRoomId}
                onJoinRoom={handleJoinRoom}
                onLeaveRoom={handleLeaveRoom}
              />
            </div>

            {/* Room Chat - Right Side */}
            <div className="flex-1 min-w-0">
              <RoomChat
                room={selectedRoom || null}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>

        <CreateRoomModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateRoom}
        />
      </div>
    </ProtectedRoute>
  );
}

