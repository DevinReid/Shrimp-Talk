"use client";

import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import MobileTopBar from "@/components/app/MobileTopBar";
import BottomNav from "@/components/app/BottomNav";
import GroupDetail from "@/components/groups/GroupDetail";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";
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
        <div className="min-h-screen relative" style={{ backgroundColor: wonkyColors.coral }}>
          <MobileTopBar />
          <div className="px-4 pt-8">
            <div
              className="p-6 text-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                borderRadius: wonkyCardRadius,
                border: `2.5px solid ${wonkyColors.black}`,
              }}
            >
              <p className="text-lg font-bold" style={{ color: wonkyColors.pink }}>
                Group not found 🦐
              </p>
              <button
                onClick={() => router.push("/groups")}
                className="mt-4 px-5 py-2.5 text-sm font-bold text-white transition-all active:scale-95"
                style={{
                  backgroundColor: wonkyColors.pink,
                  borderRadius: "18px 22px 18px 22px",
                  border: `2.5px solid ${wonkyColors.black}`,
                }}
              >
                Back to Groups
              </button>
            </div>
          </div>
          <BottomNav />
        </div>
      </ProtectedRoute>
    );
  }

  const handleUpdate = (groupId: string, updates: Partial<FriendGroup>) => {
    setGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, ...updates } : g)));
  };

  const handleDelete = (groupId: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    router.push("/groups");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative" style={{ backgroundColor: wonkyColors.coral }}>
        <MobileTopBar />

        <div className="px-4 pt-3 pb-24">
          <button
            onClick={() => router.push("/groups")}
            className="mb-3 flex items-center gap-1.5 text-sm font-bold hover:opacity-80 transition-opacity"
            style={{ color: wonkyColors.white }}
          >
            ← Back
          </button>
          <GroupDetail
            group={group}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
