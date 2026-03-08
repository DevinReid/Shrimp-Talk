"use client";

import { useState } from "react";
import { wonkyColors, getAccent, wonkyCardRadius } from "@/lib/wonkyTheme";
import type { Post } from "@/types";

interface MobilePostCardProps {
  post: Post;
}

export default function MobilePostCard({ post }: MobilePostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const timeAgo = getTimeAgo(new Date(post.createdAt));
  const isTextPost = post.type === "text" || !post.imageUrl;
  const { accent, accentSoft } = getAccent(post.user.displayName);

  if (isTextPost) {
    return (
      <article
        className="overflow-hidden p-5 transition-colors"
        style={{
          backgroundColor: accent,
          borderRadius: wonkyCardRadius,
          border: `2.5px solid ${wonkyColors.black}`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              backgroundColor: wonkyColors.white,
              borderRadius: "14px 18px 14px 18px",
              color: wonkyColors.black,
              border: `2px solid ${wonkyColors.black}`,
            }}
          >
            {post.user.displayName[0]}
          </div>
          <div className="flex-1">
            <span className="text-[14px] font-bold" style={{ color: wonkyColors.white }}>
              {post.user.displayName}
            </span>
            <span className="text-[11px] ml-2" style={{ color: "rgba(255,255,255,0.7)" }}>
              {timeAgo}
            </span>
          </div>
          <button style={{ color: "rgba(255,255,255,0.5)" }}>
            <MoreSvg />
          </button>
        </div>

        <div
          className="px-4 py-3.5"
          style={{ backgroundColor: wonkyColors.white, borderRadius: "18px" }}
        >
          <p className="text-[15px] leading-[1.65] font-medium" style={{ color: wonkyColors.black }}>
            {post.caption}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-full transition-all active:scale-95"
            style={{
              backgroundColor: showComments ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)",
              color: "#fff",
            }}
          >
            <CommentSvg />
            {post.comments.length > 0 && <span>{post.comments.length}</span>}
          </button>
          <button
            className="flex items-center px-3 py-2 rounded-full transition-all active:scale-95"
            style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <ShareSvg />
          </button>
          <div className="flex-1" />
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="flex items-center px-3 py-2 rounded-full transition-all active:scale-95"
            style={{
              backgroundColor: isBookmarked ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)",
              color: "#fff",
            }}
          >
            <BookmarkSvg />
          </button>
        </div>

        {showComments && post.comments.length > 0 && (
          <div
            className="mt-3 pt-3 space-y-2.5"
            style={{ borderTop: "2px solid rgba(255,255,255,0.25)" }}
          >
            {post.comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2.5">
                <div
                  className="w-6 h-6 flex items-center justify-center text-[9px] font-bold mt-0.5 shrink-0"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.25)",
                    borderRadius: "10px 12px 10px 12px",
                    color: "#fff",
                  }}
                >
                  {c.user.displayName[0]}
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <span className="font-bold mr-1" style={{ color: "#fff" }}>{c.user.displayName}</span>
                  {c.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </article>
    );
  }

  return (
    <article
      className="overflow-hidden transition-colors"
      style={{
        backgroundColor: "rgba(255,255,255,0.92)",
        borderRadius: wonkyCardRadius,
        backdropFilter: "blur(20px)",
        border: `2.5px solid ${wonkyColors.black}`,
      }}
    >
      <div className="flex items-center gap-3 px-5 pt-4 pb-2">
        <div
          className="w-9 h-9 flex items-center justify-center text-sm font-bold shrink-0"
          style={{
            backgroundColor: accent,
            borderRadius: "14px 18px 14px 18px",
            color: "#fff",
            border: `2px solid ${wonkyColors.black}`,
          }}
        >
          {post.user.displayName[0]}
        </div>
        <div className="flex-1">
          <span className="text-[14px] font-bold" style={{ color: wonkyColors.black }}>
            {post.user.displayName}
          </span>
          <span className="text-[11px] ml-2" style={{ color: "#9a7a72" }}>
            {timeAgo}
          </span>
        </div>
        <button style={{ color: "#9a7a72" }}>
          <MoreSvg />
        </button>
      </div>

      <div className="mx-4 mb-3">
        <div
          className="overflow-hidden"
          style={{ borderRadius: "20px", border: `2.5px solid ${wonkyColors.black}` }}
        >
          <img
            src={post.imageUrl}
            alt={post.caption || "Post"}
            className="w-full aspect-[4/5] object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {post.caption && (
        <div className="px-5 pb-1">
          <p className="text-[13px] font-medium" style={{ color: "#4a3530" }}>
            {post.caption}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 px-5 pb-4 pt-2">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-full transition-all active:scale-95"
          style={{
            backgroundColor: showComments ? accent : accentSoft,
            color: showComments ? "#fff" : wonkyColors.black,
          }}
        >
          <CommentSvg />
          {post.comments.length > 0 && <span>{post.comments.length}</span>}
        </button>
        <button
          className="flex items-center px-3 py-2 rounded-full transition-all active:scale-95"
          style={{ backgroundColor: accentSoft, color: wonkyColors.black }}
        >
          <ShareSvg />
        </button>
        <div className="flex-1" />
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="flex items-center px-3 py-2 rounded-full transition-all active:scale-95"
          style={{
            backgroundColor: isBookmarked ? accent : accentSoft,
            color: isBookmarked ? "#fff" : wonkyColors.black,
          }}
        >
          <BookmarkSvg />
        </button>
      </div>

      {showComments && post.comments.length > 0 && (
        <div
          className="mx-5 mb-4 p-3 space-y-2.5"
          style={{
            backgroundColor: accentSoft,
            borderRadius: "16px 20px 16px 20px",
          }}
        >
          {post.comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2.5">
              <div
                className="w-6 h-6 flex items-center justify-center text-[9px] font-bold mt-0.5 shrink-0"
                style={{
                  backgroundColor: accent,
                  borderRadius: "10px 12px 10px 12px",
                  color: "#fff",
                }}
              >
                {c.user.displayName[0]}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "#4a3530" }}>
                <span className="font-bold mr-1" style={{ color: wonkyColors.black }}>{c.user.displayName}</span>
                {c.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function MoreSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
  );
}
function CommentSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function ShareSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function BookmarkSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
