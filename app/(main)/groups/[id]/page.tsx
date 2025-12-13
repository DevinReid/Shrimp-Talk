"use client";

import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import GroupDetail from "@/components/groups/GroupDetail";
import { mockFriendGroups } from "@/lib/mockData";
import type { FriendGroup } from "@/types";
import { useState } from "react";

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;
  
  const [groups, setGroups] = useState<FriendGroup[]>(mockFriendGroups);
  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm p-8 rounded-xl border-2 shadow-lg text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
            <p className="text-xl" style={{ color: '#ff5252' }}>
              Group not found 🦐
            </p>
            <button
              onClick={() => router.push("/groups")}
              className="mt-4 shrimp-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Back to Groups
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const handleUpdate = (groupId: string, updates: Partial<FriendGroup>) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, ...updates } : g))
    );
  };

  const handleDelete = (groupId: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    router.push("/groups");
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/groups")}
          className="mb-6 flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition-opacity"
          style={{ color: '#ff5252' }}
        >
          ← Back to Groups
        </button>
        <GroupDetail
          group={group}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </ProtectedRoute>
  );
}

