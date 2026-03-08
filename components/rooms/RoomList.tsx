"use client";

import { useState } from "react";
import type { Room } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";

interface RoomListProps {
  rooms: Room[];
  selectedRoomId?: string;
  onSelectRoom: (roomId: string) => void;
  onJoinRoom: (roomId: string) => void;
  onLeaveRoom: (roomId: string) => void;
}

export default function RoomList({
  rooms,
  selectedRoomId,
  onSelectRoom,
  onJoinRoom,
  onLeaveRoom,
}: RoomListProps) {
  const { user } = useAuthStore();
  const [showPublicOnly, setShowPublicOnly] = useState(false);

  const publicRooms = rooms.filter((room) => room.isPublic);
  const userRooms = rooms.filter((room) =>
    room.members.some((member) => member.id === user?.id)
  );
  const displayedRooms = showPublicOnly ? publicRooms : [...userRooms, ...publicRooms.filter(r => !userRooms.some(ur => ur.id === r.id))];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b-2 flex items-center justify-between" style={{ borderColor: '#ffd4d4' }}>
        <h2 className="text-xl font-bold shrimp-gradient-text">Rooms 🦐</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showPublicOnly}
            onChange={(e) => setShowPublicOnly(e.target.checked)}
            className="w-4 h-4"
            style={{ accentColor: '#ff6b6b' }}
          />
          <span className="text-sm" style={{ color: '#ff6b6b' }}>Public only</span>
        </label>
      </div>

      <div className="flex-1 overflow-y-auto divide-y-2" style={{ borderColor: '#ffd4d4' }}>
        {displayedRooms.length === 0 ? (
          <div className="p-8 text-center">
            <p style={{ color: '#ff6b6b' }}>No rooms available</p>
          </div>
        ) : (
          displayedRooms.map((room) => {
            const isSelected = selectedRoomId === room.id;
            const isMember = room.members.some((member) => member.id === user?.id);

            return (
              <div
                key={room.id}
                className={`p-4 hover:opacity-80 transition-opacity cursor-pointer ${
                  isSelected ? "bg-shrimp-100" : ""
                }`}
                style={{
                  backgroundColor: isSelected ? '#ffe8e8' : 'transparent',
                }}
                onClick={() => onSelectRoom(room.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate" style={{ color: '#ff5252' }}>
                        {room.name}
                      </h3>
                      {room.isPublic ? (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#ffe8e8', color: '#ff6b6b' }}>
                          Public
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#ffe8e8', color: '#ff6b6b' }}>
                          Private
                        </span>
                      )}
                    </div>
                    {room.description && (
                      <p className="text-sm truncate" style={{ color: '#ff6b6b' }}>
                        {room.description}
                      </p>
                    )}
                    <p className="text-xs mt-1" style={{ color: '#ff6b6b' }}>
                      {room.members.length} {room.members.length === 1 ? 'member' : 'members'}
                    </p>
                  </div>
                </div>
                {!isMember && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJoinRoom(room.id);
                    }}
                    className="w-full mt-2 shrimp-gradient hover:opacity-90 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-md"
                  >
                    Join 🦐
                  </button>
                )}
                {isMember && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLeaveRoom(room.id);
                    }}
                    className="w-full mt-2 border-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
                    style={{ borderColor: '#ffb3b3', color: '#ff6b6b' }}
                  >
                    Leave
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}


