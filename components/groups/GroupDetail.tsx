"use client";

import { useState } from "react";
import type { FriendGroup } from "@/types";
import { mockUsers } from "@/lib/mockData";

interface GroupDetailProps {
  group: FriendGroup;
  onUpdate: (groupId: string, updates: Partial<FriendGroup>) => void;
  onDelete: (groupId: string) => void;
}

export default function GroupDetail({ group, onUpdate, onDelete }: GroupDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(group.name);
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [selectedNewMembers, setSelectedNewMembers] = useState<string[]>([]);

  const availableUsers = mockUsers.filter(
    (user) =>
      user.id !== "1" && // Exclude current user
      !group.members.some((member) => member.id === user.id)
  );

  const handleSave = () => {
    onUpdate(group.id, { name });
    setIsEditing(false);
  };

  const handleAddMembers = () => {
    // In real app, this would call API
    const newMembers = mockUsers.filter((user) => selectedNewMembers.includes(user.id));
    onUpdate(group.id, { members: [...group.members, ...newMembers] });
    setSelectedNewMembers([]);
    setShowAddMembers(false);
  };

  const handleRemoveMember = (memberId: string) => {
    const updatedMembers = group.members.filter((m) => m.id !== memberId);
    onUpdate(group.id, { members: updatedMembers });
  };

  return (
    <div className="space-y-6">
      {/* Group Header */}
      <div className="backdrop-blur-sm p-6 rounded-xl border-2 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
        <div className="flex items-center justify-between mb-4">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-2xl font-bold px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: '#ffd4d4',
                backgroundColor: 'white',
                color: '#2d1b1b'
              }}
            />
          ) : (
            <h2 className="text-2xl font-bold shrimp-gradient-text">{group.name}</h2>
          )}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: '#ff6b6b', color: 'white' }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setName(group.name);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-80 border-2"
                  style={{ borderColor: '#ffb3b3', color: '#ff6b6b' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-80 border-2"
                  style={{ borderColor: '#ffb3b3', color: '#ff6b6b' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${group.name}"?`)) {
                      onDelete(group.id);
                    }
                  }}
                  className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: '#ffe8e8', color: '#ff5252' }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
        <p className="text-sm" style={{ color: '#ff6b6b' }}>
          Created {new Date(group.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Members Section */}
      <div className="backdrop-blur-sm p-6 rounded-xl border-2 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold" style={{ color: '#ff5252' }}>
            Members ({group.members.length})
          </h3>
          <button
            onClick={() => setShowAddMembers(!showAddMembers)}
            className="shrimp-gradient hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md"
          >
            + Add Members 🦐
          </button>
        </div>

        {showAddMembers && (
          <div className="mb-6 p-4 rounded-lg border-2" style={{ borderColor: '#ffd4d4', backgroundColor: '#fff5f5' }}>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {availableUsers.length === 0 ? (
                <p className="text-center py-4" style={{ color: '#ff6b6b' }}>
                  No available friends to add
                </p>
              ) : (
                availableUsers.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded-lg border-2 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ 
                      borderColor: selectedNewMembers.includes(user.id) ? '#ff6b6b' : '#ffd4d4',
                      backgroundColor: selectedNewMembers.includes(user.id) ? '#ffe8e8' : 'white'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedNewMembers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedNewMembers([...selectedNewMembers, user.id]);
                        } else {
                          setSelectedNewMembers(selectedNewMembers.filter(id => id !== user.id));
                        }
                      }}
                      className="w-5 h-5"
                      style={{ accentColor: '#ff6b6b' }}
                    />
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full border-2"
                        style={{ borderColor: '#ffb3b3' }}
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
                      >
                        🦐
                      </div>
                    )}
                    <span className="font-medium" style={{ color: '#ff5252' }}>
                      {user.displayName}
                    </span>
                  </label>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddMembers}
                disabled={selectedNewMembers.length === 0}
                className="flex-1 shrimp-gradient hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md disabled:opacity-50"
              >
                Add Selected ({selectedNewMembers.length})
              </button>
              <button
                onClick={() => {
                  setShowAddMembers(false);
                  setSelectedNewMembers([]);
                }}
                className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-80 border-2"
                style={{ borderColor: '#ffb3b3', color: '#ff6b6b' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {group.members.length === 0 ? (
            <p className="text-center py-4" style={{ color: '#ff6b6b' }}>
              No members yet. Add some friends!
            </p>
          ) : (
            group.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg border-2"
                style={{ borderColor: '#ffd4d4', backgroundColor: 'white' }}
              >
                <div className="flex items-center gap-3">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.displayName}
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
                  <div>
                    <p className="font-semibold" style={{ color: '#ff5252' }}>
                      {member.displayName}
                    </p>
                    {member.bio && (
                      <p className="text-sm" style={{ color: '#ff6b6b' }}>
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="px-3 py-1 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: '#ffe8e8', color: '#ff5252' }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

