"use client";

import Link from "next/link";
import type { FriendGroup } from "@/types";

interface GroupCardProps {
  group: FriendGroup;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Link href={`/groups/${group.id}`}>
      <div className="backdrop-blur-sm p-6 rounded-xl border-2 shadow-lg hover:shadow-xl transition-all cursor-pointer" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold" style={{ color: '#ff5252' }}>
            {group.name}
          </h3>
          <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#ffe8e8', color: '#ff6b6b' }}>
            {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-2">
            {group.members.slice(0, 4).map((member) => (
              <div key={member.id}>
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.displayName}
                    className="w-8 h-8 rounded-full border-2"
                    style={{ borderColor: '#ffb3b3' }}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs"
                    style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
                  >
                    🦐
                  </div>
                )}
              </div>
            ))}
          </div>
          {group.members.length > 4 && (
            <span className="text-sm" style={{ color: '#ff6b6b' }}>
              +{group.members.length - 4} more
            </span>
          )}
        </div>

        <p className="text-sm" style={{ color: '#ff6b6b' }}>
          Created {new Date(group.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}


