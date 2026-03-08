"use client";

import { useState } from "react";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; isPublic: boolean }) => void;
}

export default function CreateRoomModal({ isOpen, onClose, onSubmit }: CreateRoomModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onSubmit({ name, description, isPublic });
    setName("");
    setDescription("");
    setIsPublic(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="backdrop-blur-sm rounded-xl border-2 shadow-2xl w-full max-w-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ffd4d4' }}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold shrimp-gradient-text">Create Room 🦐</h2>
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
                Room Name
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
                placeholder="e.g., General, Tech Talk, Gaming"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 resize-none"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
                placeholder="What's this room about?"
              />
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-5 h-5"
                  style={{ accentColor: '#ff6b6b' }}
                />
                <div>
                  <span className="font-medium" style={{ color: '#ff5252' }}>
                    Public Room
                  </span>
                  <p className="text-sm" style={{ color: '#ff6b6b' }}>
                    Anyone can find and join this room
                  </p>
                </div>
              </label>
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
                Create Room 🦐
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


