"use client";

import { useState } from "react";
import Link from "next/link";

/*
 * STONE & INK
 * Co-Star / editorial / zine-inspired
 * Monochrome with a single terracotta coral accent
 * Dark-first but has a light toggle
 *
 * The vibe: intentional, quiet, almost print-like.
 * Serif headlines. Lots of whitespace. Coral used sparingly.
 * Feels like a literary magazine, not a social app.
 */

const palette = {
  dark: {
    bg: "#0a0a0a",
    surface: "#111111",
    surfaceAlt: "#161616",
    border: "#1f1f1f",
    text: "#d6d1cb",
    textMuted: "#6b6560",
    textFaint: "#3d3a37",
    accent: "#D4735E",
    accentMuted: "rgba(212,115,94,0.12)",
    avatarBg: "#1a1714",
  },
  light: {
    bg: "#f7f5f2",
    surface: "#ffffff",
    surfaceAlt: "#f0ece7",
    border: "#e2ddd6",
    text: "#2d2926",
    textMuted: "#8a847d",
    textFaint: "#c4bdb5",
    accent: "#C4634E",
    accentMuted: "rgba(196,99,78,0.08)",
    avatarBg: "#ede8e2",
  },
};

const posts = [
  {
    id: "1",
    user: "maya_k",
    time: "2h",
    type: "text" as const,
    content: "Does anyone have a good recipe for sourdough? I've killed my last three starters and I'm starting to take it personally.",
    comments: 3,
  },
  {
    id: "2",
    user: "dev.julian",
    time: "4h",
    type: "photo" as const,
    content: "Morning hike was absolutely worth the early alarm",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
    comments: 1,
  },
  {
    id: "3",
    user: "samantha.c",
    time: "6h",
    type: "text" as const,
    content: "Hosting a costume party at my place this Saturday! Theme is 80s movies. DM me for the address if you don't have it. Starts at 7, BYOB.",
    comments: 0,
  },
  {
    id: "4",
    user: "alex_ro",
    time: "9h",
    type: "photo" as const,
    content: "New studio setup is finally coming together",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=800&fit=crop",
    comments: 0,
  },
  {
    id: "5",
    user: "maya_k",
    time: "14h",
    type: "photo" as const,
    content: "Couldn't believe this was real life",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop",
    comments: 2,
  },
  {
    id: "6",
    user: "samantha.c",
    time: "1d",
    type: "text" as const,
    content: "Lost my keys somewhere between the coffee shop on Main and the parking garage. Silver keychain with a little cactus on it. Let me know if you spot them!",
    comments: 0,
  },
];

export default function StoneAndInkMockup() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const t = palette[mode];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: t.bg }}>
      {/* Mode toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Link
          href="/dev/mockups"
          className="text-xs px-3 py-1.5 rounded-full transition-colors"
          style={{ backgroundColor: t.surfaceAlt, color: t.textMuted, border: `1px solid ${t.border}` }}
        >
          All Mockups
        </Link>
        <button
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          className="text-xs px-3 py-1.5 rounded-full transition-colors"
          style={{ backgroundColor: t.accentMuted, color: t.accent, border: `1px solid ${t.accent}33` }}
        >
          {mode === "dark" ? "Light" : "Dark"}
        </button>
      </div>

      <div className="max-w-[430px] mx-auto min-h-screen" style={{ backgroundColor: t.bg }}>
        {/* Top Bar */}
        <header
          className="sticky top-0 z-40 backdrop-blur-md border-b px-5"
          style={{ backgroundColor: `${t.bg}ee`, borderColor: t.border }}
        >
          <div className="flex items-center justify-between h-12">
            <div className="w-7 h-7 rounded-full" style={{ backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}` }} />
            <h1
              className="text-base tracking-tight"
              style={{ color: t.text, fontFamily: '"Georgia", "Times New Roman", serif', fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              shrimp talk
            </h1>
            <div className="flex gap-2.5" style={{ color: t.textMuted }}>
              <SearchSvg />
            </div>
          </div>
        </header>

        {/* Feed */}
        <div className="pb-16">
          {posts.map((post, i) => (
            <article key={post.id} className="border-b" style={{ borderColor: t.border }}>
              {/* Post header */}
              <div className="flex items-center gap-3 px-5 pt-4 pb-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium"
                  style={{ backgroundColor: t.avatarBg, color: t.accent, border: `1px solid ${t.border}` }}
                >
                  {post.user[0].toUpperCase()}
                </div>
                <div className="flex-1 flex items-baseline gap-2">
                  <span className="text-[13px] font-medium" style={{ color: t.text, letterSpacing: "-0.01em" }}>
                    {post.user}
                  </span>
                  <span className="text-[11px]" style={{ color: t.textFaint }}>
                    {post.time}
                  </span>
                </div>
                <button style={{ color: t.textFaint }}>
                  <MoreSvg />
                </button>
              </div>

              {/* Content */}
              {post.type === "text" ? (
                <div className="px-5 pb-3">
                  <p
                    className="text-[15px] leading-[1.6]"
                    style={{ color: t.text, fontFamily: '"Georgia", "Times New Roman", serif' }}
                  >
                    {post.content}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mx-5 mb-2 rounded-sm overflow-hidden" style={{ backgroundColor: t.surfaceAlt }}>
                    <img
                      src={post.imageUrl}
                      alt={post.content}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  </div>
                  {post.content && (
                    <div className="px-5 pb-1">
                      <p className="text-[13px]" style={{ color: t.textMuted }}>
                        {post.content}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between px-5 pb-3.5 pt-1">
                <div className="flex items-center gap-5" style={{ color: t.textMuted }}>
                  <button className="flex items-center gap-1.5 text-[11px] hover:opacity-70 transition-opacity">
                    <CommentSvg />
                    {post.comments > 0 && <span>{post.comments}</span>}
                  </button>
                  <button className="hover:opacity-70 transition-opacity">
                    <ShareSvg />
                  </button>
                </div>
                <button className="hover:opacity-70 transition-opacity" style={{ color: t.textMuted }}>
                  <BookmarkSvg />
                </button>
              </div>

              {/* Coral accent line on every 3rd post */}
              {i % 3 === 1 && (
                <div className="mx-5 mb-0" style={{ height: 1, backgroundColor: t.accentMuted }} />
              )}
            </article>
          ))}
        </div>

        {/* Bottom Nav */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] border-t backdrop-blur-md z-50"
          style={{ backgroundColor: `${t.bg}ee`, borderColor: t.border }}
        >
          <div className="flex items-center justify-around h-12" style={{ color: t.textMuted }}>
            <button style={{ color: t.accent }}>
              <HomeSvg />
            </button>
            <button>
              <CalendarSvg />
            </button>
            <button>
              <div
                className="w-6 h-6 rounded border flex items-center justify-center"
                style={{ borderColor: t.textFaint, color: t.textFaint }}
              >
                <PlusSvg />
              </div>
            </button>
            <button>
              <ChatSvg />
            </button>
            <button>
              <GlobeSvg />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

function SearchSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function MoreSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="12" cy="19" r="1.2" />
    </svg>
  );
}
function CommentSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function ShareSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function BookmarkSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function HomeSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function CalendarSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function PlusSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function ChatSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function GlobeSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
