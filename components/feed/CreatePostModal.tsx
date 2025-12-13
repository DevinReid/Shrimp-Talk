"use client";

import { useState } from "react";
import type { FriendGroup } from "@/types";
import { mockFriendGroups } from "@/lib/mockData";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { imageUrl: string; caption: string; visibleToGroups: string[] }) => void;
}

export default function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ imageUrl, caption, visibleToGroups: selectedGroups });
    setImageUrl("");
    setCaption("");
    setSelectedGroups([]);
    onClose();
  };

  const toggleGroup = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="backdrop-blur-sm rounded-xl border-2 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ffd4d4' }}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold shrimp-gradient-text">Create Post 🦐</h2>
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
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {imageUrl && (
              <div className="w-full rounded-lg overflow-hidden border-2" style={{ borderColor: '#ffd4d4', aspectRatio: '1 / 1', backgroundColor: '#ffe8e8' }}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
                Caption
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 resize-none"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
                placeholder="What's on your mind?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-4" style={{ color: '#ff5252' }}>
                Share with Groups
              </label>
              <div className="space-y-2">
                {mockFriendGroups.map((group) => (
                  <label
                    key={group.id}
                    className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ 
                      borderColor: selectedGroups.includes(group.id) ? '#ff6b6b' : '#ffd4d4',
                      backgroundColor: selectedGroups.includes(group.id) ? '#ffe8e8' : 'white'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedGroups.includes(group.id)}
                      onChange={() => toggleGroup(group.id)}
                      className="w-5 h-5"
                      style={{ accentColor: '#ff6b6b' }}
                    />
                    <span className="font-medium" style={{ color: '#ff5252' }}>
                      {group.name}
                    </span>
                    <span className="text-sm ml-auto" style={{ color: '#ff6b6b' }}>
                      ({group.members.length} {group.members.length === 1 ? 'member' : 'members'})
                    </span>
                  </label>
                ))}
              </div>
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
                Post 🦐
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

