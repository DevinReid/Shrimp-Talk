"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, setUser, logout } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    // Mock save - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setUser({
      ...user,
      displayName,
      bio,
      avatarUrl,
    });
    
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setDisplayName(user.displayName);
    setBio(user.bio || "");
    setAvatarUrl(user.avatarUrl || "");
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 shrimp-gradient-text">
          Your Profile 🦐
        </h1>
      </div>

      <div className="backdrop-blur-sm p-8 rounded-xl border-2 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
        <div className="flex flex-col items-center mb-6">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-32 h-32 rounded-full border-4 mb-4"
              style={{ borderColor: '#ffb3b3' }}
            />
          ) : (
            <div
              className="w-32 h-32 rounded-full border-4 mb-4 flex items-center justify-center text-4xl"
              style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
            >
              🦐
            </div>
          )}
          
          {isEditing && (
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="Avatar URL"
              className="w-full max-w-xs px-4 py-2 rounded-lg border-2 mb-2 focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: '#ffd4d4',
                backgroundColor: 'white',
                color: '#2d1b1b'
              }}
            />
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
              Display Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
              />
            ) : (
              <p className="text-lg font-semibold" style={{ color: '#ff5252' }}>
                {user.displayName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
              Email
            </label>
            <p className="text-lg" style={{ color: '#ff6b6b' }}>
              {user.email}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
              Bio
            </label>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all resize-none"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-lg" style={{ color: '#ff6b6b' }}>
                {user.bio || "No bio yet"}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 shrimp-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes 🦐"}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 border-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-80"
                  style={{ borderColor: '#ffb3b3', color: '#ff6b6b' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 shrimp-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Edit Profile 🦐
              </button>
            )}
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-80"
              style={{ backgroundColor: '#ffe8e8', color: '#ff5252' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

