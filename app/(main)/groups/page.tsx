"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import GroupCard from "@/components/groups/GroupCard";
import CreateGroupModal from "@/components/groups/CreateGroupModal";
import { mockFriendGroups } from "@/lib/mockData";
import type { FriendGroup } from "@/types";

export default function GroupsPage() {
  const [groups, setGroups] = useState<FriendGroup[]>(mockFriendGroups);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateGroup = (data: { name: string; memberIds: string[] }) => {
    // Create new group (mock)
    const { mockUsers } = require("@/lib/mockData");
    const newGroup: FriendGroup = {
      id: `group-${Date.now()}`,
      userId: "1", // Current user
      name: data.name,
      createdAt: new Date(),
      members: mockUsers.filter((user: any) => data.memberIds.includes(user.id)),
    };
    setGroups([...groups, newGroup]);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 shrimp-gradient-text">
              Friend Groups 🦐
            </h1>
            <p className="text-lg" style={{ color: '#ff6b6b' }}>
              Organize your friends into groups for targeted sharing
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="shrimp-gradient hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            + Create Group 🦐
          </button>
        </div>

        {groups.length === 0 ? (
          <div className="backdrop-blur-sm p-12 rounded-xl border-2 shadow-lg text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
            <div className="text-6xl mb-4">🦐</div>
            <h2 className="text-2xl font-bold mb-4 shrimp-gradient-text">
              No Groups Yet
            </h2>
            <p className="text-lg mb-6" style={{ color: '#ff6b6b' }}>
              Create your first friend group to organize who sees your posts and stories.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="shrimp-gradient hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Create Your First Group 🦐
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}

        <CreateGroupModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateGroup}
        />
      </div>
    </ProtectedRoute>
  );
}

