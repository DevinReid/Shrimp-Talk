"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import FeedToggle from "@/components/feed/FeedToggle";
import StoryCircle from "@/components/feed/StoryCircle";
import StoryViewer from "@/components/feed/StoryViewer";
import PostCard from "@/components/feed/PostCard";
import CreatePostModal from "@/components/feed/CreatePostModal";
import { mockPosts, mockStories, currentUser } from "@/lib/mockData";
import type { Post, Story } from "@/types";

export default function FeedPage() {
  const [feedEnabled, setFeedEnabled] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleCreatePost = (data: { imageUrl: string; caption: string; visibleToGroups: string[] }) => {
    // Create new post (mock)
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      imageUrl: data.imageUrl,
      caption: data.caption,
      likes: 0,
      likedByUser: false,
      comments: [],
      visibleToGroups: data.visibleToGroups,
      createdAt: new Date(),
    };
    setPosts([newPost, ...posts]);
  };

  // Filter stories that haven't expired
  const activeStories = mockStories.filter(
    (story) => new Date(story.expiresAt) > new Date()
  );

  // If feed is disabled, show message
  if (!feedEnabled) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto">
          <FeedToggle isEnabled={feedEnabled} onToggle={setFeedEnabled} />
          <div className="backdrop-blur-sm p-12 rounded-xl border-2 shadow-lg text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
            <div className="text-6xl mb-4">🦐</div>
            <h2 className="text-3xl font-bold mb-4 shrimp-gradient-text">
              Feed is Hidden
            </h2>
            <p className="text-lg mb-6" style={{ color: '#ff6b6b' }}>
              Your feed is currently turned off. This helps you focus on intentional engagement.
            </p>
            <p className="text-sm" style={{ color: '#ff6b6b' }}>
              Turn it back on when you're ready to see posts from your friends.
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto">
        <FeedToggle isEnabled={feedEnabled} onToggle={setFeedEnabled} />

        {/* Stories Section */}
        {activeStories.length > 0 && (
          <div className="backdrop-blur-sm p-4 rounded-xl border-2 shadow-lg mb-6 overflow-x-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
            <div className="flex gap-4">
              {/* Create Story Button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {/* TODO: Open create story modal */}}
                  className="w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl hover:scale-110 transition-transform"
                  style={{ borderColor: '#ff6b6b', backgroundColor: '#ffe8e8' }}
                >
                  ➕
                </button>
                <p className="text-xs text-center max-w-[64px] truncate" style={{ color: '#ff5252' }}>
                  Your story
                </p>
              </div>
              {activeStories.map((story) => (
                <StoryCircle 
                  key={story.id} 
                  story={story}
                  onClick={() => setSelectedStory(story)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Create Post Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="w-full shrimp-gradient hover:opacity-90 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>➕</span>
            <span>Create Post 🦐</span>
          </button>
        </div>

        {/* Posts Feed */}
        <div>
          {posts.length === 0 ? (
            <div className="backdrop-blur-sm p-12 rounded-xl border-2 shadow-lg text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
            <div className="text-6xl mb-4">🦐</div>
            <p className="text-xl mb-2" style={{ color: '#ff5252' }}>
              No posts yet
            </p>
            <p style={{ color: '#ff6b6b' }}>
              Be the first to share something!
            </p>
          </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>

        {/* Story Viewer Modal */}
        {selectedStory && (
          <StoryViewer
            story={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
          onSubmit={handleCreatePost}
        />
      </div>
    </ProtectedRoute>
  );
}

