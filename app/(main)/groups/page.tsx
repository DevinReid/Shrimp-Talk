"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import MobileTopBar from "@/components/app/MobileTopBar";
import BottomNav from "@/components/app/BottomNav";
import GroupCard from "@/components/groups/GroupCard";
import CreateGroupModal from "@/components/groups/CreateGroupModal";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";
import { mockFriendGroups } from "@/lib/mockData";
import type { FriendGroup } from "@/types";

export default function GroupsPage() {
  const [groups, setGroups] = useState<FriendGroup[]>(mockFriendGroups);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateGroup = (data: { name: string; memberIds: string[] }) => {
    const { mockUsers } = require("@/lib/mockData");
    const newGroup: FriendGroup = {
      id: `group-${Date.now()}`,
      userId: "1",
      name: data.name,
      createdAt: new Date(),
      members: mockUsers.filter((user: any) => data.memberIds.includes(user.id)),
    };
    setGroups([...groups, newGroup]);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative" style={{ backgroundColor: wonkyColors.coral }}>
        <MobileTopBar />

        <div className="px-4 pt-3 pb-24">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-bold"
              style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}
            >
              friend groups
            </h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 text-sm font-bold transition-all active:scale-95"
              style={{
                backgroundColor: wonkyColors.gold,
                color: wonkyColors.black,
                borderRadius: "18px 22px 18px 22px",
                border: `2.5px solid ${wonkyColors.black}`,
              }}
            >
              + New Group
            </button>
          </div>

          {groups.length === 0 ? (
            <div
              className="p-8 text-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                borderRadius: wonkyCardRadius,
                border: `2.5px solid ${wonkyColors.black}`,
              }}
            >
              <div className="text-5xl mb-3">🦐</div>
              <h2 className="text-lg font-bold mb-2" style={{ color: wonkyColors.pink, fontFamily: "var(--font-fredoka), sans-serif" }}>
                No Groups Yet
              </h2>
              <p className="text-sm font-medium mb-4" style={{ color: "#9a7a72" }}>
                Create your first friend group to organize who sees your posts and stories.
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 text-sm font-bold text-white transition-all active:scale-95"
                style={{
                  backgroundColor: wonkyColors.pink,
                  borderRadius: "22px 26px 22px 26px",
                  border: `2.5px solid ${wonkyColors.black}`,
                }}
              >
                Create Your First Group
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </div>

        <CreateGroupModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateGroup}
        />

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
