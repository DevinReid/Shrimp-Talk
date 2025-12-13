"use client";

import { useState } from "react";
import type { User } from "@/types";
import { mockUsers } from "@/lib/mockData";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; memberIds: string[] }) => void;
}

export default function CreateGroupModal({ isOpen, onClose, onSubmit }: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  // Filter users based on search (excluding current user)
  const availableUsers = mockUsers.filter(
    (user) =>
      user.id !== "1" && // Exclude current user
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onSubmit({ name, memberIds: selectedMembers });
    setName("");
    setSelectedMembers([]);
    setSearchQuery("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="backdrop-blur-sm rounded-xl border-2 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ffd4d4' }}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold shrimp-gradient-text">Create Friend Group 🦐</h2>
            <button
              onClick={onClose}
              className="text-2xl hover:opacity-70 transition-opacity"
              style={{ color: '#ff5252' }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
                Group Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
                placeholder="e.g., Close Friends, Family, Work"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
                Add Members
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 mb-3"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
                placeholder="Search friends..."
              />
              
              <div className="max-h-64 overflow-y-auto space-y-2 border-2 rounded-lg p-3" style={{ borderColor: '#ffd4d4' }}>
                {availableUsers.length === 0 ? (
                  <p className="text-center py-4" style={{ color: '#ff6b6b' }}>
                    No friends found
                  </p>
                ) : (
                  availableUsers.map((user) => (
                    <label
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ 
                        borderColor: selectedMembers.includes(user.id) ? '#ff6b6b' : '#ffd4d4',
                        backgroundColor: selectedMembers.includes(user.id) ? '#ffe8e8' : 'white'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(user.id)}
                        onChange={() => toggleMember(user.id)}
                        className="w-5 h-5"
                        style={{ accentColor: '#ff6b6b' }}
                      />
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.displayName}
                          className="w-10 h-10 rounded-full border-2"
                          style={{ borderColor: '#ffb3b3' }}
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                          style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
                        >
                          🦐
                        </div>
                      )}
                      <span className="font-medium flex-1" style={{ color: '#ff5252' }}>
                        {user.displayName}
                      </span>
                    </label>
                  ))
                )}
              </div>
              
              {selectedMembers.length > 0 && (
                <p className="text-sm mt-2" style={{ color: '#ff6b6b' }}>
                  {selectedMembers.length} {selectedMembers.length === 1 ? 'member' : 'members'} selected
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-80"
                style={{ borderColor: '#ffb3b3', color: '#ff6b6b' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 shrimp-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
              >
                Create Group 🦐
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

