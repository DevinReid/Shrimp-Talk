"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuthStore();
  const [isLiked, setIsLiked] = useState(post.likedByUser);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="backdrop-blur-sm rounded-xl border-2 shadow-lg overflow-hidden mb-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
      {/* Post Header */}
      <div className="flex items-center gap-3 p-4 border-b-2" style={{ borderColor: '#ffd4d4' }}>
        {post.user.avatarUrl ? (
          <img
            src={post.user.avatarUrl}
            alt={post.user.displayName}
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
          <Link href={`/profile/${post.userId}`} className="font-semibold hover:underline" style={{ color: '#ff5252' }}>
            {post.user.displayName}
          </Link>
          <p className="text-xs" style={{ color: '#ff6b6b' }}>
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Image */}
      <div className="relative w-full" style={{ aspectRatio: '1 / 1', backgroundColor: '#ffe8e8' }}>
        <img
          src={post.imageUrl}
          alt={post.caption || "Post image"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={handleLike}
            className="text-2xl hover:scale-110 transition-transform"
            style={{ color: isLiked ? '#ff5252' : '#ffb3b3' }}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-2xl hover:scale-110 transition-transform"
            style={{ color: '#ffb3b3' }}
          >
            💬
          </button>
          <button
            className="text-2xl hover:scale-110 transition-transform"
            style={{ color: '#ffb3b3' }}
          >
            📤
          </button>
        </div>

        {/* Likes Count */}
        {likeCount > 0 && (
          <p className="font-semibold mb-2" style={{ color: '#ff5252' }}>
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </p>
        )}

        {/* Caption */}
        {post.caption && (
          <div className="mb-2">
            <Link href={`/profile/${post.userId}`} className="font-semibold hover:underline" style={{ color: '#ff5252' }}>
              {post.user.displayName}
            </Link>
            <span className="ml-2" style={{ color: '#2d1b1b' }}>
              {post.caption}
            </span>
          </div>
        )}

        {/* Comments Preview */}
        {post.comments.length > 0 && !showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="text-sm mb-2 hover:underline"
            style={{ color: '#ff6b6b' }}
          >
            View all {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
          </button>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t-2" style={{ borderColor: '#ffd4d4' }}>
            {post.comments.map((comment) => (
              <div key={comment.id} className="mb-3">
                <Link href={`/profile/${comment.userId}`} className="font-semibold hover:underline" style={{ color: '#ff5252' }}>
                  {comment.user.displayName}
                </Link>
                <span className="ml-2" style={{ color: '#2d1b1b' }}>
                  {comment.content}
                </span>
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
              />
              <button
                className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: '#ff6b6b', color: 'white' }}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


